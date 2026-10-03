import { useEffect } from "react"

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)"
const TRIGGER_SLACK_PX = 8
const RESET_SLACK_PX = 96
const PX_PER_MS = 0.72

export function prefersReducedMotion(matchMedia = globalThis.matchMedia) {
  return Boolean(matchMedia?.(REDUCE_QUERY)?.matches)
}

export function shouldStartXpsConceptAutoScroll({
  enabled,
  reducedMotion,
  scrollingDown,
  triggerTop,
  viewportTop,
  alreadyPlayed,
}) {
  if (!enabled || reducedMotion || !scrollingDown || alreadyPlayed) return false
  return triggerTop <= viewportTop + TRIGGER_SLACK_PX
}

export function xpsAutoScrollPlan({
  enabled,
  reducedMotion,
  scrollingDown,
  triggerTop,
  viewportTop,
  alreadyPlayed,
  frameMax,
  sectionEnd,
  windowY,
}) {
  if (
    !shouldStartXpsConceptAutoScroll({
      enabled,
      reducedMotion,
      scrollingDown,
      triggerTop,
      viewportTop,
      alreadyPlayed,
    })
  ) {
    return null
  }
  if (frameMax > 1) return { kind: "frame", to: frameMax }
  if (sectionEnd > windowY + 1) return { kind: "page", to: sectionEnd }
  return null
}

export function scrollMax(win) {
  if (!win) return 0
  const doc = win.document?.documentElement
  if (!doc) return 0
  return Math.max(0, doc.scrollHeight - win.innerHeight)
}

function animateScroll(win, to, { cancelled, onDone, followGrowth = false }) {
  const from = win.scrollY
  const initialDistance = (followGrowth ? scrollMax(win) : to) - from
  if (initialDistance <= 1) {
    onDone()
    return 0
  }
  let lastTime = performance.now()
  let stuckMs = 0
  let raf = 0
  const step = (now) => {
    if (cancelled()) return
    const max = followGrowth ? scrollMax(win) : to
    const next = Math.min(max, win.scrollY + PX_PER_MS * (now - lastTime))
    lastTime = now
    win.scrollTo(0, next)
    if (next >= max - 1) {
      stuckMs += 16
      if (stuckMs > 240) {
        onDone()
        return
      }
    } else {
      stuckMs = 0
    }
    raf = win.requestAnimationFrame(step)
  }
  raf = win.requestAnimationFrame(step)
  return raf
}

export function useXpsConceptAutoScroll({ triggerRef, sectionRef, frameRef, enabled }) {
  useEffect(() => {
    if (!enabled) return undefined

    let lastY = window.scrollY
    let played = false
    let interrupted = false
    let cancelled = false
    let pageRaf = 0
    let frameRaf = 0

    const isCancelled = () => cancelled || interrupted
    const reduce = () => prefersReducedMotion()

    const stopAnims = () => {
      if (pageRaf) window.cancelAnimationFrame(pageRaf)
      pageRaf = 0
      const frameWin = frameRef.current?.contentWindow
      if (frameRaf && frameWin) {
        try {
          frameWin.cancelAnimationFrame(frameRaf)
        } catch {
          // Frame may already be gone.
        }
      }
      frameRaf = 0
    }

    const markDone = () => {
      played = true
      pageRaf = 0
      frameRaf = 0
    }

    const interrupt = () => {
      if (pageRaf || frameRaf) {
        interrupted = true
        stopAnims()
      }
    }

    const bindFrameInput = () => {
      const frameWin = frameRef.current?.contentWindow
      if (!frameWin) return
      try {
        frameWin.addEventListener("wheel", interrupt, { passive: true })
        frameWin.addEventListener("touchstart", interrupt, { passive: true })
        frameWin.addEventListener("keydown", interrupt)
      } catch {
        // Cross-origin or not yet ready.
      }
    }

    const startIfNeeded = (scrollingDown) => {
      if (pageRaf || frameRaf || interrupted) return
      const trigger = triggerRef.current
      const section = sectionRef.current
      const frame = frameRef.current
      if (!trigger || !section) return

      const nav = document.querySelector(".sc-nav")
      const viewportTop = nav ? nav.getBoundingClientRect().bottom : 0
      let frameMax = 0
      try {
        frameMax = scrollMax(frame?.contentWindow)
      } catch {
        frameMax = 0
      }
      const sectionEnd = window.scrollY + section.getBoundingClientRect().bottom
      const plan = xpsAutoScrollPlan({
        enabled: true,
        reducedMotion: reduce(),
        scrollingDown,
        triggerTop: trigger.getBoundingClientRect().top,
        viewportTop,
        alreadyPlayed: played,
        frameMax,
        sectionEnd,
        windowY: window.scrollY,
      })
      if (!plan) return

      if (plan.kind === "frame") {
        try {
          bindFrameInput()
          frameRaf = animateScroll(frame.contentWindow, plan.to, {
            cancelled: isCancelled,
            onDone: markDone,
            followGrowth: true,
          })
        } catch {
          frameRaf = 0
        }
        return
      }

      pageRaf = animateScroll(window, plan.to, {
        cancelled: isCancelled,
        onDone: markDone,
      })
    }

    const onPageScroll = () => {
      const y = window.scrollY
      const down = y > lastY
      const trigger = triggerRef.current
      const nav = document.querySelector(".sc-nav")
      const viewportTop = nav ? nav.getBoundingClientRect().bottom : 0
      if (trigger && trigger.getBoundingClientRect().top > viewportTop + RESET_SLACK_PX) {
        played = false
        interrupted = false
        stopAnims()
      }
      if (down) startIfNeeded(true)
      lastY = y
    }

    const onFrameLoad = () => {
      bindFrameInput()
      startIfNeeded(true)
    }

    const frame = frameRef.current
    if (frame) {
      frame.addEventListener("load", onFrameLoad)
      if (frame.contentDocument?.readyState === "complete") bindFrameInput()
    }

    window.addEventListener("scroll", onPageScroll, { passive: true })

    return () => {
      cancelled = true
      stopAnims()
      window.removeEventListener("scroll", onPageScroll)
      frame?.removeEventListener("load", onFrameLoad)
      const frameWin = frame?.contentWindow
      try {
        frameWin?.removeEventListener("wheel", interrupt)
        frameWin?.removeEventListener("touchstart", interrupt)
        frameWin?.removeEventListener("keydown", interrupt)
      } catch {
        // Frame may already be gone.
      }
    }
  }, [enabled, triggerRef, sectionRef, frameRef])
}
