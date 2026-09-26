import { useCallback, useState } from "react"
import { heroFxIds } from "../components/signal/kinetic/variants"

// The ?hero= param makes a chosen sample shareable during review.
export function useHeroFx() {
  const [fx, setFx] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get("hero")
    return heroFxIds.includes(requested) ? requested : heroFxIds[0]
  })

  const select = useCallback((id) => {
    setFx(id)
    const url = new URL(window.location.href)
    url.searchParams.set("hero", id)
    window.history.replaceState(window.history.state, "", url)
  }, [])

  return [fx, select]
}
