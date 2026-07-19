import type { ZoneId, ZoneStop } from './types'
import { zones } from './zones'
import { experiences } from './experiences'
import { projects } from './projects'
import { skillCategories } from './skills'
import { education, certifications } from './education'
import { polarPosition } from '@/utils/math'
import { FIRST_STOP_RADIUS, STOP_SPACING, STOP_TRIGGER_RADIUS } from '@/utils/constants'

// Street order walks outward from the hub oldest-first, so driving down
// a street retraces the timeline (e.g. Formations: Classes Prépa near
// the hub, then the engineering degree further out).
export const experiencesChrono = [...experiences].reverse()
export const educationChrono = [...education].reverse()

function buildStops(zoneId: ZoneId, count: number): ZoneStop[] {
  const zone = zones.find((z) => z.id === zoneId)
  if (!zone) return []
  return Array.from({ length: count }, (_, index) => ({
    id: `${zoneId}-${index}`,
    zoneId,
    index,
    position: polarPosition(zone.angle, FIRST_STOP_RADIUS + index * STOP_SPACING),
    angle: zone.angle,
    triggerRadius: STOP_TRIGGER_RADIUS,
    side: index % 2 === 0 ? 'left' : ('right' as const),
  }))
}

// The garage sits at the exact center of the roundabout as its island
// centerpiece; angle 0 points its front toward the car's spawn point
// on the +Z side of the ring.
const accueilStop: ZoneStop = {
  id: 'accueil-0',
  zoneId: 'accueil',
  index: 0,
  position: [0, 0, 0],
  angle: 0,
  triggerRadius: 6,
  side: 'center',
}

export const stopsByZone: Record<ZoneId, ZoneStop[]> = {
  accueil: [accueilStop],
  experiences: buildStops('experiences', experiencesChrono.length),
  projets: buildStops('projets', projects.length),
  competences: buildStops('competences', skillCategories.length),
  formations: buildStops('formations', educationChrono.length + certifications.length),
  contact: buildStops('contact', 1),
}

export const allStops: ZoneStop[] = Object.values(stopsByZone).flat()

// Longest stop radius per zone — used to size that street's road spoke.
export const streetLength: Record<ZoneId, number> = Object.fromEntries(
  Object.entries(stopsByZone).map(([zoneId, stops]) => {
    const last = stops[stops.length - 1]
    const radius = last ? Math.hypot(last.position[0], last.position[2]) : 0
    return [zoneId, radius]
  }),
) as Record<ZoneId, number>
