import { useEffect, useRef } from 'react'
import { traceHeart } from '../lib/heart'

const COLORS = ['#f8e3c4', '#e6b878', '#e39a86', '#fbf1e2', '#d98f7a']

export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0

    const makeParticle = (seeded = false) => {
      const heart = Math.random() < 0.16
      return {
        x: Math.random() * width,
        y: seeded ? Math.random() * height : height + 20,
        r: heart ? 5 + Math.random() * 9 : 0.6 + Math.random() * 1.9,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -(0.08 + Math.random() * 0.26),
        alpha: 0.12 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.004 + Math.random() * 0.012,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        heart,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.003,
      }
    }

    let particles = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = reduceMotion ? 16 : width < 640 ? 30 : 62
      if (!particles.length) {
        particles = Array.from({ length: target }, () => makeParticle(true))
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.phase += p.twinkle
        const flicker = 0.55 + Math.sin(p.phase) * 0.45
        const alpha = p.alpha * flicker

        if (p.heart) {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.globalAlpha = alpha * 0.7
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 18
          traceHeart(ctx, p.r * 2.2)
          ctx.fill()
          ctx.restore()
        } else {
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }
    }

    const step = () => {
      for (const p of particles) {
        p.x += p.vx + Math.sin(p.phase * 0.6) * 0.12
        p.y += p.vy
        p.rot += p.vr
        if (p.y < -40) {
          p.y = height + 30
          p.x = Math.random() * width
        }
        if (p.x < -40) p.x = width + 20
        if (p.x > width + 40) p.x = -20
      }
    }

    const loop = () => {
      step()
      draw()
      raf = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (document.visibilityState === 'visible' && !reduceMotion) loop()
    }

    resize()
    if (reduceMotion) {
      draw()
    } else {
      loop()
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* midnight base */}
      <div className="absolute inset-0 bg-[#1a0b10]" />

      {/* golden-hour gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(122,52,44,0.55),transparent_60%),radial-gradient(80%_70%_at_10%_20%,rgba(160,74,58,0.3),transparent_65%),radial-gradient(70%_70%_at_88%_75%,rgba(96,52,38,0.4),transparent_65%)]" />

      {/* golden sunset horizon */}
      <div className="absolute inset-x-0 bottom-0 h-[55vh] bg-[radial-gradient(70%_100%_at_50%_120%,rgba(232,158,96,0.3),rgba(227,154,134,0.1)_45%,transparent_75%)]" />

      {/* warm vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_110%_at_50%_50%,transparent_35%,rgba(12,4,7,0.78)_100%)]" />

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* floating rose petals */}
      <div className="absolute inset-0 overflow-hidden">
        {[7, 18, 29, 41, 53, 66, 78, 90].map((left, i) => (
          <span
            key={left}
            className="absolute top-[-10%] block h-4 w-3 animate-petal-drift rounded-[60%_40%_55%_45%] bg-rose/25"
            style={{
              left: `${left}%`,
              animationDelay: `${i * 2.7}s`,
              animationDuration: `${19 + i * 2.2}s`,
              filter: 'blur(0.3px)',
            }}
          />
        ))}
      </div>

      {/* fine grain */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}
