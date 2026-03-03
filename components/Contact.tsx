const focusAreas = [
  "LinkedIn outreach systems",
  "Lead generation workflows",
  "Email campaign automation",
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-label="Contact section">
      <div className="contact-glow" aria-hidden="true" />
      <div className="contact-card">
        <div className="contact-copy">
          <div className="section-label">{"// Let's work together"}</div>
          <h2 className="contact-title">
            Got a project
            <br />
            in mind?
          </h2>
          <p className="contact-sub">
            If you need cleaner outbound systems, more consistent follow-up, or help
            getting automation off the whiteboard and into production, send me the
            scope.
          </p>

          <div className="contact-actions">
            <a href="mailto:isnyder@sms360.com" className="contact-email">
              isnyder@sms360.com
            </a>
            <a href="#services" className="contact-secondary-link">
              Review services
            </a>
          </div>
        </div>

        <aside className="contact-aside" aria-label="Project focus areas">
          <div className="contact-aside-label">Project focus</div>
          <div className="contact-focus-list">
            {focusAreas.map((area) => (
              <span key={area} className="contact-focus-tag">
                {area}
              </span>
            ))}
          </div>
          <p className="contact-note">
            Based in Europe, working comfortably across European and Southeast Asian
            time zones.
          </p>
        </aside>
      </div>
    </section>
  );
}
