import { animate, motion, useMotionValue } from 'framer-motion'
import { touchInput } from '@/hooks/touchInput'

const BASE_SIZE = 112
const KNOB_SIZE = 52
const RADIUS = (BASE_SIZE - KNOB_SIZE) / 2

/**
 * On-screen joystick for touch devices. Drags a knob within a circular
 * base and writes a normalized vector into the shared `touchInput`
 * object, which useInput prioritizes over the keyboard whenever it's
 * non-zero — so the same car controller code drives both input modes.
 */
export function TouchJoystick() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleDrag = () => {
    const dx = x.get()
    const dy = y.get()
    const distance = Math.min(Math.hypot(dx, dy), RADIUS)
    const angle = Math.atan2(dy, dx)
    touchInput.x = (Math.cos(angle) * distance) / RADIUS
    touchInput.y = -(Math.sin(angle) * distance) / RADIUS // screen-down drag = backward
  }

  const handleDragEnd = () => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 22 })
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 22 })
    touchInput.x = 0
    touchInput.y = 0
  }

  return (
    <div
      className="fixed bottom-8 left-8 rounded-full border-2 border-white/40 bg-neutral-900/40 backdrop-blur"
      style={{ width: BASE_SIZE, height: BASE_SIZE, touchAction: 'none' }}
    >
      <motion.div
        drag
        dragConstraints={{ left: -RADIUS, right: RADIUS, top: -RADIUS, bottom: RADIUS }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{
          x,
          y,
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          left: '50%',
          top: '50%',
          marginLeft: -KNOB_SIZE / 2,
          marginTop: -KNOB_SIZE / 2,
        }}
        className="absolute rounded-full border-2 border-amber-600 bg-amber-400 shadow-[0_3px_0_rgba(0,0,0,0.35)]"
      />
    </div>
  )
}
