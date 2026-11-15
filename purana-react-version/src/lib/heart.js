// Traces a classic heart, centred on (0,0), roughly `size` pixels wide.
export function traceHeart(ctx, size) {
  const s = size / 32
  ctx.beginPath()
  for (let t = 0; t <= Math.PI * 2 + 0.05; t += 0.12) {
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    if (t === 0) ctx.moveTo(x * s, y * s)
    else ctx.lineTo(x * s, y * s)
  }
  ctx.closePath()
}
