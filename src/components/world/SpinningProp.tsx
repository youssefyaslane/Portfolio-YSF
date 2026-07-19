import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFModel } from './GLTFModel'

interface SpinningPropProps {
  path: string
  position: [number, number, number]
  scale?: number
  speed?: number
}

/** A GLTF prop that spins continuously around its own Y axis (pinwheel-style flowers, etc). */
export function SpinningProp({ path, position, scale, speed = 1 }: SpinningPropProps) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += speed * delta
  })

  return (
    <group ref={ref} position={position}>
      <GLTFModel path={path} scale={scale} />
    </group>
  )
}
