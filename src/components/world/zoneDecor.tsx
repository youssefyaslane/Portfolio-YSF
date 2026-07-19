import type { ReactElement } from 'react'
import { useGLTF } from '@react-three/drei'
import type { ZoneId } from '@/data/types'
import { GLTFModel } from './GLTFModel'

interface DecorProps {
  index: number
}

// Real Kenney models per zone (swapped in from primitives in Phase 3).
// The "active" glow is handled entirely by the sign board in
// StopMarker.tsx, so decor components don't need an active prop.

function Garage(_props: DecorProps) {
  return <GLTFModel path="/models/buildings/city/low-detail-building-wide-a.glb" position={[0, 0, -2]} scale={3} />
}

function OfficeTower(_props: DecorProps) {
  return <GLTFModel path="/models/buildings/city/building-skyscraper-b.glb" position={[0, 0, -2]} scale={2.2} />
}

function Laboratory(_props: DecorProps) {
  return (
    <group>
      <GLTFModel path="/models/buildings/city/building-e.glb" position={[0, 0, -2]} scale={2.4} />
      {/* giant screen, kept as a primitive accent on top of the building */}
      <mesh position={[0, 2.6, -0.7]}>
        <boxGeometry args={[2.6, 1.6, 0.1]} />
        <meshStandardMaterial color="#5ee6ff" emissive="#0b3d91" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

const TREE_SPECIES = [
  '/models/nature/tree_detailed.glb',
  '/models/nature/tree_oak.glb',
  '/models/nature/tree_pineTallA_detailed.glb',
  '/models/nature/tree_palmDetailedTall.glb',
  '/models/nature/tree_fat.glb',
  '/models/nature/tree_plateau.glb',
]

function SkillTree({ index }: DecorProps) {
  const path = TREE_SPECIES[index % TREE_SPECIES.length] ?? TREE_SPECIES[0]!
  return <GLTFModel path={path} position={[0, 0, -1]} scale={4} />
}

function SchoolBuilding(_props: DecorProps) {
  return <GLTFModel path="/models/buildings/city/low-detail-building-a.glb" position={[0, 0, -2]} scale={3} />
}

function House(_props: DecorProps) {
  return (
    <group position={[0, 0, -1.5]} scale={2.5}>
      <GLTFModel path="/models/buildings/hut/building-platform.glb" />
      <GLTFModel path="/models/buildings/hut/building-structure.glb" position={[0, 0.2, 0]} />
      <GLTFModel path="/models/buildings/hut/building-roof.glb" position={[0, 1, 0]} />
      {/* mailbox, kept as a primitive accent */}
      <mesh position={[0.65, 0.28, 0.15]}>
        <cylinderGeometry args={[0.012, 0.012, 0.36, 6]} />
        <meshStandardMaterial color="#495057" />
      </mesh>
      <mesh position={[0.65, 0.46, 0.15]}>
        <boxGeometry args={[0.12, 0.08, 0.14]} />
        <meshStandardMaterial color="#e63946" />
      </mesh>
    </group>
  )
}

export const zoneDecor: Record<ZoneId, (props: DecorProps) => ReactElement> = {
  accueil: Garage,
  experiences: OfficeTower,
  projets: Laboratory,
  competences: SkillTree,
  formations: SchoolBuilding,
  contact: House,
}

useGLTF.preload('/models/buildings/city/low-detail-building-wide-a.glb')
useGLTF.preload('/models/buildings/city/building-skyscraper-b.glb')
useGLTF.preload('/models/buildings/city/building-e.glb')
useGLTF.preload('/models/buildings/city/low-detail-building-a.glb')
useGLTF.preload('/models/buildings/hut/building-platform.glb')
useGLTF.preload('/models/buildings/hut/building-structure.glb')
useGLTF.preload('/models/buildings/hut/building-roof.glb')
TREE_SPECIES.forEach((path) => useGLTF.preload(path))
