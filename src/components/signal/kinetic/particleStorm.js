const PALETTE = [
  "rgba(62, 224, 255, 0.85)",
  "rgba(47, 123, 255, 0.9)",
  "rgba(200, 244, 255, 0.7)",
]
const BG = "#07090c"
const CELL = 7
const POINTER_RADIUS = 180

export default function particleStorm({ canvas, mobile }) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const count = mobile ? 320 : 2000
  const maxBursts = mobile ? 6 : 18
  const x = new Float32Array(count)
  const y = new Float32Array(count)
  const vx = new Float32Array(count)
  const vy = new Float32Array(count)
  const px = new Float32Array(count)
  const py = new Float32Array(count)
  const life = new Float32Array(count)
  const bursts = []
  let w = 0
  let h = 0
  let cols = 0
  let grid = null

  // Finite lifetimes stop the flow field from herding everything into a few streams.
  const seed = (i) => {
    x[i] = px[i] = Math.random() * w
    y[i] = py[i] = Math.random() * h
    vx[i] = vy[i] = 0
    life[i] = 1.5 + Math.random() * 4
  }

  const clear = () => {
    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, w, h)
  }

  const burst = (bx, by, energy) => {
    const n = mobile ? 6 : 10
    const sparks = []
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2 + Math.random() * 0.6
      const s = 1.5 + Math.random() * 2.5 * energy
      sparks.push({ x: bx, y: by, vx: Math.cos(a) * s, vy: Math.sin(a) * s })
    }
    bursts.push({ x: bx, y: by, age: 0, sparks })
  }

  const step = (t, dt, input) => {
    const f = dt * 60
    const damp = Math.pow(0.955, f)
    const kick = Math.max(-1.5, Math.min(1.5, input.scrollVel * 0.02))
    const surge =
      0.75 +
      0.35 * Math.sin(t * 0.8) +
      1.6 * Math.pow(Math.max(0, Math.sin(t * 0.31)), 8) +
      Math.abs(kick)
    const cx = w * 0.62
    const cy = h * 0.5
    const radius = Math.min(w, h) * 0.5
    grid.fill(-1)

    for (let i = 0; i < count; i++) {
      life[i] -= dt
      if (life[i] <= 0) seed(i)
      const xi = x[i]
      const yi = y[i]
      const angle =
        (Math.sin(xi * 0.0045 + t * 0.7) +
          Math.cos(yi * 0.006 - t * 0.5) +
          Math.sin((xi - yi) * 0.0021 + t * 0.35)) *
        Math.PI
      let ax = Math.cos(angle) * 0.09 * surge + (Math.random() - 0.5) * 0.08
      let ay = Math.sin(angle) * 0.09 * surge + (Math.random() - 0.5) * 0.08

      let dx = xi - cx
      let dy = yi - cy
      let d = Math.sqrt(dx * dx + dy * dy) + 1
      const swirl = 0.07 * surge * Math.min(1, radius / d)
      ax += (-dy / d) * swirl
      ay += (dx / d) * swirl

      if (input.active) {
        dx = xi - input.px
        dy = yi - input.py
        const d2 = dx * dx + dy * dy
        if (d2 < POINTER_RADIUS * POINTER_RADIUS) {
          d = Math.sqrt(d2) + 1
          const k = 1 - d / POINTER_RADIUS
          ax += ((-dy / d) * 1.1 + (dx / d) * 0.5) * k
          ay += ((dx / d) * 1.1 + (dy / d) * 0.5) * k
        }
      }
      ay -= kick * 0.25

      let nvx = (vx[i] + ax * f) * damp
      let nvy = (vy[i] + ay * f) * damp
      const speed2 = nvx * nvx + nvy * nvy
      if (speed2 > 49) {
        const s = 7 / Math.sqrt(speed2)
        nvx *= s
        nvy *= s
      }

      px[i] = xi
      py[i] = yi
      let nx = xi + nvx * f
      let ny = yi + nvy * f
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) {
        nx = (nx + w) % w
        ny = (ny + h) % h
        px[i] = nx
        py[i] = ny
      }
      x[i] = nx
      y[i] = ny

      const c = ((ny / CELL) | 0) * cols + ((nx / CELL) | 0)
      const o = grid[c]
      if (o < 0) {
        grid[c] = i
      } else if (bursts.length < maxBursts) {
        const rvx = nvx - vx[o]
        const rvy = nvy - vy[o]
        const rel = rvx * rvx + rvy * rvy
        if (rel > 16 && Math.random() < 0.3) burst(nx, ny, Math.min(2, rel / 16))
      }
      vx[i] = nvx
      vy[i] = nvy
    }
  }

  const draw = (dt) => {
    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = "rgba(7, 9, 12, 0.12)"
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = "lighter"
    ctx.lineCap = "round"
    ctx.lineWidth = mobile ? 1.6 : 1.3
    for (let b = 0; b < PALETTE.length; b++) {
      ctx.strokeStyle = PALETTE[b]
      ctx.beginPath()
      for (let i = b; i < count; i += PALETTE.length) {
        ctx.moveTo(px[i], py[i])
        ctx.lineTo(x[i] + 0.01, y[i])
      }
      ctx.stroke()
    }

    const f = dt * 60
    const drag = Math.pow(0.9, f)
    for (let k = bursts.length - 1; k >= 0; k--) {
      const b = bursts[k]
      b.age += dt
      const life = 1 - b.age / 0.6
      if (life <= 0) {
        bursts.splice(k, 1)
        continue
      }
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(62, 224, 255, ${0.6 * life})`
      ctx.beginPath()
      ctx.arc(b.x, b.y, 3 + (1 - life) * 28, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = `rgba(235, 250, 255, ${life})`
      ctx.beginPath()
      for (const s of b.sparks) {
        ctx.moveTo(s.x, s.y)
        s.x += s.vx * f
        s.y += s.vy * f
        s.vx *= drag
        s.vy *= drag
        ctx.lineTo(s.x, s.y)
      }
      ctx.stroke()
    }
  }

  return {
    resize(width, height, dpr) {
      const first = !grid
      w = width
      h = height
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL)
      grid = new Int32Array(cols * Math.ceil(h / CELL))
      for (let i = 0; i < count; i++) {
        if (first || x[i] >= w || y[i] >= h) seed(i)
      }
      clear()
    },
    frame(t, dt, input) {
      step(t, dt, input)
      draw(dt)
    },
    still(input) {
      clear()
      for (let k = 0; k < 48; k++) {
        step(4 + k / 60, 1 / 60, input)
        draw(1 / 60)
      }
    },
    destroy() {},
  }
}
