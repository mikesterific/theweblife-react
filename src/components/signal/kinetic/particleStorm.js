const PALETTE = [
  "rgba(62, 224, 255, 0.85)",
  "rgba(47, 123, 255, 0.9)",
  "rgba(200, 244, 255, 0.7)",
]
const HOT = "rgba(225, 250, 255, 0.95)"
const BG = "#07090c"
const CELL = 7
const LINK = 62
const LINK_BOOST = 1.9
const LINK_CELL = Math.ceil(LINK * LINK_BOOST)
const LINK_BUCKETS = [
  "rgba(47, 123, 255, 0.10)",
  "rgba(62, 224, 255, 0.18)",
  "rgba(62, 224, 255, 0.32)",
  "rgba(200, 244, 255, 0.6)",
]

export default function particleStorm({ canvas, mobile }) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const count = mobile ? 320 : 2000
  const nodeEvery = mobile ? 5 : 6
  const maxLinks = mobile ? 2 : 3
  const maxBursts = mobile ? 6 : 18
  const wakeR = mobile ? 150 : 230
  const shockR = mobile ? 220 : 340
  const x = new Float32Array(count)
  const y = new Float32Array(count)
  const vx = new Float32Array(count)
  const vy = new Float32Array(count)
  const px = new Float32Array(count)
  const py = new Float32Array(count)
  const life = new Float32Array(count)
  const heat = new Float32Array(count)
  const linkNext = new Int32Array(count)
  const bursts = []
  const rings = []
  const linkPaths = LINK_BUCKETS.map(() => [])
  let w = 0
  let h = 0
  let cols = 0
  let grid = null
  let linkCols = 0
  let linkHead = null

  // Finite lifetimes stop the flow field from herding everything into a few streams.
  const seed = (i) => {
    x[i] = px[i] = Math.random() * w
    y[i] = py[i] = Math.random() * h
    vx[i] = vy[i] = 0
    heat[i] = 0
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

  const shock = (sx, sy) => {
    const r2 = shockR * shockR
    for (let i = 0; i < count; i++) {
      const dx = x[i] - sx
      const dy = y[i] - sy
      const d2 = dx * dx + dy * dy
      if (d2 >= r2) continue
      const d = Math.sqrt(d2) + 1
      const k = 1 - d / shockR
      vx[i] += (dx / d) * 15 * k + (-dy / d) * 4 * k
      vy[i] += (dy / d) * 15 * k + (dx / d) * 4 * k
      heat[i] = Math.max(heat[i], k)
      life[i] += 1
    }
    rings.push({ x: sx, y: sy, age: 0 })
  }

  const step = (t, dt, input) => {
    const f = dt * 60
    const damp = Math.pow(0.955, f)
    const cool = Math.pow(0.2, dt)
    const kick = Math.max(-1.5, Math.min(1.5, input.scrollVel * 0.02))
    const surge =
      0.75 +
      0.35 * Math.sin(t * 0.8) +
      1.6 * Math.pow(Math.max(0, Math.sin(t * 0.31)), 8) +
      Math.abs(kick)
    const cx = w * 0.62
    const cy = h * 0.5
    const radius = Math.min(w, h) * 0.5
    const wake2 = wakeR * wakeR
    const pointerSpeed = Math.hypot(input.pvx, input.pvy)
    // The wake widens and hits harder the faster the pointer moves.
    const wakeGain = 1 + Math.min(1.5, pointerSpeed * 0.06)

    for (const s of input.shocks) shock(s.x, s.y)
    grid.fill(-1)

    for (let i = 0; i < count; i++) {
      life[i] -= dt
      if (life[i] <= 0) seed(i)
      heat[i] *= cool
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
        if (d2 < wake2 * wakeGain) {
          d = Math.sqrt(d2) + 1
          const k = Math.max(0, 1 - d / (wakeR * Math.sqrt(wakeGain)))
          const k2 = k * k
          ax += ((-dy / d) * 1.5 + (dx / d) * 1.0) * k * wakeGain
          ay += ((dx / d) * 1.5 + (dy / d) * 1.0) * k * wakeGain
          ax += input.pvx * 0.2 * k2
          ay += input.pvy * 0.2 * k2
          heat[i] = Math.max(heat[i], k)
        }
      }
      ay -= kick * 0.25

      let nvx = (vx[i] + ax * f) * damp
      let nvy = (vy[i] + ay * f) * damp
      const speed2 = nvx * nvx + nvy * nvy
      if (speed2 > 256) {
        const s = 16 / Math.sqrt(speed2)
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

  // Every nth particle is a node; nearby nodes link up, and inside the
  // pointer wake they reach further and burn brighter.
  const drawLinks = (input) => {
    linkHead.fill(-1)
    for (let i = 0; i < count; i += nodeEvery) {
      const c = ((y[i] / LINK_CELL) | 0) * linkCols + ((x[i] / LINK_CELL) | 0)
      linkNext[i] = linkHead[c]
      linkHead[c] = i
    }
    const linkRows = linkHead.length / linkCols
    const wake2 = wakeR * wakeR
    for (const path of linkPaths) path.length = 0

    for (let i = 0; i < count; i += nodeEvery) {
      const xi = x[i]
      const yi = y[i]
      let near = false
      if (input.active) {
        const dx = xi - input.px
        const dy = yi - input.py
        near = dx * dx + dy * dy < wake2
      }
      const range = near ? LINK * LINK_BOOST : LINK
      const range2 = range * range
      const cx = (xi / LINK_CELL) | 0
      const cy = (yi / LINK_CELL) | 0
      let links = 0
      for (let oy = -1; oy <= 1 && links < maxLinks; oy++) {
        const ry = cy + oy
        if (ry < 0 || ry >= linkRows) continue
        for (let ox = -1; ox <= 1 && links < maxLinks; ox++) {
          const rx = cx + ox
          if (rx < 0 || rx >= linkCols) continue
          for (let j = linkHead[ry * linkCols + rx]; j >= 0 && links < maxLinks; j = linkNext[j]) {
            if (j <= i) continue
            const dx = x[j] - xi
            const dy = y[j] - yi
            const d2 = dx * dx + dy * dy
            if (d2 >= range2) continue
            const closeness = 1 - Math.sqrt(d2) / range
            const bucket = near ? 3 : closeness > 0.66 ? 2 : closeness > 0.33 ? 1 : 0
            linkPaths[bucket].push(xi, yi, x[j], y[j])
            links++
          }
        }
      }
    }

    ctx.lineWidth = 1
    linkPaths.forEach((path, b) => {
      if (!path.length) return
      ctx.strokeStyle = LINK_BUCKETS[b]
      ctx.beginPath()
      for (let k = 0; k < path.length; k += 4) {
        ctx.moveTo(path[k], path[k + 1])
        ctx.lineTo(path[k + 2], path[k + 3])
      }
      ctx.stroke()
    })

    ctx.fillStyle = "rgba(200, 244, 255, 0.85)"
    ctx.beginPath()
    for (let i = 0; i < count; i += nodeEvery) {
      const s = 1.6 + heat[i] * 2.4
      ctx.rect(x[i] - s / 2, y[i] - s / 2, s, s)
    }
    ctx.fill()
  }

  const draw = (dt, input) => {
    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = "rgba(7, 9, 12, 0.14)"
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = "lighter"
    ctx.lineCap = "round"
    ctx.lineWidth = mobile ? 1.6 : 1.3
    for (let b = 0; b < PALETTE.length; b++) {
      ctx.strokeStyle = PALETTE[b]
      ctx.beginPath()
      for (let i = b; i < count; i += PALETTE.length) {
        if (heat[i] > 0.25) continue
        ctx.moveTo(px[i], py[i])
        ctx.lineTo(x[i] + 0.01, y[i])
      }
      ctx.stroke()
    }
    ctx.strokeStyle = HOT
    ctx.lineWidth = mobile ? 2 : 1.8
    ctx.beginPath()
    for (let i = 0; i < count; i++) {
      if (heat[i] <= 0.25) continue
      ctx.moveTo(px[i], py[i])
      ctx.lineTo(x[i] + 0.01, y[i])
    }
    ctx.stroke()

    drawLinks(input)

    const f = dt * 60
    const drag = Math.pow(0.9, f)
    for (let k = bursts.length - 1; k >= 0; k--) {
      const b = bursts[k]
      b.age += dt
      const alive = 1 - b.age / 0.6
      if (alive <= 0) {
        bursts.splice(k, 1)
        continue
      }
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(62, 224, 255, ${0.6 * alive})`
      ctx.beginPath()
      ctx.arc(b.x, b.y, 3 + (1 - alive) * 28, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = `rgba(235, 250, 255, ${alive})`
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

    for (let k = rings.length - 1; k >= 0; k--) {
      const r = rings[k]
      r.age += dt
      const alive = 1 - r.age / 0.7
      if (alive <= 0) {
        rings.splice(k, 1)
        continue
      }
      ctx.lineWidth = 2
      ctx.strokeStyle = `rgba(62, 224, 255, ${0.7 * alive})`
      ctx.beginPath()
      ctx.arc(r.x, r.y, 8 + (1 - alive * alive) * shockR, 0, Math.PI * 2)
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
      linkCols = Math.ceil(w / LINK_CELL)
      linkHead = new Int32Array(linkCols * Math.ceil(h / LINK_CELL))
      for (let i = 0; i < count; i++) {
        if (first || x[i] >= w || y[i] >= h) seed(i)
      }
      clear()
    },
    frame(t, dt, input) {
      step(t, dt, input)
      draw(dt, input)
    },
    still(input) {
      clear()
      for (let k = 0; k < 90; k++) {
        step(4 + k / 60, 1 / 60, input)
        draw(1 / 60, input)
      }
    },
    destroy() {
      bursts.length = 0
      rings.length = 0
    },
  }
}
