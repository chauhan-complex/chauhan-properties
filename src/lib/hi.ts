import type { Lang } from "./i18n";
import {
  categoryLabel,
  cn,
  formatArea,
  formatPrice,
  formatDate,
  localityName,
  purposeLabel,
  slugify,
  statusLabel,
  CATEGORIES,
} from "./utils";

export type { Lang };
export { categoryLabel, cn, formatArea, formatPrice, formatDate, localityName, purposeLabel, slugify, statusLabel, CATEGORIES };

/** Pick a value by language: L(lang, "Sale", "बिक्री") */
export function L<T>(lang: Lang, en: T, hi: T): T {
  return lang === "hi" ? hi : en;
}

const PURPOSE_HI: Record<string, string> = {
  sale: "बिक्री के लिए",
  rent: "किराये पर",
  lease: "लीज़ पर",
};

const CATEGORY_HI: Record<string, string> = {
  farmhouse: "फार्महाउस",
  plot: "प्लॉट / ज़मीन",
  agricultural_land: "कृषि भूमि",
  house: "स्वतंत्र मकान",
  apartment: "फ्लैट / अपार्टमेंट",
  shop: "दुकान",
  showroom: "शोरूम",
  office: "ऑफिस स्पेस",
  building: "कमर्शियल बिल्डिंग",
  complex: "कॉम्प्लेक्स",
  warehouse: "गोदाम",
  other: "अन्य प्रॉपर्टी",
};

const STATUS_HI: Record<string, string> = {
  available: "उपलब्ध",
  under_offer: "ऑफर पर",
  sold: "बिक चुकी",
  inactive: "सूची में नहीं",
};

const UNIT_HI: Record<string, string> = {
  sqft: "वर्ग फुट",
  sqmt: "वर्ग मीटर",
  sqyd: "वर्ग गज",
  acre: "एकड़",
  bigha: "बीघा",
  biswa: "बिस्वा",
};

const FURNISHING_HI: Record<string, string> = {
  unfurnished: "खाली",
  "semi-furnished": "आधा सजा हुआ",
  furnished: "पूरी तरह सजा हुआ",
};

export function purposeText(value: string, lang: Lang) {
  return lang === "hi" ? (PURPOSE_HI[value] ?? purposeLabel[value as keyof typeof purposeLabel] ?? value) : value;
}

export function categoryText(value: string, lang: Lang) {
  return lang === "hi"
    ? (CATEGORY_HI[value] ?? categoryLabel[value as keyof typeof categoryLabel] ?? value)
    : (categoryLabel[value as keyof typeof categoryLabel] ?? value);
}

export function statusText(value: string, lang: Lang) {
  return lang === "hi" ? (STATUS_HI[value] ?? value) : (statusLabel[value as keyof typeof statusLabel] ?? value);
}

export function unitText(value: string, lang: Lang) {
  return lang === "hi" ? (UNIT_HI[value] ?? value) : value;
}

export function furnishingText(value: string, lang: Lang) {
  const key = (value || "unfurnished").toLowerCase();
  if (lang !== "hi") return key.replace(/^\w/, (c) => c.toUpperCase());
  return FURNISHING_HI[key] ?? key;
}

export function categoryOptions(lang: Lang) {
  return CATEGORIES.map((c) => ({
    value: c.value,
    label: lang === "hi" ? c.hi : c.label,
    blurb: lang === "hi" ? c.blurbHi : c.blurb,
  }));
}

/** ₹1.85 करोड़ / ₹62 लाख / ₹28,000 प्रति माह */
export function priceText(
  value: number | string,
  purpose: string,
  lang: Lang,
  basis: "total" | "per_sqft" = "total",
) {
  const n = Number(value || 0);
  if (basis === "per_sqft") {
    return lang === "hi"
      ? `₹${n.toLocaleString("en-IN")} प्रति वर्ग फुट`
      : `₹${n.toLocaleString("en-IN")} / sq.ft`;
  }
  if (lang !== "hi") return formatPrice(n, purpose as "sale" | "rent" | "lease");
  const suffix = purpose === "rent" ? "/माह" : purpose === "lease" ? "/लीज़" : "";
  if (n >= 10000000) return `₹${trimNum(n / 10000000)} करोड़${suffix}`;
  if (n >= 100000) return `₹${trimNum(n / 100000)} लाख${suffix}`;
  return `₹${n.toLocaleString("en-IN")}${suffix}`;
}

