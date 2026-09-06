import Image from "next/image";
import musicStillLife from "../../../public/brand/nava-music-still-life-v1.png";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className={diagonal ? "diagonal-arrow" : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

export function HeroArtwork() {
  return (
    <div className="studio-artwork">
      <Image
        className="studio-image"
        src={musicStillLife}
        fill
        sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1151px) calc(100vw - 48px), 1104px"
        loading="eager"
        fetchPriority="high"
        alt="Black studio headphones resting on a walnut piano in soft window light"
      />
    </div>
  );
}
