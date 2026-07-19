import { useEffect, useRef } from 'react'
import { touchInput } from './touchInput'

export interface InputVector {
  x: number // -1 (left) .. 1 (right)
  y: number // -1 (back) .. 1 (forward)
}

const FORWARD_KEYS = new Set(['KeyW', 'ArrowUp'])
const BACK_KEYS = new Set(['KeyS', 'ArrowDown'])
const LEFT_KEYS = new Set(['KeyA', 'ArrowLeft'])
const RIGHT_KEYS = new Set(['KeyD', 'ArrowRight'])

/**
 * Tracks keyboard state in a ref (no React re-renders) and exposes a
 * normalized input vector read imperatively inside useFrame. The touch
 * joystick (a DOM overlay outside the Canvas) writes into the shared
 * `touchInput` object, which takes priority over the keyboard whenever
 * it's non-zero.
 */
export function useInput() {
  const keysPressed = useRef(new Set<string>())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current.add(event.code)
    }
    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.code)
    }
    const handleBlur = () => {
      keysPressed.current.clear()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  const getInput = (): InputVector => {
    if (touchInput.x !== 0 || touchInput.y !== 0) {
      return touchInput
    }

    const keys = keysPressed.current
    let x = 0
    let y = 0
    if (isAnyPressed(keys, FORWARD_KEYS)) y += 1
    if (isAnyPressed(keys, BACK_KEYS)) y -= 1
    if (isAnyPressed(keys, LEFT_KEYS)) x -= 1
    if (isAnyPressed(keys, RIGHT_KEYS)) x += 1
    return { x, y }
  }

  return { getInput }
}

function isAnyPressed(keys: Set<string>, candidates: Set<string>) {
  for (const key of candidates) {
    if (keys.has(key)) return true
  }
  return false
}
