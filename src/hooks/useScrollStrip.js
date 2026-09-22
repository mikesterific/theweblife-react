import { useCallback, useEffect, useState } from "react"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function useScrollStrip(trackRef) {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const slides = [...track.children]
    setCount(slides.length)
    const trackRect = track.getBoundingClientRect()
    let closest = 0
    let best = Infinity
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.getBoundingClientRect().left - trackRect.left)
      if (dist < best) {
        best = dist
        closest = i
      }
    })
    setIndex(closest)
  }, [trackRef])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    measure()
    track.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      track.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [measure, trackRef])

  const go = useCallback(
    (next) => {
      const track = trackRef.current
      const slide = track?.children[next]
      if (!track || !slide) return
      const left =
        slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft
      track.scrollTo({
        left,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      })
    },
    [trackRef]
  )

  return { index, count, go }
}
