import type { ZoneConfig } from './types'

// Accueil is the central hub; the other 5 zones each get their own
// street radiating outward from it, 72° apart. Stop positions along
// each street are computed in data/stops.ts from the item counts.
const STEP = (Math.PI * 2) / 5

export const zones: ZoneConfig[] = [
  { id: 'accueil', label: 'Accueil', order: 0, angle: 0 },
  { id: 'experiences', label: 'Expériences', order: 1, angle: STEP * 0 },
  { id: 'projets', label: 'Projets', order: 2, angle: STEP * 1 },
  { id: 'competences', label: 'Compétences', order: 3, angle: STEP * 2 },
  { id: 'formations', label: 'Formations', order: 4, angle: STEP * 3 },
  { id: 'contact', label: 'Contact', order: 5, angle: STEP * 4 },
]

export const getZone = (id: string) => zones.find((zone) => zone.id === id)
