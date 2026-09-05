"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Brand from "./brand";

const navigation = [
  { href: "/#how-it-works", label: "THE BETA" },
  { href: "/#pricing", label: "PRICING" },
  { href: "/legal", label: "TRUST" },
];
const tools = [
  { href: "/release", label: "Release workspace", detail: "Prepare metadata on your device." },
  { href: "/apply", label: "Artist application", detail: "Apply for the founding beta." },
  { href: "/legal/beta", label: "Readiness guide", detail: "Know what to prepare and share." },
];

export default function SiteHeader() {
  const mobile = useRef<HTMLDetailsElement>(null);
  const desktop = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOutsideMenus(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      for (const menu of [mobile.current, desktop.current]) {
        if (menu?.open && !menu.contains(event.target)) menu.open = false;
      }
    }
    document.addEventListener("pointerdown", closeOutsideMenus);
    return () => document.removeEventListener("pointerdown", closeOutsideMenus);
  }, []);

  function closeMenu(ref: typeof mobile, restoreFocus = false) {
    if (!ref.current) return;
    ref.current.open = false;
    if (restoreFocus) ref.current.querySelector("summary")?.focus();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="NavaSound home"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <details className="nav-dropdown" ref={desktop} onKeyDown={event => { if (event.key === "Escape") closeMenu(desktop, true); }} onBlur={event => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) closeMenu(desktop); }}>
            <summary>TOOLS <span aria-hidden="true">⌄</span></summary>
            <div className="nav-dropdown-content">{tools.map(item => <Link href={item.href} key={item.href} onClick={() => closeMenu(desktop)}><strong>{item.label}</strong><span>{item.detail}</span></Link>)}</div>
          </details>
          {navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="nav-actions"><Link className="button button-outline" href="/release">WORKSPACE</Link><Link className="button button-primary" href="/apply">APPLY</Link></div>
        <details className="mobile-menu" ref={mobile} onKeyDown={event => { if (event.key === "Escape") closeMenu(mobile, true); }} onBlur={event => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) closeMenu(mobile); }}>
          <summary aria-label="Site navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/#how-it-works" onClick={() => closeMenu(mobile)}>The beta</Link>
            <Link href="/release" onClick={() => closeMenu(mobile)}>Release workspace</Link>
            <Link href="/#pricing" onClick={() => closeMenu(mobile)}>Pricing</Link>
            <Link href="/legal" onClick={() => closeMenu(mobile)}>Legal &amp; trust</Link>
            <Link href="/apply" onClick={() => closeMenu(mobile)}>Apply for the beta</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
