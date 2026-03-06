const metrics = [
  {
    label: "Qualified leads per month",
    number: "20",
    suffix: "–40",
    desc: "At full ramp on a well-defined ICP. Varies by industry, offer, and targeting quality.",
  },
  {
    label: "LinkedIn open rate",
    number: "50",
    suffix: "–65%",
    desc: "On multi-touch LinkedIn message sequences to a cold but targeted audience.",
  },
  {
    label: "Reply rate lift vs cold email",
    number: "3",
    suffix: "–8×",
    desc: "When LinkedIn is the primary channel, not a follow-up afterthought.",
  },
  {
    label: "Time to live system",
    number: "2",
    suffix: "–3 wks",
    desc: "From first call to a fully operational automation running in the background.",
  },
];

export default function Results() {
  return (
    <section id="results" className="results-section" aria-label="Typical results">
      <div className="section-label">{"// What to expect"}</div>
      <h2 className="section-title">
        Honest numbers,<br />honest framing.
      </h2>
      <p className="section-sub">
        Client systems stay confidential. These ranges reflect how outbound
        campaigns like these perform in practice. Not best-case cherry-picks.
      </p>

      <div className="results-grid">
        {metrics.map((m) => (
          <div key={m.label} className="result-card">
            <div className="result-card-top">
              <span className="result-label">{m.label}</span>
              <span className="result-qualifier">typically</span>
            </div>
            <div className="result-number">
              {m.number}
              <span>{m.suffix}</span>
            </div>
            <p className="result-desc">{m.desc}</p>
          </div>
        ))}
      </div>

      <p className="results-disclaimer">
        Results depend mainly on ICP clarity and offer strength. We set targets
        together during scoping.
      </p>
    </section>
  );
}
