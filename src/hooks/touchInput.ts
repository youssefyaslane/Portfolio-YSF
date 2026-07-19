/**
 * Plain mutable object (not React state) the on-screen joystick writes
 * into on drag, and useInput reads each frame. Shared this way because
 * the joystick is a DOM overlay outside the Canvas, while useInput is
 * consumed inside it — a ref can't cross that boundary between two
 * independent component instances.
 */
export const touchInput = { x: 0, y: 0 }
