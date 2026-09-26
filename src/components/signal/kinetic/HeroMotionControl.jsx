const motionCopy = {
  system: { note: "Motion paused (system setting)", button: "Preview motion" },
  you: { note: "Motion paused", button: "Play motion" },
  previewing: { note: "Previewing motion despite your reduced-motion setting", button: "Pause motion" },
  playing: { note: null, button: "Pause motion" },
}

const HeroMotionControl = ({ playing, pausedBy, previewing, onToggle }) => {
  const copy = motionCopy[pausedBy || (previewing ? "previewing" : "playing")]

  return (
    <div className="sc-fx-bar">
      {copy.note ? (
        <p className="sc-fx-note" role="status">
          {copy.note}
        </p>
      ) : null}
      <button
        type="button"
        className={`sc-fx-motion${playing ? "" : " is-paused"}`}
        onClick={onToggle}
      >
        {copy.button}
      </button>
    </div>
  )
}

export default HeroMotionControl
