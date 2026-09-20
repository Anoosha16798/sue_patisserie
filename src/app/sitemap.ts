import type { MetadataRoute } from "next";
import { menuItems } from "@/data/menu";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/menu", "/gallery", "/about", "/contact"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/menu" || route === "/gallery" ? 0.9 : 0.8,
  }));

  const itemRoutes = menuItems.map((item) => ({
    url: `${siteConfig.url}/menu/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...itemRoutes];
}
