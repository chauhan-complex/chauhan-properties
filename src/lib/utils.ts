export type Purpose = "sale" | "rent" | "lease";

export type Category =
  | "farmhouse"
  | "plot"
  | "agricultural_land"
  | "house"
  | "apartment"
  | "shop"
  | "showroom"
  | "office"
  | "building"
  | "complex"
  | "warehouse"
  | "other";

export type AreaUnit = "sqft" | "sqmt" | "sqyd" | "acre" | "bigha" | "biswa";

export type ListingStatus = "available" | "under_offer" | "sold" | "inactive";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

const inWords = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

function twoDigits(n: number): string {
  if (n < 10) return inWords[n];
  if (n === 10) return "Ten";
  if (n < 20) {
    const teens = [
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    return teens[n - 11];
  }
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const unit = n % 10;
  return tens[Math.floor(n / 10)] + (unit ? " " + inWords[unit] : "");
}

function threeDigits(n: number): string {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  return (hundred ? inWords[hundred] + " Hundred" : "") + (rest ? (hundred ? " " : "") + twoDigits(rest) : "");
}

export function numberToWords(value: number): string {
  const n = Math.floor(Math.abs(value));
  if (n === 0) return "Zero";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  return parts.join(" ");
}

export type PriceBasis = "total" | "per_sqft";

/** ₹1.85 Cr / ₹62 Lakh / ₹28,000 — the way Lucknow dealers quote. */
export function formatPrice(
  value: number | string,
  purpose: Purpose = "sale",
  basis: PriceBasis = "total",
) {
  const n = Number(value || 0);
  if (basis === "per_sqft") return `₹${n.toLocaleString("en-IN")} / sq.ft`;
  const suffix = purpose === "rent" ? "/mo" : purpose === "lease" ? "/lease" : "";
  if (n >= 10000000) {
    const cr = n / 10000000;
    return `₹${trim(cr)} Cr${suffix}`;
  }
  if (n >= 100000) {
    const l = n / 100000;
    return `₹${trim(l)} Lakh${suffix}`;
  }
  return `₹${n.toLocaleString("en-IN")}${suffix}`;
}

function trim(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, "");
}

export function formatPriceLong(value: number | string) {
  const n = Number(value || 0);
  return `₹${n.toLocaleString("en-IN")}`;
}

const unitLabel: Record<AreaUnit, string> = {
  sqft: "sq.ft",
  sqmt: "sq.mt",
  sqyd: "sq.yd",
  acre: "acre",
  bigha: "bigha",
  biswa: "biswa",
};

export function formatArea(value: string | number | null | undefined, unit: AreaUnit) {
  if (!value) return null;
  const n = Number(value);
  if (!n) return null;
  const plural = n === 1 || unit === "sqft" || unit === "sqmt" || unit === "sqyd" ? "" : "s";
  return `${trim(n)} ${unitLabel[unit]}${plural}`;
}

export const purposeLabel: Record<Purpose, string> = {
  sale: "For Sale",
  rent: "For Rent",
  lease: "For Lease",
};

export const categoryLabel: Record<Category, string> = {
  farmhouse: "Farmhouse",
  plot: "Plot / Land",
  agricultural_land: "Agricultural Land",
  house: "Independent House",
  apartment: "Flat / Apartment",
  shop: "Shop",
  showroom: "Showroom",
  office: "Office Space",
  building: "Commercial Building",
  complex: "Complex",
  warehouse: "Warehouse / Godown",
  other: "Other Property",
};

export const statusLabel: Record<ListingStatus, string> = {
  available: "Available",
  under_offer: "Under Offer",
  sold: "Sold / Closed",
  inactive: "Not Listed",
};

/** Pull exact coordinates out of any Google Maps URL (place link, share link or data blob). */
export function mapsCoords(url: string): { lat: string; lng: string } | null {
  if (!url) return null;
  const at = url.match(/@(-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)/);
  if (at) return { lat: at[1], lng: at[2] };
  const data = url.match(/!3d(-?\d{1,3}\.\d+)!4d(-?\d{1,3}\.\d+)/);
  if (data) return { lat: data[1], lng: data[2] };
  return null;
}