function trimNum(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, "");
}

/** Price label for a listing, honouring per sq.ft rates and rate ranges. */
export function listingPriceText(
  property: { price: string; priceMax?: string | null; purpose: string; priceBasis?: string | null },
  lang: Lang,
) {
  // No number means the owner does not publish a rate — deal is done in person.
  if (!property.price || Number(property.price) === 0) {
    return lang === "hi" ? "भाव पूछिए" : "Price on request";
  }
  const fmt = (n: number) => n.toLocaleString("en-IN");
  if (property.priceBasis === "per_sqft") {
    const a = fmt(Number(property.price));
    const b = property.priceMax ? fmt(Number(property.priceMax)) : null;
    const body = b && b !== a ? `₹${a}–${b}` : `₹${a}`;
    return lang === "hi" ? `${body} प्रति वर्ग फुट` : `${body} / sq.ft`;
  }
  return priceText(property.price, property.purpose, lang, "total");
}

export function areaText(value: string | number | null | undefined, unit: string, lang: Lang) {
  if (lang !== "hi") return formatArea(value, unit as Parameters<typeof formatArea>[1]);
  if (!value) return null;
  const n = Number(value);
  if (!n) return null;
  return `${trimNum(n)} ${unitText(unit, lang)}`;
}

export function dateText(date: Date | string, lang: Lang) {
  return formatDate(date, lang);
}

/* ─────────── हिन्दी संख्या शब्द ─────────── */

const HI_NUMBERS = [
  "शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ", "दस", "ग्यारह", "बारह",
  "तेरह", "चौदह", "पंद्रह", "सोलह", "सत्रह", "अठारह", "उन्नीस", "बीस", "इक्कीस", "बाईस", "तेईस",
  "चौबीस", "पच्चीस", "छब्बीस", "सत्ताईस", "अट्ठाईस", "उनतीस", "तीस", "इकतीस", "बत्तीस", "तैंतीस",
  "चौंतीस", "पैंतीस", "छत्तीस", "सैंतीस", "अड़तीस", "उनतालीस", "चालीस", "इकतालीस", "बयालीस",
  "तैंतालीस", "चवालीस", "पैंतालीस", "छियालीस", "सैंतालीस", "अड़तालीस", "उनचास", "पचास", "इक्यावन",
  "बावन", "तिरेपन", "चौपन", "पचपन", "छप्पन", "सत्तावन", "अट्ठावन", "उनसाठ", "साठ", "इकसठ",
  "बासठ", "तिरेसठ", "चौंसठ", "पैंसठ", "छियासठ", "सड़सठ", "अड़सठ", "नवासी", "नब्बे", "इक्यानवे",
  "बानवे", "तिरानवे", "चौरानवे", "पंचानवे", "छियानवे", "सत्तानवे", "अट्ठानवे", "निन्यानवे", "सौ",
];

function hiTwo(n: number): string {
  return HI_NUMBERS[n] ?? String(n);
}

function hiThree(n: number): string {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  if (!hundred) return hiTwo(rest);
  return `${HI_NUMBERS[hundred]} सौ${rest ? " " + hiTwo(rest) : ""}`;
}

export function numberToWordsHi(value: number): string {
  const n = Math.floor(Math.abs(value));
  if (n === 0) return "शून्य";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${hiThree(crore)} करोड़`);
  if (lakh) parts.push(`${hiTwo(lakh)} लाख`);
  if (thousand) parts.push(`${hiTwo(thousand)} हज़ार`);
  if (rest) parts.push(hiThree(rest));
  return parts.join(" ");
}
