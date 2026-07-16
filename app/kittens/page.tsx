import type { Metadata } from "next";
import { KittenBoard } from "../components";
import { assets, galleryImages, parentCats, site, starterKittens } from "../data";
import { GalleryGrid, JsonLd, PageHero, PublicShell } from "../public-components";

export const metadata: Metadata = {
  title: "Kittens for Sale",
  description:
    "View available, sold, and archived Lil Lisset's Minuets kitten listings with sex, birth date, TICA status, show quality, mother, breed, and price.",
};

export default function KittensPage() {
  return (
    <PublicShell>
      <main>
        <PageHero
          eyebrow="Our kittens for sale"
          title="Available kittens and sold archive"
          copy="This page keeps the original Wix kitten sales fields while making the owner studio the place to add photos, update details, hide listings, and rotate kittens in and out."
          image={assets.mazyTwo}
        />

        <KittenBoard initialKittens={starterKittens} />

        <section className="section parent-section">
          <div className="section-heading centered">
            <p className="eyebrow">The Dams and Sires</p>
            <h2>Meet the cats behind the program</h2>
          </div>
          <div className="parent-grid">
            {parentCats.map((cat) => (
              <article className="parent-card" key={`${cat.role}-${cat.name}`}>
                <img src={cat.imageUrl} alt={`${cat.name}, Lil Lisset's ${cat.role}`} />
                <span>{cat.role}</span>
                <h3>{cat.name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section past-kittens">
          <div className="section-heading centered">
            <p className="eyebrow">Kittens of the Past</p>
            <h2>More original site media</h2>
          </div>
          <GalleryGrid images={galleryImages} />
        </section>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Lil Lisset's Minuets Kittens",
            url: "https://www.lillissetsminuetscattery.com/kittens",
            isPartOf: {
              "@type": "WebSite",
              name: site.legalName,
            },
          }}
        />
      </main>
    </PublicShell>
  );
}
