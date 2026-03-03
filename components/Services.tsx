const services = [
  {
    number: "01 —",
    title: "LinkedIn Outreach & Lead Generation",
    description:
      "I build and run targeted LinkedIn campaigns that find your ideal clients, start real conversations, and fill your pipeline — without you lifting a finger.",
    tags: ["Dripify", "ICP Targeting", "Copywriting", "Lead Qual"],
  },
  {
    number: "02 —",
    title: "Automation & Email Campaigns",
    description:
      "Custom n8n workflows and email sequences that turn cold leads into warm conversations automatically. Built once, runs forever.",
    tags: ["n8n", "Email Sequences", "CRM Integration", "AI-assisted"],
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
      </div>

      {services.map((service) => (
        <article key={service.number} className="service-card">
          <div className="service-num">{service.number}</div>
          <h3 className="service-title">{service.title}</h3>
          <p className="service-desc">{service.description}</p>

          <div className="service-tags">
            {service.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
