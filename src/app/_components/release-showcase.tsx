import Image from "next/image";
import Link from "next/link";
import studioArtwork from "../../../public/brand/nava-studio-launch-v1.png";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className={diagonal ? "diagonal-arrow" : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

export function ToolIcon({ kind = 0 }: { kind?: number }) {
  const paths = ["M7 3h7l4 4v14H6V3h1m8 0v5h4M9 12h6m-6 4h6", "M9 18V5l11-2v13M9 7l11-2M9 18c0 2-6 3-6 0s6-3 6 0m11-2c0 2-6 3-6 0s6-3 6 0", "M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3zm-4 9 3 3 5-6", "M5 5h14v14H5zM8 9h8m-8 4h5"];
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={paths[kind % paths.length]} /></svg>;
}

export function HeroArtwork() {
  return (
    <div className="studio-artwork">
      <Image
        className="studio-image"
        src={studioArtwork}
        fill
        sizes="(max-width: 768px) 100vw, 1104px"
        loading="eager"
        fetchPriority="high"
        alt="Pixel-art recording studio with a mixing desk, synthesizer, guitar and warm amber lighting"
      />
    </div>
  );
}

type FeatureItem = { title: string; copy: string; icon: number };
type FeatureProps = {
  id: string;
  number: string;
  label: string;
  title: string;
  items: FeatureItem[];
  href: string;
  linkLabel: string;
};

export function FeatureModule({ id, number, label, title, items, href, linkLabel }: FeatureProps) {
  const heading = `${id}-heading`;
  return (
    <section className="feature-module" id={id} aria-labelledby={heading}>
      <div className="feature-heading">
        <p className="section-kicker">#{number} — {label}</p>
        <h2 id={heading}>{title}</h2>
      </div>
      <ul className="feature-list">
        {items.map(item => (
          <li key={item.title}>
            <ToolIcon kind={item.icon} />
            <div><h3>{item.title}</h3><p>{item.copy}</p></div>
          </li>
        ))}
      </ul>
      <Link className="feature-cta" href={href}>{linkLabel}<Arrow /></Link>
    </section>
  );
}
