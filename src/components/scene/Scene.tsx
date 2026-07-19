import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Car } from '@/components/car/Car'
import { DustTrail } from '@/components/car/DustTrail'
import { CameraRig } from '@/components/scene/CameraRig'
import { Ground } from '@/components/scene/Ground'
import { Lights } from '@/components/scene/Lights'
import { Birds } from '@/components/world/Birds'
import { Clouds } from '@/components/world/Clouds'
import { NatureScatter } from '@/components/world/NatureScatter'
import { Road } from '@/components/world/Road'
import { StopMarker } from '@/components/world/StopMarker'
import { StreetDecor } from '@/components/world/StreetDecor'
import { ZoneText3D } from '@/components/world/ZoneText3D'
import { allStops } from '@/data/stops'
import type { ZoneId } from '@/data/types'
import { zones } from '@/data/zones'
import { useProximityTrigger } from '@/hooks/useProximityTrigger'
import { useAppStore } from '@/store/useAppStore'

const streets = zones.filter((zone) => zone.id !== 'accueil')

const ZONE_TEXT_COLOR: Record<ZoneId, string> = {
  accueil: '#ffd166',
  experiences: '#ef476f',
  projets: '#118ab2',
  competences: '#06d6a0',
  formations: '#f77f00',
  contact: '#9b5de5',
}
const ZONE_TEXT_RADIUS = 14 // between the hub pad and the first stop

export function Scene() {
  const carRef = useRef<THREE.Group>(null)
  const activeStopId = useProximityTrigger(allStops)
  const setActiveStop = useAppStore((state) => state.setActiveStop)
  const darkMode = useAppStore((state) => state.darkMode)

  useEffect(() => {
    setActiveStop(activeStopId)
  }, [activeStopId, setActiveStop])

  return (
    <>
      {/* Fades far-away streets into the sky so standing near the hub
          doesn't reveal every street/label at once. */}
      <fog attach="fog" args={darkMode ? ['#0f1b3d', 25, 75] : ['#8fd0f0', 30, 85]} />
      <Lights />
      <Ground />
      <Road />
      <NatureScatter />
      <StreetDecor />
      <Clouds />
      <Birds />
      <Car ref={carRef} />
      <DustTrail />
      <CameraRig />
      {streets.map((zone) => (
        <ZoneText3D key={zone.id} zone={zone} radius={ZONE_TEXT_RADIUS} color={ZONE_TEXT_COLOR[zone.id]} />
      ))}
      {allStops.map((stop) => (
        <StopMarker key={stop.id} stop={stop} active={stop.id === activeStopId} />
      ))}
    </>
  )
}
