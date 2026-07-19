import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { carTelemetry } from '@/hooks/carTelemetry'
import { CAMERA_DAMP, CAMERA_OFFSET } from '@/utils/constants'

const UP = new THREE.Vector3(0, 1, 0)

/**
 * Third-person follow camera. Reads the shared carTelemetry object
 * (written each frame by whichever controller drives the car) rather
 * than an Object3D ref, so it doesn't care whether the car is currently
 * kinematic or a rapier rigid body. Uses THREE.MathUtils.damp
 * (frame-rate independent exponential smoothing) so the follow feels
 * the same at 30fps and 144fps.
 */
export function CameraRig() {
  const { camera } = useThree()
  const carPosition = useRef(new THREE.Vector3())
  const desiredPosition = useRef(new THREE.Vector3())
  const desiredLookAt = useRef(new THREE.Vector3())
  const offset = useRef(new THREE.Vector3(...CAMERA_OFFSET))

  useFrame((_, delta) => {
    carPosition.current.set(carTelemetry.x, carTelemetry.y, carTelemetry.z)

    const rotatedOffset = offset.current.clone().applyAxisAngle(UP, carTelemetry.heading)
    desiredPosition.current.copy(carPosition.current).add(rotatedOffset)
    desiredLookAt.current.copy(carPosition.current).add(UP)

    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredPosition.current.x, 1 / CAMERA_DAMP, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredPosition.current.y, 1 / CAMERA_DAMP, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredPosition.current.z, 1 / CAMERA_DAMP, delta)
    camera.lookAt(desiredLookAt.current)
  })

  return null
}
