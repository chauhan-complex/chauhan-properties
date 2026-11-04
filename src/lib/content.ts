export type IconKey =
  | "farmhouse"
  | "plot"
  | "land"
  | "house"
  | "flat"
  | "shop"
  | "office"
  | "building"
  | "complex"
  | "warehouse";

export const SERVICES = [
  {
    icon: "ledger" as const,
    title: "Buying & selling",
    hindi: "खरीद-फरोख्त",
    body:
      "Plots, farmhouses, flats, shops and whole buildings. We match a buyer to a property only after both sides have shown us their papers.",
    points: ["Fair market rate in writing", "Full registry & mutation support", "Loan paperwork assistance"],
  },
  {
    icon: "keys" as const,
    title: "Renting & leasing",
    body: "Homes, offices, godowns and farmland on rent or lease — with agreements drafted, stamped and registered properly.",
    hindi: "किराया और लीज़",
    points: ["11-month & long-term agreements", "Tenant verification done for you", "Rent escalation clauses explained"],
  },
  {
    icon: "shield" as const,
    title: "Paper verification",
    body:
      "Before you pay a rupee: khatauni, khesra, mutation, encumbrance, LDA sanction and society NOC — checked and summarised in plain language.",
    hindi: "कागज़ की जाँच",
    points: ["Revenue record (khatauni / khesra)", "Encumbrance & lien check", "Written title opinion"],
  },
  {
    icon: "ruler" as const,
    title: "Land measurement & demarcation",
    body:
      "Licensed amin engagement, boundary pillar fixing and total-station measurement so nobody can claim an inch later.",
    hindi: "पैमाइश और हदबन्दी",
    points: ["Amin / surveyor arrangement", "Boundary pillar fixing", "Area dispute resolution"],
  },
  {
    icon: "rupee" as const,
    title: "Rate & valuation advice",
    body:
      "Circle rate versus actual dealing rate for your colony, updated every quarter. Honest numbers, even when they are lower than you hoped.",
    hindi: "भाव और वैल्युएशन",
    points: ["Circle rate vs market rate", "Written valuation note", "No inflated promises"],
  },
  {
    icon: "handshake" as const,
    title: "Sale mandate for NRIs",
    body:
      "Living abroad? We hold keys, show the property, handle tenants and remit-ready documentation — with photo updates after every visit.",
    hindi: "एनआरआई मालिकाना सेवा",
    points: ["Key holding & caretaking", "Video update after each visit", "Power of attorney guidance"],
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "A cup of tea and your requirement",
    body:
      "Call, WhatsApp or walk into the office at Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar. Tell us the budget, the area and what the property is actually for — living, income or farming.",
  },
  {
    step: "02",
    title: "Shortlist within 24 hours",
    body:
      "You get a short list on WhatsApp with photos, area, price and the honest drawbacks of each option. Nothing is hidden to make a deal look better.",
  },
  {
    step: "03",
    title: "Site visits, our vehicle",
    body:
      "Visits are clubbed into one trip so you are not running around the city. Neighbours are spoken to; the actual ground position is shown.",
  },
  {
    step: "04",
    title: "Paper verification",
    body:
      "Revenue records, registry chain, mutation, encumbrance and approved plans are pulled and read before any token money moves.",
  },
  {
    step: "05",
    title: "Negotiation & token",
    body:
      "We sit both parties down, agree the final number face to face, and record it in a written token receipt with clear timelines.",
  },
  {
    step: "06",
    title: "Registry, mutation & handover",
    body:
      "Stamp duty calculation, sub-registrar appointment, payment schedule, mutation and finally keys or possession — with copies of every document.",
  },
];

export const FAQS = [
  {
    q: "Do you charge brokerage, and how much?",
    a: "Yes, and it is told to you on day one — never at the registry table. For a sale it is a small percentage from both sides; for rent and lease it is typically one month's rent or a fixed annual fee. If a deal does not happen, you owe nothing.",
  },
  {
    q: "How do I know the property papers are clean?",
    a: "Every listing here has already been through our verification: khatauni and khesra from the revenue department, the registry chain for the last thirty years, mutation in the seller's name, an encumbrance check and, for plots, the LDA or colony sanction plan. We hand you a written summary before you pay a token.",
  },
  {
    q: "Do you deal in villages outside your main belt?",
    a: "Our belt is Sarojini Nagar block — Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand — and that is where almost everything we handle sits. If your land is in a neighbouring tehsil, call and tell us where; we will say plainly whether we know that area well enough to price it. For agricultural land we follow the UP Revenue Code rules on who can buy.",
  },
  {
    q: "What is the difference between rent and lease here?",
    a: "Rent is normally an 11-month licence agreement, renewed as needed. A lease is a longer interest in the property — five, nine, thirty years or more — registered at the sub-registrar's office, common for farmland, godowns and commercial buildings.",
  },
  {
    q: "Do you arrange home loans or land loans?",
    a: "We work with branch managers at four or five banks and NBFCs around Sarojini Nagar and Lucknow, help you with the file, and get the property documents the bank asks for. Sanction is the bank's decision, not ours.",
  },
  {
    q: "I am an NRI. Can you manage everything remotely?",
    a: "Yes. Under a registered power of attorney we can show the property, collect rent, handle tenants, pay property tax and execute the sale, with a video update and scanned documents after every single step.",
  },
  {
    q: "You handle 146 properties but only 9 are listed here. Why?",
    a: "Only nine land parcels are published at the moment — in Amausi, Miranpur Pinwat, Aurawan and Piparsand. The rest, including houses, buildings, apartments, rentals and other land, are shared on a call or in person because most owners do not want their property advertised openly. Tell us the village and your budget and we will send whatever is available.",
  },
  {
    q: "Some listings have no photographs. Why?",
    a: "For most of the land we publish only the village and the rate, because that is what the owner has agreed to. Real photographs, the khesra extract and a video walkthrough are shared once we have spoken — and a site visit is arranged, usually the same day. We would rather show you the ground than a picture.",
  },
  {
    q: "The rate is quoted per square foot. What will the total come to?",
    a: "Tell us the exact area you want and we will do the calculation with you, in writing — including registry, stamp duty and mutation costs. Rates quoted here are the asking rate for that particular parcel, and they are negotiable for a genuine buyer.",
  },
];

export const WHY_POINTS = [
  {
    title: "One family, one ledger for 20+ years",
    body:
      "No franchise, no call centre. The same person who shows you the plot in the morning is the one who stands at the sub-registrar's office with you in the evening.",
  },
  {
    title: "We say no to bad property",
    body:
      "If the papers are weak, the road is disputed or the rate is inflated, we tell you plainly — even when it costs us the deal. That is why third-generation clients still walk in.",
  },
  {
    title: "Ground knowledge, not portal listings",
    body:
      "We know which lane floods in July, which colony has water at 90 feet, and which plot has a family dispute that has not reached court yet.",
  },
  {
    title: "Full-circle service",
    body:
      "Verification, valuation, amin measurement, agreement drafting, stamp duty, mutation, tenant check, and post-sale rent collection — one desk handles all of it.",
  },
];

export const CATEGORY_ICONS: Record<string, IconKey> = {
  farmhouse: "farmhouse",
  plot: "plot",
  agricultural_land: "land",
  house: "house",
  apartment: "flat",
  shop: "shop",
  showroom: "shop",
  office: "office",
  building: "building",
  complex: "complex",
  warehouse: "warehouse",
  other: "plot",
};
