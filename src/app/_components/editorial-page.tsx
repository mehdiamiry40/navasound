import type { ReactNode } from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import "../editorial.css";

type EditorialPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function EditorialPage({ eyebrow, title, description, children }: EditorialPageProps) {
  return (
    <div className="editorial-page">
      <SiteHeader />
      <main id="main-content" className="shell">
        <header className="editorial-hero"><p className="editorial-kicker">{eyebrow}</p><h1>{title}</h1><p className="editorial-description">{description}</p></header>
        <div className="editorial-content">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
