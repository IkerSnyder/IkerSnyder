const forItems = [
  "B2B service company: agency, consultancy, or IT services firm",
  "Selling high-ticket offers and closing deals above $10k",
  "Founder or sales lead doing outreach without a dedicated SDR",
  "Ready to replace manual LinkedIn work with a system that runs itself",
  "You have a defined ICP and an offer that converts. You just need pipeline.",
];

const notForItems = [
  "Looking for inbound content or viral growth strategies",
  "No clear target customer or defined offer yet",
  "B2C products or mass-market consumer sales",
  "Not open to letting automation handle repetitive steps",
];

export default function WhoItsFor() {
  return (
    <section id="who" className="who-section" aria-label="Who this is for">
      <div className="section-label">{"// Fit check"}</div>
      <h2 className="section-title">Is this for you?</h2>
      <p className="section-sub">
        I work with a small number of clients at a time. Here&apos;s an honest
        look at who gets the most out of this.
      </p>

      <div className="who-grid">
        <div className="who-col who-col--yes" aria-label="Good fit indicators">
          <div className="who-col-label">Good fit</div>
          <ul className="who-list">
            {forItems.map((item) => (
              <li key={item} className="who-item who-item--yes">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="who-col who-col--no" aria-label="Not a good fit indicators">
          <div className="who-col-label">Not the right match</div>
          <ul className="who-list">
            {notForItems.map((item) => (
              <li key={item} className="who-item who-item--no">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
