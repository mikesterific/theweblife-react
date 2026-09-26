import { useMemo, useRef } from "react"
import { track } from "../../utils/track"
import { useActiveSection } from "../../hooks/useActiveSection"
import { useHeroMotion } from "../../hooks/useHeroMotion"
import signalChain from "../../data/signalChain"
import ScrollStrip from "./ScrollStrip"
import DellViewer from "./DellViewer"
import KineticBackdrop from "./kinetic/KineticBackdrop"
import HeroMotionControl from "./kinetic/HeroMotionControl"
import tigerFull663 from "/imgs/tiger-full-663.jpg"

const SignalHome = () => {
  const ids = useMemo(() => signalChain.nav.map((item) => item.id), [])
  const active = useActiveSection(ids)
  const heroRef = useRef(null)
  const portraitRef = useRef(null)
  const motion = useHeroMotion()

  return (
    <div className="sc-page">
      <header className="sc-nav">
        <a className="sc-brand" href="#the-bet">
          <span className="sc-brand-name">{signalChain.name}</span>
          <span className="sc-kicker">{signalChain.theme}</span>
        </a>
        <nav aria-label="Page">
          <ul>
            {signalChain.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={[
                    item.id === "contact" ? "sc-nav-contact" : "",
                    active === item.id ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="sc-panel sc-hero" id={signalChain.hero.id} ref={heroRef}>
        <KineticBackdrop
          playing={motion.playing}
          pausedBy={motion.pausedBy}
          hostRef={heroRef}
          portraitRef={portraitRef}
        />
        <div className="sc-hero-copy">
          <p className="sc-status">{signalChain.hero.status}</p>
          <h1>{signalChain.hero.h1}</h1>
          <p className="sc-claim">{signalChain.hero.claim}</p>
          <div className="sc-cta">
            <a className="sc-btn sc-btn-primary" href="#contact">
              Get in touch
            </a>
            <a
              className="sc-btn sc-btn-secondary"
              href="/portfolio"
              onClick={() => track("cta_click", "hero")}
            >
              Work archive
            </a>
          </div>
        </div>
        <img
          ref={portraitRef}
          className="sc-portrait"
          src={tigerFull663}
          alt="Michael Garrett Jones hugging a tiger"
          width="663"
          height="800"
        />
        <HeroMotionControl
          playing={motion.playing}
          pausedBy={motion.pausedBy}
          previewing={motion.previewing}
          onToggle={motion.toggle}
        />
      </section>

      <section className="sc-panel" id={signalChain.aiSystems.id}>
        <p className="sc-kicker">{signalChain.aiSystems.kicker}</p>
        <h2>{signalChain.aiSystems.title}</h2>
        <p>{signalChain.aiSystems.lede}</p>
        <ul className="sc-points">
          {signalChain.aiSystems.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="sc-panel" id={signalChain.engineering.id}>
        <p className="sc-kicker">{signalChain.engineering.kicker}</p>
        <h2>{signalChain.engineering.title}</h2>

        <article className="sc-case" id={signalChain.dell.id}>
          <p className="sc-kicker">{signalChain.dell.kicker}</p>
          <h3>{signalChain.dell.title}</h3>
          <p className="sc-claim">{signalChain.dell.claim}</p>
          <p>{signalChain.dell.body}</p>
          <DellViewer demos={signalChain.dell.demos} hint={signalChain.dell.viewerHint} />
        </article>

        <article className="sc-case" id={signalChain.rentpath.id}>
          <p className="sc-kicker">{signalChain.rentpath.kicker}</p>
          <h3>{signalChain.rentpath.title}</h3>
          <p className="sc-score">
            <span>{signalChain.rentpath.before}</span>
            <span className="sc-score-arrow" aria-hidden="true">→</span>
            <span>{signalChain.rentpath.after}</span>
          </p>
          <p className="sc-kicker">{signalChain.rentpath.scoreLabel}</p>
          <p>{signalChain.rentpath.body}</p>
        </article>

        <article className="sc-case" id={signalChain.scale.id}>
          <p className="sc-kicker">{signalChain.scale.kicker}</p>
          <h3>{signalChain.scale.title}</h3>
          <p>{signalChain.scale.body}</p>
          <img
            className="sc-case-shot"
            src={signalChain.scale.img}
            alt={signalChain.scale.alt}
            width="1024"
            height="640"
            loading="lazy"
          />
        </article>
      </section>

      <section className="sc-panel" id={signalChain.projects.id}>
        <p className="sc-kicker">{signalChain.projects.kicker}</p>
        <h2>{signalChain.projects.title}</h2>
        <div className="sc-project-grid">
          {signalChain.projects.items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.href ? (
                <a className="sc-btn sc-btn-secondary" href={item.href}>
                  {item.cta}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="sc-panel" id={signalChain.design.id}>
        <p className="sc-kicker">{signalChain.design.kicker}</p>
        <h2>{signalChain.design.title}</h2>
        <p>{signalChain.design.lede}</p>
        <ScrollStrip frames={signalChain.design.items} variant="quad" />
      </section>

      <section className="sc-panel sc-credentials" aria-labelledby="credentials-title">
        <h2 id="credentials-title" className="visually-hidden">
          Credentials
        </h2>
        <ul>
          {signalChain.credentials.map((item) => (
            <li key={item.title}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              ) : (
                <strong>{item.title}</strong>
              )}
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sc-panel sc-contact" id={signalChain.contact.id}>
        <h2>{signalChain.contact.title}</h2>
        <p>{signalChain.contact.body}</p>
        <div className="sc-cta">
          <a className="sc-btn sc-btn-primary" href={`mailto:${signalChain.contact.email}`}>
            {signalChain.contact.email}
          </a>
          <a
            className="sc-btn sc-btn-secondary"
            href="/portfolio"
            onClick={() => track("cta_click", "contact")}
          >
            Work archive
          </a>
        </div>
        <div className="sc-socials">
          {signalChain.contact.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              <span className="visually-hidden">{social.label}</span>
              <svg className={`logo ${social.icon}`} aria-hidden="true">
                <use href={`#${social.icon}`} />
              </svg>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SignalHome