/** Turn any Google Maps link (share link, place link or query link) into an embeddable iframe src. */
export function mapsEmbedUrl(url: string, zoom = 16): string {
  if (!url) return "";
  const raw = url.trim();
  if (raw.includes("output=embed")) return raw;

  // exact coordinates always win — the pin lands on the real spot
  const coords = mapsCoords(raw);
  if (coords) {
    return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=${zoom}&output=embed`;
  }

  let query = "";
  try {
    const parsed = new URL(raw);
    const apiQuery = parsed.searchParams.get("query") || parsed.searchParams.get("q");
    if (apiQuery) {
      query = apiQuery;
    } else if (parsed.pathname.startsWith("/maps/place/")) {
      query = decodeURIComponent(parsed.pathname.replace("/maps/place/", "").split("/@")[0]);
    } else if (parsed.pathname.startsWith("/maps/search/")) {
      query = decodeURIComponent(parsed.pathname.replace("/maps/search/", ""));
    } else if (parsed.pathname.length > 1) {
      query = decodeURIComponent(parsed.pathname).replace(/\+/g, " ");
    }
    if (!query && parsed.hash) query = decodeURIComponent(parsed.hash);
  } catch {
    query = raw;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(query || "Lucknow")}&z=14&output=embed`;
}

export function youtubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  return match ? match[1] : null;
}

export function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(url || "");
}

export function normalizePhone(input: string) {
  return (input || "").replace(/[^\d]/g, "").slice(-10);
}

export function whatsappLink(phone: string, message: string) {
  const digits = normalizePhone(phone);
  const full = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${full}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string) {
  return `tel:${(phone || "").replace(/\s+/g, "")}`;
}

export function formatDate(date: Date | string, lang: "en" | "hi" = "en") {
  const d = typeof date === "string" ? new Date(date) : date;
  return lang === "hi"
    ? d.toLocaleDateString("hi-IN", { day: "2-digit", month: "long", year: "numeric" })
    : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/** Lucknow locality names in Devanagari. Falls back to the English spelling. */
export const LOCALITY_HI: Record<string, string> = {
  Amausi: "अमौसी",
  Gauri: "गौरी",
  "Miranpur Pinwat": "मीरानपुर पिनवट",
  Aurawan: "औरावां",
  Piparsand: "पिपरसंड",
  "Sarojini Nagar": "सरोजिनी नगर",
  "Kudrat Vihar": "कुदरत विहार",
  "Kudrat Vihar Colony": "कुदरत विहार कॉलोनी",
  "Kanpur Road": "कानपुर रोड",
  Lucknow: "लखनऊ",
};

export function localityName(name: string, lang: "en" | "hi" = "en") {
  if (!name) return name;
  if (lang !== "hi") return name;
  return LOCALITY_HI[name] ?? LOCALITY_HI[name.trim()] ?? name;
}

export function timeAgo(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return formatDate(d);
}

/** The belt Chauhan Properties deals in right now (Sarojini Nagar block, Lucknow). */
export const LOCALITIES = [
  "Amausi",
  "Gauri",
  "Miranpur Pinwat",
  "Aurawan",
  "Piparsand",
];

export const CATEGORIES: Array<{
  value: Category;
  label: string;
  blurb: string;
  hi: string;
  blurbHi: string;
}> = [
  { value: "farmhouse", label: "Farmhouses", blurb: "Weekend homes & orchards", hi: "फार्महाउस", blurbHi: "वीकेंड होम और बाग़" },
  { value: "plot", label: "Plots & Land", blurb: "Village land & road-side plots", hi: "प्लॉट और ज़मीन", blurbHi: "गाँव की ज़मीन और रोड-साइड प्लॉट" },
  { value: "agricultural_land", label: "Agricultural Land", blurb: "Bigha / acre parcels", hi: "कृषि भूमि", blurbHi: "बीघा / एकड़ पार्सल" },
  { value: "house", label: "Houses", blurb: "Independent, owner-built", hi: "मकान", blurbHi: "स्वतंत्र, मालिक द्वारा बनवाए" },
  { value: "apartment", label: "Flats", blurb: "1–4 BHK on sale & rent", hi: "फ्लैट", blurbHi: "1–4 BHK बिक्री व किराये पर" },
  { value: "shop", label: "Shops", blurb: "High-street retail", hi: "दुकानें", blurbHi: "मेन रोड रिटेल" },
  { value: "office", label: "Office Space", blurb: "Fitted & bare shell", hi: "ऑफिस स्पेस", blurbHi: "फिटेड और खाली शेल" },
  { value: "building", label: "Buildings", blurb: "Income-generating assets", hi: "बिल्डिंगें", blurbHi: "आमदनी देने वाली संपत्ति" },
  { value: "complex", label: "Complexes", blurb: "Retail & mixed use", hi: "कॉम्प्लेक्स", blurbHi: "रिटेल और मिक्स्ड यूज़" },
  { value: "warehouse", label: "Godowns", blurb: "Storage & logistics", hi: "गोदाम", blurbHi: "स्टोरेज और लॉजिस्टिक्स" },
];
