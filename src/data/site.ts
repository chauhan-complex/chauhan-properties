/**
 * ─────────────────────────────────────────────────────────────
 *  ALL WEBSITE DATA LIVES IN THIS ONE FILE.
 *
 *  To change a rate, add a listing, or edit the office details:
 *  open this file on github.com, press the pencil icon, edit,
 *  commit to main. GitHub Actions rebuilds and republishes the
 *  site in about two minutes. No database, no admin login.
 * ─────────────────────────────────────────────────────────────
 */

export type Purpose = "sale" | "rent" | "lease";
export type Category =
  | "farmhouse" | "plot" | "agricultural_land" | "house" | "apartment"
  | "shop" | "showroom" | "office" | "building" | "complex" | "warehouse" | "other";
export type AreaUnit = "sqft" | "sqmt" | "sqyd" | "acre" | "bigha" | "biswa";
export type ListingStatus = "available" | "under_offer" | "sold" | "inactive";
export type PriceBasis = "total" | "per_sqft";

export interface SiteSettings {
  businessName: string;
  tagline: string;
  ownerName: string;
  ownerRole: string;
  ownerRoleHi: string;
  sinceYear: string;
  /** Total properties handled, published or not. */
  portfolioTotal: number;
  phone: string;
  whatsapp: string;
  email: string;
  officeAddress: string;
  officeMapUrl: string;
  hours: string;
  hoursHi: string;
  aboutShort: string;
  aboutShortHi: string;
  aboutLong: string;
  aboutLongHi: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}

export interface Property {
  id: number;
  slug: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  purpose: Purpose;
  category: Category;
  status: ListingStatus;
  price: string;
  priceBasis: PriceBasis;
  priceNote: string;
  priceNoteHi: string;
  negotiable: boolean;
  areaValue: string | null;
  areaUnit: AreaUnit;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  locality: string;
  address: string;
  city: string;
  mapUrl: string;
  videoUrl: string;
  images: string[];
  highlights: string[];
  highlightsHi: string[];
  featured: boolean;
  views: number;
  listedAt: string;
}

/* ─────────── office details ─────────── */

export const SITE: SiteSettings = {
  businessName: "Chauhan Properties",
  tagline:
    "Land and property around Sarojini Nagar — Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand.",
  ownerName: "Mukesh Singh Chauhan",
  ownerRole: "Proprietor & Property Dealer",
  ownerRoleHi: "मालिक और प्रॉपर्टी डीलर",
  sinceYear: "2005",
  portfolioTotal: 146,
  phone: "+91 79051 42519",
  whatsapp: "917905142519",
  email: "chauhanproperties.lko@gmail.com",
  officeAddress:
    "Chauhan Complex, Kudrat Vihar Colony,\nSarojini Nagar, Lucknow,\nUttar Pradesh 226008",
  officeMapUrl:
    "https://www.google.com/maps/place/Chauhan+Complex/@26.7458896,80.8612501,17z/data=!4m6!3m5!1s0x399bf9048aa76f4d:0x6c1027dd48cd3e3e!8m2!3d26.7458896!4d80.8612501!16s%2Fg%2F11b7b_hh57",
  hours: "Monday – Saturday, 10:00 am – 8:00 pm\nSunday: by appointment (site visits welcome)",
  hoursHi: "सोमवार – शनिवार, सुबह 10:00 – रात 8:00 बजे\nरविवार: अपॉइंटमेंट पर (साइट विज़िट स्वागत है)",
  aboutShort:
    "Mukesh Singh Chauhan deals in land and property around Sarojini Nagar, Lucknow — Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand. 146 properties in hand; 9 published on this website.",
  aboutShortHi:
    "मुकेश सिंह चौहान सरोजिनी नगर, लखनऊ के आसपास — अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड में ज़मीन और प्रॉपर्टी का काम करते हैं। कुल 146 प्रॉपर्टी, जिनमें से 9 इस वेबसाइट पर लगी हैं।",
  aboutLong:
    "Chauhan Properties works from Chauhan Complex at Kudrat Vihar Colony, Sarojini Nagar, Lucknow. Mukesh Singh Chauhan has spent over twenty years in the property business, and the desk today handles land, plots, houses, buildings and rentals in the villages and colonies around Sarojini Nagar — Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand.\n\nWe work with 146 properties in this belt. Only 9 are published on this website at the moment, because most owners prefer that their property is shared on a call or in person rather than advertised openly. Every listing published here is one whose papers we have read ourselves.\n\nHouse, building, apartment and rental listings are being prepared and will be added to this website soon.",
  aboutLongHi:
    "चाउहान प्रॉपर्टीज़ का दफ्तर चाउहान कॉम्प्लेक्स, कुदरत विहार कॉलोनी, सरोजिनी नगर, लखनऊ में है। मुकेश सिंह चौहान को प्रॉपर्टी के काम में बीस साल से ज़्यादा का अनुभव है। आज यह डेस्क सरोजिनी नगर के आसपास के गाँवों और कॉलोनियों — अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड — में ज़मीन, प्लॉट, मकान, बिल्डिंग और किराये की प्रॉपर्टी का काम संभालती है।\n\nइस इलाके में हमारे पास कुल 146 प्रॉपर्टी हैं। इस वेबसाइट पर फिलहाल सिर्फ़ 9 लगी हैं, क्योंकि ज़्यादातर मालिक नहीं चाहते कि उनकी प्रॉपर्टी खुले तौर पर विज्ञापित हो — वे कॉल पर या मिलकर बता दी जाती हैं। यहाँ लगी हर लिस्टिंग के कागज़ हमने खुद पढ़े हैं।\n\nमकान, बिल्डिंग, फ्लैट और किराये की लिस्टिंग तैयार की जा रही है और जल्द इसी वेबसाइट पर जोड़ दी जाएगी।",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
};

