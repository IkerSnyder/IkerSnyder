const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const focusAreas = [
  "LinkedIn outreach systems",
  "Lead generation workflows",
  "Email campaign automation",
  "n8n workflow builds",
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-label="Contact section">
      <div className="contact-glow" aria-hidden="true" />
      <div className="contact-card">
        <div className="contact-copy">
          <div className="section-label">{"// Book a discovery call"}</div>
          <h2 className="contact-title">
            Tell me what
            <br />
            your pipeline
            <br />
            should look like.
          </h2>
          <p className="contact-sub">
            15 minutes. You describe your current outbound situation and what
            a well-running pipeline would mean for the business. I&apos;ll tell
            you honestly whether and how I can help. No pitch, no obligation.
          </p>

          <div className="contact-actions">
            <a href="mailto:iker@ikersnyder.com" className="contact-email">
              iker@ikersnyder.com
            </a>
            <a
              href="https://linkedin.com/in/ikersnyder"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-linkedin"
              aria-label="Connect on LinkedIn"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <aside className="contact-aside" aria-label="Project focus areas">
          <div className="contact-aside-label">What I work on</div>
          <div className="contact-focus-list">
            {focusAreas.map((area) => (
              <span key={area} className="contact-focus-tag">
                {area}
              </span>
            ))}
          </div>
          <p className="contact-note">
            Based in Europe, available across European and Southeast Asian time zones.
            Async-first, responsive within 24 hours.
          </p>
        </aside>
      </div>
    </section>
  );
}
