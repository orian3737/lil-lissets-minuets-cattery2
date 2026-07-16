import type { Metadata } from "next";
import {
  aboutBenefits,
  aboutStory,
  assets,
  breedStandards,
  catteryGoals,
  site,
} from "../data";
import { JsonLd, PageHero, PublicShell } from "../public-components";

export const metadata: Metadata = {
  title: "About Our Cattery",
  description:
    "Read the Lil Lisset's Minuets family story, TICA background, Minuet breed education, delivery, deposits, socialization, and cattery goals.",
};

export default function AboutPage() {
  return (
    <PublicShell>
      <main>
        <PageHero
          eyebrow="More about our cattery"
          title="What Do You Get With Us"
          copy="A family cattery built around socialized Minuet kittens, TICA participation, hands-on care, and a story that began with Lil Lisseth."
          image={assets.aboutFamily}
        />

        <section className="section benefit-band">
          {aboutBenefits.map((benefit) => (
            <article key={benefit.title}>
              <h2>{benefit.title}</h2>
              <p>{benefit.body}</p>
            </article>
          ))}
        </section>

        <section className="section story-section">
          <div className="story-images">
            <img src={assets.tica} alt="The International Cat Association logo" />
            <img src={assets.aboutLove} alt="Lil Lisset's family cattery moment" />
          </div>
          <div>
            <p className="eyebrow">A little love goes a long way</p>
            <h1>Can it be 10 years</h1>
            {aboutStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section standard-section">
          <div>
            <p className="eyebrow">The Minuet Standard Breed</p>
            <h2>Standard and non-standard Minuets</h2>
            {breedStandards.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className="button" href={site.contractUrl}>
              Lil Lisset's Purchase Contract
            </a>
          </div>
          <img src={assets.standardMinuet} alt="Minuet standard breed example" />
        </section>

        <section className="section goals-section">
          <img src={assets.tanyaSteph} alt="Tanya and Steph with a cat" />
          <div>
            <p className="eyebrow">Our Goals</p>
            <h2>Growing together as a family and breeding community</h2>
            {catteryGoals.map((goal) => (
              <p key={goal}>{goal}</p>
            ))}
          </div>
        </section>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Lil Lisset's Minuets",
            url: "https://www.lillissetsminuetscattery.com/about",
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
