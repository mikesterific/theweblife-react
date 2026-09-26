import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { MOBILE_QUERY, mountEffect } from "./runner"
import { heroFxVariants } from "./variants"

const KineticBackdrop = ({ variant, playing, pausedBy, hostRef, portraitRef }) => {
  const canvasRef = useRef(null)
  const reduced = !playing
  const mobile = useMediaQuery(MOBILE_QUERY)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const entry = heroFxVariants.find((item) => item.id === variant)
    let cancelled = false
    let unmount = null
    setFallback(false)

    entry
      .load()
      .then(({ default: factory }) => {
        if (cancelled || !canvasRef.current || !hostRef.current) return
        unmount = mountEffect({
          canvas: canvasRef.current,
          host: hostRef.current,
          portrait: portraitRef.current,
          factory,
          mobile,
          reduced,
        })
        if (!unmount) setFallback(true)
        if (import.meta.env.DEV) {
          const { width, height } = canvasRef.current
          console.info(
            `[hero] ${variant} ${unmount ? "mounted" : "unavailable, using CSS fallback"} ` +
              `(${width}x${height}${mobile ? ", mobile throttle" : ""}), ` +
              `motion ${playing ? "playing" : `paused by ${pausedBy}`}`
          )
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.error("[hero] failed to load", variant, error)
        if (!cancelled) setFallback(true)
      })

    return () => {
      cancelled = true
      unmount?.()
    }
  }, [variant, mobile, reduced, playing, pausedBy, hostRef, portraitRef])

  return (
    <div
      className={`sc-hero-fx sc-hero-fx--${variant}${fallback ? " is-fallback" : ""}`}
      data-motion={playing ? "playing" : `paused-${pausedBy}`}
      aria-hidden="true"
    >
      {/* A canvas keeps its first context type, so each variant gets a fresh element. */}
      <canvas key={`${variant}-${mobile}-${reduced}`} ref={canvasRef} />
    </div>
  )
}

export default KineticBackdrop
