export const heroFxVariants = [
  { id: "storm", label: "Storm of Nodes", load: () => import("./particleStorm.js") },
  { id: "warp", label: "Neon warp", load: () => import("./neonWarp.js") },
  { id: "arcs", label: "Signal arcs", load: () => import("./signalArcs.js") },
]

export const heroFxIds = heroFxVariants.map((variant) => variant.id)

// Approved direction; warp and arcs remain only as review comparisons.
export const defaultHeroFx = "storm"
