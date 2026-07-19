import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FlockConfig {
  radius: number
  height: number
  speed: number
  phase: number
}

const FLOCKS: FlockConfig[] = [
  { radius: 45, height: 18, speed: 0.12, phase: 0 },
  { radius: 70, height: 23, speed: -0.09, phase: 2.1 },
]

// V-formation offsets within a flock, in the flock's local frame.
const BIRD_OFFSETS: [number, number, number][] = [
  [0, 0, 0],
  [-1.2, -0.3, 1.1],
  [1.2, -0.2, 1.1],
]

function Bird({ offset }: { offset: [number, number, number] }) {
  return (
    <group position={offset}>
      {/* simple dart-shaped silhouette; detail is wasted at sky distance */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.18, 0.8, 4]} />
        <meshStandardMaterial color="#33415c" fog={false} />
      </mesh>
      <mesh position={[0, 0, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.05, 1.1, 0.25]} />
        <meshStandardMaterial color="#33415c" fog={false} />
      </mesh>
    </group>
  )
}

/** Small flocks circling the world on fixed orbits, bobbing gently. */
export function Birds() {
  const flockRefs = useRef<(THREE.Group | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    FLOCKS.forEach((flock, i) => {
      const group = flockRefs.current[i]
      if (!group) return
      const angle = flock.phase + t * flock.speed
      group.position.set(
        Math.cos(angle) * flock.radius,
        flock.height + Math.sin(t * 1.7 + flock.phase) * 0.8,
        Math.sin(angle) * flock.radius,
      )
      // face along the direction of travel (tangent of the orbit)
      group.rotation.y = -angle - (flock.speed > 0 ? 0 : Math.PI)
    })
  })

  return (
    <>
      {FLOCKS.map((_, i) => (
        <group
          key={i}
          ref={(node) => {
            flockRefs.current[i] = node
          }}
        >
          {BIRD_OFFSETS.map((offset, j) => (
            <Bird key={j} offset={offset} />
          ))}
        </group>
      ))}
    </>
  )
}
