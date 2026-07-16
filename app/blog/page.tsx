import type { Metadata } from "next";
import { BlogPreview } from "../components";
import { assets, site, starterPosts } from "../data";
import { JsonLd, PageHero, PublicShell } from "../public-components";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lil Lisset's Minuets blog hub for Minuet kitten care, breed education, cattery updates, and family resources.",
};

const topics = [
  "Preparing your home for a Minuet kitten",
  "Standard versus non-standard Minuet cats",
  "What to ask a TICA registered cattery",
  "Kitten vaccination and first-week transition tips",
  "How socialization shapes a confident family kitten",
  "Connecticut Minuet kitten availability updates",
];

export default function BlogPage() {
  return (
    <PublicShell>
      <main>
        <PageHero
          eyebrow="All posts"
          title="Lil Lisseth's Minuets Blog"
          copy="Helpful notes from the cattery for families learning about Minuet kittens, preparing for a new companion, or following along with our updates."
          image={assets.catBanner}
        />

        <BlogPreview initialPosts={starterPosts} />

        <section className="section blog-plan">
          <div>
            <p className="eyebrow">Helpful topics</p>
            <h2>Care notes, breed education, and cattery updates</h2>
            <p>
              These articles help families understand the Minuet breed, prepare
              a calm first week at home, and follow along with kitten news from
              Lil Lisset's.
            </p>
          </div>
          <div className="topic-list">
            {topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </section>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Lil Lisset's Minuets Blog",
            url: "https://www.lillissetsminuetscattery.com/blog",
            publisher: {
              "@type": "Organization",
              name: site.legalName,
            },
          }}
        />
      </main>
    </PublicShell>
  );
}
