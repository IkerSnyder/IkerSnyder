export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="footer-trust" aria-label="Trust signals">
        <span className="footer-trust-item">2 client spots per quarter</span>
        <span className="footer-trust-sep" aria-hidden="true">·</span>
        <span className="footer-trust-item">Responses within 24h</span>
        <span className="footer-trust-sep" aria-hidden="true">·</span>
        <span className="footer-trust-item">No prospect data stored outside your systems</span>
      </div>
      <div className="footer-bottom">
        <span>{`© ${year} Iker Snyder`}</span>
        <span>Automation &amp; Outreach</span>
        <a href="#home" className="footer-link">
          Back to top
        </a>
      </div>
    </footer>
  );
}
