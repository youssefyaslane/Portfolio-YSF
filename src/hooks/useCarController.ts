import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useInput } from './useInput'
import { carTelemetry } from './carTelemetry'
import { useAppStore } from '@/store/useAppStore'
import {
  CAR_ACCELERATION,
  CAR_FRICTION,
  CAR_MAX_REVERSE_SPEED,
  CAR_MAX_SPEED,
  CAR_TURN_SPEED,
  SPAWN_HEADING,
  SPAWN_POSITION,
  WORLD_BOUNDARY,
} from '@/utils/constants'

export interface CarState {
  position: THREE.Vector3
  heading: number // radians, 0 = facing -Z
  speed: number
}

/**
 * Arcade-style kinematic car controller. Reads input each frame and
 * mutates a plain (non-React-state) car state object directly, then
 * applies it to the given Object3D ref. Keeping this out of React
 * state avoids a re-render on every one of the ~60 updates/sec. Also
 * writes into the shared carTelemetry object so CameraRig,
 * useProximityTrigger, DustTrail, and the Minimap can all read the
 * car's position/heading/speed without needing this ref themselves.
 */
export function useCarController(carRef: React.RefObject<THREE.Object3D | null>) {
  const { getInput } = useInput()
  const state = useRef<CarState>({
    position: new THREE.Vector3(...SPAWN_POSITION),
    heading: SPAWN_HEADING,
    speed: 0,
  })

  const resetSignal = useAppStore((s) => s.resetSignal)
  useEffect(() => {
    if (resetSignal === 0) return
    const s = state.current
    s.position.set(...SPAWN_POSITION)
    s.heading = SPAWN_HEADING
    s.speed = 0
    carRef.current?.position.copy(s.position)
    if (carRef.current) carRef.current.rotation.y = s.heading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal])

  useFrame((_, delta) => {
    const car = carRef.current
    if (!car) return

    const input = getInput()
    const s = state.current

    // Speed: accelerate/brake based on forward input, decay via friction otherwise.
    if (input.y !== 0) {
      s.speed += input.y * CAR_ACCELERATION * delta
    } else if (s.speed !== 0) {
      const decay = Math.sign(s.speed) * CAR_FRICTION * delta
      s.speed = Math.abs(decay) > Math.abs(s.speed) ? 0 : s.speed - decay
    }
    s.speed = THREE.MathUtils.clamp(s.speed, -CAR_MAX_REVERSE_SPEED, CAR_MAX_SPEED)

    // Turning: only responsive while moving, scaled by direction of travel
    // so reversing steers intuitively (like a real car backing up).
    if (input.x !== 0 && s.speed !== 0) {
      const turnDirection = s.speed > 0 ? 1 : -1
      s.heading -= input.x * CAR_TURN_SPEED * turnDirection * delta
    }

    // rotation.y = heading rotates the mesh's local forward (0,0,-1) to
    // world (-sin(heading), 0, -cos(heading)); position must move along
    // that same vector or the car visually drives opposite to its facing.
    s.position.x -= Math.sin(s.heading) * s.speed * delta
    s.position.z -= Math.cos(s.heading) * s.speed * delta
    s.position.x = THREE.MathUtils.clamp(s.position.x, -WORLD_BOUNDARY, WORLD_BOUNDARY)
    s.position.z = THREE.MathUtils.clamp(s.position.z, -WORLD_BOUNDARY, WORLD_BOUNDARY)

    car.position.copy(s.position)
    car.rotation.y = s.heading

    carTelemetry.x = s.position.x
    carTelemetry.y = s.position.y
    carTelemetry.z = s.position.z
    carTelemetry.heading = s.heading
    carTelemetry.speed = s.speed
  })

  return state
}
