import { useCallback, useState } from "react"
import { useMediaQuery } from "./useMediaQuery"
import { REDUCED_QUERY } from "../components/signal/kinetic/runner"

const PAUSE_KEY = "heroMotion"
const PREVIEW_KEY = "heroMotionPreview"

function read(storage, key) {
  try {
    return window[storage].getItem(key)
  } catch {
    return null
  }
}

function write(storage, key, value) {
  try {
    if (value == null) window[storage].removeItem(key)
    else window[storage].setItem(key, value)
  } catch {
    // Storage can be unavailable in private modes; the choice still applies for this visit.
  }
}

// ?motion=on previews for this session; ?motion=off pauses and is remembered.
function initialState() {
  const param = new URLSearchParams(window.location.search).get("motion")
  if (param === "on") {
    write("localStorage", PAUSE_KEY, null)
    write("sessionStorage", PREVIEW_KEY, "1")
  } else if (param === "off") {
    write("localStorage", PAUSE_KEY, "off")
  }
  return {
    paused: read("localStorage", PAUSE_KEY) === "off",
    preview: read("sessionStorage", PREVIEW_KEY) === "1",
  }
}

// The OS reduced-motion setting (Windows: "Animation effects" off) keeps the
// still frame by default. "Preview motion" overrides it for this session only,
// so the accessible default comes back in a new session.
export function useHeroMotion() {
  const systemReduced = useMediaQuery(REDUCED_QUERY)
  const [state, setState] = useState(initialState)
  const pausedBy = state.paused ? "you" : systemReduced && !state.preview ? "system" : null
  const playing = pausedBy === null
  const previewing = playing && systemReduced

  const toggle = useCallback(() => {
    const next = playing
      ? { paused: true, preview: false }
      : { paused: false, preview: systemReduced }
    write("localStorage", PAUSE_KEY, next.paused ? "off" : null)
    write("sessionStorage", PREVIEW_KEY, next.preview ? "1" : null)
    setState(next)
  }, [playing, systemReduced])

  return { playing, pausedBy, previewing, toggle }
}
