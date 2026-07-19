import * as THREE from 'three'

const UP = new THREE.Vector3(0, 1, 0)

/**
 * World position at `radius` units from the origin, in the direction
 * `angleRad` points (using the same rotation.y convention as the car
 * controller: angle 0 = local -Z, positive angle rotates toward -X).
 * Used to derive zone positions and align road spokes with them so
 * both stay perfectly in sync without duplicating trig.
 */
export function polarPosition(angleRad: number, radius: number): [number, number, number] {
  const v = new THREE.Vector3(0, 0, -radius).applyAxisAngle(UP, angleRad)
  return [v.x, 0, v.z]
}
