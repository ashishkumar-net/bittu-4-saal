import { useEffect, useRef } from 'react'
import { traceHeart } from '../lib/heart'

const COLORS = ['#f6cfae', '#e39a86', '#e6b878', '#f8efe2', '#d98f7a', '#f8d3cb']
const TYPES = ['heart', 'petal', 'spark', 'ribbon']

export default function Confetti({ fire }) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const partsRef = useRef([])
  const rafRef = useRef(0)
  const dimsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      dimsRef.current = { w, h }
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  useEffect(() => {
    if (!fire) return
    const ctx = ctxRef.current
    if (!ctx) return
    const { w, h } = dimsRef.current

    const make = (x, y, power) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8
      const speed = (6 + Math.random() * 9) * power
      return {
        x,
        y,
        vx: Math.cos(angle) * speed * (0.75 + Math.random() * 0.6),
        vy: Math.sin(angle) * speed,
        g: 0.15 + Math.random() * 0.12,
        size: 7 + Math.random() * 14,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.24,
        life: 1,
        decay: 0.0032 + Math.random() * 0.004,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.02 + Math.random() * 0.05,
      }
    }

    const origins = [
      { x: w * 0.5, y: h * 0.62, n: w < 640 ? 55 : 90, p: 1.15 },
      { x: w * 0.08, y: h * 0.82, n: w < 640 ? 26 : 45, p: 1.35 },
      { x: w * 0.92, y: h * 0.82, n: w < 640 ? 26 : 45, p: 1.35 },
    ]

    origins.forEach((o) => {
      for (let i = 0; i < o.n; i += 1) partsRef.current.push(make(o.x, o.y, o.p))
    })

    const drawPart = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life))
      ctx.fillStyle = p.color
      ctx.strokeStyle = p.color

      if (p.type === 'heart') {
        ctx.shadowColor = p.color
        ctx.shadowBlur = 12
        traceHeart(ctx, p.size)
        ctx.fill()
      } else if (p.type === 'petal') {
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * 0.52, p.size * 0.26, 0, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.type === 'spark') {
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(-p.size * 0.42, 0)
        ctx.lineTo(p.size * 0.42, 0)
        ctx.moveTo(0, -p.size * 0.42)
        ctx.lineTo(0, p.size * 0.42)
        ctx.stroke()
      } else {
        ctx.beginPath()
        const rw = p.size * 0.34
        const rh = p.size
        const r = rw * 0.7
        ctx.moveTo(-rw + r, -rh / 2)
        ctx.arcTo(rw, -rh / 2, rw, rh / 2, r)
        ctx.arcTo(rw, rh / 2, -rw, rh / 2, r)
        ctx.arcTo(-rw, rh / 2, -rw, -rh / 2, r)
        ctx.arcTo(-rw, -rh / 2, rw, -rh / 2, r)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }

    const tick = () => {
      const currentCtx = ctxRef.current
      if (!currentCtx) return
      const { w: cw, h: ch } = dimsRef.current
      currentCtx.clearRect(0, 0, cw, ch)

      const parts = partsRef.current
      for (let i = parts.length - 1; i >= 0; i -= 1) {
        const p = parts[i]
        p.vy += p.g
        p.vx *= 0.994
        p.sway += p.swaySpeed
        p.x += p.vx + Math.sin(p.sway) * 0.5
        p.y += p.vy
        p.rot += p.vr
        p.life -= p.decay

        if (p.life <= 0 || p.y > ch + 120) {
          parts.splice(i, 1)
          continue
        }
        drawPart(p)
      }

      if (parts.length) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        currentCtx.clearRect(0, 0, cw, ch)
        rafRef.current = 0
      }
    }

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [fire])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[96]"
    />
  )
}
