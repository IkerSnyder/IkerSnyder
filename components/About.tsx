const aboutFacts = [
  { label: "Base", value: "Spain + Southeast Asia" },
  { label: "Work style", value: "Remote, async, timezone-flexible" },
  { label: "Focus", value: "Outbound systems that keep running" },
];

export default function About() {
  return (
    <section id="about" className="about-strip" aria-label="About section">
      <div className="about-copy">
        <div className="section-label">{"// Working style"}</div>
        <div className="about-name">
          Based
          <br />
          anywhere.
          <br />
          <span>Built for results.</span>
        </div>

        <p className="about-text">
          I&apos;m Iker — a business development specialist and automation builder
          currently based between Spain and Southeast Asia. I&apos;ve run LinkedIn
          outreach campaigns for EHS and SaaS companies, built n8n automation
          workflows from scratch, and helped teams generate consistent leads without
          adding headcount. I work remotely, I&apos;m available across time zones,
          and I only take on work I can genuinely deliver.
        </p>
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
