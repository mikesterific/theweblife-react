import { useRef } from "react"
import { useScrollStrip } from "../../hooks/useScrollStrip"

const ScrollStrip = ({ frames, variant = "pair" }) => {
  const trackRef = useRef(null)
  const { index, count, go } = useScrollStrip(trackRef)

  return (
    <div className={`sc-strip sc-strip--${variant}`}>
      <div className="sc-strip-bar">
        <button type="button" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0}>
          Previous
        </button>
        <button
          type="button"
          onClick={() => go(Math.min(count - 1, index + 1))}
          disabled={count === 0 || index >= count - 1}
        >
          Next
        </button>
      </div>
      <div className="sc-strip-track" ref={trackRef}>
        {frames.map((frame) => (
          <figure className="sc-frame" key={frame.title}>
            <img src={frame.img} alt={frame.alt || frame.title} width="800" height="500" />
            <figcaption>
              <span>{frame.title}</span>
              {frame.href ? <a href={frame.href}>{frame.cta || "View"}</a> : null}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="sc-dots" role="tablist" aria-label="Frames">
        {frames.map((frame, i) => (
          <button
            key={frame.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={frame.title}
            className={i === index ? "is-active" : undefined}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default ScrollStrip
