import { useEffect, useRef } from 'react'
import { carTelemetry } from '@/hooks/carTelemetry'
import { zones } from '@/data/zones'
import { WORLD_BOUNDARY } from '@/utils/constants'

const SIZE = 150
const CENTER = SIZE / 2
const WORLD_RADIUS = WORLD_BOUNDARY * 0.55 // most content sits well inside the full boundary
const MAP_RADIUS = CENTER - 8

const streets = zones.filter((zone) => zone.id !== 'accueil')

/**
 * Small top-down radar: fixed street directions (from data/zones, drawn
 * once as a static ring) plus the car's live position/heading, read each
 * animation frame straight from the carTelemetry object written by
 * useCarController — no React state crossing the Canvas/DOM boundary.
 */
export function Minimap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame: number

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // background disc
      ctx.beginPath()
      ctx.arc(CENTER, CENTER, MAP_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(20, 30, 20, 0.72)'
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = '#ffd166'
      ctx.stroke()

      // street directions
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)'
      ctx.lineWidth = 3
      for (const zone of streets) {
        const dx = -Math.sin(zone.angle)
        const dz = -Math.cos(zone.angle)
        ctx.beginPath()
        ctx.moveTo(CENTER, CENTER)
        ctx.lineTo(CENTER + dx * MAP_RADIUS, CENTER + dz * MAP_RADIUS)
        ctx.stroke()
      }

      // car marker (triangle pointing along heading)
      const scale = MAP_RADIUS / WORLD_RADIUS
      const carX = CENTER + carTelemetry.x * scale
      const carZ = CENTER + carTelemetry.z * scale
      const clampedDist = Math.min(Math.hypot(carX - CENTER, carZ - CENTER), MAP_RADIUS - 4)
      const dirAngle = Math.atan2(carZ - CENTER, carX - CENTER)
      const dotX = CENTER + Math.cos(dirAngle) * clampedDist
      const dotY = CENTER + Math.sin(dirAngle) * clampedDist

      ctx.save()
      ctx.translate(dotX, dotY)
      ctx.rotate(-carTelemetry.heading)
      ctx.beginPath()
      ctx.moveTo(0, -7)
      ctx.lineTo(5, 6)
      ctx.lineTo(-5, 6)
      ctx.closePath()
      ctx.fillStyle = '#ef476f'
      ctx.fill()
      ctx.restore()

      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      className="pointer-events-none fixed right-5 bottom-5 rounded-full drop-shadow-[0_4px_0_rgba(0,0,0,0.3)]"
    />
  )
}
