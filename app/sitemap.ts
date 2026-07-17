import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { serviceHubs } from "@/content/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl;
  const now = new Date();

  const staticPages = ["", "/about", "/contact"];

  const core: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const services: MetadataRoute.Sitemap = serviceHubs.map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...core, ...services];
}
