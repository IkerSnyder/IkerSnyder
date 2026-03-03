export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hero section">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-tag">{"// Available for freelance work"}</div>
      <h1 className="hero-title">
        Iker
        <br />
        <span className="line2">Snyder</span>
      </h1>
      <p className="hero-sub">
        I help businesses grow through automated LinkedIn outreach and email campaigns
        {" "}
        — built to run while you focus on everything else.
      </p>
      <a href="#contact" className="hero-cta">
        <span>Start a project</span>
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
