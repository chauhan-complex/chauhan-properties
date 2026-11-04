import { LISTINGS, SITE, type Property, type SiteSettings } from "@/data/site";

/**
 * Read-only data layer over `src/data/site.ts`.
 * Same shape the old database helpers had, so pages barely change — but now it
 * is plain TypeScript, which means the site can be exported as static files and
 * hosted on GitHub Pages.
 */

export type SortKey = "newest" | "price_asc" | "price_desc" | "popular";

export interface PropertyFilters {
  purpose?: string;
  category?: string;
  locality?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  sort?: SortKey;
  featuredOnly?: boolean;
  limit?: number;
  offset?: number;
}

export function getSettings(): SiteSettings {
  return SITE;
}

export function allProperties(): Property[] {
  return LISTINGS;
}

function matches(property: Property, filters: PropertyFilters) {
  if (filters.purpose && filters.purpose !== "all" && property.purpose !== filters.purpose) return false;
  if (filters.category && filters.category !== "all" && property.category !== filters.category) return false;
  if (filters.locality && filters.locality !== "all" && property.locality !== filters.locality) return false;
  if (filters.featuredOnly && !property.featured) return false;
  if (property.status === "inactive") return false;

  const price = Number(property.price);
  if (filters.minPrice && price < filters.minPrice) return false;
  if (filters.maxPrice && price > filters.maxPrice) return false;
  if (filters.bedrooms && (property.bedrooms ?? 0) < filters.bedrooms) return false;

  if (filters.q) {
    const term = filters.q.toLowerCase();
    const haystack = [
      property.title,
      property.titleHi,
      property.description,
      property.locality,
      property.address,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(term)) return false;
  }
  return true;
}

function sortRows(rows: Property[], sort: SortKey = "newest") {
  const copy = [...rows];
  switch (sort) {
    case "price_asc":
      return copy.sort((a, b) => Number(a.price) - Number(b.price));
    case "price_desc":
      return copy.sort((a, b) => Number(b.price) - Number(a.price));
    case "popular":
      return copy.sort((a, b) => b.views - a.views || Number(b.featured) - Number(a.featured));
    default:
      return copy.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime(),
      );
  }
}

export function listProperties(filters: PropertyFilters = {}): Property[] {
  const rows = sortRows(LISTINGS.filter((p) => matches(p, filters)), filters.sort);
  const offset = filters.offset ?? 0;
  const end = filters.limit ? offset + filters.limit : undefined;
  return rows.slice(offset, end);
}

export function countProperties(filters: PropertyFilters = {}): number {
  return LISTINGS.filter((p) => matches(p, filters)).length;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return LISTINGS.find((p) => p.slug === slug);
}

export function getSimilar(property: Property, limit = 3): Property[] {
  const sameVillage = LISTINGS.filter(
    (p) => p.slug !== property.slug && p.locality === property.locality,
  );
  const others = LISTINGS.filter(
    (p) => p.slug !== property.slug && p.locality !== property.locality,
  );
  return [...sameVillage, ...others].slice(0, limit);
}

export function getStats() {
  const localities = Array.from(new Set(LISTINGS.map((p) => p.locality)));
  return {
    total: LISTINGS.length,
    available: LISTINGS.filter((p) => p.status === "available").length,
    forSale: LISTINGS.filter((p) => p.purpose === "sale").length,
    forRent: LISTINGS.filter((p) => p.purpose === "rent").length,
    forLease: LISTINGS.filter((p) => p.purpose === "lease").length,
    localities,
    views: LISTINGS.reduce((sum, p) => sum + p.views, 0),
  };
}

export function getCategoryCounts(): Record<string, number> {
  return LISTINGS.reduce<Record<string, number>>((acc, property) => {
    acc[property.category] = (acc[property.category] ?? 0) + 1;
    return acc;
  }, {});
}

/** Minimum and maximum quoted rate per village, for the rate card. */
export function rateCard() {
  const rows = new Map<string, { min: number; max: number; count: number }>();
  for (const property of LISTINGS) {
    if (property.priceBasis !== "per_sqft") continue;
    const rate = Number(property.price);
    const current = rows.get(property.locality);
    if (!current) rows.set(property.locality, { min: rate, max: rate, count: 1 });
    else {
      current.min = Math.min(current.min, rate);
      current.max = Math.max(current.max, rate);
      current.count += 1;
    }
  }
  return rows;
}
