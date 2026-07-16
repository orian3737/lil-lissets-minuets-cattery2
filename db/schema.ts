import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const kittens = sqliteTable("kittens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  sex: text("sex").notNull().default(""),
  born: text("born").notNull().default(""),
  standard: text("standard").notNull().default(""),
  tica: text("tica").notNull().default("Registered"),
  showQuality: text("show_quality").notNull().default(""),
  availability: text("availability").notNull().default(""),
  mother: text("mother").notNull().default(""),
  breed: text("breed").notNull().default("Minuet"),
  price: text("price").notNull().default(""),
  status: text("status").notNull().default("available"),
  imageUrl: text("image_url").notNull().default("/hero-cattery.png"),
  notes: text("notes").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  body: text("body").notNull().default(""),
  status: text("status").notNull().default("draft"),
  cadence: text("cadence").notNull().default("monthly"),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  keywords: text("keywords").notNull().default(""),
  publishedAt: text("published_at").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
