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
  /** Landmarks close to the property — what the circle rate is based on. */
  near: string[];
  nearHi: string[];
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
    "Mukesh Singh Chauhan deals in land and property around Sarojini Nagar, Lucknow — Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand. 146 properties in hand; 9 published on this website. One person, one number — he handles everything himself.",
  aboutShortHi:
    "मुकेश सिंह चौहान सरोजिनी नगर, लखनऊ के आसपास — अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड में ज़मीन और प्रॉपर्टी का काम करते हैं। कुल 146 प्रॉपर्टी, जिनमें से 9 इस वेबसाइट पर लगी हैं। एक व्यक्ति, एक नंबर — सारा काम वे खुद करते हैं।",
  aboutLong:
    "Chauhan Properties works from Chauhan Complex at Kudrat Vihar Colony, Sarojini Nagar, Lucknow. Mukesh Singh Chauhan has spent over twenty years in the property business, and today handles land, plots, houses, buildings and rentals across Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand.\n\nThere is one point of contact — the owner himself. He reads the papers, shows the property, does the negotiation, arranges the amin and the registry, and stays with the file until mutation is complete. When you call, you speak to the person who will actually do the work.\n\nWe handle 146 properties in this belt. Only 9 are published on this website at the moment, because most owners prefer that their property is shared on a call or in person rather than advertised openly. Every listing published here is one whose papers we have read ourselves.\n\nHouse, building, apartment and rental listings are being prepared and will be added to this website soon.",
  aboutLongHi:
    "चाउहान प्रॉपर्टीज़ का दफ्तर चाउहान कॉम्प्लेक्स, कुदरत विहार कॉलोनी, सरोजिनी नगर, लखनऊ में है। मुकेश सिंह चौहान को प्रॉपर्टी के काम में बीस साल से ज़्यादा का अनुभव है। आज वे अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड में ज़मीन, प्लॉट, मकान, बिल्डिंग और किराये की प्रॉपर्टी का काम संभालते हैं।\n\nसंपर्क का एक ही केंद्र है — खुद मालिक। कागज़ वे ही पढ़ते हैं, प्रॉपर्टी वे ही दिखाते हैं, मोल-भाव वे ही करते हैं, अमीन और रजिस्ट्री की व्यवस्था भी वही करते हैं, और दाखिल-खारिज पूरी होने तक फाइल साथ रहती है। आप फोन करेंगे तो उसी व्यक्ति से बात होगी जो काम करेगा।\n\nइस इलाके में हमारे पास कुल 146 प्रॉपर्टी हैं। इस वेबसाइट पर फिलहाल सिर्फ़ 9 लगी हैं, क्योंकि ज़्यादातर मालिक नहीं चाहते कि उनकी प्रॉपर्टी खुले तौर पर विज्ञापित हो — वे कॉल पर या मिलकर बता दी जाती हैं। यहाँ लगी हर लिस्टिंग के कागज़ हमने खुद पढ़े हैं।\n\nमकान, बिल्डिंग, फ्लैट और किराये की लिस्टिंग तैयार की जा रही है और जल्द इसी वेबसाइट पर जोड़ दी जाएगी।",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
};

/* ─────────── the areas we deal in ───────────
 *
 * rateMin / rateMax are the AREA rates in ₹ per sq.ft — what the whole area
 * trades at, and what the circle rate is worked out from. `near` holds the
 * landmarks beside the area; they matter for the circle rate and they are what
 * a buyer actually searches for.
 *
 * Gauri has one published parcel (₹3,500) and no landmark list yet — add
 * `near` / `nearHi` when you have them.
 */

export interface Area {
  name: string;
  nameHi: string;
  rateMin: number;
  rateMax: number;
  near: string[];
  nearHi: string[];
  /** Optional extra line added to the listing description. */
  note?: string;
  noteHi?: string;
}

