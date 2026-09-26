import { heroFxVariants } from "./variants"

const motionCopy = {
  system: { note: "Motion paused (system setting)", button: "Preview motion" },
  you: { note: "Motion paused", button: "Play motion" },
  previewing: { note: "Previewing motion despite your reduced-motion setting", button: "Pause motion" },
  playing: { note: null, button: "Pause motion" },
}

const HeroFxSwitcher = ({ value, onChange, playing, pausedBy, previewing, onToggleMotion }) => {
  const copy = motionCopy[pausedBy || (previewing ? "previewing" : "playing")]

  return (
    <div className="sc-fx-bar">
      {copy.note ? (
        <p className="sc-fx-note" role="status">
          {copy.note}
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
          {copy.button}
        </button>
      </div>
    </div>
  )
}

export default HeroFxSwitcher
