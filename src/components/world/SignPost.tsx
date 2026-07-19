import { Text } from '@react-three/drei'

interface SignPostProps {
  title: string
  active?: boolean
}

const POST_COLOR = '#7a4f28'
const PLANK_COLOR = '#c68b4e'
const PLANK_ACTIVE = '#ffd166'
const TEXT_COLOR = '#38230f'

// Long project titles need smaller type to fit the plank's two/three lines.
function fontSizeFor(title: string) {
  if (title.length <= 14) return 0.32
  if (title.length <= 32) return 0.24
  return 0.18
}

/**
 * Playful wooden signpost: a single rounded post with a wide plank, the
 * stop's title painted straight onto both faces (no floating label).
 */
export function SignPost({ title, active = false }: SignPostProps) {
  const fontSize = fontSizeFor(title)

  return (
    <group rotation={[0, 0, 0.02]}>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 2.2, 10]} />
        <meshStandardMaterial color={POST_COLOR} />
      </mesh>
      <mesh position={[0, 2.25, 0]}>
        <sphereGeometry args={[0.13, 10, 8]} />
        <meshStandardMaterial color={POST_COLOR} />
      </mesh>
      {/* plank nailed to the front of the post so the post never cuts
          through the painted title */}
      <group position={[0, 1.85, 0.19]}>
        <mesh castShadow>
          <boxGeometry args={[2.6, 1, 0.14]} />
          <meshStandardMaterial
            color={active ? PLANK_ACTIVE : PLANK_COLOR}
            emissive={active ? '#ffd166' : '#000000'}
            emissiveIntensity={active ? 0.35 : 0}
          />
        </mesh>
        {[0.085, -0.085].map((z, i) => (
          <Text
            key={i}
            position={[0, 0, z]}
            rotation={[0, i === 1 ? Math.PI : 0, 0]}
            fontSize={fontSize}
            maxWidth={2.3}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            color={TEXT_COLOR}
          >
            {title}
          </Text>
        ))}
      </group>
    </group>
  )
}
