"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Brand from "./brand";

const navigation = [
  { href: "/release", label: "Workspace" },
  { href: "/#how-it-works", label: "The beta" },
  { href: "/#pricing", label: "Pricing" },
];

export default function SiteHeader() {
  const mobile = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOutsideMenu(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      const menu = mobile.current;
      if (menu?.open && !menu.contains(event.target)) menu.open = false;
    }
    document.addEventListener("pointerdown", closeOutsideMenu);
    return () => document.removeEventListener("pointerdown", closeOutsideMenu);
  }, []);

  function closeMenu(restoreFocus = false) {
    if (!mobile.current) return;
    mobile.current.open = false;
    if (restoreFocus) mobile.current.querySelector("summary")?.focus();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="NavaSound home"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="nav-actions"><Link className="button button-primary" href="/apply">Apply</Link></div>
        <details className="mobile-menu" ref={mobile} onKeyDown={event => { if (event.key === "Escape") closeMenu(true); }} onBlur={event => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) closeMenu(); }}>
          <summary aria-label="Site navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/release" onClick={() => closeMenu()}>Workspace</Link>
            <Link href="/#how-it-works" onClick={() => closeMenu()}>The beta</Link>
            <Link href="/#pricing" onClick={() => closeMenu()}>Pricing</Link>
            <Link href="/legal" onClick={() => closeMenu()}>Legal &amp; trust</Link>
            <Link href="/apply" onClick={() => closeMenu()}>Apply for the beta</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
