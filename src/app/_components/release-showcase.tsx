import Image from "next/image";
import studioArtwork from "../../../public/brand/nava-studio-launch-v1.png";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className={diagonal ? "diagonal-arrow" : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
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

export function RecordMotif() {
  return (
    <div className="record-motif" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => <span className="record-groove" key={index} style={{ inset: `${4 + index * 3.8}%` }} />)}
      <div className="record-label"><span>N</span><i /></div>
    </div>
  );
}
