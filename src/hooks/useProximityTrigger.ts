import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { carTelemetry } from './carTelemetry'
import { ZONE_EXIT_MULTIPLIER } from '@/utils/constants'

interface Triggerable {
  id: string
  position: [number, number, number]
  triggerRadius: number
}

/**
 * Watches the distance between the car (read from the shared
 * carTelemetry object, not an Object3D ref) and a set of stops each
 * frame, reporting the id of the stop the car is currently "inside",
 * with hysteresis (exit radius > enter radius) so driving back and
 * forth across the trigger boundary doesn't flicker the info card.
 */
export function useProximityTrigger<T extends Triggerable>(stops: T[]) {
  const [activeStopId, setActiveStopId] = useState<string | null>(null)
  const activeStopRef = useRef<string | null>(null)
  const carPosition = useRef(new THREE.Vector3())
  const stopPosition = useRef(new THREE.Vector3())

  useFrame(() => {
    carPosition.current.set(carTelemetry.x, carTelemetry.y, carTelemetry.z)

    const currentActive = activeStopRef.current
    if (currentActive) {
      const stop = stops.find((s) => s.id === currentActive)
      if (stop) {
        stopPosition.current.set(...stop.position)
        const distance = carPosition.current.distanceTo(stopPosition.current)
        if (distance > stop.triggerRadius * ZONE_EXIT_MULTIPLIER) {
          activeStopRef.current = null
          setActiveStopId(null)
        }
        return
      }
    }

    for (const stop of stops) {
      stopPosition.current.set(...stop.position)
      const distance = carPosition.current.distanceTo(stopPosition.current)
      if (distance <= stop.triggerRadius) {
        activeStopRef.current = stop.id
        setActiveStopId(stop.id)
        return
      }
    }
  })

  return activeStopId
}