export const AREAS: Area[] = [
  {
    name: "Amausi",
    nameHi: "अमौसी",
    rateMin: 1000,
    rateMax: 2500,
    near: ["CCS Airport", "TS Mishra Medical College", "Sainik School"],
    nearHi: ["CCS एयरपोर्ट", "टी.एस. मिश्रा मेडिकल कॉलेज", "सैनिक स्कूल"],
    note: "CCS Airport here is the Chaudhary Charan Singh International Airport.",
    noteHi: "यहाँ CCS एयरपोर्ट का अर्थ है चौधरी चरण सिंह अंतरराष्ट्रीय हवाई अड्डा।",
  },
  {
    name: "Gauri",
    nameHi: "गौरी",
    rateMin: 3500,
    rateMax: 3500,
    near: [
      "DMart",
      "Greenberry World School",
      "Haveli Resort",
      "Paradise Guest House",
      "Azad Vihar Guest House",
      "Avadh Collegiate School",
    ],
    nearHi: [
      "डीमार्ट",
      "ग्रीनबेरी वर्ल्ड स्कूल",
      "हवेली रिसॉर्ट",
      "पैराडाइस गेस्ट हाउस",
      "आज़ाद विहार गेस्ट हाउस",
      "अवध कॉलेजिएट स्कूल",
    ],
  },
  {
    name: "Miranpur Pinwat",
    nameHi: "मीरानपुर पिनवट",
    rateMin: 1200,
    rateMax: 2500,
    near: ["Ring Road", "Tahseel"],
    nearHi: ["रिंग रोड", "तहसील"],
  },
  {
    name: "Aurawan",
    nameHi: "औरावां",
    rateMin: 1500,
    rateMax: 2500,
    near: ["Aurawan Research Center & Forensic Lab", "Police Training Institute"],
    nearHi: ["औरावां रिसर्च सेंटर और फॉरेंसिक लैब", "पुलिस ट्रेनिंग इंस्टीट्यूट"],
  },
  {
    name: "Piparsand",
    nameHi: "पिपरसंड",
    rateMin: 1000,
    rateMax: 1500,
    near: ["Railway Station"],
    nearHi: ["रेलवे स्टेशन"],
  },
];

export function findArea(name: string): Area | undefined {
  return AREAS.find((area) => area.name === name);
}

/** Compact form for tight spaces such as the SVG area map. */
export function areaRateShort(area: Area, lang: "en" | "hi" = "en") {
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const body = area.rateMin === area.rateMax ? `₹${fmt(area.rateMin)}` : `₹${fmt(area.rateMin)}–${fmt(area.rateMax)}`;
  return lang === "hi" ? `${body}/वर्ग फुट` : `${body}/sq.ft`;
}

/** "₹1,000 – ₹2,500 / sq.ft" or "₹3,500 / sq.ft" when min equals max. */
export function areaRateText(area: Area, lang: "en" | "hi" = "en") {
  const unit = lang === "hi" ? "प्रति वर्ग फुट" : "/ sq.ft";
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const body =
    area.rateMin === area.rateMax
      ? `₹${fmt(area.rateMin)}`
      : `₹${fmt(area.rateMin)} – ₹${fmt(area.rateMax)}`;
  return lang === "hi" ? `${body} ${unit}` : `${body} ${unit}`;
}

export function areaNearText(area: Area, lang: "en" | "hi" = "en") {
  const list = lang === "hi" ? area.nearHi : area.near;
  return list.length ? list.join(" · ") : "";
}

/* ─────────── the nine published land parcels ─────────── */

const mapSearch = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, Lucknow, Uttar Pradesh`)}`;

interface Parcel {
  area: string;
  rate: number;
  featured?: boolean;
  listed: string;
}

const PARCELS: Parcel[] = [
  { area: "Gauri", rate: 3500, featured: true, listed: "2026-01-12" },
  { area: "Amausi", rate: 2500, featured: true, listed: "2026-01-04" },
  { area: "Miranpur Pinwat", rate: 2000, featured: true, listed: "2026-01-10" },
  { area: "Miranpur Pinwat", rate: 1500, listed: "2026-01-08" },
  { area: "Miranpur Pinwat", rate: 1200, listed: "2026-01-06" },
  { area: "Amausi", rate: 1500, listed: "2026-01-02" },
  { area: "Amausi", rate: 1000, listed: "2025-12-28" },
  { area: "Aurawan", rate: 1500, listed: "2025-12-22" },
  { area: "Piparsand", rate: 1000, listed: "2025-12-18" },
];