/* ─────────── the nine published land parcels ─────────── */

const mapSearch = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, Lucknow, Uttar Pradesh`)}`;

interface Parcel {
  village: string;
  villageHi: string;
  rate: number;
  featured?: boolean;
  listed: string;
}

const PARCELS: Parcel[] = [
  { village: "Miranpur Pinwat", villageHi: "मीरानपुर पिनवट", rate: 3500, featured: true, listed: "2026-01-12" },
  { village: "Miranpur Pinwat", villageHi: "मीरानपुर पिनवट", rate: 2000, listed: "2026-01-10" },
  { village: "Miranpur Pinwat", villageHi: "मीरानपुर पिनवट", rate: 1500, listed: "2026-01-08" },
  { village: "Miranpur Pinwat", villageHi: "मीरानपुर पिनवट", rate: 1200, listed: "2026-01-06" },
  { village: "Amausi", villageHi: "अमौसी", rate: 2500, featured: true, listed: "2026-01-04" },
  { village: "Amausi", villageHi: "अमौसी", rate: 1500, listed: "2026-01-02" },
  { village: "Amausi", villageHi: "अमौसी", rate: 1000, listed: "2025-12-28" },
  { village: "Aurawan", villageHi: "औरावां", rate: 1500, featured: true, listed: "2025-12-22" },
  { village: "Piparsand", villageHi: "पिपरसंड", rate: 1000, listed: "2025-12-18" },
];

