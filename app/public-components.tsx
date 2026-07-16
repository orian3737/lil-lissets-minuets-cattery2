import Link from "next/link";
import type { ReactNode } from "react";
import { assets, GalleryImage, navItems, site } from "./data";

type ShellProps = {
  children: ReactNode;
};

export function PublicShell({ children }: ShellProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="Lil Lisset's Minuets home">
        <img src={assets.logo} alt="" />
        <span>
          <strong>Lil Lisset's</strong>
          <em>Minuets</em>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, copy, image, compact }: PageHeroProps) {
  return (
    <section className={compact ? "page-hero compact" : "page-hero"}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {image ? (
        <figure>
          <img src={image} alt="" />
        </figure>
      ) : null}
    </section>
  );
}

export function PinkCloudDivider() {
  return <div className="cloud-divider" aria-hidden="true" />;
}

export function GalleryGrid({ images, limit }: { images: GalleryImage[]; limit?: number }) {
  const visible = typeof limit === "number" ? images.slice(0, limit) : images;
  return (
    <div className="gallery-grid">
      {visible.map((image) => (
        <figure key={image.slot}>
          <img src={image.src} alt={image.alt} loading="lazy" />
          <figcaption>{image.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="image-placeholder">
      <span>Original image slot</span>
      <strong>{label}</strong>
      <small>Drop final WebP/JPG in public/assets and update this slot.</small>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.legalName}</strong>
        <span>{site.location}</span>
      </div>
      <div>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>{site.phone}</span>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
