import { useCallback, useState } from "react"

const PAUSE_KEY = "heroMotion"

function readPaused() {
  try {
    return window.localStorage.getItem(PAUSE_KEY) === "off"
  } catch {
    return false
  }
}

function writePaused(paused) {
  try {
    if (paused) window.localStorage.setItem(PAUSE_KEY, "off")
    else window.localStorage.removeItem(PAUSE_KEY)
  } catch {
    // Storage can be unavailable in private modes; the choice still applies for this visit.
  }
}

// ?motion=off pauses and is remembered; ?motion=on clears a remembered pause.
function initialPaused() {
  const param = new URLSearchParams(window.location.search).get("motion")
  if (param === "off" || param === "on") writePaused(param === "off")
  return readPaused()
}

// Motion plays by default, including when the OS reports prefers-reduced-motion
// (owner decision); only an explicit Pause stops it, and that choice is remembered.
export function useHeroMotion() {
  const [paused, setPaused] = useState(initialPaused)

  const toggle = useCallback(() => {
    setPaused((current) => {
      writePaused(!current)
      return !current
    })
  }, [])

  return { playing: !paused, toggle }
}
