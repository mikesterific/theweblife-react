import { track } from '../utils/track'

const questLinks = [
  {
    title: 'Space Adventure Game',
    eyebrow: 'Interactive',
    description:
      'Pilot through an interactive Phaser portfolio built around missions, discoveries, and project lore.',
    href: '/portfolio-quest/',
    cta: 'Launch Game',
    accent: 'cyan',
    icon: 'rocket',
  },
  {
    title: '3D Space Museum',
    eyebrow: 'Immersive',
    description:
      'Explore a first-person gallery where featured work is staged as exhibits across a quiet orbital museum.',
    href: '/portfolio-quest/',
    cta: 'Enter Museum',
    accent: 'violet',
    icon: 'museum',
  },
]

const highlights = ['Vue 3', 'Three.js', 'Phaser.js']

const QuestIcon = ({ type }) => {
  if (type === 'rocket') {
    return (
      <svg viewBox="0 0 96 96" role="img" focusable="false">
        <circle className="pq-icon-target" cx="70" cy="28" r="11" />
        <path className="pq-icon-line" d="M70 12v8m0 16v8M54 28h8m16 0h8" />
        <path className="pq-icon-orbit" d="M12 68c18 10 43 8 70-8" />
        <path className="pq-icon-orbit pq-icon-orbit-secondary" d="M17 79c17 5 38 1 58-12" />
        <path className="pq-icon-fill" d="M49 20 78 76 49 61 20 76l29-56Z" />
        <path className="pq-icon-panel" d="M49 34 63 66 49 58 35 66l14-32Z" />
        <path className="pq-icon-line" d="M49 20v38" />
        <path className="pq-icon-flame" d="M38 73 49 88l11-15" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 96 96" role="img" focusable="false">
      <path className="pq-icon-orbit" d="M14 60c15 16 51 19 68-2" />
      <path className="pq-icon-orbit pq-icon-orbit-secondary" d="M20 76c18 9 47 4 61-15" />
      <path className="pq-icon-fill" d="M48 15 76 31v36H20V31l28-16Z" />
      <path className="pq-icon-panel" d="M28 67V38h40v29" />
      <path className="pq-icon-line" d="M36 67V45m12 22V45m12 22V45" />
      <path className="pq-icon-line" d="M24 31h48M18 75h60" />
      <circle className="pq-icon-window" cx="48" cy="29" r="5" />
    </svg>
  )
}

const PortfolioQuestSection = () => {
  return (
    <section className="portfolio-quest-wrap" id="portfolio-quest" aria-labelledby="portfolio-quest-title">
      <div className="pq-ambient pq-ambient-one" aria-hidden="true"></div>
      <div className="pq-ambient pq-ambient-two" aria-hidden="true"></div>

      <div className="pq-shell">
        <div className="pq-hero">
          <p className="pq-kicker">Portfolio Quest</p>
          <h2 id="portfolio-quest-title" className="pq-title">
            Explore my work in motion.
          </h2>
          <p className="pq-intro">
            Choose a playable quest, wander a 3D gallery, or jump straight into a polished
            portfolio of projects, skills, and career highlights.
          </p>

          <div className="pq-actions" aria-label="Portfolio Quest navigation">
            <a className="pq-primary-action" href="/portfolio-quest">
              Start Quest
            </a>
          </div>
          <p className="pq-portfolio-link-wrap">
            Prefer the classic view?{' '}
            <a
              className="pq-portfolio-link"
              href="/portfolio"
              onClick={() => track('cta_click', 'pq-section')}
            >
              Browse my portfolio
            </a>
          </p>
        </div>

        <div className="pq-card-grid" aria-label="Choose an experience">
          {questLinks.map((link) => (
            <button
              key={link.title}
              className={`pq-card pq-card-${link.accent}`}
              type="button"
              onClick={() => {
                window.location.href = link.href
              }}
            >
              <div className="pq-card-header">
                <span className="pq-card-orb" aria-hidden="true"></span>
                <span className="pq-card-eyebrow">{link.eyebrow}</span>
              </div>

              <div className="pq-card-icon" aria-hidden="true">
                <QuestIcon type={link.icon} />
              </div>

              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <span className="pq-card-cta">
                {link.cta}
                <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>

        <footer className="pq-footer">
          <span>Built with</span>
          <ul aria-label="Core technologies">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  )
}

export default PortfolioQuestSection
