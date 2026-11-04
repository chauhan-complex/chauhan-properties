import type { MetadataRoute } from "next";
import { LISTINGS } from "@/data/site";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://chauhan.qd.je").replace(/\/$/, "");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/properties/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/sell/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about/`, changeFrequency: "monthly", priority: 0.6 },
  ];

  return [
    ...staticRoutes,
    ...LISTINGS.map((listing) => ({
      url: `${BASE}/properties/${listing.slug}/`,
      lastModified: new Date(listing.listedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: listing.images.slice(0, 4),
    })),
  ];
}
