import { AREAS, LISTINGS, SITE, type Property, type SiteSettings } from "@/data/site";

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

/** A listing with no published rate sorts to the end rather than to zero. */
function priceOf(property: Property, direction: "asc" | "desc") {
  const n = Number(property.price);
  if (!property.price || n === 0) return direction === "asc" ? Number.POSITIVE_INFINITY : -1;
  return n;
}

function matches(property: Property, filters: PropertyFilters) {
  if (filters.purpose && filters.purpose !== "all" && property.purpose !== filters.purpose) return false;
  if (filters.category && filters.category !== "all") {
    const wanted = filters.category as Property["category"];
    if (property.category !== wanted && !(property.covers ?? []).includes(wanted)) return false;
  }
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
      return copy.sort((a, b) => priceOf(a, "asc") - priceOf(b, "asc"));
    case "price_desc":
      return copy.sort((a, b) => priceOf(b, "desc") - priceOf(a, "desc"));
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
  const sameArea = LISTINGS.filter(
    (p) => p.slug !== property.slug && p.locality === property.locality,
  );
  const others = LISTINGS.filter(
    (p) => p.slug !== property.slug && p.locality !== property.locality,
  );
  return [...sameArea, ...others].slice(0, limit);
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
    for (const covered of property.covers ?? []) {
      acc[covered] = (acc[covered] ?? 0) + 1;
    }
    return acc;
  }, {});
}

/** Categories with no listing of their own that are still served by another one. */
export function getCoveredCategories(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const property of LISTINGS) {
    for (const covered of property.covers ?? []) {
      (out[covered] ??= []).push(property.slug);
    }
  }
  return out;
}

/**
 * The rate card. Area rates come from AREAS in src/data/site.ts (what the whole
 * area trades at, and what circle rate is worked from); the parcel count is how
 * many individual listings are published here.
 */
export function rateCard() {
  const rows = new Map<string, { min: number; max: number; count: number; near: string[]; nearHi: string[] }>();
  for (const area of AREAS) {
    rows.set(area.name, {
      min: area.rateMin,
      max: area.rateMax,
      count: 0,
      near: area.near,
      nearHi: area.nearHi,
    });
  }
  for (const property of LISTINGS) {
    const current = rows.get(property.locality);
    if (current) current.count += 1;
    else
      rows.set(property.locality, {
        min: Number(property.price),
        max: Number(property.price),
        count: 1,
        near: property.near,
        nearHi: property.nearHi,
      });
  }
  return rows;
}
