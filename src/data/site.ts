/**
 * ─────────────────────────────────────────────────────────────
 *  ALL WEBSITE DATA LIVES IN THIS ONE FILE.
 *
 *  To change a rate, add a listing, or edit the office details:
 *  open this file on github.com, press the pencil icon, edit,
 *  commit to main. GitHub Actions rebuilds and republishes the
 *  site in about two minutes. No database, no admin login.
 *
 *  Each plot below carries its own Google Maps link and exact
 *  coordinates, so the map on its page pins the real spot.
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
  portfolioTotal: number;
  phone: string;
  whatsapp: string;
  email: string;
  officeAddress: string;
  officeMapUrl: string;
  officeLat: number;
  officeLng: number;
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
  /** Upper bound when a listing covers more than one rate (e.g. two adjacent plots). */
  priceMax: string | null;
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
  lat: number | null;
  lng: number | null;
  /** Coordinates exactly as the owner quotes them, shown on the page. */
  coordsLabel: string;
  videoUrl: string;
  images: string[];
  /**
   * Other categories this one listing also answers to. Chauhan Complex is a
   * single building that supplies shops, offices, flats, godowns and building
   * space, so filtering by any of those should surface it.
   */
  covers?: Category[];
  /** Optional caption per image, used when filenames are opaque (e.g. Drive URLs). */
  imageCaptions?: Array<{ en: string; hi: string }>;
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
  officeLat: 26.7458896,
  officeLng: 80.8612501,
  hours: "Monday – Saturday, 10:00 am – 8:00 pm\nSunday: by appointment (site visits welcome)",
  hoursHi: "सोमवार – शनिवार, सुबह 10:00 – रात 8:00 बजे\nरविवार: अपॉइंटमेंट पर (साइट विज़िट स्वागत है)",
  aboutShort:
    "Mukesh Singh Chauhan owns the land and property listed here, around Sarojini Nagar, Lucknow — Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand. 146 properties of his own; 11 published on this website. You deal with the owner directly — one person, one number.",
  aboutShortHi:
    "मुकेश सिंह चौहान सरोजिनी नगर, लखनऊ के आसपास — अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड की ज़मीन और प्रॉपर्टी के स्वयं मालिक हैं। उनकी कुल 146 प्रॉपर्टी हैं, जिनमें से 11 इस वेबसाइट पर लगी हैं। बात सीधे मालिक से होती है — एक व्यक्ति, एक नंबर।",
  aboutLong:
    "Chauhan Properties works from Chauhan Complex at Kudrat Vihar Colony, Sarojini Nagar, Lucknow. Mukesh Singh Chauhan has spent over twenty years in the property business, and the land, plots and buildings listed here are his own — in Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand.\n\nThere is one point of contact — the owner himself. Because every property here is his own, the papers are already in his hands: he reads them out to you, shows you the ground, does the negotiation, arranges the amin and the registry, and stays with the file until mutation is complete. When you call, you speak to the man who owns what you are buying.\n\nHe owns 146 properties in this belt. Only a handful are published on this website at the moment — the rest are shared on a call or in person, because most of them are simply not advertised openly. Buying here means buying direct from the owner: no broker chain, no second dealer's margin, and somebody who can answer any question about the papers without making a phone call first. Each listing carries its own map pin so you can see exactly where it sits.\n\nHouse, building, apartment and rental listings are being prepared and will be added to this website soon.",
  aboutLongHi:
    "चौहान प्रॉपर्टीज़ का दफ्तर चौहान कॉम्प्लेक्स, कुदरत विहार कॉलोनी, सरोजिनी नगर, लखनऊ में है। मुकेश सिंह चौहान को प्रॉपर्टी के काम में बीस साल से ज़्यादा का अनुभव है। यहाँ लगी ज़मीन, प्लॉट और मकान उन्हीं के हैं — अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड में।\n\nसंपर्क का एक ही केंद्र है — खुद मालिक। यहाँ लगी हर प्रॉपर्टी उनकी अपनी है, इसलिए कागज़ पहले से उनके हाथ में हैं: वे पढ़कर सुनाते हैं, ज़मीन खुद दिखाते हैं, मोल-भाव खुद करते हैं, अमीन और रजिस्ट्री की व्यवस्था भी वही करते हैं, और दाखिल-खारिज पूरी होने तक फाइल साथ रहती है। आप फोन करेंगे तो उसी व्यक्ति से बात होगी जो उस ज़मीन के मालिक हैं।\n\nइस इलाके में उनके नाम कुल 146 प्रॉपर्टी हैं। इस वेबसाइट पर फिलहाल गिनी-चुनी ही लगी हैं — बाकी कॉल पर या मिलकर बताई जाती हैं, क्योंकि ज़्यादातर प्रॉपर्टी खुले तौर पर विज्ञापित नहीं की जाती। यहाँ से खरीदने का मतलब है सीधे मालिक से खरीदना: न कोई बिचौलिया, न दूसरे डीलर का मार्जिन, और कागज़ों के बारे में कोई भी सवाल उसी वक़्त जवाब मिल जाता है। हर लिस्टिंग पर अपना मैप पिन है ताकि आप देख सकें कि ज़मीन कहाँ है।\n\nमकान, बिल्डिंग, फ्लैट और किराये की लिस्टिंग तैयार की जा रही है और जल्द इसी वेबसाइट पर जोड़ दी जाएगी।",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
};

