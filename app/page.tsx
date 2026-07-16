import type { Metadata } from "next";
import { BlogPreview, KittenBoard } from "./components";
import {
  assets,
  galleryImages,
  homeIntro,
  homeStoryGallery,
  reviews,
  site,
  starterKittens,
  starterPosts,
} from "./data";
import { JsonLd, PinkCloudDivider, PublicShell } from "./public-components";

export const metadata: Metadata = {
  title: "Lil Lisset's Minuets Cattery | TICA Minuet Kittens in Connecticut",
  description:
    "Lil Lisset's Minuets is a TICA registered family cattery in New Hartford, Connecticut with Minuet kittens, happy homes, reviews, and owner-managed kitten listings.",
};

export default function Home() {
  return (
    <PublicShell>
      <main>
        <section className="home-hero soft-change">
          <div className="brand-stage">
            <img className="hero-logo" src={assets.logo} alt="Lil Lisset's Minuets cat logo" />
            <div>
              <p className="display-name">Lil Lisset's</p>
              <p className="display-name">Minuets</p>
            </div>
          </div>
          <div className="hero-wave" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-kicker">Inspired by a lil girl's love</p>
              <h1>Lil Lisseth's Minuets Cattery</h1>
              <p className="hero-quote">
                "Elegant Companions, Raised with Love & Refined Feline Beauty, One
                Minuet at a Time"
              </p>
              <div className="hero-actions">
                <a className="button lavender" href="/kittens">
                  Choose Your Kitten Today
                </a>
                <a className="button light" href={site.facebookUrl}>
                  Sign Up
                </a>
              </div>
            </div>
            <div className="hero-photo-story" aria-label="Lisseth and kitten photos">
              <figure className="hero-family-card">
                <img src={assets.heroGirl} alt="Lisseth in a princess dress holding a white Minuet kitten" />
              </figure>
            </div>
          </div>
          <div className="facebook-callout">
            <span>Join our FaceBook</span>
            <a className="button light" href={site.facebookUrl}>Sign Up</a>
          </div>
        </section>

        <section className="section about-preview smooth-mint">
          <div>
            <p className="eyebrow">Est. 2015</p>
            <h2>{homeIntro.title}</h2>
            <p>{homeIntro.body}</p>
            <div className="hero-actions">
              <a className="button" href="/about">
                About our Cattery
              </a>
              <a className="button light" href={site.ticaUrl}>
                TICA
              </a>
            </div>
          </div>
          <div className="image-pair">
            <img src="/assets/wix/0c9b4e-7025bf67f8654dbda11b0ec02546227a.webp" alt="Lil Lisset's Minuet kitten in flowers" />
            <img
              src="/assets/wix/20160705-183344-orig-edited-edited.webp"
              alt="Lil Lisset's family-raised Minuet"
            />
          </div>
        </section>

        <PinkCloudDivider />

        <KittenBoard initialKittens={starterKittens} />

        <section className="section lisseth-story smooth-pink">
          <div className="section-heading centered">
            <p className="eyebrow">Inspired by Lisseth</p>
            <h2>A little story told in cats, ribbons, and wonder</h2>
            <p>
              The cattery has always carried her spark: soft kitten moments,
              family days, show-table pride, and the kind of joy that makes the
              whole place feel loved.
            </p>
          </div>
          <div className="story-gallery">
            {homeStoryGallery.map((image, index) => (
              <figure className={index === 0 ? "feature-story" : ""} key={image.slot}>
                <img src={image.src} alt={image.alt} loading={index === 0 ? "eager" : "lazy"} />
              </figure>
            ))}
          </div>
        </section>

        <section className="section past-kittens">
          <div className="section-heading centered">
            <p className="eyebrow">Kittens of the Past</p>
            <h2>More memories from the original site</h2>
          </div>
          <div className="story-gallery memory-gallery">
            {galleryImages.slice(0, 36).map((image, index) => (
              <figure key={image.slot}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="section reviews">
          <div className="section-heading centered">
            <p className="eyebrow">Happy Homes</p>
            <h2>Families who came back with love notes</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <img src={review.imageUrl} alt={`${review.name}'s Minuet cat`} />
                <h3>{review.name}</h3>
                <p>"{review.quote}"</p>
              </article>
            ))}
          </div>
        </section>

        <BlogPreview initialPosts={starterPosts} />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: site.legalName,
            url: "https://www.lillissetsminuetscattery.com/",
            email: site.email,
            telephone: site.phone,
            image: assets.logo,
            address: {
              "@type": "PostalAddress",
              addressLocality: "New Hartford",
              addressRegion: "CT",
              addressCountry: "US",
            },
          }}
        />
      </main>
    </PublicShell>
  );
}
