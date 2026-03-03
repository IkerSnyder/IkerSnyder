export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Footer">
      <span>{`© ${year} Iker Snyder`}</span>
      <span>Automation &amp; Outreach</span>
      <a href="#home" className="footer-link">
        Back to top
      </a>
    </footer>
  );
}
