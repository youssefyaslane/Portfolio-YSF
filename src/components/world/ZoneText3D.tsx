import { Center, Text3D } from '@react-three/drei'
import type { ZoneConfig } from '@/data/types'
import { polarPosition } from '@/utils/math'

interface ZoneText3DProps {
  zone: ZoneConfig
  radius: number
  color: string
}

const FONT_PATH = '/fonts/helvetiker_bold.typeface.json'

// helvetiker only ships basic ASCII glyphs, so accented labels (Compétences,
// Expériences) are stripped to plain caps for this landmark — everywhere
// else (cards, flat labels) keeps the accented French text.
function toDisplayText(label: string) {
  const combiningMarks = String.fromCharCode(0x0300) + '-' + String.fromCharCode(0x036f)
  const stripDiacritics = new RegExp('[' + combiningMarks + ']', 'g')
  return label.normalize('NFD').replace(stripDiacritics, '').toUpperCase()
}

const SIDE_OFFSET = -5

/**
 * Big standalone extruded-text landmark per street, in the style of
 * bruno-simon.com's "BRUNOSI" sign — separate from the informational
 * SignPost so it reads as a bold title rather than a functional sign.
 */
export function ZoneText3D({ zone, radius, color }: ZoneText3DProps) {
  const position = polarPosition(zone.angle, radius)
  return (
    <group position={position} rotation={[0, zone.angle, 0]}>
      <group position={[SIDE_OFFSET, 0, 0]}>
        <Center position={[0, 1.4, 0]}>
          <Text3D font={FONT_PATH} size={1.1} height={0.35} bevelEnabled bevelThickness={0.05} bevelSize={0.03} curveSegments={6} castShadow>
            {toDisplayText(zone.label)}
            <meshStandardMaterial color={color} />
          </Text3D>
        </Center>
      </group>
    </group>
  )
}
