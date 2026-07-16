import type { MetadataRoute } from "next";
import { starterPosts } from "./data";

const baseUrl = "https://www.lillissetsminuetscattery.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/kittens", "/blog", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/kittens" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/kittens" ? 0.9 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const posts = starterPosts
    .filter((post) => post.status === "published")
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...routes, ...posts];
}
