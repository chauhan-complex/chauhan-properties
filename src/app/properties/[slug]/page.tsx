import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/gallery";
import EnquiryForm from "@/components/enquiry-form";
import PropertyCard from "@/components/property-card";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/primitives";
import { LISTINGS, SITE, embedUrl } from "@/data/site";
import { videoList } from "@/lib/media";
import { getPropertyBySlug, getSimilar } from "@/lib/data";
import { CATEGORY_ICONS } from "@/lib/content";
import { Bi, dualT } from "@/lib/dual";
import { cn, formatPriceLong, mapsEmbedUrl, numberToWords, telLink, whatsappLink } from "@/lib/utils";
import {
  areaText,
  categoryText,
  dateText,
  localityName,
  numberToWordsHi,
  listingPriceText,
  purposeText,
  statusText,
} from "@/lib/hi";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.priceBasis === "per_sqft" ? property.title : `${property.title}`,
    description: property.description.split("\n\n")[0].slice(0, 165),
    openGraph: {
      title: property.title,
      description: `${property.locality}, Sarojini Nagar, Lucknow — ${SITE.businessName}`,
      images: property.images.slice(0, 1),
    },
  };
}

export default async function PropertyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const t = dualT;
  const hasPrice = Boolean(property.price) && Number(property.price) !== 0;
  const similar = getSimilar(property, 3);
  const embed =
    property.lat != null && property.lng != null
      ? embedUrl(property.lat, property.lng, 17)
      : property.mapUrl
        ? mapsEmbedUrl(property.mapUrl, 17)
        : "";
  const enParagraphs = property.description.split(/\n{2,}/).filter(Boolean);
  const hiParagraphs = (property.descriptionHi || property.description).split(/\n{2,}/).filter(Boolean);
  const fmtRate = (n: string | number) => Number(n).toLocaleString("en-IN");
  const rate = property.priceMax
    ? `${fmtRate(property.price)}–${fmtRate(property.priceMax)}`
    : fmtRate(property.price);

  const waEn = `Namaste! I saw "${property.title}" on your website. Please share the area, papers and a site visit time.`;
  const waHi = `नमस्ते! मैंने आपकी वेबसाइट पर "${property.titleHi}" देखी। कृपया रकबा, कागज़ और साइट विज़िट का समय बताइए।`;

  const facts = [
    { icon: "ledger", labelKey: "detail.fact.deal", en: purposeText(property.purpose, "en"), hi: purposeText(property.purpose, "hi") },
    { icon: CATEGORY_ICONS[property.category] ?? "plot", labelKey: "detail.fact.type", en: categoryText(property.category, "en"), hi: categoryText(property.category, "hi") },
    { icon: "area", labelKey: "detail.fact.area", en: areaText(property.areaValue, property.areaUnit, "en") ?? "—", hi: areaText(property.areaValue, property.areaUnit, "hi") ?? "—" },
    { icon: "calendar", labelKey: "detail.fact.listed", en: dateText(property.listedAt, "en"), hi: dateText(property.listedAt, "hi") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    alternateName: property.titleHi,
    description: property.description.split("\n\n")[0],
    datePosted: property.listedAt,
    image: property.images,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226008",
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      unitText: property.priceBasis === "per_sqft" ? "square foot" : undefined,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-[86rem] px-5 py-5 md:px-6">
          <nav className="flex flex-wrap items-center gap-2 text-[0.72rem] tracking-[0.16em] text-stone uppercase">
            <Link href="/" className="transition-colors hover:text-moss">
              <Bi en="Home" hi="होम" />
            </Link>
            <Icon name="chevron-right" size={12} />
            <Link href="/properties/" className="transition-colors hover:text-moss">
              <Bi en="Properties" hi="प्रॉपर्टी" />
            </Link>
            <Icon name="chevron-right" size={12} />
            <Link href={`/properties/?locality=${encodeURIComponent(property.locality)}`} className="transition-colors hover:text-moss">
              <Bi en={property.locality} hi={localityName(property.locality, "hi")} />
            </Link>
          </nav>
        </div>
      </section>

      <article className="mx-auto max-w-[86rem] px-5 py-10 md:px-6 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Reveal>
              <Gallery images={property.images} videoUrl={property.videoUrl} title={property.title} />
            </Reveal>

            <Reveal delay={80} className="mt-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[0.66rem] font-bold tracking-[0.18em] uppercase",
                    property.purpose === "sale" ? "bg-moss text-cream" : property.purpose === "rent" ? "bg-clay text-cream" : "bg-ink text-brass-soft",
                  )}
                >
                  <Bi en={purposeText(property.purpose, "en")} hi={purposeText(property.purpose, "hi")} />
                </span>
                <span className="rounded-full border border-line px-3.5 py-1.5 text-[0.66rem] font-semibold tracking-[0.18em] text-stone uppercase">
                  <Bi en={categoryText(property.category, "en")} hi={categoryText(property.category, "hi")} />
                </span>
                <span className="rounded-full border border-moss/40 px-3.5 py-1.5 text-[0.66rem] font-semibold tracking-[0.18em] text-moss uppercase">
                  <Bi en={statusText(property.status, "en")} hi={statusText(property.status, "hi")} />
                </span>
              </div>

              <h1 className="mt-4 font-display text-[clamp(1.85rem,4vw,2.9rem)] leading-[1.06] text-ink">
                <Bi en={property.title} hi={property.titleHi} />
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem] text-stone">
                <span className="flex items-center gap-1.5">
                  <Icon name="pin" size={16} className="text-brass" />
                  <Bi en={`${property.address}, Uttar Pradesh`} hi={`${localityName(property.locality, "hi")}, सरोजिनी नगर, लखनऊ`} />
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="ledger" size={16} className="text-brass" />
                  <Bi en={`Ref. LKO-${String(property.id).padStart(4, "0")}`} hi={`संख्या LKO-${String(property.id).padStart(4, "0")}`} />
                </span>
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.labelKey} className="bg-cream px-4 py-4">
                    <Icon name={fact.icon} size={17} className="text-brass" />
                    <p className="mt-2.5 text-[0.64rem] tracking-[0.16em] text-stone uppercase">{t(fact.labelKey)}</p>
                    <p className="mt-1 font-display text-[1.02rem] leading-tight text-ink">
                      <Bi en={fact.en} hi={fact.hi} />
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140} className="mt-10">
              <h2 className="font-display text-[1.5rem] text-ink">{t("detail.about")}</h2>
              <div className="i18n-en mt-4 space-y-4">
                {enParagraphs.map((paragraph, index) => (
                  <p key={index} className="max-w-3xl text-[0.98rem] leading-[1.85] text-ink/80">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="i18n-hi mt-4 space-y-4">
                {hiParagraphs.map((paragraph, index) => (
                  <p key={index} className="max-w-3xl text-[0.98rem] leading-[1.85] text-ink/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <h2 className="font-display text-[1.5rem] text-ink">{t("detail.highlights")}</h2>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {property.highlights.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 text-[0.94rem] text-ink/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss">
                      <Icon name="check" size={12} strokeWidth={2.4} />
                    </span>
                    <Bi en={item} hi={property.highlightsHi[index] ?? item} />
                  </li>
                ))}
              </ul>
            </Reveal>

            {property.near.length || property.nearHi.length ? (
              <Reveal delay={170} className="mt-10">
                <h2 className="font-display text-[1.5rem] text-ink">
                  <Bi en="What it is near" hi="आसपास क्या है" />
                </h2>
                <p className="mt-2 max-w-3xl text-[0.92rem] leading-relaxed text-stone">
                  <Bi
                    en="These are the landmarks the area is priced against — the circle rate for a plot here is worked out from what surrounds it, and they are also what most buyers search for."
                    hi="इन्हीं स्थलों के आधार पर इस इलाके का भाव और सर्किल रेट तय होता है, और ज़्यादातर खरीदार इन्हीं को देखकर ज़मीन ढूँढ़ते हैं।"
                  />
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {property.near.map((place, index) => (
                    <li
                      key={place}
                      className="flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-[0.88rem] text-ink/85 transition-colors hover:border-brass"
                    >
                      <Icon name="pin" size={14} className="text-brass" />
                      <Bi en={place} hi={property.nearHi[index] ?? place} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal delay={180} className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-[1.5rem] text-ink">{t("detail.location")}</h2>
                  <p className="mt-1.5 text-[0.93rem] text-stone">
                    <Bi en={`${property.locality}, Sarojini Nagar, Lucknow, Uttar Pradesh`} hi={`${localityName(property.locality, "hi")}, सरोजिनी नगर, लखनऊ, उत्तर प्रदेश`} />
                  </p>
                  {property.coordsLabel ? (
                    <p className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[0.74rem] text-stone tnum">
                      <Icon name="pin" size={13} className="text-brass" />
                      <Bi en={`Exact pin · ${property.coordsLabel}`} hi={`सही लोकेशन · ${property.coordsLabel}`} />
                    </p>
                  ) : null}
                </div>
                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-[0.75rem] font-semibold tracking-[0.16em] text-ink uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-moss hover:text-moss"
                >
                  <Icon name="external" size={14} /> {t("detail.openMaps")}
                </a>
              </div>

              <div className="mt-5 overflow-hidden rounded-[3px] border border-line bg-paper-deep">
                {embed ? (
                  <iframe
                    src={embed}
                    title={`Map of ${property.locality}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[360px] w-full grayscale-[0.2]"
                  />
                ) : null}
              </div>
              <p className="mt-3 flex items-start gap-2 text-[0.78rem] text-stone">
                <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-moss-soft" />
                {t("detail.mapNote")}
              </p>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-[3px] border border-line bg-cream">
                <div className="border-b border-line bg-ink px-6 py-6 text-cream">
                  <p className="eyebrow text-brass-soft">
                    {!hasPrice ? (
                      <Bi en="Price" hi="भाव" />
                    ) : property.priceBasis === "per_sqft" ? (
                      t("detail.rateLabel")
                    ) : (
                      t("detail.askingPrice")
                    )}
                  </p>
                  <p className="mt-2 font-display text-[2.4rem] leading-none text-cream">
                    <Bi
                      en={listingPriceText(property, "en")}
                      hi={listingPriceText(property, "hi")}
                    />
                  </p>
                  <p className="mt-2.5 text-[0.82rem] leading-relaxed text-cream/60">
                    {!hasPrice ? (
                      <Bi
                        en="No rate is published for this one. The deal is discussed with the owner directly — call or WhatsApp below and he will tell you the price himself, along with whatever space you need."
                        hi="इसका भाव वेबसाइट पर नहीं डाला गया है। सौदा सीधे मालिक से बात करके तय होता है — नीचे कॉल या व्हाट्सएप कीजिए, वे आपको भाव और आपकी ज़रूरत की जगह खुद बताएँगे।"
                      />
                    ) : property.priceBasis === "per_sqft" ? (
                      t("detail.rateNote")
                    ) : (
                      <Bi
                        en={`${formatPriceLong(property.price)} — ${numberToWords(Number(property.price))} rupees`}
                        hi={`${formatPriceLong(property.price)} — ${numberToWordsHi(Number(property.price))} रुपये`}
                      />
                    )}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1.5 text-[0.76rem] text-brass-soft">
                    <Icon name={hasPrice ? "spark" : "phone"} size={13} />{" "}
                    <Bi en={property.priceNote} hi={property.priceNoteHi} />
                  </p>
                  {hasPrice && property.priceBasis === "per_sqft" ? (
                    <p className="mt-3 text-[0.78rem] text-cream/50">
                      <Bi
                        en={`Total for the parcel depends on the area — ₹${rate} × your sq.ft. We do the maths with you.`}
                        hi={`पार्सल का कुल दाम रकबे पर निर्भर करेगा — ₹${rate} × आपके वर्ग फुट। हिसाब हम आपके साथ लगाएँगे।`}
                      />
                    </p>
                  ) : null}
                </div>

                {property.videoUrl ? (
                  <a
                    href={videoList(property.videoUrl)[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 border-b border-line bg-brass px-4 py-3.5 text-[0.76rem] font-bold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-brass-soft"
                  >
                    <Icon name="play" size={16} strokeWidth={1.8} />{" "}
                    <Bi en="Watch the full video tour" hi="पूरा वीडियो टूर देखें" />
                  </a>
                ) : null}

                <div className="grid grid-cols-2 gap-px bg-line">
                  <a href={telLink(SITE.phone)} className="flex items-center justify-center gap-2 bg-cream px-4 py-4 text-[0.76rem] font-bold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-paper-deep">
                    <Icon name="phone" size={16} className="text-moss" /> {t("detail.call")}
                  </a>
                  <Bi
                    en={
                      <a href={whatsappLink(SITE.whatsapp, waEn)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-cream px-4 py-4 text-[0.76rem] font-bold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-paper-deep">
                        <Icon name="whatsapp" size={16} className="text-moss" /> WhatsApp
                      </a>
                    }
                    hi={
                      <a href={whatsappLink(SITE.whatsapp, waHi)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-cream px-4 py-4 text-[0.76rem] font-bold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-paper-deep">
                        <Icon name="whatsapp" size={16} className="text-moss" /> व्हाट्सएप
                      </a>
                    }
                  />
                </div>

                <div className="border-t border-line p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-moss font-display text-[1.05rem] text-cream">
                      {SITE.ownerName.charAt(0)}
                    </span>
                    <div>
                      <p className="font-display text-[1.02rem] leading-tight text-ink">{SITE.ownerName}</p>
                      <p className="text-[0.74rem] tracking-[0.14em] text-stone uppercase">
                        <Bi en={SITE.ownerRole} hi={SITE.ownerRoleHi} />
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-4 text-[0.83rem] text-stone">
                    {["detail.assurance1", "detail.assurance2", "detail.assurance3"].map((key) => (
                      <li key={key} className="flex items-start gap-2">
                        <Icon name="check" size={14} className="mt-0.5 shrink-0 text-moss-soft" />
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160} className="mt-6">
              <div className="rounded-[3px] border border-line bg-paper-deep/40 p-6">
                <h2 className="font-display text-[1.3rem] text-ink">{t("detail.enquire")}</h2>
                <p className="mt-1.5 text-[0.86rem] text-stone">{t("detail.enquireSub")}</p>
                <div className="mt-5">
                  <EnquiryForm
                    propertyTitle={property.title}
                    propertyTitleHi={property.titleHi}
                    compact
                  />
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </article>

      {similar.length ? (
        <section className="border-t border-line bg-paper-deep/40 py-16 md:py-20">
          <div className="mx-auto max-w-[86rem] px-5 md:px-6">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow text-moss-soft">
                  <Bi en="Also worth seeing" hi="ये भी देखने लायक" />
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink">
                  <Bi en={`More land in ${property.locality} and nearby`} hi={`${localityName(property.locality, "hi")} और आसपास की ज़मीन`} />
                </h2>
              </div>
              <Link href="/properties/" className="group flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.18em] text-moss uppercase transition-colors hover:text-brass">
                {t("detail.browseAll")}
                <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70}>
                  <PropertyCard property={item} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
