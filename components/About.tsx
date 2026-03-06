const aboutFacts = [
  { label: "Availability", value: "Remote · Europe and SE Asia time zones" },
  { label: "Tools", value: "LinkedIn · Dripify · n8n · HubSpot" },
  { label: "Approach", value: "I implement in your environment and document every workflow. You can take it over later." },
];

export default function About() {
  return (
    <section id="about" className="about-strip" aria-label="About section">
      <div className="about-copy">
        <div className="section-label">{"// Who builds this"}</div>
        <div className="about-name">
          I&apos;m Iker.
          <br />
          <span>I build outbound systems</span>
          <br />
          that keep running.
        </div>

        <p className="about-text">
          I&apos;ve built LinkedIn outreach and automation systems for B2B teams
          that needed a repeatable pipeline without more operational drag. That
          means ICP targeting, sequence setup, enrichment workflows, reply
          qualification, and clean CRM handoffs. All connected and running
          without you managing it day-to-day.
        </p>

        <p className="about-text" style={{ marginTop: "0.75rem" }}>
          Small client list by design. I only take on work I can genuinely deliver.
        </p>

        <div className="about-capacity" aria-label="Current availability">
          Currently onboarding 1 new client this quarter
        </div>
      </div>

      <div className="about-facts" aria-label="About details">
        {aboutFacts.map((fact) => (
          <div key={fact.label} className="about-fact">
            <span className="about-fact-label">{fact.label}</span>
            <span className="about-fact-value">{fact.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
