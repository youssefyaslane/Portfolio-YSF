import { forwardRef, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useCarController } from '@/hooks/useCarController'
import { carTelemetry } from '@/hooks/carTelemetry'

const CAR_MODEL_PATH = '/models/car/delivery.glb'
const WHEEL_NODE_NAMES = ['wheel-front-right', 'wheel-front-left', 'wheel-back-right', 'wheel-back-left']

export const Car = forwardRef<THREE.Group>(function Car(_props, forwardedRef) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(CAR_MODEL_PATH)
  useCarController(groupRef)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  const wheels = useMemo(
    () => WHEEL_NODE_NAMES.map((name) => clonedScene.getObjectByName(name)).filter((o): o is THREE.Object3D => !!o),
    [clonedScene],
  )

  useFrame((_, delta) => {
    const spinDelta = carTelemetry.speed * delta * 2
    for (const wheel of wheels) {
      wheel.rotation.x += spinDelta
    }
  })

  return (
    <group
      ref={(node) => {
        groupRef.current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      }}
    >
      {/* The GLB's authored front faces the opposite of our -Z forward
          convention, so flip it here rather than in the movement math. */}
      <group rotation={[0, Math.PI, 0]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
})

useGLTF.preload(CAR_MODEL_PATH)
