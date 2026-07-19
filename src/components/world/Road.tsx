import { zones } from '@/data/zones'
import { streetLength } from '@/data/stops'
import { HUB_PAD_RADIUS } from '@/utils/constants'

const ROAD_WIDTH = 6
const ROAD_COLOR = '#3f3a36'
const CURB_COLOR = '#cfc6b8'
const LINE_COLOR = '#e8d9a8'

export function Road() {
  const spokes = zones.filter((zone) => zone.id !== 'accueil')

  return (
    <>
      {/* hub: curb ring slightly wider than the asphalt pad */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[HUB_PAD_RADIUS + 0.7, 32]} />
        <meshStandardMaterial color={CURB_COLOR} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[HUB_PAD_RADIUS, 32]} />
        <meshStandardMaterial color={ROAD_COLOR} />
      </mesh>
      {spokes.map((zone) => {
        const length = streetLength[zone.id] + HUB_PAD_RADIUS
        return (
          <group key={zone.id} rotation={[0, zone.angle, 0]}>
            {/* curb layer under the asphalt, a bit wider on both sides */}
            <mesh position={[0, 0.008, -length / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[ROAD_WIDTH + 1.4, length]} />
              <meshStandardMaterial color={CURB_COLOR} />
            </mesh>
            <mesh position={[0, 0.012, -length / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[ROAD_WIDTH, length]} />
              <meshStandardMaterial color={ROAD_COLOR} />
            </mesh>
            {/* dashed center line */}
            {Array.from({ length: Math.floor(length / 4) }).map((_, i) => (
              <mesh
                key={i}
                position={[0, 0.016, -(2 + i * 4)]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <planeGeometry args={[0.25, 1.8]} />
                <meshStandardMaterial color={LINE_COLOR} />
              </mesh>
            ))}
          </group>
        )
      })}
    </>
  )
}
