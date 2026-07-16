import type { Metadata } from "next";
import { assets, site } from "../data";
import { JsonLd, PageHero, PublicShell } from "../public-components";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lil Lisset's Minuets in Litchfield County, Connecticut to ask about available kittens, the waiting list, upcoming litters, retirees, shows, and TICA registration.",
};

export default function ContactPage() {
  return (
    <PublicShell>
      <main>
        <PageHero
          eyebrow="We'd love to hear from you"
          title="Contact us"
          copy="Ask about available kittens, the waiting list, upcoming litters, retirees, and shows."
          image={assets.homePortrait}
          compact
        />

        <section className="section contact-section">
          <form action={`mailto:${site.email}`} method="post" encType="text/plain">
            <label>
              <span>First name</span>
              <input name="first_name" required />
            </label>
            <label>
              <span>Last name</span>
              <input name="last_name" />
            </label>
            <label>
              <span>Email*</span>
              <input name="email" type="email" required />
            </label>
            <label>
              <span>Message*</span>
              <textarea name="message" required />
            </label>
            <button className="button" type="submit">
              Submit
            </button>
          </form>

          <div className="contact-copy">
            <h2>Join our waiting list</h2>
            <p>
              Please feel free to be a part of our waiting list. We will share
              upcoming litters, available kittens, retirees, upcoming shows, and
              social updates.
            </p>
            <p>
              All kittens are T.I.C.A. registered. We include shots, vet health
              check, parasite treatment, and our 1 year guarantee against genetic
              illness.
            </p>
            <div className="contact-links">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}>{site.phone}</a>
              <a href={site.facebookUrl}>{site.facebookLabel}</a>
            </div>
            <img src="/assets/wix/cb971c22-94fa-4ff0-9831-75a9f954ce0e-edited.webp" alt="Lil Lisset's Minuet kitten" />
          </div>
        </section>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Lil Lisset's Minuets",
            url: "https://www.lillissetsminuetscattery.com/contact",
          }}
        />
      </main>
    </PublicShell>
  );
}
