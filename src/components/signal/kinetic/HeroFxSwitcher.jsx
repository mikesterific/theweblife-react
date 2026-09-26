import { heroFxVariants } from "./variants"

const HeroFxSwitcher = ({ value, onChange }) => (
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
  </div>
)

export default HeroFxSwitcher
