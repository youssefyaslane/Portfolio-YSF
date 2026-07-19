import { useProgress } from '@react-three/drei'

export function LoadingScreen() {
  const { progress, active } = useProgress()
  if (!active && progress === 100) return null
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-sky-400 text-neutral-900">
      <p className="text-2xl font-bold tracking-wide">Portfolio-YSF</p>
      <div className="h-3 w-64 overflow-hidden rounded-full border-2 border-neutral-900 bg-white">
        <div className="h-full bg-amber-400 transition-[width]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
