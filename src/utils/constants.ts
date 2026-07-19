export const CAR_ACCELERATION = 17 // units/s^2
export const CAR_MAX_SPEED = 13 // units/s
export const CAR_MAX_REVERSE_SPEED = 5.5 // units/s
export const CAR_FRICTION = 8 // units/s^2, applied when no input
export const CAR_TURN_SPEED = 2.4 // rad/s at full speed

export const CAMERA_OFFSET: [number, number, number] = [0, 8, 13]
export const CAMERA_DAMP = 0.12 // smaller = snappier follow

export const ZONE_EXIT_MULTIPLIER = 1.15 // hysteresis to avoid trigger flicker

export const HUB_PAD_RADIUS = 10
export const FIRST_STOP_RADIUS = 20 // distance from hub center to the first stop on a street
export const STOP_SPACING = 11 // distance between consecutive stops on the same street
export const STOP_TRIGGER_RADIUS = 5

export const WORLD_BOUNDARY = 150 // keeps the car within the Ground plane (320x320)

// Roundabout ring position facing the center island (the garage sits at
// the hub's exact center) — shared by the initial spawn and the reset button.
export const SPAWN_POSITION: [number, number, number] = [0, 0, 7.5]
export const SPAWN_HEADING = 0
