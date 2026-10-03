import { useRef, useState } from "react";
import { track } from "../../utils/track";
import { useXpsConceptAutoScroll } from "../../hooks/xpsConceptAutoScroll";

const DellViewer = ({ demos, hint }) => {
  const [activeId, setActiveId] = useState(demos[0].id);
  const demo = demos.find((item) => item.id === activeId);
  const src = demo.desktop;
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const frameRef = useRef(null);

  useXpsConceptAutoScroll({
    triggerRef,
    sectionRef,
    frameRef,
    enabled: demo.id === "concept" && Boolean(src),
  });

  const select = (id) => {
    setActiveId(id);
    track("demo_view", id);
  };

  return (
    <div className="sc-viewer" ref={sectionRef}>
      <div className="sc-viewer-bar">
        <div className="sc-viewer-tabs" role="tablist" aria-label="Dell work">
          {demos.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`dell-tab-${item.id}`}
              ref={item.id === "concept" ? triggerRef : undefined}
              aria-selected={item.id === activeId}
              aria-controls="dell-viewer-panel"
              className={item.id === activeId ? "is-active" : undefined}
              onClick={() => select(item.id)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div
        className="sc-viewer-stage"
        id="dell-viewer-panel"
        role="tabpanel"
        aria-labelledby={`dell-tab-${demo.id}`}
      >
        {src ? (
          <iframe
            key={src}
            ref={frameRef}
            src={src}
            title={`${demo.title}, original Dell build`}
            loading="lazy"
          />
        ) : (
          <img src={demo.img} alt={demo.alt} width="1490" height="930" />
        )}
      </div>

      <div className="sc-viewer-foot">
        <p>{demo.caption}</p>
        {src ? (
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("demo_open", demo.id)}
          >
            Open full screen
          </a>
        ) : null}
      </div>
      {src ? <p className="sc-viewer-hint">{hint}</p> : null}
    </div>
  );
};

export default DellViewer;
