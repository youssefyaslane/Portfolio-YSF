import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface InfoCardProps {
  open: boolean
  title: string
  children: React.ReactNode
}

/**
 * Fixed-position overlay card animated with GSAP. Stays mounted at all
 * times (display toggled via GSAP autoAlpha) so the enter/exit timeline
 * can animate out before unmounting, instead of snapping away instantly.
 */
export function InfoCard({ open, title, children }: InfoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  // Freeze the last non-empty content while the card fades out, so the
  // exit animation doesn't reveal a blank card mid-transition.
  const lastContent = useRef({ title, children })
  if (open) {
    lastContent.current = { title, children }
  }
  const display = open ? { title, children } : lastContent.current

  useGSAP(() => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : 24,
      scale: open ? 1 : 0.9,
      duration: 0.5,
      ease: open ? 'back.out(2.2)' : 'power2.in',
    })
  }, [open])

  return (
    <div
      ref={cardRef}
      className="pointer-events-none fixed bottom-8 left-1/2 w-[min(90vw,420px)] -translate-x-1/2 rounded-3xl border-4 border-amber-300 bg-neutral-900/90 p-6 text-neutral-100 opacity-0 shadow-[0_8px_0_rgba(0,0,0,0.35)] backdrop-blur"
      style={{ visibility: 'hidden' }}
    >
      <h2 className="mb-2 text-2xl font-bold text-white">{display.title}</h2>
      <div className="text-sm text-neutral-300">{display.children}</div>
    </div>
  )
}
