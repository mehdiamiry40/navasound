import Link from "next/link";
import Brand from "./brand";

export default function InnerHeader({ backLabel = "Back to home" }: { backLabel?: string }) {
  return (
    <header className="site-header apply-header">
      <Link className="brand" href="/" aria-label="NavaSound home">
        <Brand />
      </Link>
      <Link className="inner-back-link" href="/">
        <span aria-hidden="true">←</span>
        {backLabel}
      </Link>
    </header>
  );
}
