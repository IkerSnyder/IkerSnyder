const capabilityTags = [
  "LinkedIn outreach",
  "Lead sourcing",
  "Email campaigns",
  "n8n automation",
];

const systemSteps = [
  "Target and qualify the right accounts",
  "Launch outreach sequences across LinkedIn and email",
  "Route replies into a clean handoff process",
  "Keep the system running without manual chasing",
];

export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hero section">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow hero-glow-secondary" aria-hidden="true" />

      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-tag">{"// Available for freelance work"}</div>
          <h1 className="hero-title">
            Iker
            <br />
            <span className="line2">Snyder</span>
          </h1>
          <p className="hero-sub">
            I build outbound systems that source leads, start conversations, and move
            qualified replies into a pipeline your team can actually use.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="hero-cta">
              <span>Start a project</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="#workflow" className="hero-secondary-link">
              See the workflow
            </a>
          </div>

          <div className="hero-capability-row" aria-label="Core capabilities">
            {capabilityTags.map((tag) => (
              <span key={tag} className="hero-capability-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="hero-panel" aria-label="System snapshot">
          <div className="hero-panel-top">
            <div>
              <div className="hero-panel-label">System snapshot</div>
              <div className="hero-panel-title">Outbound stack</div>
            </div>
            <div className="hero-panel-chip">LinkedIn + email</div>
          </div>

          <div className="hero-panel-list">
            {systemSteps.map((step, index) => (
              <div key={step} className="hero-panel-step">
                <div className="hero-panel-index">{`0${index + 1}`}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <div className="hero-panel-footer">
            <span>Personalized messaging</span>
            <span>Clean CRM handoff</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
