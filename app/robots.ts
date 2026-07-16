import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/lisseth-keyhole"],
    },
    sitemap: "https://www.lillissetsminuetscattery.com/sitemap.xml",
  };
}
