import type { ZoneStop } from '@/data/types'
import { zoneDecor } from './zoneDecor'
import { GLTFModel } from './GLTFModel'
import { SignPost } from './SignPost'
import { getStopContent } from '@/components/ui/stopContent'

interface StopMarkerProps {
  stop: ZoneStop
  active: boolean
}

// Trigger detection stays anchored to stop.position (on the street's
// centerline); rotating this group by stop.angle means the sideways
// decor offset always lands beside that street, whichever direction
// it points from the hub. Stops alternate left/right so a street with
// many items (e.g. Projets) doesn't read as a single-file wall.
const SIDE_OFFSET = 5

const PAD_RADIUS = 4.2
const PAD_COLOR = '#e0d4b8'
// small greenery accents dressing each station pad, cycled by stop index
const ACCENTS = [
  '/models/nature/flower_purpleA.glb',
  '/models/nature/flower_redA.glb',
  '/models/nature/flower_yellowA.glb',
  '/models/nature/grass_large.glb',
]

export function StopMarker({ stop, active }: StopMarkerProps) {
  const Decor = zoneDecor[stop.zoneId]
  const offsetX = stop.side === 'center' ? 0 : stop.side === 'right' ? SIDE_OFFSET : -SIDE_OFFSET
  const offsetZ = 0
  const { title } = getStopContent(stop)
  const accentA = ACCENTS[stop.index % ACCENTS.length]!
  const accentB = ACCENTS[(stop.index + 2) % ACCENTS.length]!

  return (
    <group position={stop.position} rotation={[0, stop.angle, 0]}>
      <group position={[offsetX, 0, offsetZ]}>
        {/* paved station platform under building + sign */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <cylinderGeometry args={[PAD_RADIUS, PAD_RADIUS, 0.06, 24]} />
          <meshStandardMaterial color={PAD_COLOR} />
        </mesh>
        {/* driveway connecting the pad to the road centerline */}
        {stop.side !== 'center' && (
          <mesh position={[-offsetX / 2, 0.015, 0]} receiveShadow>
            <boxGeometry args={[Math.abs(offsetX), 0.05, 2.6]} />
            <meshStandardMaterial color={PAD_COLOR} />
          </mesh>
        )}
        <Decor index={stop.index} />
        <group position={[0, 0, 2]}>
          <SignPost title={title} active={active} />
        </group>
        {/* greenery accents at the pad's edge */}
        <GLTFModel path={accentA} position={[2.9, 0.05, 2.6]} scale={2.2} />
        <GLTFModel path={accentB} position={[-3, 0.05, -1.8]} scale={2.2} />
      </group>
    </group>
  )
}
