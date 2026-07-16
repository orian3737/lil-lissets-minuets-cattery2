import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, starterPosts } from "../../data";
import { JsonLd, PublicShell } from "../../public-components";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = starterPosts.find((item) => item.slug === slug && item.status === "published");
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = starterPosts.find((item) => item.slug === slug && item.status === "published");
  if (!post) notFound();

  return (
    <PublicShell>
      <main className="article-page">
        <article>
          <p className="eyebrow">{post.publishedAt}</p>
          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          {post.body.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="keywords">{post.keywords}</p>
        </article>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: {
              "@type": "Organization",
              name: site.legalName,
            },
          }}
        />
      </main>
    </PublicShell>
  );
}