function build(parcel: Parcel, index: number): Property {
  const area = findArea(parcel.area) ?? {
    name: parcel.area,
    nameHi: parcel.area,
    rateMin: parcel.rate,
    rateMax: parcel.rate,
    near: [],
    nearHi: [],
  };
  const rate = parcel.rate.toLocaleString("en-IN");
  const published = PARCELS.length;
  const rest = SITE.portfolioTotal - published;
  const slugBase = area.name.toLowerCase().replace(/\s+/g, "-");
  const nearEn = area.near.length
    ? ` Close to ${area.near.join(", ")}.${area.note ? ` ${area.note}` : ""}`
    : area.note
      ? ` ${area.note}`
      : "";
  const nearHi = area.nearHi.length
    ? ` आसपास: ${area.nearHi.join(", ")}।${area.noteHi ? ` ${area.noteHi}` : ""}`
    : area.noteHi
      ? ` ${area.noteHi}`
      : "";

  return {
    id: index + 1,
    slug: `${slugBase}-land-${parcel.rate}-per-sqft`,
    title: `Land at ${area.name} — ₹${rate} per sq.ft`,
    titleHi: `${area.nameHi} में ज़मीन — ₹${rate} प्रति वर्ग फुट`,
    description: [
      `A land parcel at ${area.name}, in the Sarojini Nagar belt of Lucknow, quoted at ₹${rate} per square foot.${nearEn}`,
      `Exact area, boundaries, khesra number and the revenue record are shared on a call or in person at the office — Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar. Land here is priced against the area's circle rate, which is what these nearby landmarks are worked from, so tell us your budget and we will tell you which parcels fit it.`,
      `One person handles the whole thing — ${SITE.ownerName}. He accompanies every site visit, and they are arranged the same day in most cases.`,
      `This is one of ${published} parcels published on this website. In total we handle ${SITE.portfolioTotal} properties across Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand — the remaining ${rest} are shared on request, because most owners prefer not to advertise openly.`,
    ].join("\n\n"),
    descriptionHi: [
      `${area.nameHi}, सरोजिनी नगर (लखनऊ) के इलाके में ज़मीन का पार्सल — भाव ₹${rate} प्रति वर्ग फुट।${nearHi}`,
      `सही रकबा, हदबन्दी, खसरा संख्या और राजस्व रिकॉर्ड कॉल पर या ऑफिस आकर बताया जाता है — चाउहान कॉम्प्लेक्स, कुदरत विहार कॉलोनी, सरोजिनी नगर। यहाँ ज़मीन का दाम इलाके के सर्किल रेट के हिसाब से तय होता है, और सर्किल रेट इन्हीं आसपास के स्थलों के आधार पर बनता है — इसलिए अपना बजट बताइए, हम बता देंगे कि कौन से पार्सल उसमें फिट बैठते हैं।`,
      `पूरा काम एक ही व्यक्ति संभालते हैं — ${SITE.ownerName}। हर साइट विज़िट में वे साथ चलते हैं और ज़्यादातर मामलों में विज़िट उसी दिन हो जाती है।`,
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
    locality: area.name,
    address: `${area.name}, Sarojini Nagar, Lucknow`,
    city: "Lucknow",
    mapUrl: mapSearch(area.name),
    videoUrl: "",
    images: [],
    near: area.near,
    nearHi: area.nearHi,
    highlights: [
      `Quoted rate ₹${rate} per sq.ft`,
      area.near.length ? `Near ${area.near.join(", ")}` : `${area.name}, Sarojini Nagar, Lucknow`,
      `${area.name} trades at ${areaRateText(area, "en")}`,
      "Exact area, khesra & papers shared on call",
      "Same-day site visit, the owner comes with you",
      "Registry and mutation handled by us",
    ],
    highlightsHi: [
      `भाव ₹${rate} प्रति वर्ग फुट`,
      area.nearHi.length ? `पास में ${area.nearHi.join(", ")}` : `${area.nameHi}, सरोजिनी नगर, लखनऊ`,
      `${area.nameHi} का भाव ${areaRateText(area, "hi")}`,
      "सही रकबा, खसरा और कागज़ कॉल पर बताए जाते हैं",
      "उसी दिन साइट विज़िट, मालिक खुद साथ चलते हैं",
      "रजिस्ट्री और दाखिल-खारिज हमारा काम",
    ],
    featured: Boolean(parcel.featured),
    views: 0,
    listedAt: parcel.listed,
  };
}

/* ─────────── adding houses, shops, flats or rentals later ───────────
 *
 * Use makeListing() in EXTRA below — only the fields you pass are required,
 * the rest default:
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
 *     near: ["Ring Road"], nearHi: ["रिंग रोड"],
 *     description: "…English…", descriptionHi: "…हिन्दी…",
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
  near: [],
  nearHi: [],
  highlights: [],
  highlightsHi: [],
  description: "",
  descriptionHi: "",
  featured: false,
  views: 0,
} as const;

export function makeListing(
  draft: Partial<Property> &
    Pick<Property, "id" | "slug" | "title" | "titleHi" | "locality" | "price">,
): Property {
  return { ...DEFAULTS, ...draft } as Property;
}

const EXTRA: Property[] = [];

export const LISTINGS: Property[] = [...PARCELS.map(build), ...EXTRA];

/** The areas we deal in — drives filters, the footer and the area map. */
export const SERVICE_AREAS = AREAS.map((area) => area.name);
