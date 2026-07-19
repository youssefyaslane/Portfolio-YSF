import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFModel } from './GLTFModel'
import { SpinningProp } from './SpinningProp'
import { zones } from '@/data/zones'
import { polarPosition } from '@/utils/math'

const PROPS = [
  '/models/nature/tree_default.glb',
  '/models/nature/rock_largeA.glb',
  '/models/nature/rock_smallA.glb',
  '/models/nature/flower_purpleA.glb',
  '/models/nature/flower_redA.glb',
  '/models/nature/flower_yellowA.glb',
  '/models/nature/grass_large.glb',
  '/models/nature/grass_leafsLarge.glb',
]

const SCALE_BY_PROP: Record<string, number> = {
  '/models/nature/tree_default.glb': 3.5,
  '/models/nature/rock_largeA.glb': 1.8,
  '/models/nature/rock_smallA.glb': 1.4,
  '/models/nature/flower_purpleA.glb': 3,
  '/models/nature/flower_redA.glb': 3,
  '/models/nature/flower_yellowA.glb': 3,
  '/models/nature/grass_large.glb': 2.6,
  '/models/nature/grass_leafsLarge.glb': 2.6,
}

const STREET_HALF_WIDTH = 5 // stay clear of the 6-wide road + a little margin

/**
 * Deterministic (seeded, not Math.random) ambient scatter of nature props
 * around the world, skipping any point too close to a road spoke. Fixed
 * count kept modest for Phase 3 — InstancedMesh conversion is Phase 5.
 */
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

function isNearAnyStreet(x: number, z: number) {
  for (const zone of zones) {
    if (zone.id === 'accueil') continue
    // Distance from point to the infinite line through the origin at `angle`.
    const nx = Math.cos(zone.angle)
    const nz = -Math.sin(zone.angle) // perpendicular to the street direction (-sin, 0, -cos)
    const distance = Math.abs(x * nx + z * nz)
    if (distance < STREET_HALF_WIDTH) return true
  }
  return false
}

export function NatureScatter() {
  const items = useMemo(() => {
    const rand = mulberry32(42)
    const placed: { path: string; position: [number, number, number]; rotationY: number }[] = []
    let attempts = 0
    while (placed.length < 70 && attempts < 600) {
      attempts++
      const angle = rand() * Math.PI * 2
      const radius = 20 + rand() * 95
      const [x, , z] = polarPosition(angle, radius)
      if (isNearAnyStreet(x, z)) continue
      const path = PROPS[Math.floor(rand() * PROPS.length)]!
      placed.push({ path, position: [x, 0, z], rotationY: rand() * Math.PI * 2 })
    }
    return placed
  }, [])

  return (
    <>
      {items.map((item, i) =>
        item.path.includes('flower') ? (
          <SpinningProp
            key={i}
            path={item.path}
            position={item.position}
            scale={SCALE_BY_PROP[item.path] ?? 2}
            speed={0.6 + (i % 3) * 0.3}
          />
        ) : (
          <GLTFModel
            key={i}
            path={item.path}
            position={item.position}
            rotation={[0, item.rotationY, 0]}
            scale={SCALE_BY_PROP[item.path] ?? 2}
          />
        ),
      )}
    </>
  )
}

PROPS.forEach((path) => useGLTF.preload(path))
