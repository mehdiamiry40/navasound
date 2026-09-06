import Link from "next/link";
import Brand from "./brand";

const links = [
  ["About", "/about"],
  ["Release guide", "/guide"],
  ["Contact", "/contact"],
  ["Trust centre", "/legal"],
  ["Privacy notice", "/legal/privacy"],
  ["Website terms", "/legal/terms"],
  ["Beta guide", "/legal/beta"],
  ["Refunds", "/legal/refunds"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div className="footer-main">
        <Link className="brand" href="/" aria-label="NavaSound home"><Brand /></Link>
        <nav aria-label="Footer navigation">{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
      </div>
      <div className="footer-meta"><p>© 2026 NavaSound · MEHDI EMIR · ABN 62 351 619 456</p><span>Queensland, Australia</span></div>
    </footer>
  );
}
