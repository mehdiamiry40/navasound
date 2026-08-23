import Link from "next/link";

export default function InnerHeader({ backLabel = "Back to the website" }: { backLabel?: string }) {
  return (
    <header className="site-header apply-header">
      <Link className="brand" href="/" aria-label="NavaSound home">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>NavaSound</span>
      </Link>
      <Link className="text-link" href="/">{backLabel}</Link>
    </header>
  );
}
