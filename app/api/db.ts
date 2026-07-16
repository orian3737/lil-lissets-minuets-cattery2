import { env } from "cloudflare:workers";

export type DbKittenRow = {
  id: number;
  name: string;
  sex: string;
  born: string;
  standard: string;
  tica: string;
  show_quality: string;
  availability: string;
  mother: string;
  breed: string;
  price: string;
  status: string;
  image_url: string;
  notes: string;
};

export type DbPostRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: string;
  cadence: string;
  seo_title: string;
  seo_description: string;
  keywords: string;
  published_at: string;
};

type EnvWithStorage = {
  DB?: D1Database;
  KITTEN_MEDIA?: R2Bucket;
};

export function getD1() {
  const db = (env as EnvWithStorage).DB;
  if (!db) {
    throw new Error("The site database is not available yet.");
  }
  return db;
}

export function getMediaBucket() {
  const bucket = (env as EnvWithStorage).KITTEN_MEDIA;
  if (!bucket) {
    throw new Error("The media bucket is not available yet.");
  }
  return bucket;
}

export async function ensureTables(db = getD1()) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS kittens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sex TEXT NOT NULL DEFAULT '',
      born TEXT NOT NULL DEFAULT '',
      standard TEXT NOT NULL DEFAULT '',
      tica TEXT NOT NULL DEFAULT 'Registered',
      show_quality TEXT NOT NULL DEFAULT '',
      availability TEXT NOT NULL DEFAULT '',
      mother TEXT NOT NULL DEFAULT '',
      breed TEXT NOT NULL DEFAULT 'Minuet',
      price TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'available',
      image_url TEXT NOT NULL DEFAULT '/hero-cattery.png',
      notes TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'draft',
      cadence TEXT NOT NULL DEFAULT 'monthly',
      seo_title TEXT NOT NULL DEFAULT '',
      seo_description TEXT NOT NULL DEFAULT '',
      keywords TEXT NOT NULL DEFAULT '',
      published_at TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
  ]);
}

export function jsonError(error: unknown, status = 500) {
  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : "Unexpected error";
  return Response.json({ error: message }, { status });
}