/* ─────────── the areas we deal in ───────────
 *
 * rateMin / rateMax are the AREA rates in ₹ per sq.ft.
 * `near` holds the landmarks beside the area — they matter for the circle rate
 * and they are what a buyer searches for. `nearShort` is the compact version
 * used inside the SVG map, where space is tight.
 */

export interface Area {
  name: string;
  nameHi: string;
  rateMin: number;
  rateMax: number;
  near: string[];
  nearHi: string[];
  nearShort?: string[];
  nearShortHi?: string[];
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
    nearShort: ["DMart", "Greenberry World School", "Haveli Resort"],
    nearShortHi: ["डीमार्ट", "ग्रीनबेरी वर्ल्ड स्कूल", "हवेली रिसॉर्ट"],
  },
  {
    name: "Miranpur Pinwat",
    nameHi: "मीरानपुर पिनवट",
    rateMin: 800,
    rateMax: 2500,
    near: ["Ring Road", "Tahseel"],
    nearHi: ["रिंग रोड", "तहसील"],
  },
  {
    name: "Aurawan",
    nameHi: "औरावां",
    rateMin: 1500,
    rateMax: 2500,
    near: [
      "Uttar Pradesh State Institute of Forensic Science (UPSIFS)",
      "Police Training Institute",
    ],
    nearHi: [
      "उत्तर प्रदेश राज्य फॉरेंसिक विज्ञान संस्थान (UPSIFS)",
      "पुलिस ट्रेनिंग इंस्टीट्यूट",
    ],
    nearShort: ["UPSIFS", "Police Training Institute"],
    nearShortHi: ["यूपीएसआईएफएस", "पुलिस ट्रेनिंग इंस्टीट्यूट"],
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

export function areaRateText(area: Area, lang: "en" | "hi" = "en") {
  const unit = lang === "hi" ? "प्रति वर्ग फुट" : "/ sq.ft";
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const body =
    area.rateMin === area.rateMax ? `₹${fmt(area.rateMin)}` : `₹${fmt(area.rateMin)} – ₹${fmt(area.rateMax)}`;
  return lang === "hi" ? `${body} ${unit}` : `${body} ${unit}`;
}

/** Compact rate for tight spaces such as the SVG map. */
export function areaRateShort(area: Area, lang: "en" | "hi" = "en") {
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const body =
    area.rateMin === area.rateMax ? `₹${fmt(area.rateMin)}` : `₹${fmt(area.rateMin)}–${fmt(area.rateMax)}`;
  return lang === "hi" ? `${body}/वर्ग फुट` : `${body}/sq.ft`;
}

export function areaNearText(area: Area, lang: "en" | "hi" = "en", short = false) {
  const list = short
    ? (lang === "hi" ? (area.nearShortHi ?? area.nearHi) : (area.nearShort ?? area.near))
    : lang === "hi"
      ? area.nearHi
      : area.near;
  return list.length ? list.join(" · ") : "";
}

/** Embeddable map built straight from coordinates — no server, no redirects. */
export function embedUrl(lat: number | null, lng: number | null, zoom = 17) {
  if (lat == null || lng == null) return "";
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

/* ─────────── the published land parcels ───────────
 *
 * One entry per plot. `lat` / `lng` drive the embedded map, `mapUrl` is the
 * Google Maps link the owner shared (used for the "Open in Google Maps"
 * button), and `coordsLabel` is printed on the page exactly as quoted.
 */

interface Parcel {
  area: string;
  rate: number;
  /** Upper bound when one listing covers two plots at different rates. */
  rateMax?: number;
  /** "plot" by default; set "farmhouse" for farmhouse land. */
  category?: Category;
  /** Override the generated title when the parcel is not plain land. */
  title?: string;
  titleHi?: string;
  /** One extra sentence added to the description, in both languages. */
  note?: string;
  noteHi?: string;
  lat: number;
  lng: number;
  coordsLabel: string;
  mapUrl: string;
  featured?: boolean;
  listed: string;
  /** Disambiguates two parcels at the same rate in the same area. */
  slugKey?: string;
}

const PARCELS: Parcel[] = [
  {
    area: "Gauri",
    rate: 3500,
    lat: 26.713751,
    lng: 80.842802,
    coordsLabel: `26°42'49.5"N 80°50'34.1"E`,
    mapUrl: "https://maps.app.goo.gl/ghZSk2Tfy3j5AEYN6",
    note: "The plot sits just 50 ft off Kanpur Road (National Highway 27), so the highway frontage value is already built into the rate.",
    noteHi: "प्लॉट कानपुर रोड (राष्ट्रीय राजमार्ग 27) से मात्र 50 फुट की दूरी पर है, इसलिए हाइवे की पहुँच का फ़ायदा भाव में पहले से शामिल है।",
    featured: true,
    listed: "2026-01-12",
  },
  {
    area: "Amausi",
    rate: 2500,
    lat: 26.758139,
    lng: 80.857583,
    coordsLabel: `26°45'29.3"N 80°51'27.3"E`,
    mapUrl: "https://maps.app.goo.gl/4qji8brEzPVyhhCk8",
    featured: true,
    listed: "2026-01-10",
  },
  {
    area: "Miranpur Pinwat",
    rate: 1200,
    rateMax: 2000,
    title: "Two Plots at Miranpur Pinwat — ₹1,200–2,000 per sq.ft",
    titleHi: "मीरानपुर पिनवट में दो प्लॉट — ₹1,200–2,000 प्रति वर्ग फुट",
    lat: 26.715752,
    lng: 80.857033,
    coordsLabel: `26°42'56.7"N 80°51'25.3"E`,
    mapUrl: "https://maps.app.goo.gl/SyoYa1v6HZ865brd6",
    note: "Two plots at the same location, priced by position — ₹1,200 to ₹2,000 per sq.ft. You can take one or both.",
    noteHi: "एक ही लोकेशन पर दो प्लॉट, स्थिति के हिसाब से भाव — ₹1,200 से ₹2,000 प्रति वर्ग फुट। आप एक ले सकते हैं या दोनों।",
    featured: true,
    listed: "2026-01-08",
  },
  {
    area: "Amausi",
    rate: 1500,
    lat: 26.775454,
    lng: 80.82997,
    coordsLabel: "26.775454, 80.829970",
    mapUrl: "https://maps.app.goo.gl/vmmvCuEF6HZ8tZs9A",
    listed: "2026-01-06",
  },
  {
    area: "Miranpur Pinwat",
    rate: 1200,
    lat: 26.711076,
    lng: 80.852854,
    coordsLabel: `26°42'39.9"N 80°51'10.3"E`,
    mapUrl: "https://maps.app.goo.gl/ZXbdPRaNLc3DQnTK9",
    listed: "2026-01-04",
  },
  {
    area: "Miranpur Pinwat",
    rate: 800,
    lat: 26.720402,
    lng: 80.861023,
    coordsLabel: `26°43'13.5"N 80°51'39.7"E`,
    mapUrl: "https://maps.app.goo.gl/gvXF1FD9NzVw9zF19",
    note: "Near the Ring Road — the lowest rate we currently have published in Miranpur Pinwat.",
    noteHi: "रिंग रोड के पास — मीरानपुर पिनवट में इस समय हमारा सबसे कम भाव।",
    listed: "2026-01-02",
  },
  {
    area: "Aurawan",
    rate: 1500,
    category: "farmhouse",
    title: "Farmhouse Land at Aurawan — ₹1,500 per sq.ft",
    titleHi: "औरावां में फार्महाउस ज़मीन — ₹1,500 प्रति वर्ग फुट",
    lat: 26.714507,
    lng: 80.838066,
    coordsLabel: `26°42'52.2"N 80°50'17.0"E`,
    mapUrl: "https://maps.app.goo.gl/mGhhi8vuKn9YTto29",
    note: "This is farmhouse land, beside the Uttar Pradesh State Institute of Forensic Science (UPSIFS) and the Police Training Institute.",
    noteHi: "यह फार्महाउस की ज़मीन है, उत्तर प्रदेश राज्य फॉरेंसिक विज्ञान संस्थान (UPSIFS) और पुलिस ट्रेनिंग इंस्टीट्यूट के पास।",
    listed: "2025-12-28",
  },
  {
    area: "Amausi",
    rate: 1000,
    lat: 26.751503,
    lng: 80.846991,
    coordsLabel: `26°45'05.4"N 80°50'49.2"E`,
    mapUrl: "https://maps.app.goo.gl/r1Ge7NoxyuLTd6tx7",
    slugKey: "a",
    listed: "2025-12-22",
  },
  {
    area: "Amausi",
    rate: 1000,
    lat: 26.759632,
    lng: 80.841589,
    coordsLabel: `26°45'34.7"N 80°50'29.7"E`,
    mapUrl: "https://maps.app.goo.gl/q5UAcZAEWMJMs4vo8",
    slugKey: "b",
    listed: "2025-12-18",
  },
  {
    area: "Piparsand",
    rate: 1000,
    lat: 26.743837,
    lng: 80.811391,
    coordsLabel: "26.743837, 80.811391",
    mapUrl: "https://maps.app.goo.gl/pj19n2gW9JvErufg8",
    listed: "2025-12-14",
  },
];

const DEFAULTS = {
  purpose: "sale",
  category: "plot",
  status: "available",
  priceBasis: "total",
  priceMax: null,
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
  lat: null,
  lng: null,
  coordsLabel: "",
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

/** Use this in EXTRA below for anything that is not a plain land parcel. */
export function makeListing(
  draft: Partial<Property> &
    Pick<Property, "id" | "slug" | "title" | "titleHi" | "locality" | "price">,
): Property {
  return { ...DEFAULTS, ...draft } as Property;
}

function build(parcel: Parcel, index: number): Property {
  const area = findArea(parcel.area)!;
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const rateText = parcel.rateMax
    ? `₹${fmt(parcel.rate)}–${fmt(parcel.rateMax)}`
    : `₹${fmt(parcel.rate)}`;
  const rest = SITE.portfolioTotal - PUBLISHED_COUNT;
  const slugBase = area.name.toLowerCase().replace(/\s+/g, "-");
  const kind = (parcel.category ?? "plot") === "farmhouse" ? "farmhouse" : "land";
  const slug = `${slugBase}-${kind}-${parcel.rate}${parcel.rateMax ? `-${parcel.rateMax}` : ""}-per-sqft${
    parcel.slugKey ? `-${parcel.slugKey}` : ""
  }`;

  const nearEn = area.near.length ? ` Close to ${area.near.join(", ")}.` : "";
  const nearHi = area.nearHi.length ? ` आसपास: ${area.nearHi.join(", ")}।` : "";
  const noteEn = [area.note, parcel.note].filter(Boolean).join(" ");
  const noteHi = [area.noteHi, parcel.noteHi].filter(Boolean).join(" ");

  const category = parcel.category ?? "plot";
  const isFarmhouse = category === "farmhouse";
  const title = parcel.title ?? `Land at ${area.name} — ${rateText} per sq.ft`;
  const titleHi = parcel.titleHi ?? `${area.nameHi} में ज़मीन — ${rateText} प्रति वर्ग फुट`;

  return {
    id: index + 1,
    slug,
    title,
    titleHi,
    description: [
      `${
        parcel.rateMax
          ? "Two adjoining land parcels"
          : isFarmhouse
            ? "Farmhouse land"
            : "A land parcel"
      } at ${area.name}, in the Sarojini Nagar belt of Lucknow, quoted at ${rateText} per square foot.${nearEn}${noteEn ? ` ${noteEn}` : ""}`,
      `The pin on the map below is the actual location — ${parcel.coordsLabel}. Exact area, boundaries, khesra number and the revenue record are shared on a call or in person at the office: Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar. Land here is priced against the area's circle rate, which is worked out from the landmarks around it, so tell us your budget and we will tell you which parcels fit it.`,
      `This is ${SITE.ownerName}'s own property, so you buy direct from the owner — no broker chain, and no brokerage on his side. He accompanies every site visit himself, and they are arranged the same day in most cases.`,
      `In total he owns ${SITE.portfolioTotal} properties across Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand; the remaining ${rest} are shared on request, because most of them are not advertised openly.`,
    ].join("\n\n"),
    descriptionHi: [
      `${parcel.rateMax ? "एक ही जगह पर ज़मीन के दो पार्सल" : isFarmhouse ? `${area.nameHi} में फार्महाउस की ज़मीन` : `${area.nameHi} में ज़मीन का पार्सल`}, सरोजिनी नगर (लखनऊ) के इलाके में — भाव ${rateText} प्रति वर्ग फुट।${nearHi}${noteHi ? ` ${noteHi}` : ""}`,
      `नीचे मैप पर लगा पिन असली लोकेशन है — ${parcel.coordsLabel}। सही रकबा, हदबन्दी, खसरा संख्या और राजस्व रिकॉर्ड कॉल पर या ऑफिस आकर बताया जाता है: चौहान कॉम्प्लेक्स, कुदरत विहार कॉलोनी, सरोजिनी नगर। यहाँ ज़मीन का दाम इलाके के सर्किल रेट के हिसाब से तय होता है, और सर्किल रेट आसपास के इन्हीं स्थलों से बनता है — इसलिए अपना बजट बताइए, हम बता देंगे कि कौन से पार्सल उसमें फिट बैठते हैं।`,
      `यह ${SITE.ownerName} की अपनी प्रॉपर्टी है, इसलिए आप सीधे मालिक से खरीदते हैं — न कोई बिचौलिया, न उनकी तरफ़ से कोई ब्रोकरेज। हर साइट विज़िट में वे खुद साथ चलते हैं और ज़्यादातर मामलों में विज़िट उसी दिन हो जाती है।`,
      `अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड में उनके नाम कुल ${SITE.portfolioTotal} प्रॉपर्टी हैं; बाकी ${rest} माँगने पर बताई जाती हैं, क्योंकि ज़्यादातर प्रॉपर्टी खुले तौर पर विज्ञापित नहीं की जाती।`,
    ].join("\n\n"),
    purpose: "sale",
    category,
    status: "available",
    price: String(parcel.rate),
    priceMax: parcel.rateMax ? String(parcel.rateMax) : null,
    priceBasis: "per_sqft",
    priceNote: parcel.rateMax ? "per sq.ft · two plots · negotiable" : "per sq.ft · negotiable",
    priceNoteHi: parcel.rateMax ? "प्रति वर्ग फुट · दो प्लॉट · मोल-भाव संभव" : "प्रति वर्ग फुट · मोल-भाव संभव",
    negotiable: true,
    areaValue: null,
    areaUnit: "sqft",
    bedrooms: 0,
    bathrooms: 0,
    furnishing: "unfurnished",
    locality: area.name,
    address: `${area.name}, Sarojini Nagar, Lucknow`,
    city: "Lucknow",
    mapUrl: parcel.mapUrl,
    lat: parcel.lat,
    lng: parcel.lng,
    coordsLabel: parcel.coordsLabel,
    videoUrl: "",
    images: [],
    near: area.near,
    nearHi: area.nearHi,
    highlights: [
      `Quoted rate ${rateText} per sq.ft`,
      "Owner's own property — direct sale, no broker chain",
      parcel.rateMax ? "Two plots at one location — take one or both" : `Exact pin: ${parcel.coordsLabel}`,
      area.near.length ? `Near ${area.near.slice(0, 2).join(", ")}` : `${area.name}, Sarojini Nagar`,
      `${area.name} trades at ${areaRateText(area, "en")}`,
      "Exact area, khesra & papers shared on call",
      "Same-day site visit, the owner comes with you",
    ],
    highlightsHi: [
      `भाव ${rateText} प्रति वर्ग फुट`,
      "मालिक की अपनी प्रॉपर्टी — सीधी बिक्री, कोई बिचौलिया नहीं",
      parcel.rateMax ? "एक ही लोकेशन पर दो प्लॉट — एक या दोनों ले सकते हैं" : `सही लोकेशन: ${parcel.coordsLabel}`,
      area.nearHi.length ? `पास में ${area.nearHi.slice(0, 2).join(", ")}` : `${area.nameHi}, सरोजिनी नगर`,
      `${area.nameHi} का भाव ${areaRateText(area, "hi")}`,
      "सही रकबा, खसरा और कागज़ कॉल पर बताए जाते हैं",
      "उसी दिन साइट विज़िट, मालिक खुद साथ चलते हैं",
    ],
    featured: Boolean(parcel.featured),
    views: 0,
    listedAt: parcel.listed,
  };
}

/* ─────────── photos ───────────
 *
 * Photos are served straight from the public Google Drive folder by default, so
 * nothing has to be committed as a binary file (a plain "download project → push"
 * often drops image files, which is what broke the gallery once).
 *
 * To self-host instead: put the same files in public/photos/amausi-house/, flip
 * PHOTO_SOURCE to "local", and commit them. Everything else stays identical.
 */

const PHOTO_SOURCE: "drive" | "local" = "drive";

const DRIVE_IDS: Record<string, string> = {
  "bathroom-1.jpg": "15TjTfaR5XG8Zx_VbGV_Jok0QaeNxQXiv",
  "bathroom-2.jpg": "1HswOdDKAq_vfYxoJY5PldQEvafIn2t3l",
  "bathroom-3.jpg": "1tm0VJC0W1XYsmYcws3leim2lmukptwDy",
  "bathroom-4.jpg": "1nU6slzarqRjaG-SyddOnNnQgejahvFlP",
  "corridor-1.jpg": "1tqKS5WC6sAvwE4oHLQjLOve_WR6zXTXY",
  "corridor-2.jpg": "1LzbJh3Fw9mKdIGjlynRjJ13Ga3n_OP95",
  "exterior-front-wide.jpg": "1Que28qLA0WCqHQw_CHlYurA2qlRCFzUi",
  "exterior-front.jpg": "1Jpcy12foQBJun1hk_aP1FmKZlxJ27MBM",
  "kitchen-1.jpg": "12LF22S75dOOZ-rcowy4J5DW04wOKB2Oq",
  "kitchen-2.jpg": "1W5-9m3xbFARxw5geu_EhDS2w-ZiAat6K",
  "kitchen-3.jpg": "1CvWIH6f_y8_URHF2BNu3K6SzHV8o4T6T",
  "kitchen-4.jpg": "1tsr1WO3SKHN2de-MyiJsbCbPphO0oimV",
  "rooftop-open.jpg": "1Q4qEfm5Sghim9vydUvP7sKzXhxrXt9dv",
  "rooftop-tank-room.jpg": "1l0SLE0MQ3zJ2mdrZlcEp0blHJZ8kUVxy",
  "room-1.jpg": "1toTH1015joquacU_EDlyWJ--I7ZvfeZi",
  "room-2.jpg": "1Uavb2xEpos17OVKyI396Ksfji16HWf_Y",
  "room-3.jpg": "1ZmHA855MfL_g-mzpK6aQtQQZhs-F5nET",
  "room-4.jpg": "1xyLWhX3xlXXuRCp2M7PAJMCwss5Via3V",
  "room-5.jpg": "1s3YhpHftQW71mW1HWu3i6QtEkrbdiesA",
  "room-6.jpg": "1yY6lfz59cVVkhMfTx_sPGrMrQQqH2be6",
  "room-7.jpg": "1_df6GjYNixFKmKQstHkyIq08yWMSO3rq",
  "room-8.jpg": "1z3Q6ZNIA4D1HcVv-C_Ks_3EKuXSBUokf",
  "staircase-1.jpg": "1vGkqbs6Pu4AMJX99u-SqDIyERdJ95_A1",
  "staircase-2.jpg": "1EU0PA6hyJ5b23oNSnFQX4CcSvL5K1Y90",
};

/** filename → Drive URL (compressed to 1200 px wide by Google's image service). */
export function photoUrl(name: string): string {
  if (PHOTO_SOURCE === "local") return `/photos/amausi-house/${name}`;
  const id = DRIVE_IDS[name];
  return id ? `https://lh3.googleusercontent.com/d/${id}=w1200` : `/photos/amausi-house/${name}`;
}

/** Ordered gallery for the Amausi house: filename, English caption, Hindi caption. */
const HOUSE_PHOTOS: Array<[string, string, string]> = [
  ["exterior-front.jpg", "Exterior front", "बाहरी अगला भाग"],
  ["exterior-front-wide.jpg", "Exterior, wider view", "बाहरी अगला भाग — चौड़ा दृश्य"],
  ["staircase-1.jpg", "Staircase", "सीढ़ियाँ"],
  ["corridor-1.jpg", "Corridor", "गलियारा"],
  ["corridor-2.jpg", "Corridor with doors", "दरवाज़ों वाला गलियारा"],
  ["kitchen-1.jpg", "Kitchen", "रसोई"],
  ["kitchen-2.jpg", "Kitchen with window", "खिड़की वाली रसोई"],
  ["kitchen-3.jpg", "Kitchen platform", "रसोई का प्लेटफ़ॉर्म"],
  ["kitchen-4.jpg", "Kitchen shelves", "रसोई की अलमारियाँ"],
  ["room-1.jpg", "Room with arched window", "मेहराबदार खिड़की वाला कमरा"],
  ["room-2.jpg", "Room", "कमरा"],
  ["room-3.jpg", "Room, marble floor", "कमरा, संगमरमर फर्श"],
  ["room-4.jpg", "Room with shelves", "अलमारी वाला कमरा"],
  ["room-5.jpg", "Room with window", "खिड़की वाला कमरा"],
  ["room-6.jpg", "Room doorway", "कमरे का दरवाज़ा"],
  ["room-7.jpg", "Room with chair", "कुर्सी वाला कमरा"],
  ["room-8.jpg", "Room with mirror", "शीशे वाला कमरा"],
  ["bathroom-1.jpg", "Bathroom 1", "बाथरूम 1"],
  ["bathroom-2.jpg", "Bathroom 2", "बाथरूम 2"],
  ["bathroom-3.jpg", "Bathroom 3", "बाथरूम 3"],
  ["bathroom-4.jpg", "Bathroom 4", "बाथरूम 4"],
  ["staircase-2.jpg", "Staircase steps", "सीढ़ियों के कदम"],
  ["rooftop-tank-room.jpg", "Rooftop, tank room", "छत, टंकी का कमरा"],
  ["rooftop-open.jpg", "Open rooftop", "खुली छत"],
];

const HOUSE_IMAGES = HOUSE_PHOTOS.map(([name]) => photoUrl(name));
const HOUSE_CAPTIONS = HOUSE_PHOTOS.map(([, en, hi]) => ({ en, hi }));

/** Chauhan Complex front elevation (its own Drive file). */
const COMPLEX_PHOTO_ID = "1uelb1LhV1ldXw4w1VIvqoeucGaXrXHC5";
const complexPhotoUrl =
  PHOTO_SOURCE === "drive"
    ? `https://lh3.googleusercontent.com/d/${COMPLEX_PHOTO_ID}=w1200`
    : "/photos/chauhan-complex/exterior-front.jpg";

/* ─────────── houses, shops, flats and rentals ───────────
 *
 * Anything that is not a plain land parcel goes here with makeListing().
 * Photos and video can be added later — until then the site shows its own
 * "photographs on request" placeholder.
 */

const EXTRA: Property[] = [
  makeListing({
    id: 101,
    slug: "chauhan-complex-shops-offices-flats-godown",
    title: "Chauhan Complex — Shops, Offices, Flats & Godown Space on Rent",
    titleHi: "चौहान कॉम्प्लेक्स — दुकानें, ऑफिस, फ्लैट और गोदाम की जगह किराये पर",
    locality: "Sarojini Nagar",
    address: "Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar, Lucknow 226008",
    category: "complex",
    covers: ["shop", "showroom", "office", "apartment", "building", "warehouse"],
    purpose: "rent",
    price: "",
    priceBasis: "total",
    priceNote: "On rent — for sale, lease or anything else, WhatsApp the owner",
    priceNoteHi: "किराये पर — बिक्री, लीज़ या कुछ और, मालिक को व्हाट्सएप कीजिए",
    negotiable: true,
    featured: true,
    listedAt: "2026-01-15",
    lat: 26.7458896,
    lng: 80.8612501,
    coordsLabel: "26.7458896, 80.8612501",
    mapUrl: "https://maps.app.goo.gl/sQwoThUKZV9BePnm7",
    near: ["Under 50 m from Kanpur Road (NH-27)", "CCS Airport", "Kudrat Vihar Colony"],
    nearHi: ["कानपुर रोड (NH-27) से 50 मीटर से कम", "CCS एयरपोर्ट", "कुदरत विहार कॉलोनी"],
    images: [complexPhotoUrl],
    imageCaptions: [{ en: "Exterior front", hi: "बाहरी अगला भाग" }],
    videoUrl: "",
    description: [
      "Chauhan Complex is our own building at Kudrat Vihar Colony, Sarojini Nagar — the same building the office works from. Space here — shop frontage on the ground floor, office floors above, flats, and storage at the back — is offered on rent.",
      "The location is the point: it is under 50 metres from Kanpur Road (NH-27), on the Sarojini Nagar side of Lucknow and close to CCS Airport (Chaudhary Charan Singh International Airport). That frontage is what makes it useful for a shop or showroom, an office clients can actually find, or storage a truck can reach.",
      "It is a working multi-tenant building — the ground floor is currently let to a preschool — so what is free changes from month to month. Tell Mukesh Singh Chauhan what you need it for and roughly how much space, and he will tell you what is available right now and walk you through it the same day if you like.",
      "No rent is published, because sizes, frontage and floors vary by unit and a printed figure would mislead more than it would help. The building is his own, so there is no broker in between and no brokerage to add. For renting, message him on WhatsApp; for sale, lease or any other arrangement, the same WhatsApp number is the one to use.",
    ].join("\n\n"),
    descriptionHi: [
      "चौहान कॉम्प्लेक्स कुदरत विहार कॉलोनी, सरोजिनी नगर में हमारी अपनी इमारत है — वही इमारत जहाँ से ऑफिस चलता है। यहाँ ग्राउंड फ्लोर की दुकानों की फ्रंटेज, ऊपर के ऑफिस फ्लोर, फ्लैट और पीछे स्टोरेज की जगह किराये पर उपलब्ध है।",
      "लोकेशन ही इसकी ताकत है: कानपुर रोड (NH-27) से 50 मीटर से भी कम, लखनऊ के सरोजिनी नगर इलाके में और CCS एयरपोर्ट (चौधरी चरण सिंह अंतरराष्ट्रीय हवाई अड्डा) के पास। इसी फ्रंटेज की वजह से यह दुकान या शोरूम, ऐसा ऑफिस जिसे ग्राहक आसानी से ढूँढ़ सकें, या ट्रक पहुँच वाले गोदाम के लिए काम की चीज़ है।",
      "यह चलती-फिरती मल्टी-टेनेंट इमारत है — ग्राउंड फ्लोर इस समय एक प्री-स्कूल को किराये पर दिया हुआ है — इसलिए खाली जगह महीने-दर-महीने बदलती रहती है। मुकेश सिंह चौहान को बता दीजिए कि आपको किस काम के लिए और लगभग कितनी जगह चाहिए; वे बता देंगे कि इस समय क्या खाली है और चाहें तो उसी दिन घुमा देंगे।",
      "किराया वेबसाइट पर नहीं डाला गया, क्योंकि यूनिट के हिसाब से नाप, फ्रंटेज और मंज़िल बदलती है और छपा हुआ आँकड़ा भटकाएगा ज़्यादा, मदद करेगा कम। इमारत उनकी अपनी है, इसलिए बीच में कोई बिचौलिया नहीं और कोई ब्रोकरेज भी नहीं जुड़ती। किराये के लिए उन्हें व्हाट्सएप कीजिए; बिक्री, लीज़ या कोई और व्यवस्था हो तो भी वही व्हाट्सएप नंबर है।",
    ].join("\n\n"),
    highlights: [
      "On rent: shops, offices, flats and godown space in one building",
      "Under 50 m from Kanpur Road (NH-27)",
      "Close to CCS Airport, Sarojini Nagar side",
      "The owner's own building — no broker, no brokerage",
      "Rent now; for sale or lease, WhatsApp the owner",
      "No published rate: WhatsApp the owner for the current rent",
    ],
    highlightsHi: [
      "एक ही इमारत में दुकानें, ऑफिस, फ्लैट और गोदाम की जगह",
      "कानपुर रोड (NH-27) से 50 मीटर से कम",
      "CCS एयरपोर्ट के पास, सरोजिनी नगर तरफ़",
      "मालिक की अपनी इमारत — न बिचौलिया, न ब्रोकरेज",
      "बिक्री, किराया या लीज़ — शर्तें आमने-सामने तय",
      "भाव प्रकाशित नहीं: मौजूदा दाम और खाली जगह के लिए कॉल कीजिए",
    ],
  }),

  makeListing({
    id: 100,
    slug: "amausi-semi-furnished-two-storey-house",
    title: "Semi-Furnished Two-Storey House at Amausi — ₹45 Lakh",
    titleHi: "अमौसी में आधा सजा हुआ दोमंज़िला मकान — ₹45 लाख",
    locality: "Amausi",
    address: "Amausi, Sarojini Nagar, Lucknow",
    category: "house",
    purpose: "sale",
    price: "4500000",
    priceBasis: "total",
    priceNote: "₹45 lakh · negotiable",
    priceNoteHi: "₹45 लाख · मोल-भाव संभव",
    furnishing: "semi-furnished",
    bedrooms: 0,
    bathrooms: 0,
    lat: 26.759937,
    lng: 80.858414,
    coordsLabel: `26°45'35.8"N 80°51'30.3"E`,
    mapUrl: "https://maps.app.goo.gl/atnGyagJoj9wSYsC8",
    featured: true,
    listedAt: "2026-01-14",
    images: HOUSE_IMAGES,
    imageCaptions: HOUSE_CAPTIONS,
    videoUrl: "https://www.youtube.com/watch?v=RksLCHpM5TE",
    near: ["CCS Airport", "TS Mishra Medical College", "Sainik School"],
    nearHi: ["CCS एयरपोर्ट", "टी.एस. मिश्रा मेडिकल कॉलेज", "सैनिक स्कूल"],
    description: [
      "A two-storey semi-furnished house at Amausi, in the Sarojini Nagar belt of Lucknow, offered at ₹45 lakh. The pin on the map below is the actual location. The photographs are of this house, taken on site, and the full-building walkthrough video below was shot inside it.",
      "The photographs show the entrance gallery and corridors, living and dining areas, kitchens with tiled platforms, bathrooms and bedrooms across the two floors, and an open rooftop with a tank room at the top — with room to add another floor later if you want it.",
      "The house is sold as-is, semi-furnished, with the marble and tile work already done; what you see in the photos is what you get. Call or WhatsApp for the exact covered area, the plot size and the paper position — or come and see it, which is usually possible the same day.",
      "This is Mukesh Singh Chauhan's own property, so you buy direct from the owner. He shows the house himself, does the negotiation, and stays with the file through registry and mutation.",
    ].join("\n\n"),
    descriptionHi: [
      "अमौसी, सरोजिनी नगर (लखनऊ) में दोमंज़िला आधा सजा हुआ मकान — ₹45 लाख में। नीचे मैप पर लगा पिन असली लोकेशन है। ये तस्वीरें इसी मकान की हैं, मौके पर खींची गई, और नीचे दिया पूरा वॉकथ्रू वीडियो इसी के अंदर बनाया गया है।",
      "तस्वीरों में दोनों मंज़िलों की प्रवेश गैलरी और गलियारे, लिविंग व डाइनिंग, टाइल वाले प्लेटफ़ॉर्म की रसोइयाँ, बाथरूम और बेडरूम दिखते हैं, और सबसे ऊपर टंकी वाले कमरे के साथ खुली छत — बाद में चाहे तो एक मंज़िल और बन सकती है।",
      "मकान जैसा है वैसा ही, आधा सजा हुआ बिकेगा; संगमरमर और टाइल का काम पूरा है — फोटो में जो दिखता है वही मिलेगा। सही कवर्ड एरिया, प्लॉट की नाप और कागज़ों की स्थिति के लिए कॉल या व्हाट्सएप कीजिए — या आकर देख लीजिए, ज़्यादातर उसी दिन हो जाता है।",
      "यह मुकेश सिंह चौहान की अपनी प्रॉपर्टी है, इसलिए आप सीधे मालिक से खरीदते हैं। मकान वे खुद दिखाते हैं, मोल-भाव खुद करते हैं, और रजिस्ट्री व दाखिल-खारिज तक फाइल साथ रहती है।",
    ].join("\n\n"),
    highlights: [
      "Two storeys, semi-furnished",
      "Owner's own property — direct sale, no broker chain",
      "₹45 lakh, negotiable",
      "Exact pin on the map below",
      "Site photographs and a full-building walkthrough video",
      "Same-day site visit, the owner comes with you",
      "Registry and mutation handled by us",
    ],
    highlightsHi: [
      "दो मंज़िल, आधा सजा हुआ",
      "मालिक की अपनी प्रॉपर्टी — सीधी बिक्री, कोई बिचौलिया नहीं",
      "₹45 लाख, मोल-भाव संभव",
      "सही लोकेशन नीचे मैप पर",
      "मौके पर खींची तस्वीरें और पूरे मकान का वॉकथ्रू वीडियो",
      "उसी दिन साइट विज़िट, मालिक खुद साथ चलते हैं",
      "रजिस्ट्री और दाखिल-खारिज हमारा काम",
    ],
  }),
];

const PUBLISHED_COUNT = PARCELS.length + EXTRA.length;

export const LISTINGS: Property[] = [...PARCELS.map(build), ...EXTRA];

/**
 * The areas we deal in — drives the filters and the footer. Sarojini Nagar is
 * included because Chauhan Complex sits there, even though no land rate is
 * quoted for it (the office/complex is priced by conversation, not per sq.ft).
 */
export const SERVICE_AREAS = Array.from(
  new Set([...AREAS.map((area) => area.name), "Sarojini Nagar"]),
);
