import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { MOBILE_QUERY, REDUCED_QUERY, mountEffect } from "./runner"
import { heroFxVariants } from "./variants"

const KineticBackdrop = ({ variant, hostRef, portraitRef }) => {
  const canvasRef = useRef(null)
  const reduced = useMediaQuery(REDUCED_QUERY)
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
      })
      .catch(() => {
        if (!cancelled) setFallback(true)
      })

    return () => {
      cancelled = true
      unmount?.()
    }
  }, [variant, mobile, reduced, hostRef, portraitRef])

  return (
    <div
      className={`sc-hero-fx sc-hero-fx--${variant}${fallback ? " is-fallback" : ""}`}
      aria-hidden="true"
    >
      {/* A canvas keeps its first context type, so each variant gets a fresh element. */}
      <canvas key={`${variant}-${mobile}-${reduced}`} ref={canvasRef} />
    </div>
  )
}

export default KineticBackdrop
