import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const GROUND_SIZE = 320
const TEXTURE_REPEAT = 36

const TEXTURE_PATHS = [
  '/textures/grass/color.jpg',
  '/textures/grass/normal.jpg',
  '/textures/grass/roughness.jpg',
]

export function Ground() {
  // Real photographic PBR grass (CC0, ambientCG Grass001): color +
  // normal + roughness maps tiled across the plane. The normal map is
  // what sells the realism — the surface catches the warm key light
  // instead of reading as a flat painted color.
  const [colorMap, normalMap, roughnessMap] = useTexture(TEXTURE_PATHS, (textures) => {
    for (const texture of textures as THREE.Texture[]) {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(TEXTURE_REPEAT, TEXTURE_REPEAT)
      texture.anisotropy = 8
    }
    ;(textures as THREE.Texture[])[0]!.colorSpace = THREE.SRGBColorSpace
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.7, 0.7)}
        roughnessMap={roughnessMap}
      />
    </mesh>
  )
}

useTexture.preload(TEXTURE_PATHS)
