import { useCallback, useState } from "react"
import { useMediaQuery } from "./useMediaQuery"
import { REDUCED_QUERY } from "../components/signal/kinetic/runner"

const STORAGE_KEY = "heroMotion"

function store(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage can be unavailable in private modes; the choice still applies for this visit.
  }
}

// ?motion=on|off wins and is remembered, so a reviewer can force a state.
function initialChoice() {
  const param = new URLSearchParams(window.location.search).get("motion")
  if (param === "on" || param === "off") {
    store(param)
    return param
  }
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// An explicit visitor choice wins over the OS reduced-motion setting, which
// Windows turns on silently when "Animation effects" is off.
export function useHeroMotion() {
  const systemReduced = useMediaQuery(REDUCED_QUERY)
  const [choice, setChoice] = useState(initialChoice)
  const playing = choice ? choice === "on" : !systemReduced
  const pausedBy = playing ? null : choice === "off" ? "you" : "system"

  const toggle = useCallback(() => {
    const next = playing ? "off" : "on"
    setChoice(next)
    store(next)
  }, [playing])

  return { playing, pausedBy, systemReduced, toggle }
}
