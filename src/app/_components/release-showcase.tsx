"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import studioArtwork from "../../../public/brand/nava-studio-launch-v1.png";
import { BrandMark } from "./brand";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className={diagonal ? "diagonal-arrow" : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

export function ToolIcon({ kind = 0 }: { kind?: number }) {
  const paths = ["M7 3h7l4 4v14H6V3h1m8 0v5h4M9 12h6m-6 4h6", "M9 18V5l11-2v13M9 7l11-2M9 18c0 2-6 3-6 0s6-3 6 0m11-2c0 2-6 3-6 0s6-3 6 0", "M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3zm-4 9 3 3 5-6", "M5 5h14v14H5zM8 9h8m-8 4h5"];
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={paths[kind % paths.length]} /></svg>;
}

function WindowChrome({ title }: { title: string }) {
  return <div className="window-chrome"><span /><span /><span /><p>{title}</p></div>;
}

function SampleCover() {
  return (
    <div className="sample-cover" aria-hidden="true">
      <Image src={studioArtwork} fill sizes="96px" alt="" />
      <span>BLUE<br />HOUR</span>
      <i>NS / 001</i>
    </div>
  );
}

function SampleIdentity() {
  return <div className="sample-identity"><SampleCover /><div><p className="preview-eyebrow">SAMPLE RELEASE</p><strong>Blue Hour</strong><span>Example Artist · Alternative</span></div></div>;
}

const exampleTracks = ["Blue Hour", "Afterglow", "Slow Motion", "Coastline", "Home Again"];
const formatTracks = { Single: 1, EP: 3, Album: 5 };
export type ReleaseFormat = keyof typeof formatTracks;

function downloadExample(format: ReleaseFormat) {
  const content = `NAVASOUND — EXAMPLE RELEASE BRIEF\nIllustrative sample only. Nothing has been submitted.\n\nRelease: Blue Hour\nArtist: Example Artist\nFormat: ${format}\n\nTRACKS\n${exampleTracks.slice(0, formatTracks[format]).map((track, index) => `${index + 1}. ${track}`).join("\n")}\n\nRights and credits must be completed in your own release brief.\nDistribution is not live yet.\n`;
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "navasound-example-brief.txt";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function HeroPreview() {
  const [format, setFormat] = useState<ReleaseFormat>("Single");
  const [expanded, setExpanded] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  return (
    <div className={`landscape-demo ${expanded ? "is-preview-open" : ""}`}>
      <Image className="landscape-image" src={studioArtwork} fill sizes="(max-width: 768px) 100vw, 1104px" loading="eager" fetchPriority="high" alt="Pixel-art recording studio with a mixing desk, synthesizer, guitar and warm amber lighting" />
      <div className={`hero-composer ${expanded ? "is-expanded" : ""}`}>
        {!expanded ? <>
          <div className="composer-topline"><span><BrandMark size={17} /> TRY THE RELEASE BRIEF</span><span>01 / CHOOSE A FORMAT</span></div>
          <p className="composer-question">See how your next release comes together.</p>
          <div className="composer-controls">
            <div className="format-picker" role="group" aria-label="Example release format">
              {(Object.keys(formatTracks) as ReleaseFormat[]).map(item => <button type="button" key={item} aria-pressed={format === item} onClick={() => setFormat(item)}>{item}</button>)}
            </div>
            <button ref={openButton} type="button" className="composer-submit" onClick={() => { setExpanded(true); setDownloaded(false); requestAnimationFrame(() => preview.current?.focus()); }}>Preview brief <Arrow /></button>
          </div>
          <span className="composer-caption">INTERACTIVE EXAMPLE · NO INFORMATION IS SENT</span>
        </> : <div ref={preview} tabIndex={-1} className="hero-brief-preview" aria-label={`${format} release brief example`}>
          <div className="hero-preview-top"><div><BrandMark size={19} /><span>RELEASE BRIEF</span></div><button type="button" onClick={() => { setExpanded(false); requestAnimationFrame(() => openButton.current?.focus()); }}>Back <span aria-hidden="true">↩</span></button></div>
          <div className="hero-release-identity"><SampleCover /><div><h3>Blue Hour <span>{format}</span></h3><p className="example-note">Example artist · Sample data</p></div></div>
          <ol>{exampleTracks.slice(0, formatTracks[format]).map((track, index) => <li key={track}><span className="hero-track-number">{String(index + 1).padStart(2, "0")}</span><ToolIcon kind={1} />{track}<span>Draft</span></li>)}</ol>
          <div className="hero-preview-bottom"><button type="button" onClick={() => { downloadExample(format); setDownloaded(true); }}>Download example <Arrow /></button><Link href={`/release?format=${format}`}>Start your {format.toLowerCase()} brief <Arrow /></Link></div>
          <p className="example-note" role="status">{downloaded ? "Example downloaded to your device. Nothing was sent." : "The workspace opens with your chosen format. Add your own music details there."}</p>
        </div>}
      </div>
    </div>
  );
}

function MetadataPreview({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const rows = active === 1
    ? [["TRACK", "Blue Hour"], ["PERFORMER", "Example Artist"], ["WRITER", "Example Writer"], ["PRODUCER", "Example Producer"], ["VERSION", "Original"], ["LANGUAGE", "English"]]
    : active === 2
      ? [["ARTIST NAME", "Check spelling and consistency"], ["RELEASE DATE", "Add a target date"], ["TRACK CREDITS", "Confirm every contributor"], ["RIGHTS", "Confirm before sharing"], ["NEXT STEP", "Prepare for human review"]]
      : [["RELEASE", "Blue Hour"], ["ARTIST", "Example Artist"], ["FORMAT", "Single"], ["TRACKS", "01"], ["GENRE", "Alternative"], ["STATUS", "Draft — not submitted"]];
  const [downloaded, setDownloaded] = useState(false);
  return (
    <div className="preview-window metadata-window">
      <WindowChrome title={active === 3 ? "export-preview.txt" : "release-brief.txt"} />
      <div className="document-preview">
        <div className="document-sidebar" role="group" aria-label="Release example sections">{["Brief", "Credits", "Checks", "Export"].map((label, index) => <button key={label} type="button" data-preview-nav-index={index} aria-label={`Show ${label.toLowerCase()} preview`} aria-pressed={active === index} onClick={() => onSelect(index)}><ToolIcon kind={index} />{label}</button>)}</div>
        <div className="document-content"><SampleIdentity /><h3>{active === 1 ? "Every credit counts." : active === 2 ? "A useful second look." : active === 3 ? "Your brief. Your copy." : "A home for the details."}</h3><dl className={active === 2 ? "check-preview-fields" : undefined}>{rows.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>{active === 3 && <><button type="button" className="mini-button" onClick={() => { downloadExample("Single"); setDownloaded(true); }}>Download example ↓</button><p className="example-note" role="status">{downloaded ? "Downloaded locally. Nothing sent." : "A text file you can keep and review."}</p></>}</div>
      </div>
    </div>
  );
}

function TracksPreview({ active }: { active: number }) {
  const [extra, setExtra] = useState(false);
  const [reversed, setReversed] = useState(false);
  const format: ReleaseFormat = active === 0 ? "Single" : active === 1 ? "EP" : "Album";
  const tracks = exampleTracks.slice(0, formatTracks[format]);
  if (extra) tracks.push("Untitled demo track");
  if (active === 3 && reversed) tracks.reverse();
  return <div className="preview-window tracks-window"><WindowChrome title="track-list" /><div className="tracks-content"><SampleIdentity /><div className="preview-title-row"><h3>{active === 3 ? "Track order" : `${format} details`}</h3><button type="button" className="mini-button" onClick={() => active === 3 ? setReversed(!reversed) : setExtra(!extra)}>{active === 3 ? (reversed ? "RESET ORDER" : "REVERSE ORDER") : (extra ? "REMOVE DEMO TRACK" : "+ DEMO TRACK")}</button></div><p className="example-note">Blue Hour · Example release</p><div className="track-table-label"><span>TRACK TITLE</span><span>STATUS</span></div>{tracks.map((track, index) => <div className="sample-track" key={track}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{track}</strong><p>Example Artist · Original version</p></div><em>Draft</em></div>)}<div className="track-total"><span>{tracks.length} {tracks.length === 1 ? "track" : "tracks"}</span><span>Metadata only</span></div><p className="preview-footnote">Illustrative track list. Audio is not requested.</p></div></div>;
}

function ReviewPreview({ active }: { active: number }) {
  const content = active === 0 ? [
    ["Master recording", "Confirm you control the recording"], ["Songwriting", "Identify all writers and shares"], ["Samples & covers", "Check permissions and licences"], ["Artist names", "Confirm the correct credits"],
  ] : active === 1 ? [
    ["01 · Prepare", "Complete your application or brief"], ["02 · Share", "Manually email the details"], ["03 · Human review", "Fit and readiness reviewed by a person"], ["04 · Reply", "Next steps confirmed by email"],
  ] : [
    ["Release readiness", "Available now"], ["Final terms & secure uploads", "After provider integration"], ["Store delivery", "Coming later"], ["Royalty reporting & payouts", "Coming later"],
  ];
  return <div className="preview-window review-window"><WindowChrome title="readiness-checklist" /><div className="review-content"><div className="review-symbol"><ToolIcon kind={2} /></div><p className="preview-eyebrow">{active === 2 ? "THE RELEASE ROUTE" : "EXAMPLE READINESS GUIDE"}</p><h3>{active === 0 ? "Start with your rights." : active === 1 ? "A person in the loop." : "Know the next step."}</h3><p className="example-note">{active === 0 ? "Questions to answer before you share." : "Preparation now. Distribution later."}</p><ol>{content.map(([title, detail], index) => <li key={title}><span className="review-bullet">{active === 2 && index > 0 ? "○" : "·"}</span><div><strong>{title}</strong><p>{detail}</p></div></li>)}</ol></div></div>;
}

export type FeatureType = "metadata" | "tracks" | "review";
export type FeatureItem = { title: string; copy: string; icon: number };

function FeatureVisual({ type, active, onSelect }: { type: FeatureType; active: number; onSelect: (index: number) => void }) {
  return <div className={`feature-visual visual-${type}`}><Image className="visual-landscape" src={studioArtwork} fill sizes="(max-width: 768px) 100vw, 552px" alt="" /><div className="visual-wash" />{type === "metadata" ? <MetadataPreview key={active} active={active} onSelect={onSelect} /> : type === "tracks" ? <TracksPreview key={active} active={active} /> : <ReviewPreview active={active} />}</div>;
}

export function FeatureModule({ id, number, label, title, items, type, href, linkLabel }: { id: string; number: string; label: string; title: string; items: FeatureItem[]; type: FeatureType; href: string; linkLabel: string }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const heading = `${id}-heading`;
  const selected = Math.max(0, active);
  function selectFromPreview(index: number) {
    setActive(index);
    requestAnimationFrame(() => {
      const choices = document.getElementById(id)?.querySelectorAll<HTMLButtonElement>(`[data-preview-nav-index="${index}"]`);
      Array.from(choices ?? []).find(button => button.getClientRects().length > 0)?.focus();
    });
  }
  function moveTab(index: number, key: string) {
    const next = key === "Home" ? 0 : key === "End" ? items.length - 1 : (index + (key === "ArrowUp" ? -1 : 1) + items.length) % items.length;
    setActive(next);
    buttons.current[next]?.focus();
  }
  return (
    <section className={`feature-module feature-${type}`} id={id} aria-labelledby={heading}>
      <div className="feature-heading"><p className="section-kicker">#{number} — {label}</p><h2 id={heading}>{title}</h2></div>
      <div className="feature-desktop">
        <div className="feature-tablist" role="tablist" aria-label={`${label} features`} aria-orientation="vertical">{items.map((item, index) => <button ref={node => { buttons.current[index] = node; }} type="button" key={item.title} id={`${id}-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => { if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) { event.preventDefault(); moveTab(index, event.key); } }}><ToolIcon kind={item.icon} /><div><span>{item.title}</span><p>{item.copy}</p></div></button>)}</div>
        <div className="feature-panel" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`}><FeatureVisual type={type} active={selected} onSelect={selectFromPreview} /></div>
      </div>
      <div className="feature-mobile">{items.map((item, index) => <div className="feature-accordion" key={item.title}><button type="button" id={`${id}-mobile-button-${index}`} aria-expanded={active === index} aria-controls={`${id}-mobile-panel-${index}`} onClick={() => setActive(active === index ? -1 : index)}><ToolIcon kind={item.icon} /><span>{item.title}</span><span className="accordion-chevron" aria-hidden="true">{active === index ? "⌃" : "⌄"}</span></button><div hidden={active !== index} id={`${id}-mobile-panel-${index}`} role="region" aria-labelledby={`${id}-mobile-button-${index}`}><p>{item.copy}</p>{active === index && <FeatureVisual type={type} active={index} onSelect={selectFromPreview} />}</div></div>)}</div>
      <Link className="feature-cta" href={href}>{linkLabel}<Arrow /></Link>
    </section>
  );
}

export function FormatPreview() {
  const [format, setFormat] = useState<ReleaseFormat>("Single");
  return <div className="format-preview"><Image className="visual-landscape" src={studioArtwork} fill sizes="(max-width: 768px) 100vw, 552px" alt="" /><div className="visual-wash" /><div className="format-window preview-window"><WindowChrome title="release-format" /><div className="format-window-body"><SampleIdentity /><div className="format-select"><label htmlFor="sample-format">Release format</label><select id="sample-format" value={format} onChange={event => setFormat(event.target.value as ReleaseFormat)}><option>Single</option><option>EP</option><option>Album</option></select></div><div className="format-summary"><ToolIcon kind={1} /><div><strong>{formatTracks[format]} {formatTracks[format] === 1 ? "track" : "tracks"}</strong><p>{format === "Single" ? "One focused release brief." : "Every track, one release brief."}</p></div></div><Link className="format-start" href={`/release?format=${format}`}>Start your {format.toLowerCase()} brief <Arrow /></Link><p className="example-note">Your selected format carries into the workspace.</p></div></div></div>;
}
