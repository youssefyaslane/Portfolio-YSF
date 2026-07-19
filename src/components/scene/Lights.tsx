import { useAppStore } from '@/store/useAppStore'

// Shadow map size/frustum sized around the hub + first stops rather than
// the whole world — the biggest single GPU cost in the scene, so kept as
// tight as still looks right near the car.
const SHADOW_MAP_SIZE: [number, number] = [1024, 1024]
const SHADOW_BOUNDS = 32

export function Lights() {
  const darkMode = useAppStore((s) => s.darkMode)

  if (darkMode) {
    return (
      <>
        {/* Moonlit night: cool dim ambient/fill, pale blue "moon" key light —
            the lamppost heads (emissive) do most of the visible lighting work. */}
        <ambientLight intensity={0.28} color="#8fa8d6" />
        <hemisphereLight args={['#41528a', '#1f2a1a', 0.35]} />
        <directionalLight
          position={[-14, 22, -10]}
          intensity={0.6}
          color="#c7d6ff"
          castShadow
          shadow-mapSize={SHADOW_MAP_SIZE}
          shadow-camera-left={-SHADOW_BOUNDS}
          shadow-camera-right={SHADOW_BOUNDS}
          shadow-camera-top={SHADOW_BOUNDS}
          shadow-camera-bottom={-SHADOW_BOUNDS}
        />
      </>
    )
  }

  return (
    <>
      {/* Golden-hour key light + cool ambient fill + sky/ground bounce,
          for a warmer stylized look than plain white daylight. */}
      <ambientLight intensity={0.6} color="#d8ebff" />
      <hemisphereLight args={['#bfe3ff', '#86c76f', 0.6]} />
      <directionalLight
        position={[18, 24, 12]}
        intensity={1.7}
        color="#ffd9a0"
        castShadow
        shadow-mapSize={SHADOW_MAP_SIZE}
        shadow-camera-left={-SHADOW_BOUNDS}
        shadow-camera-right={SHADOW_BOUNDS}
        shadow-camera-top={SHADOW_BOUNDS}
        shadow-camera-bottom={-SHADOW_BOUNDS}
      />
    </>
  )
}
