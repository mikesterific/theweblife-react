export const heroFxVariants = [
  { id: "storm", label: "Particle storm", load: () => import("./particleStorm.js") },
  { id: "warp", label: "Neon warp", load: () => import("./neonWarp.js") },
  { id: "arcs", label: "Signal arcs", load: () => import("./signalArcs.js") },
]

export const heroFxIds = heroFxVariants.map((variant) => variant.id)
