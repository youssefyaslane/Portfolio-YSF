import { useEffect, useState } from 'react'

/** Detects touch capability once on mount, to conditionally show the on-screen joystick. */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}
