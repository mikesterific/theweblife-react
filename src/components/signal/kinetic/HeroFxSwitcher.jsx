import { heroFxVariants } from "./variants"

const HeroFxSwitcher = ({ value, onChange, playing, systemReduced, onToggleMotion }) => (
  <div className="sc-fx-switch" role="group" aria-label="Header background sample">
    <span className="sc-kicker" aria-hidden="true">
      Header
    </span>
    {heroFxVariants.map((variant) => (
      <button
        key={variant.id}
        type="button"
        aria-pressed={value === variant.id}
        className={value === variant.id ? "is-active" : undefined}
        onClick={() => onChange(variant.id)}
      >
        {variant.label}
      </button>
    ))}
    <button
      type="button"
      className="sc-fx-motion"
      onClick={onToggleMotion}
      title={
        !playing && systemReduced
          ? "Paused because your system asks for reduced motion"
          : undefined
      }
    >
      {playing ? "Pause motion" : "Play motion"}
    </button>
  </div>
)

export default HeroFxSwitcher
