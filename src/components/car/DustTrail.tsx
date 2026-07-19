import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { carTelemetry } from '@/hooks/carTelemetry'
import { CAR_MAX_SPEED } from '@/utils/constants'

const MAX_PARTICLES = 48
const PARTICLE_LIFE = 0.7 // seconds
const EMIT_SPEED_THRESHOLD = CAR_MAX_SPEED * 0.45

interface Particle {
  life: number
  position: THREE.Vector3
  velocity: THREE.Vector3
}

const UP = new THREE.Vector3(0, 1, 0)

/**
 * Instanced dust puffs kicked up behind the rear wheels while driving
 * fast. Reads position/speed from the shared carTelemetry object (kept
 * in sync by whichever controller drives the car) instead of an
 * Object3D ref. Dead particles are scaled to zero rather than removed —
 * the instance count never changes.
 */
export function DustTrail() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: MAX_PARTICLES }, () => ({
        life: 0,
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
      })),
    [],
  )
  const nextIndex = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const emitOffset = useMemo(() => new THREE.Vector3(), [])
  const carPosition = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const speed = carTelemetry.speed
    carPosition.set(carTelemetry.x, carTelemetry.y, carTelemetry.z)

    // Emit from alternating rear corners while moving fast.
    if (Math.abs(speed) > EMIT_SPEED_THRESHOLD) {
      const particle = particles[nextIndex.current % MAX_PARTICLES]!
      nextIndex.current++
      const sideSign = nextIndex.current % 2 === 0 ? 1 : -1
      emitOffset.set(sideSign * 0.55, 0.2, speed > 0 ? 1.4 : -1.4).applyAxisAngle(UP, carTelemetry.heading)
      particle.position.copy(carPosition).add(emitOffset)
      particle.velocity.set((Math.random() - 0.5) * 1.4, 1 + Math.random() * 1.2, (Math.random() - 0.5) * 1.4)
      particle.life = PARTICLE_LIFE
    }

    particles.forEach((particle, i) => {
      if (particle.life > 0) {
        particle.life -= delta
        particle.position.addScaledVector(particle.velocity, delta)
        // grow as it dissipates, like a real dust puff
        const age = 1 - particle.life / PARTICLE_LIFE
        const scale = particle.life > 0 ? 0.12 + age * 0.45 : 0
        dummy.position.copy(particle.position)
        dummy.scale.setScalar(scale)
      } else {
        dummy.scale.setScalar(0)
      }
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_PARTICLES]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 5]} />
      <meshBasicMaterial color="#d8cdbb" transparent opacity={0.5} depthWrite={false} />
    </instancedMesh>
  )
}
