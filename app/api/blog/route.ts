import { starterPosts, type BlogPost } from "../../data";
import { requireApiUser } from "../auth";
import { ensureTables, getD1, jsonError, type DbPostRow } from "../db";

const statuses = new Set(["draft", "published"]);
const cadences = new Set(["daily", "weekly", "monthly"]);

function fromRow(row: DbPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body,
    status: statuses.has(row.status) ? (row.status as BlogPost["status"]) : "draft",
    cadence: cadences.has(row.cadence) ? (row.cadence as BlogPost["cadence"]) : "monthly",
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    keywords: row.keywords,
    publishedAt: row.published_at,
  };
}

function normalize(payload: Partial<BlogPost>): BlogPost {
  const title = payload.title?.trim() ?? "";
  return {
    id: payload.id,
    title,
    slug: payload.slug?.trim() || slugify(title),
    excerpt: payload.excerpt?.trim() ?? "",
    body: payload.body?.trim() ?? "",
    status: statuses.has(payload.status ?? "") ? (payload.status as BlogPost["status"]) : "draft",
    cadence: cadences.has(payload.cadence ?? "") ? (payload.cadence as BlogPost["cadence"]) : "monthly",
    seoTitle: payload.seoTitle?.trim() ?? "",
    seoDescription: payload.seoDescription?.trim() ?? "",
    keywords: payload.keywords?.trim() ?? "",
    publishedAt: payload.publishedAt?.trim() ?? "",
  };
}

async function seedIfEmpty(db: Awaited<ReturnType<typeof getD1>>) {
  const count = await db.prepare("SELECT COUNT(*) as count FROM blog_posts").first<{ count: number }>();
  if ((count?.count ?? 0) > 0) return;
  await db.batch(
    starterPosts.map((post) =>
      db
        .prepare(`INSERT INTO blog_posts
          (title, slug, excerpt, body, status, cadence, seo_title, seo_description, keywords, published_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(
          post.title,
          post.slug,
          post.excerpt,
          post.body,
          post.status,
          post.cadence,
          post.seoTitle,
          post.seoDescription,
          post.keywords,
          post.publishedAt,
        ),
    ),
  );
}

export async function GET() {
  try {
    const db = getD1();
    await ensureTables(db);
    await seedIfEmpty(db);
    const { results } = await db
      .prepare("SELECT * FROM blog_posts ORDER BY status = 'published' DESC, published_at DESC, id DESC")
      .all<DbPostRow>();
    return Response.json({ posts: results.map(fromRow) });
  } catch (error) {
    return Response.json({ posts: starterPosts, warning: "Using starter blog data." });
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireApiUser();
    if (authError) return authError;
    const db = getD1();
    await ensureTables(db);
    const post = normalize((await request.json()) as Partial<BlogPost>);
    if (!post.title || !post.slug) return jsonError("Title and slug are required.", 400);
    await db
      .prepare(`INSERT INTO blog_posts
        (title, slug, excerpt, body, status, cadence, seo_title, seo_description, keywords, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        post.title,
        post.slug,
        post.excerpt,
        post.body,
        post.status,
        post.cadence,
        post.seoTitle,
        post.seoDescription,
        post.keywords,
        post.publishedAt,
      )
      .run();
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const authError = await requireApiUser();
    if (authError) return authError;
    const db = getD1();
    await ensureTables(db);
    const post = normalize((await request.json()) as Partial<BlogPost>);
    if (!post.id) return jsonError("Post id is required.", 400);
    if (!post.title || !post.slug) return jsonError("Title and slug are required.", 400);
    await db
      .prepare(`UPDATE blog_posts SET
        title = ?, slug = ?, excerpt = ?, body = ?, status = ?, cadence = ?,
        seo_title = ?, seo_description = ?, keywords = ?, published_at = ?,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`)
      .bind(
        post.title,
        post.slug,
        post.excerpt,
        post.body,
        post.status,
        post.cadence,
        post.seoTitle,
        post.seoDescription,
        post.keywords,
        post.publishedAt,
        post.id,
      )
      .run();
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error);
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
