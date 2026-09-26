export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"
export const MOBILE_QUERY = "(max-width: 768px), (pointer: coarse)"

// An effect factory receives { canvas, mobile, reduced } and returns null when
// the canvas context is unavailable, or an object with:
//   maxDpr?  resize(width, height, dpr, input)  frame(time, dt, input)
//   still(input)  destroy()
// Sizes are CSS pixels; the runner owns the backing-store size.
export function mountEffect({ canvas, host, portrait, factory, mobile, reduced }) {
  const effect = factory({ canvas, mobile, reduced })
  if (!effect) return null

  const box = canvas.parentElement
  const maxDpr = effect.maxDpr ?? (mobile ? 1 : 1.5)
  const input = {
    x: 0.5,
    y: 0.5,
    px: 0,
    py: 0,
    active: false,
    // Smoothed pointer velocity in CSS px per 60 Hz frame.
    pvx: 0,
    pvy: 0,
    shocks: [],
    scrollVel: 0,
    anchor: null,
  }
  let moveX = 0
  let moveY = 0

  let raf = 0
  let running = false
  let visible = true
  let last = 0
  let time = 0
  let lastScrollY = window.scrollY

  const resize = () => {
    const rect = box.getBoundingClientRect()
    const width = Math.max(1, rect.width)
    const height = Math.max(1, rect.height)
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    if (portrait) {
      const p = portrait.getBoundingClientRect()
      input.anchor = {
        x: p.left - rect.left + p.width / 2,
        y: p.top - rect.top + p.height / 2,
        r: Math.max(p.width, p.height) / 2,
      }
    }
    effect.resize(width, height, dpr, input)
    if (reduced) effect.still(input)
  }

  let frames = 0

  const tick = (now) => {
    raf = requestAnimationFrame(tick)
    if (import.meta.env.DEV && ++frames === 60) {
      console.info(`[hero] animating: 60 frames in ${(time + 0.001).toFixed(2)}s of effect time`)
    }
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000))
    last = now
    time += dt
    input.scrollVel *= Math.pow(0.04, dt)
    const clamp = (v) => Math.max(-40, Math.min(40, v))
    input.pvx = input.pvx * 0.65 + clamp(moveX / (dt * 60)) * 0.35
    input.pvy = input.pvy * 0.65 + clamp(moveY / (dt * 60)) * 0.35
    moveX = 0
    moveY = 0
    effect.frame(time, dt, input)
    input.shocks.length = 0
  }

  const start = () => {
    if (running || reduced) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }

  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  const sync = () => (visible && !document.hidden ? start() : stop())

  const onPointerMove = (event) => {
    const rect = box.getBoundingClientRect()
    const nx = event.clientX - rect.left
    const ny = event.clientY - rect.top
    if (input.active) {
      moveX += nx - input.px
      moveY += ny - input.py
    }
    input.px = nx
    input.py = ny
    input.x = nx / rect.width
    input.y = ny / rect.height
    input.active = true
  }
  const onPointerLeave = () => {
    input.active = false
    input.pvx = 0
    input.pvy = 0
  }
  const onPointerDown = (event) => {
    const rect = box.getBoundingClientRect()
    if (input.shocks.length < 4) {
      input.shocks.push({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    }
  }
  const onScroll = () => {
    const y = window.scrollY
    input.scrollVel = Math.max(-400, Math.min(400, input.scrollVel + (y - lastScrollY)))
    lastScrollY = y
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(box)
  if (portrait) resizeObserver.observe(portrait)

  const intersection = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting
    sync()
  })
  intersection.observe(box)

  if (!reduced) {
    host.addEventListener("pointermove", onPointerMove, { passive: true })
    host.addEventListener("pointerleave", onPointerLeave)
    host.addEventListener("pointerdown", onPointerDown, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
  }
  document.addEventListener("visibilitychange", sync)

  resize()
  sync()

  return () => {
    stop()
    resizeObserver.disconnect()
    intersection.disconnect()
    host.removeEventListener("pointermove", onPointerMove)
    host.removeEventListener("pointerleave", onPointerLeave)
    host.removeEventListener("pointerdown", onPointerDown)
    window.removeEventListener("scroll", onScroll)
    document.removeEventListener("visibilitychange", sync)
    effect.destroy()
  }
}
