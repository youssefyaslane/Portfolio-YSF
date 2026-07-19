import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'

const MUSIC_SRC = '/audio/ambient.mp3'

/**
 * Background loop, silent until unmuted (starting muted both matches the
 * store default and keeps us on the right side of browser autoplay
 * policies, since play() only fires from the user's own click). Missing
 * file is a no-op — see public/audio/README.md.
 */
export function AmbientMusic() {
  const muted = useAppStore((s) => s.muted)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (muted) {
      audio.pause()
    } else {
      audio.volume = 0.35
      audio.play().catch(() => {
        /* blocked by browser autoplay policy or file missing — stay silent */
      })
    }
  }, [muted])

  return <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" />
}
