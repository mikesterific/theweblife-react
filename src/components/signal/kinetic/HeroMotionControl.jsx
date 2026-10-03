const HeroMotionControl = ({ playing, onToggle }) => (
  <div className="sc-fx-bar">
    {playing ? null : (
      <p className="sc-fx-note" role="status">
        Motion paused
      </p>
    )}
    <button
      type="button"
      className={`sc-fx-motion${playing ? "" : " is-paused"}`}
      onClick={onToggle}
    >
      {playing ? "Pause motion" : "Play motion"}
    </button>
  </div>
)

export default HeroMotionControl
