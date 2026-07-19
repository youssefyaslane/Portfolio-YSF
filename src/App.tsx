import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { Scene } from '@/components/scene/Scene'
import { LoadingScreen } from '@/components/scene/LoadingScreen'
import { AmbientMusic } from '@/components/ui/AmbientMusic'
import { HUD } from '@/components/ui/HUD'
import { InfoCard } from '@/components/ui/InfoCard'
import { Minimap } from '@/components/ui/Minimap'
import { TouchJoystick } from '@/components/ui/TouchJoystick'
import { getStopContent } from '@/components/ui/stopContent'
import { allStops } from '@/data/stops'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { useAppStore } from '@/store/useAppStore'

function App() {
  const activeStopId = useAppStore((state) => state.activeStopId)
  const darkMode = useAppStore((state) => state.darkMode)
  const activeStop = activeStopId ? allStops.find((stop) => stop.id === activeStopId) : undefined
  const content = activeStop ? getStopContent(activeStop) : null
  const isTouchDevice = useIsTouchDevice()
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900">
      <Canvas shadows dpr={dpr} camera={{ fov: 42, near: 0.1, far: 500 }}>
        {/* Drops resolution under sustained frame-rate pressure (e.g. lower-end
            mobile GPUs) and restores it once the scene is comfortably fast again. */}
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} bounds={() => [50, 58]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <LoadingScreen />
      <AmbientMusic />

      <div className="pointer-events-none fixed top-4 left-1/2 max-w-[85vw] -translate-x-1/2 truncate rounded-full bg-neutral-900/85 px-4 py-2 text-xs font-semibold tracking-wide whitespace-nowrap text-white shadow-[0_4px_0_rgba(0,0,0,0.35)] backdrop-blur sm:top-6 sm:max-w-none sm:px-6 sm:py-2.5 sm:text-base">
        {isTouchDevice ? 'Portfolio-YSF — joystick pour conduire' : 'Portfolio-YSF — WASD / flèches pour conduire'}
      </div>

      <HUD />
      <Minimap />
      {isTouchDevice && <TouchJoystick />}

      <InfoCard open={content !== null} title={content?.title ?? ''}>
        {content?.body}
      </InfoCard>
    </div>
  )
}

export default App
