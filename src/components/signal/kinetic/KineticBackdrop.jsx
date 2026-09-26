import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { MOBILE_QUERY, mountEffect } from "./runner"

const loadStorm = () => import("./particleStorm.js")

const KineticBackdrop = ({ playing, pausedBy, hostRef, portraitRef }) => {
  const canvasRef = useRef(null)
  const reduced = !playing
  const mobile = useMediaQuery(MOBILE_QUERY)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    let cancelled = false
    let unmount = null
    setFallback(false)

    loadStorm()
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
            `[hero] storm ${unmount ? "mounted" : "unavailable, using CSS fallback"} ` +
              `(${width}x${height}${mobile ? ", mobile throttle" : ""}), ` +
              `motion ${playing ? "playing" : `paused by ${pausedBy}`}`
          )
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.error("[hero] failed to load storm", error)
        if (!cancelled) setFallback(true)
      })

    return () => {
      cancelled = true
      unmount?.()
    }
  }, [mobile, reduced, playing, pausedBy, hostRef, portraitRef])

  return (
    <div
      className={`sc-hero-fx${fallback ? " is-fallback" : ""}`}
      data-motion={playing ? "playing" : `paused-${pausedBy}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default KineticBackdrop
