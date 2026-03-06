const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const AutomationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <line x1="8.5" y1="10.8" x2="15.5" y2="6.8" />
    <line x1="8.5" y1="13.2" x2="15.5" y2="17.2" />
  </svg>
);

const AuditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="12" y2="16" />
  </svg>
);

const services = [
  {
    number: "01",
    icon: <LinkedInIcon />,
    iconVariant: "",
    title: "Outbound System Buildout",
    pain: "You need the full engine built. Not just a LinkedIn template.",
    deliverables: [
      "ICP brief and targeting criteria",
      "Automated prospect sourcing and enrichment",
      "LinkedIn DM and email sequence setup",
      "Reply detection and qualification logic",
      "CRM routing and handoff workflow",
      "4 weeks of post-launch tuning",
    ],
    footer: "Timeline: 2 to 3 weeks to a fully live system",
    bestFor: "Teams with no outbound system at all",
    price: "Starting at €2,500",
    tags: ["Dripify", "n8n", "LinkedIn", "Email Seq", "CRM"],
    variant: "",
  },
  {
    number: "02",
    icon: <AutomationIcon />,
    iconVariant: "service-icon-wrap--purple",
    title: "Outreach Retainer",
    pain: "You have motion but need ongoing execution and optimisation.",
    deliverables: [
      "Weekly campaign management and optimisation",
      "Sequence testing and copy iteration",
      "Reply qualification and routing",
      "Pipeline cleanup and CRM maintenance",
      "Monthly performance report",
      "One major workflow iteration per month",
    ],
    footer: "Monthly, min. 2-month commitment",
    bestFor: "Teams with an existing system that needs consistent execution",
    price: "Starting at €1,200/mo",
    tags: ["Monthly retainer", "Campaign ops", "Sequence updates", "Pipeline QA"],
    variant: "service-card--purple",
  },
  {
    number: "03",
    icon: <AuditIcon />,
    iconVariant: "",
    title: "Outbound Audit",
    pain: "You are not sure what is broken or why the pipeline is not moving.",
    deliverables: [
      "ICP targeting and list quality review",
      "Messaging and sequence assessment",
      "Tooling and workflow audit",
      "Bottleneck diagnosis",
      "Priority fix list with 30-day execution plan",
    ],
    footer: "Delivered in 3 to 5 business days",
    bestFor: "Teams that have tried outbound but cannot figure out what is not working",
    price: "Starting at €500",
    tags: ["Audit", "Strategy", "Roadmap", "Quick turnaround"],
    variant: "",
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section" aria-label="Services section">
      <div className="services-heading">
        <div className="section-label">{"// What I offer"}</div>
        <h2 className="section-title">
          Three ways<br />to work together.
        </h2>
        <p className="section-sub">
          Each offer is scoped around a specific stage of the outbound problem.
          Pick the one that matches where you are right now.
        </p>
      </div>

      <div className="services-grid services-grid--3">
        {services.map((service) => (
          <article key={service.number} className={`service-card ${service.variant}`}>
            <div className="service-card-header">
              <div className={`service-icon-wrap ${service.iconVariant}`} aria-hidden="true">
                {service.icon}
              </div>
              <div className="service-num">{service.number}</div>
            </div>

            <h3 className="service-title">{service.title}</h3>
            <p className="service-pain">{service.pain}</p>

            <ul className="service-list" aria-label={`${service.title} deliverables`}>
              {service.deliverables.map((item) => (
                <li key={item} className="service-list-item">
                  {item}
                </li>
              ))}
            </ul>

            <div className="service-best-for">
              <span className="service-best-for-label">Best for: </span>
              {service.bestFor}
            </div>

            <div className="service-tags">
              {service.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="service-price-row">
              <p className="service-footer">{service.footer}</p>
              <span className="service-price">{service.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
