import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-black/20 bg-white/90 text-neutral-800 shadow-[0_4px_0_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:translate-y-0.5 active:shadow-[0_1px_0_rgba(0,0,0,0.25)] dark:border-white/20 dark:bg-neutral-800/90 dark:text-neutral-100"
    >
      {children}
    </button>
  )
}

function SunMoonIcon({ dark }: { dark: boolean }) {
  if (dark) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.7 15.3a8.5 8.5 0 0 1-11-11 9 9 0 1 0 11 11Z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <circle cx="12" cy="12" r="4.2" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
      </g>
    </svg>
  )
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      {muted ? (
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" />
        </g>
      ) : (
        <path
          d="M16.2 8.5a5 5 0 0 1 0 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11A8 8 0 1 0 18.6 16" />
      <path d="M20 5v6h-6" />
    </svg>
  )
}

function FullscreenIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 4v3a2 2 0 0 1-2 2H4M15 4v3a2 2 0 0 0 2 2h3M9 20v-3a2 2 0 0 0-2-2H4M15 20v-3a2 2 0 0 1 2-2h3" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9V6a2 2 0 0 1 2-2h3M20 9V6a2 2 0 0 0-2-2h-3M4 15v3a2 2 0 0 0 2 2h3M20 15v3a2 2 0 0 1-2 2h-3" />
    </svg>
  )
}

export function HUD() {
  const darkMode = useAppStore((s) => s.darkMode)
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode)
  const muted = useAppStore((s) => s.muted)
  const toggleMuted = useAppStore((s) => s.toggleMuted)
  const requestReset = useAppStore((s) => s.requestReset)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleChange = () => setIsFullscreen(document.fullscreenElement !== null)
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <div className="pointer-events-none fixed top-6 right-6 flex flex-col gap-3">
      <IconButton label={darkMode ? 'Mode clair' : 'Mode sombre'} onClick={toggleDarkMode}>
        <SunMoonIcon dark={darkMode} />
      </IconButton>
      <IconButton label={muted ? 'Activer le son' : 'Couper le son'} onClick={toggleMuted}>
        <SpeakerIcon muted={muted} />
      </IconButton>
      <IconButton label="Réinitialiser la position" onClick={requestReset}>
        <ResetIcon />
      </IconButton>
      <IconButton label={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'} onClick={toggleFullscreen}>
        <FullscreenIcon active={isFullscreen} />
      </IconButton>
    </div>
  )
}
