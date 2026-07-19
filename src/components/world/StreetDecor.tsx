import { useGLTF } from '@react-three/drei'
import { GLTFModel } from './GLTFModel'
import { zones } from '@/data/zones'
import { stopsByZone } from '@/data/stops'
import { useAppStore } from '@/store/useAppStore'
import { FIRST_STOP_RADIUS, HUB_PAD_RADIUS, STOP_SPACING } from '@/utils/constants'

const FENCE_PATH = '/models/nature/fence_simple.glb'

function Lamppost({ position, lit }: { position: [number, number, number]; lit: boolean }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 2.6, 8]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      <mesh position={[0, 2.7, 0]} castShadow>
        <boxGeometry args={[0.3, 0.35, 0.3]} />
        <meshStandardMaterial color="#ffd166" emissive="#ffb703" emissiveIntensity={lit ? 2.2 : 0.9} />
      </mesh>
      {lit && <pointLight position={[0, 2.7, 0]} color="#ffb703" intensity={2.5} distance={7} decay={2} />}
    </group>
  )
}

/**
 * Streetside dressing: lampposts between stops (opposite side of each
 * stop's building so they don't collide) and low fences flanking each
 * street mouth near the hub. All placement is derived from the same
 * street constants as the stops, so spacing changes stay in sync.
 */
export function StreetDecor() {
  const darkMode = useAppStore((s) => s.darkMode)
  const streets = zones.filter((zone) => zone.id !== 'accueil')

  return (
    <>
      {streets.map((zone) => {
        const stopCount = stopsByZone[zone.id].length
        const lamps = Array.from({ length: Math.max(stopCount - 1, 1) }, (_, i) => {
          const radius = FIRST_STOP_RADIUS + (i + 0.5) * STOP_SPACING
          const side = i % 2 === 0 ? 1 : -1 // opposite of the stops' left-first alternation
          return { radius, side }
        })

        const fenceStart = HUB_PAD_RADIUS + 2
        const fenceEnd = FIRST_STOP_RADIUS - 3
        const fenceCount = Math.max(Math.floor((fenceEnd - fenceStart) / 2), 0)

        return (
          <group key={zone.id} rotation={[0, zone.angle, 0]}>
            {lamps.map((lamp, i) => (
              <Lamppost key={i} position={[lamp.side * 4.5, 0, -lamp.radius]} lit={darkMode} />
            ))}
            {Array.from({ length: fenceCount }).map((_, i) => (
              <group key={i}>
                <GLTFModel
                  path={FENCE_PATH}
                  position={[-4.3, 0, -(fenceStart + 1 + i * 2)]}
                  rotation={[0, Math.PI / 2, 0]}
                  scale={2}
                />
                <GLTFModel
                  path={FENCE_PATH}
                  position={[4.3, 0, -(fenceStart + 1 + i * 2)]}
                  rotation={[0, Math.PI / 2, 0]}
                  scale={2}
                />
              </group>
            ))}
          </group>
        )
      })}
    </>
  )
}

useGLTF.preload(FENCE_PATH)
