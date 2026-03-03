const services = [
  {
    number: "01",
    title: "LinkedIn Outreach & Lead Generation",
    description:
      "I build and run targeted LinkedIn campaigns that find your ideal clients, start real conversations, and fill your pipeline — without you lifting a finger.",
    deliverables: [
      "ICP targeting and prospect list building",
      "Profile-driven messaging sequences",
      "Reply handling and qualification logic",
    ],
    tags: ["Dripify", "ICP Targeting", "Copywriting", "Lead Qual"],
    footer: "Built for consistent prospecting without constant manual follow-up.",
  },
  {
    number: "02",
    title: "Automation & Email Campaigns",
    description:
      "Custom n8n workflows and email sequences that turn cold leads into warm conversations automatically. Built once, runs forever.",
    deliverables: [
      "Automated lead routing and enrichment",
      "Email sequences tied to actual triggers",
      "CRM updates and internal handoff steps",
    ],
    tags: ["n8n", "Email Sequences", "CRM Integration", "AI-assisted"],
    footer: "Designed to reduce admin work while keeping the pipeline moving.",
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section" aria-label="Services section">
      <div className="services-heading">
        <div className="section-label">{"// What I do"}</div>
        <h2 className="section-title">
          Two things.
          <br />
          Done properly.
        </h2>
        <p className="section-sub">
          The work is focused on getting the right people into your pipeline and
          keeping the follow-through structured enough to scale.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article key={service.number} className="service-card">
            <div className="service-num">{service.number}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>

            <ul className="service-list" aria-label={`${service.title} deliverables`}>
              {service.deliverables.map((item) => (
                <li key={item} className="service-list-item">
                  {item}
                </li>
              ))}
            </ul>

            <div className="service-tags">
              {service.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <p className="service-footer">{service.footer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
