import { useCallback, useState } from "react"
import { useMediaQuery } from "./useMediaQuery"
import { REDUCED_QUERY } from "../components/signal/kinetic/runner"

const STORAGE_KEY = "heroMotion"

function readChoice() {
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
  const [choice, setChoice] = useState(readChoice)
  const playing = choice ? choice === "on" : !systemReduced

  const toggle = useCallback(() => {
    const next = playing ? "off" : "on"
    setChoice(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable in private modes; the choice still applies for this visit.
    }
  }, [playing])

  return { playing, systemReduced, toggle }
}