function build(parcel: Parcel, index: number): Property {
  const rate = parcel.rate.toLocaleString("en-IN");
  const published = PARCELS.length;
  const rest = SITE.portfolioTotal - published;
  const base = parcel.village.toLowerCase().replace(/\s+/g, "-");

  return {
    id: index + 1,
    slug: `${base}-land-${parcel.rate}-per-sqft`,
    title: `Land at ${parcel.village} — ₹${rate} per sq.ft`,
    titleHi: `${parcel.villageHi} में ज़मीन — ₹${rate} प्रति वर्ग फुट`,
    description: [
      `A land parcel at ${parcel.village}, in the Sarojini Nagar belt of Lucknow, quoted at ₹${rate} per square foot.`,
      `Exact area, boundaries, khesra number and the revenue record are shared on a call or in person at the office — Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar. We accompany every site visit, and they are arranged the same day in most cases.`,
      `This is one of ${published} parcels published on this website. In total we handle ${SITE.portfolioTotal} properties across Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand — the remaining ${rest} are shared on request, because most owners prefer not to advertise openly.`,
    ].join("\n\n"),
    descriptionHi: [
      `${parcel.villageHi}, सरोजिनी नगर (लखनऊ) के इलाके में ज़मीन का पार्सल — भाव ₹${rate} प्रति वर्ग फुट।`,
      `सही रकबा, हदबन्दी, खसरा संख्या और राजस्व रिकॉर्ड कॉल पर या ऑफिस आकर बताया जाता है — चाउहान कॉम्प्लेक्स, कुदरत विहार कॉलोनी, सरोजिनी नगर। हर साइट विज़िट में हम साथ चलते हैं और ज़्यादातर मामलों में विज़िट उसी दिन हो जाती है।`,
      `इस वेबसाइट पर कुल ${published} पार्सल लगे हैं। हमारे पास अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड में कुल ${SITE.portfolioTotal} प्रॉपर्टी हैं — बाकी ${rest} माँगने पर बताई जाती हैं, क्योंकि ज़्यादातर मालिक अपनी प्रॉपर्टी खुले तौर पर विज्ञापित नहीं करना चाहते।`,
    ].join("\n\n"),
    purpose: "sale",
    category: "plot",
    status: "available",
    price: String(parcel.rate),
    priceBasis: "per_sqft",
    priceNote: "per sq.ft · negotiable",
    priceNoteHi: "प्रति वर्ग फुट · मोल-भाव संभव",
    negotiable: true,
    areaValue: null,
    areaUnit: "sqft",
    bedrooms: 0,
    bathrooms: 0,
    furnishing: "unfurnished",
    locality: parcel.village,
    address: `${parcel.village}, Sarojini Nagar, Lucknow`,
    city: "Lucknow",
    mapUrl: mapSearch(parcel.village),
    videoUrl: "",
    images: [],
    highlights: [
      `Quoted rate ₹${rate} per sq.ft`,
      `${parcel.village}, Sarojini Nagar block, Lucknow`,
      "Exact area, khesra & papers shared on call",
      "Same-day site visit, we accompany you",
      "Registry and mutation handled by us",
    ],
    highlightsHi: [
      `भाव ₹${rate} प्रति वर्ग फुट`,
      `${parcel.villageHi}, सरोजिनी नगर ब्लॉक, लखनऊ`,
      "सही रकबा, खसरा और कागज़ कॉल पर बताए जाते हैं",
      "उसी दिन साइट विज़िट, हम साथ चलते हैं",
      "रजिस्ट्री और दाखिल-खारिज हमारा काम",
    ],
    featured: Boolean(parcel.featured),
    views: 0,
    listedAt: parcel.listed,
  };
}

/* ─────────── adding houses, shops, flats or rentals later ───────────
 *
 * The nine parcels above are generated from rates. When you are ready to
 * publish a house, shop, flat or a rental, add it to EXTRA below using
 * makeListing() — only the fields you pass are required, the rest default:
 *
 *   makeListing({
 *     id: 20,
 *     slug: "house-gauri-2bhk",
 *     title: "2 BHK House at Gauri — ₹45 Lakh",
 *     titleHi: "गौरी में 2 BHK मकान — ₹45 लाख",
 *     locality: "Gauri",
 *     price: "4500000",            // total price; priceBasis stays "total"
 *     category: "house",
 *     bedrooms: 2, bathrooms: 1,
 *     areaValue: "120", areaUnit: "sqmt",
 *     description: "…English…", descriptionHi: "…हिन्दी…",
 *     highlights: ["…"], highlightsHi: ["…"],
 *     images: ["/photos/gauri-house-1.jpg"],
 *     mapUrl: "https://maps.app.goo.gl/…",
 *     listedAt: "2026-02-01",
 *   }),
 */

const DEFAULTS = {
  purpose: "sale",
  category: "plot",
  status: "available",
  priceBasis: "total",
  priceNote: "",
  priceNoteHi: "",
  negotiable: true,
  areaValue: null,
  areaUnit: "sqft",
  bedrooms: 0,
  bathrooms: 0,
  furnishing: "unfurnished",
  address: "",
  city: "Lucknow",
  mapUrl: "",
  videoUrl: "",
  images: [],
  highlights: [],
  highlightsHi: [],
  description: "",
  descriptionHi: "",
  featured: false,
  views: 0,
} as const;

export function makeListing(
  draft: Partial<Property> & Pick<Property, "id" | "slug" | "title" | "titleHi" | "locality" | "price">,
): Property {
  return { ...DEFAULTS, ...draft } as Property;
}

const EXTRA: Property[] = [];

export const LISTINGS: Property[] = [...PARCELS.map(build), ...EXTRA];

/** Villages we deal in — drives filters, the footer and the area map. */
export const SERVICE_AREAS = ["Amausi", "Gauri", "Miranpur Pinwat", "Aurawan", "Piparsand"];
