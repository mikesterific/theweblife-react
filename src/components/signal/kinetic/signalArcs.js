const BG = "#07090c"

function bolt(ax, ay, bx, by, levels, spread) {
  let pts = [ax, ay, bx, by]
  let disp = Math.hypot(bx - ax, by - ay) * spread
  for (let l = 0; l < levels; l++) {
    const next = [pts[0], pts[1]]
    for (let i = 0; i < pts.length - 2; i += 2) {
      const x1 = pts[i]
      const y1 = pts[i + 1]
      const x2 = pts[i + 2]
      const y2 = pts[i + 3]
      const dx = x2 - x1
      const dy = y2 - y1
      const len = Math.hypot(dx, dy) || 1
      const off = (Math.random() - 0.5) * disp
      next.push((x1 + x2) / 2 + (-dy / len) * off, (y1 + y2) / 2 + (dx / len) * off, x2, y2)
    }
    pts = next
    disp *= 0.52
  }
  return pts
}

export default function signalArcs({ canvas, mobile }) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const nodeCount = mobile ? 9 : 20
  const ringCount = mobile ? 3 : 6
  const baseArcs = mobile ? 3 : 7
  const depth = mobile ? 5 : 7
  let w = 0
  let h = 0
  let anchor = { x: 0, y: 0, r: 80 }
  let nodes = []
  let edges = []
  let arcs = []
  let pulses = []

  const pick = (list) => list[(Math.random() * list.length) | 0]

  const layout = (input) => {
    anchor = input.anchor || { x: w * 0.8, y: h * 0.5, r: Math.min(w, h) * 0.2 }
    nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const ox = Math.random() < 0.7 ? w * (0.35 + Math.random() * 0.65) : Math.random() * w
      const oy = Math.random() * h
      nodes.push({ x: ox, y: oy, ox, oy, phase: Math.random() * Math.PI * 2, flash: 0 })
    }
    for (let i = 0; i < ringCount; i++) {
      const a = (i / ringCount) * Math.PI * 2 + Math.random() * 0.5
      const ox = anchor.x + Math.cos(a) * anchor.r * 1.25
      const oy = anchor.y + Math.sin(a) * anchor.r * 1.1
      nodes.push({ x: ox, y: oy, ox, oy, phase: Math.random() * Math.PI * 2, flash: 0 })
    }
    edges = []
    const seen = new Set()
    nodes.forEach((node, i) => {
      nodes
        .map((other, j) => ({ j, d: Math.hypot(other.ox - node.ox, other.oy - node.oy) }))
        .filter((entry) => entry.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`
          if (!seen.has(key)) {
            seen.add(key)
            edges.push([node, nodes[j]])
          }
        })
    })
    arcs = []
    pulses = []
  }

  const spawn = (input) => {
    const spread = anchor.r * 0.6
    const from =
      Math.random() < 0.6
        ? {
            x: anchor.x + (Math.random() - 0.5) * spread,
            y: anchor.y + (Math.random() - 0.5) * spread,
          }
        : pick(nodes)
    let to = null
    let target = null
    if (input.active && Math.random() < 0.4) {
      to = { x: input.px, y: input.py }
    } else {
      for (let tries = 0; tries < 6 && !to; tries++) {
        const node = pick(nodes)
        if (Math.hypot(node.x - from.x, node.y - from.y) > 90) {
          to = node
          target = node
        }
      }
      if (!to) {
        target = pick(nodes)
        to = target
      }
    }
    const ax = from.x
    const ay = from.y
    const bx = to.x
    const by = to.y
    const pts = bolt(ax, ay, bx, by, depth, 0.32)
    const heading = Math.atan2(by - ay, bx - ax)
    const branches = []
    const branchCount = mobile ? 1 : 1 + ((Math.random() * 3) | 0)
    for (let k = 0; k < branchCount; k++) {
      const idx = 2 * (1 + ((Math.random() * (pts.length / 2 - 2)) | 0))
      const a = heading + (Math.random() - 0.5) * 1.8
      const len = 30 + Math.random() * 90
      const sx = pts[idx]
      const sy = pts[idx + 1]
      branches.push({
        at: idx / pts.length,
        pts: bolt(sx, sy, sx + Math.cos(a) * len, sy + Math.sin(a) * len, depth - 2, 0.4),
      })
    }
    return {
      ax,
      ay,
      bx,
      by,
      target,
      pts,
      branches,
      age: 0,
      grow: 0.1 + Math.random() * 0.12,
      hold: 0.25 + Math.random() * 0.5,
      fade: 0.45,
      struck: false,
    }
  }

  const strokeBolt = (pts, reveal, alpha, scale) => {
    const n = Math.max(4, Math.floor((pts.length / 2) * reveal) * 2)
    ctx.beginPath()
    ctx.moveTo(pts[0], pts[1])
    for (let i = 2; i < n; i += 2) ctx.lineTo(pts[i], pts[i + 1])
    ctx.strokeStyle = `rgba(47, 123, 255, ${0.2 * alpha})`
    ctx.lineWidth = 7 * scale
    ctx.stroke()
    ctx.strokeStyle = `rgba(62, 224, 255, ${0.45 * alpha})`
    ctx.lineWidth = 2.6 * scale
    ctx.stroke()
    ctx.strokeStyle = `rgba(235, 252, 255, ${0.95 * alpha})`
    ctx.lineWidth = 1 * scale
    ctx.stroke()
  }

  const drawArc = (arc, reveal, alpha) => {
    strokeBolt(arc.pts, reveal, alpha, 1)
    for (const branch of arc.branches) {
      if (reveal > branch.at) {
        strokeBolt(branch.pts, (reveal - branch.at) / (1 - branch.at), alpha * 0.7, 0.6)
      }
    }
  }

  const drawNetwork = (t, dt, animate) => {
    const glow = ctx.createRadialGradient(anchor.x, anchor.y, 0, anchor.x, anchor.y, anchor.r * 2.2)
    glow.addColorStop(0, "rgba(62, 224, 255, 0.10)")
    glow.addColorStop(1, "rgba(62, 224, 255, 0)")
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)

    ctx.lineWidth = 1
    ctx.strokeStyle = "rgba(62, 224, 255, 0.07)"
    ctx.beginPath()
    for (const [a, b] of edges) {
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
    }
    ctx.stroke()

    if (animate) {
      if (pulses.length < (mobile ? 4 : 10) && Math.random() < dt * 6) {
        const [a, b] = pick(edges)
        pulses.push(Math.random() < 0.5 ? { a, b, t: 0 } : { a: b, b: a, t: 0 })
      }
      ctx.fillStyle = "rgba(160, 238, 255, 0.9)"
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k]
        pulse.t += dt * 0.9
        if (pulse.t >= 1) {
          pulse.b.flash = Math.max(pulse.b.flash, 0.5)
          pulses.splice(k, 1)
          continue
        }
        const x = pulse.a.x + (pulse.b.x - pulse.a.x) * pulse.t
        const y = pulse.a.y + (pulse.b.y - pulse.a.y) * pulse.t
        ctx.beginPath()
        ctx.arc(x, y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (const node of nodes) {
      ctx.fillStyle = `rgba(62, 224, 255, ${0.25 + node.flash * 0.75})`
      ctx.beginPath()
      ctx.arc(node.x, node.y, 1.6 + node.flash * 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const clear = () => {
    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, w, h)
  }

  return {
    resize(width, height, dpr, input) {
      w = width
      h = height
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      layout(input)
      clear()
    },
    frame(t, dt, input) {
      for (const node of nodes) {
        node.x = node.ox + Math.sin(t * 0.6 + node.phase) * 6
        node.y = node.oy + Math.cos(t * 0.5 + node.phase) * 6
        node.flash = Math.max(0, node.flash - dt * 2.5)
      }
      const want = baseArcs + Math.min(6, Math.abs(input.scrollVel) * 0.05) + (input.active ? 2 : 0)
      if (arcs.length < want && Math.random() < dt * 9) arcs.push(spawn(input))

      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = "rgba(7, 9, 12, 0.32)"
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = "lighter"
      drawNetwork(t, dt, true)

      for (let k = arcs.length - 1; k >= 0; k--) {
        const arc = arcs[k]
        arc.age += dt
        const reveal = Math.min(1, arc.age / arc.grow)
        let alpha
        if (arc.age < arc.grow + arc.hold) {
          alpha = 0.75 + Math.random() * 0.25
          if (reveal >= 1) {
            if (!arc.struck) {
              arc.struck = true
              if (arc.target) arc.target.flash = 1
            }
            if (Math.random() < 0.12) arc.pts = bolt(arc.ax, arc.ay, arc.bx, arc.by, depth, 0.32)
          }
        } else {
          alpha = 1 - (arc.age - arc.grow - arc.hold) / arc.fade
        }
        if (alpha <= 0) {
          arcs.splice(k, 1)
          continue
        }
        drawArc(arc, reveal, alpha)
      }
    },
    still(input) {
      clear()
      ctx.globalCompositeOperation = "lighter"
      drawNetwork(0, 0, false)
      for (let k = 0; k < baseArcs + 1; k++) drawArc(spawn(input), 1, 0.9)
    },
    destroy() {},
  }
}
