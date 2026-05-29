const skillGroups = [
  {
    title: 'Applied AI Product Engineering',
    items: [
      'LLM-powered applications',
      'Conversational interfaces',
      'AI-assisted workflows',
      'Product-focused prototyping',
    ],
  },
  {
    title: 'RAG & Knowledge Systems',
    items: [
      'Retrieval-Augmented Generation',
      'Enterprise knowledge access',
      'Internal documentation search',
      'Memory-bank patterns',
    ],
  },
  {
    title: 'AI Developer Tooling',
    items: [
      'Cursor',
      'Claude Code',
      'OpenClaw',
      'Hermes agent workflows',
      'AI-assisted testing agents',
    ],
  },
]

const projectHighlights = [
  'Built LLM-powered iOS, Apple Watch, and macOS applications with modern AI workflows.',
  'Developed RAG systems for querying enterprise knowledge bases and internal documentation.',
  'Created AI-assisted coding harnesses for automated testing, code quality, and rapid iteration.',
  'Used custom agents and coding standards to improve Cypress and Jest development workflows.',
]

const AILLMSkillsSection = () => {
  return (
    <section className="ai-llm-wrap container" id="ai-llm" aria-labelledby="ai-llm-title">
      <p className="ai-llm-kicker">AI / LLM Product Engineering</p>
      <h2 id="ai-llm-title">Practical AI, built into real products.</h2>
      <p className="ai-llm-intro">
        I use LLMs as product infrastructure and engineering leverage: RAG systems,
        agentic workflows, conversational interfaces, and AI-assisted developer tooling
        that help teams ship faster without losing quality.
      </p>

      <div className="ai-llm-grid" aria-label="AI and LLM skill areas">
        {skillGroups.map((group) => (
          <article className="ai-llm-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="ai-llm-proof">
        <h3>Selected AI / LLM Experience</h3>
        <ul className="std-bullet">
          {projectHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AILLMSkillsSection
