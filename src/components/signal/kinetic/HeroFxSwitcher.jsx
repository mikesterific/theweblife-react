import { heroFxVariants } from "./variants"

const pausedNote = {
  system: "Motion is off because your system asks for reduced motion.",
  you: "Motion is paused.",
}

const HeroFxSwitcher = ({ value, onChange, playing, pausedBy, onToggleMotion }) => (
  <div className="sc-fx-bar">
    {pausedBy ? (
      <p className="sc-fx-note" role="status">
        {pausedNote[pausedBy]}
      </p>
    ) : null}
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
        className={`sc-fx-motion${playing ? "" : " is-paused"}`}
        onClick={onToggleMotion}
      >
        {playing ? "Pause motion" : "Play motion"}
      </button>
    </div>
  </div>
)

export default HeroFxSwitcher
