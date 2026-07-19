/**
 * Plain mutable object (not React state) the car controller writes its
 * position/heading/speed into every frame. Read by the Minimap (its own
 * rAF loop, outside the Canvas), and by CameraRig, useProximityTrigger,
 * and DustTrail (inside the Canvas) — all decoupled from whatever engine
 * (kinematic or rapier physics) actually drives the car.
 */
export const carTelemetry = { x: 0, y: 0, z: 0, heading: 0, speed: 0 }
