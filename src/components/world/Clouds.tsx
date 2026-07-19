import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CLOUD_COUNT = 9
const WRAP_X = 150

interface CloudSeed {
  x: number
  y: number
  z: number
  scale: number
  speed: number
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Low-poly clouds (three overlapping spheres) drifting slowly across the
 * sky, wrapping around the world edge. fog is disabled on the material —
 * with the scene fog's short far distance they would otherwise vanish.
 */
export function Clouds() {
  const groupRefs = useRef<(THREE.Group | null)[]>([])

  const seeds = useMemo<CloudSeed[]>(() => {
    const rand = mulberry32(7)
    return Array.from({ length: CLOUD_COUNT }, () => ({
      x: (rand() * 2 - 1) * WRAP_X,
      y: 18 + rand() * 10,
      z: (rand() * 2 - 1) * WRAP_X,
      scale: 1.6 + rand() * 1.8,
      speed: 0.8 + rand() * 1.2,
    }))
  }, [])

  useFrame((_, delta) => {
    groupRefs.current.forEach((cloud, i) => {
      const seed = seeds[i]
      if (!cloud || !seed) return
      cloud.position.x += seed.speed * delta
      if (cloud.position.x > WRAP_X) cloud.position.x = -WRAP_X
    })
  })

  return (
    <>
      {seeds.map((seed, i) => (
        <group
          key={i}
          ref={(node) => {
            groupRefs.current[i] = node
          }}
          position={[seed.x, seed.y, seed.z]}
          scale={seed.scale}
        >
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.4, 7, 6]} />
            <meshStandardMaterial color="#ffffff" flatShading fog={false} />
          </mesh>
          <mesh position={[1.3, -0.2, 0.3]}>
            <sphereGeometry args={[1, 7, 6]} />
            <meshStandardMaterial color="#f4f9ff" flatShading fog={false} />
          </mesh>
          <mesh position={[-1.2, -0.25, -0.2]}>
            <sphereGeometry args={[0.9, 7, 6]} />
            <meshStandardMaterial color="#f4f9ff" flatShading fog={false} />
          </mesh>
        </group>
      ))}
    </>
  )
}
