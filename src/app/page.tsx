import Link from "next/link";
import { SITE } from "@/data/site";
import { getCategoryCounts, getStats, listProperties, rateCard } from "@/lib/data";
import { FAQS, PROCESS, SERVICES, WHY_POINTS, CATEGORY_ICONS } from "@/lib/content";
import { HI_FAQS, HI_MARQUEE_WORDS, HI_PROCESS, HI_SERVICES, HI_TICKER, HI_WHY_POINTS } from "@/lib/content-hi";
import PropertyCard from "@/components/property-card";
import QuickSearch from "@/components/quick-search";
import FaqAccordion from "@/components/faq-accordion";
import { AreaMapBilingual, AREAS } from "@/components/area-map";
import { Counter, LineMask, Marquee, Reveal, ScrambleWords, SectionHeading } from "@/components/primitives";
import { Icon } from "@/components/icons";
import { Bi, dualT } from "@/lib/dual";
import { telLink, whatsappLink } from "@/lib/utils";
import { categoryOptions, listingPriceText, localityName } from "@/lib/hi";
import { SERVICE_AREAS, areaRateText } from "@/data/site";

const ROTATING_EN = SERVICE_AREAS;
// Module-level so the array identity is stable — ScrambleWords restarts if it changes per render.
const ROTATING_HI = SERVICE_AREAS.map((area) => localityName(area, "hi"));
const TICKER_EN = [
  "146 properties he owns",
  "Direct from the owner",
  "Rate quoted per sq.ft",
  "कागज़ों की पूरी जाँच",
  "Same-day site visit",
  "No broker chain",
  "Registry & mutation support",
  "कोई छुपा चार्ज नहीं",
];
const MARQUEE_EN = [
  "Amausi",
  "Land at per sq.ft rates",
  "Gauri",
  "Miranpur Pinwat",
  "Aurawan",
  "Piparsand",
  "Khesra & khatauni checked",
  "Sarojini Nagar block",
];

export default function HomePage() {
  const t = dualT;
  const stats = getStats();
  const counts = getCategoryCounts();
  const all = listProperties({});
  const rates = rateCard();

  const showcase = [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)].slice(0, 6);
  const pick = showcase[0];

  const since = Number(SITE.sinceYear) || 2005;
  const years = Math.max(1, new Date().getFullYear() - since);
  /* Blurbs say where the stock actually is. Shops, flats, offices, buildings and
     godowns are all supplied by the one Chauhan Complex listing (it `covers`
     those categories), so they are real options — not "coming soon". */
  const categories = [
    { value: "plot", en: "Plots & Land", hi: "प्लॉट और ज़मीन", enBlurb: "Quoted per sq.ft, with map pins", hiBlurb: "भाव प्रति वर्ग फुट, मैप पिन के साथ" },
    { value: "farmhouse", en: "Farmhouses", hi: "फार्महाउस", enBlurb: "Farmhouse land at Aurawan", hiBlurb: "औरावां में फार्महाउस ज़मीन" },
    { value: "house", en: "Houses", hi: "मकान", enBlurb: "Two-storey house at Amausi", hiBlurb: "अमौसी में दोमंज़िला मकान" },
    { value: "complex", en: "Complexes", hi: "कॉम्प्लेक्स", enBlurb: "Chauhan Complex, Sarojini Nagar", hiBlurb: "चौहान कॉम्प्लेक्स, सरोजिनी नगर" },
    { value: "shop", en: "Shops", hi: "दुकानें", enBlurb: "At Chauhan Complex, on rent", hiBlurb: "चौहान कॉम्प्लेक्स में, किराये पर" },
    { value: "showroom", en: "Showrooms", hi: "शोरूम", enBlurb: "At Chauhan Complex, on rent", hiBlurb: "चौहान कॉम्प्लेक्स में, किराये पर" },
    { value: "office", en: "Office Space", hi: "ऑफिस स्पेस", enBlurb: "Floors at Chauhan Complex", hiBlurb: "चौहान कॉम्प्लेक्स में फ्लोर" },
    { value: "apartment", en: "Flats", hi: "फ्लैट", enBlurb: "At Chauhan Complex", hiBlurb: "चौहान कॉम्प्लेक्स में" },
    { value: "warehouse", en: "Godowns", hi: "गोदाम", enBlurb: "Storage at Chauhan Complex", hiBlurb: "चौहान कॉम्प्लेक्स में स्टोरेज" },
    { value: "building", en: "Buildings", hi: "बिल्डिंगें", enBlurb: "Chauhan Complex itself", hiBlurb: "चौहान कॉम्प्लेक्स स्वयं" },
    { value: "agricultural_land", en: "Agricultural Land", hi: "कृषि भूमि", enBlurb: "Bigha / acre — call and ask", hiBlurb: "बीघा / एकड़ — कॉल करके पूछिए" },
  ];

  const statsRow = [
    { key: "total", value: SITE.portfolioTotal, suffix: "", icon: "ledger", labelEn: "Properties he owns", labelHi: "उनकी कुल प्रॉपर्टी" },
    { key: "published", value: stats.total, suffix: "", icon: "spark", labelEn: "Live listings", labelHi: "उपलब्ध प्रॉपर्टी" },
    { key: "areas", value: SERVICE_AREAS.length, suffix: "", icon: "map", labelEn: "Areas we cover", labelHi: "इलाके" },
    { key: "years", value: years, suffix: "+", icon: "clock", labelEn: "Years in the market", labelHi: "साल का अनुभव" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[94svh] flex-col justify-end overflow-hidden bg-ink text-cream">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_10%,#1d4b3a_0%,#0c1613_55%,#08100d_100%)]" />
          <div className="absolute inset-0 opacity-[0.5]">
            <AreaMapBilingual tone="dark" compact />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        </div>

        <div className="mx-auto w-full max-w-[86rem] px-5 pt-16 pb-10 md:px-6 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div>
              <Reveal className="flex items-center gap-3">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-soft">
                  {t("hero.eyebrow")} {SITE.sinceYear}
                </span>
              </Reveal>

              <h1 className="mt-6 font-display text-[clamp(2.6rem,7.2vw,5.4rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
                <LineMask lines={[t("hero.l1"), t("hero.l2")]} />
                <span className="line-mask mt-1 block">
                  <span style={{ ["--line-delay" as string]: "240ms" }}>
                    <span className="i18n-en">
                      <ScrambleWords words={ROTATING_EN} className="text-brass-soft italic" interval={2600} />
                    </span>
                    <span className="i18n-hi">
                      <ScrambleWords words={ROTATING_HI} className="text-brass-soft italic" interval={2600} />
                    </span>
                  </span>
                </span>
              </h1>

              <Reveal delay={380} className="mt-7 max-w-xl">
                <p className="text-[1.02rem] leading-relaxed text-cream/75">{t("hero.sub")}</p>
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9rem] text-cream/60">
                  <span className="flex items-center gap-2 rounded-full border border-cream/20 px-3.5 py-1.5">
                    <Icon name="ledger" size={14} className="text-brass-soft" />
                    <strong className="font-semibold text-cream tnum">{SITE.portfolioTotal}</strong>{" "}
                    <Bi en="properties he owns" hi="प्रॉपर्टी उनके नाम" />
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-cream/20 px-3.5 py-1.5">
                    <Icon name="spark" size={14} className="text-brass-soft" />
                    <strong className="font-semibold text-cream tnum">{stats.total}</strong>{" "}
                    <Bi en="published here" hi="यहाँ प्रकाशित" />
                  </span>
                </p>
              </Reveal>

              <Reveal delay={460} className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/properties/"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[0.8rem] font-bold tracking-[0.16em] text-ink uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft"
                >
                  {t("nav.properties")}
                  <Icon name="arrow-right" size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/sell/"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] text-cream uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft"
                >
                  {t("cta.form")}
                  <Icon name="keys" size={16} className="text-brass-soft" />
                </Link>
                <a href={telLink(SITE.phone)} className="ml-1 flex items-center gap-2 text-[0.9rem] text-cream/70 transition-colors hover:text-cream">
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cream/25">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-brass-soft" />
                    <Icon name="phone" size={15} className="text-brass-soft" />
                  </span>
                  {SITE.phone}
                </a>
              </Reveal>
            </div>

            {pick ? (
              <Reveal delay={220}>
                <Link
                  href={`/properties/${pick.slug}/`}
                  className="group block overflow-hidden rounded-[3px] border border-cream/15 bg-ink/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-brass-soft/60"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={pick.images[0] ?? "/fallback-property.svg"}
                      alt={pick.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-brass px-3 py-1 text-[0.6rem] font-bold tracking-[0.2em] text-ink uppercase">
                      <Icon name="spark" size={11} strokeWidth={2} /> {t("card.featured")}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-brass-soft">{t("featured.eyebrow")}</p>
                    <h2 className="mt-2 font-display text-[1.25rem] leading-snug text-cream">
                      <Bi en={pick.title} hi={pick.titleHi} />
                    </h2>
                    <div className="mt-3 flex items-center justify-between border-t border-cream/10 pt-3">
                      <span className="flex items-center gap-1.5 text-[0.82rem] text-cream/65">
                        <Icon name="pin" size={14} className="text-brass-soft" />
                        <Bi en={pick.locality} hi={localityName(pick.locality, "hi")} />
                      </span>
                      <span className="font-display text-[1.15rem] text-brass-soft">
                        <Bi en={listingPriceText(pick, "en")} hi={listingPriceText(pick, "hi")} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={140} className="mt-12">
            <QuickSearch />
          </Reveal>
        </div>

        <div className="mx-auto flex w-full max-w-[86rem] items-center gap-2 px-5 pb-6 text-[0.68rem] tracking-[0.2em] text-cream/40 uppercase md:px-6">
          <span className="h-8 w-px bg-cream/25" />
          {t("hero.scroll")}
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-[86rem] grid-cols-2 gap-px bg-line md:grid-cols-4">
          {statsRow.map((stat) => (
            <div key={stat.key} className="bg-cream px-5 py-8 md:px-8 md:py-10">
              <Icon name={stat.icon} size={20} className="text-brass" />
              <p className="mt-4 font-display text-[2.3rem] leading-none text-moss md:text-[2.9rem]">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[0.72rem] tracking-[0.2em] text-stone uppercase">
                <Bi en={stat.labelEn} hi={stat.labelHi} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="border-b border-line bg-moss py-3 text-cream/85">
        <Marquee>
          {Array.from({ length: 2 }).map((_, round) => (
            <span key={round} className="flex items-center">
              {(round === 0 ? TICKER_EN : HI_TICKER).map((item) => (
                <span key={item} className="flex items-center whitespace-nowrap">
                  <span className="px-6 text-[0.76rem] tracking-[0.16em] uppercase">{item}</span>
                  <Icon name="spark" size={11} className="text-brass-soft" />
                </span>
              ))}
            </span>
          ))}
        </Marquee>
      </div>

      {/* FEATURED */}
      <section className="mx-auto max-w-[86rem] px-5 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={<>{t("featured.eyebrow")}</>}
          title={t("featured.title")}
          sub={t("featured.sub")}
          action={
            <Link
              href="/properties/"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.82rem] font-semibold tracking-[0.14em] text-ink uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-moss"
            >
              {t("featured.all")}
              <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((property, index) => (
            <Reveal key={property.slug} delay={index * 70}>
              <PropertyCard property={property} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* RATE CARD */}
      <section className="relative overflow-hidden border-y border-line bg-moss py-20 text-cream md:py-24">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 animate-drift rounded-full bg-brass/15 blur-3xl" />
        <div className="relative mx-auto max-w-[86rem] px-5 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <Reveal>
              <span className="eyebrow text-brass-soft">
                <Bi en="What we actually hold" hi="हमारे पास क्या है" />
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.05]">
                <Bi
                  en={`${SITE.portfolioTotal} properties he owns. Only ${stats.total} on this website.`}
                  hi={`उनकी ${SITE.portfolioTotal} प्रॉपर्टी — वेबसाइट पर सिर्फ़ ${stats.total}.`}
                />
              </h2>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-cream/70">
                <Bi
                  en="Every property here is his own, so you deal directly with the owner — no broker chain. Most of the rest are not advertised openly and are shared on a call or at the office. Below are the live per sq.ft rates for each area and what each one sits near; those landmarks are what the circle rate is worked out from."
                  hi="यहाँ लगी हर प्रॉपर्टी उन्हीं की है, इसलिए आप सीधे मालिक से बात करते हैं — कोई बिचौलिया नहीं। बाकी ज़्यादातर प्रॉपर्टी खुले तौर पर विज्ञापित नहीं की जातीं, वे कॉल पर या ऑफिस में बताई जाती हैं। नीचे हर इलाके का भाव प्रति वर्ग फुट है और वह किसके पास है; सर्किल रेट इन्हीं स्थलों से तय होता है।"
                />
              </p>

              <div className="mt-8 overflow-hidden rounded-[3px] border border-cream/15">
                <table className="w-full text-left text-[0.9rem]">
                  <thead className="bg-ink/40 text-[0.66rem] tracking-[0.18em] text-cream/60 uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">
                        <Bi en="Area & what it is near" hi="इलाका और आसपास क्या है" />
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        <Bi en="Rate (₹/sq.ft)" hi="भाव (₹/वर्ग फुट)" />
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        <Bi en="Listed" hi="लिस्टेड" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream/10">
                    {AREAS.map((area) => {
                      const row = rates.get(area.name);
                      const nearEn = area.near.join(" · ");
                      const nearHi = area.nearHi.join(" · ");
                      return (
                        <tr key={area.name} className="transition-colors hover:bg-ink/25">
                          <td className="px-4 py-3.5">
                            <Link
                              href={`/properties/?locality=${encodeURIComponent(area.name)}`}
                              className="font-display text-[1.02rem] text-cream hover:text-brass-soft"
                            >
                              <Bi en={area.name} hi={area.nameHi} />
                            </Link>
                            {nearEn || nearHi ? (
                              <span className="mt-1 block text-[0.74rem] leading-snug text-cream/50">
                                <Bi en={nearEn ? `near ${nearEn}` : ""} hi={nearHi ? `पास में ${nearHi}` : ""} />
                              </span>
                            ) : null}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap text-brass-soft tnum">
                            <Bi
                              en={row ? areaRateText(area, "en") : "On request"}
                              hi={row ? areaRateText(area, "hi") : "भाव पूछिए"}
                            />
                          </td>
                          <td className="px-4 py-3.5 text-right text-cream/75 tnum">{row?.count ?? "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-[0.82rem] text-cream/55">
                <Bi
                  en="Houses, buildings, apartments and rentals are being added soon. For everything else, call the office."
                  hi="मकान, बिल्डिंग, फ्लैट और किराये की प्रॉपर्टी जल्द जोड़ी जाएगी। बाकी सबके लिए ऑफिस में कॉल कीजिए।"
                />
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={telLink(SITE.phone)} className="inline-flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[0.8rem] font-bold tracking-[0.16em] text-ink uppercase transition-transform hover:-translate-y-0.5">
                  <Icon name="phone" size={16} /> {SITE.phone}
                </a>
                <Bi
                  en={
                    <a href={whatsappLink(SITE.whatsapp, "Namaste! I need a property that is not listed on the website. Sharing the area and budget.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                      <Icon name="whatsapp" size={16} /> WhatsApp us
                    </a>
                  }
                  hi={
                    <a href={whatsappLink(SITE.whatsapp, "नमस्ते! मुझे वेबसाइट पर न लगी कोई प्रॉपर्टी चाहिए। इलाका और बजट बता रहा हूँ।")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                      <Icon name="whatsapp" size={16} /> व्हाट्सएप करें
                    </a>
                  }
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[3px] border border-cream/15 bg-ink/35 p-4 backdrop-blur-sm">
                <AreaMapBilingual tone="dark" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative bg-paper-deep/50 py-20 md:py-24">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[86rem] px-5 md:px-6">
          <SectionHeading
            eyebrow={<>{t("categories.eyebrow")}</>}
            title={t("categories.title")}
            sub={
              <Bi
                en="Land and plot listings are live now — houses, buildings, flats and rentals are being added next."
                hi="इस समय ज़मीन और प्लॉट की लिस्टिंग लगी है — मकान, बिल्डिंग, फ्लैट और किराये की प्रॉपर्टी जल्द जोड़ी जाएगी।"
              />
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-line bg-line md:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat, index) => (
              <Reveal key={cat.value} delay={index * 45}>
                <Link
                  href={`/properties/?category=${cat.value}`}
                  className={`group relative flex h-full flex-col justify-between gap-8 bg-cream p-5 transition-colors duration-400 md:min-h-[190px] ${counts[cat.value] ? "hover:bg-ink" : "opacity-70"}`}
                >
                  <span className="flex items-start justify-between">
                    <Icon name={CATEGORY_ICONS[cat.value]} size={30} strokeWidth={1.3} className="text-moss transition-all duration-400 group-hover:-translate-y-1 group-hover:text-brass-soft" />
                    <span className="font-display text-[0.8rem] text-stone tnum transition-colors group-hover:text-cream/50">
                      {counts[cat.value] ? String(counts[cat.value]).padStart(2, "0") : "—"}
                    </span>
                  </span>
                  <span>
                    <span className="block font-display text-[1.05rem] leading-tight font-semibold text-ink transition-colors duration-300 group-hover:text-cream">
                      <Bi en={cat.en} hi={cat.hi} />
                    </span>
                    <span className="mt-1 block text-[0.76rem] text-stone transition-colors duration-300 group-hover:text-cream/60">
                      {/* Always show where the stock is; the count above says
                          whether anything is published right now. */}
                      <Bi en={cat.enBlurb} hi={cat.hiBlurb} />
                    </span>
                  </span>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-brass transition-all duration-500 group-hover:w-full" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-ink py-20 text-cream md:py-28">
        <div className="mx-auto grid max-w-[86rem] gap-14 px-5 md:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="relative">
                <div className="absolute -top-4 -left-4 h-full w-full rounded-[3px] border border-brass/40" />
                <div className="relative overflow-hidden rounded-[3px] border border-cream/15 bg-moss/20 p-5">
                  <AreaMapBilingual tone="dark" />
                </div>
                <div className="absolute -right-5 -bottom-6 hidden rotate-[-8deg] rounded-full border border-brass/50 bg-ink px-5 py-5 text-center md:block">
                  <p className="font-display text-[1.7rem] leading-none text-brass-soft">{years}+</p>
                  <p className="mt-1 text-[0.55rem] tracking-[0.22em] text-cream/60 uppercase">
                    <Bi en="years" hi="साल" />
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <span className="eyebrow text-brass-soft">{t("why.eyebrow")}</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.04] text-cream">
                {t("why.title")}
              </h2>
              <p className="mt-4 max-w-xl text-cream/65">{t("why.sub")}</p>
            </Reveal>

            <ol className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
              {WHY_POINTS.map((point, index) => (
                <Reveal as="li" key={point.title} delay={index * 80} className="group py-7">
                  <div className="flex gap-5">
                    <span className="font-display text-[1.6rem] leading-none text-brass/60 tnum transition-colors duration-400 group-hover:text-brass-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.25rem] leading-snug text-cream">
                        <Bi en={point.title} hi={HI_WHY_POINTS[index]?.title ?? point.title} />
                      </h3>
                      <p className="mt-2 max-w-xl text-[0.94rem] leading-relaxed text-cream/60">
                        <Bi en={point.body} hi={HI_WHY_POINTS[index]?.body ?? point.body} />
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact/" className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-[0.78rem] font-bold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-brass-soft">
                {t("why.cta")} <Icon name="arrow-right" size={15} strokeWidth={2} />
              </Link>
              <Link href="/about/" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-[0.78rem] font-semibold tracking-[0.16em] text-cream uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                {t("nav.about")} <Icon name="users" size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-[86rem] px-5 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow={<>{t("services.eyebrow")}</>} title={t("services.title")} sub={t("services.sub")} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 60}>
              <article className="group relative h-full bg-cream p-7 transition-colors duration-500 hover:bg-paper">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-moss transition-all duration-500 group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                    <Icon name={service.icon} size={22} strokeWidth={1.4} />
                  </span>
                  <span className="font-display text-[0.78rem] tracking-wide text-stone/70 tnum">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.3rem] leading-snug text-ink">
                  <Bi en={service.title} hi={HI_SERVICES[index]?.title ?? service.title} />
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-stone">
                  <Bi en={service.body} hi={HI_SERVICES[index]?.body ?? service.body} />
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {service.points.map((point, pointIndex) => (
                    <li key={point} className="flex items-start gap-2 text-[0.84rem] text-ink/80">
                      <Icon name="check" size={14} className="mt-0.5 shrink-0 text-moss-soft" />
                      <Bi en={point} hi={HI_SERVICES[index]?.points[pointIndex] ?? point} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LOCALITIES */}
      <section className="overflow-hidden border-y border-line bg-paper-deep/60 py-16">
        <div className="mx-auto max-w-[86rem] px-5 md:px-6">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink">{t("localities.title")}</h2>
            <Link href="/properties/" className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.18em] text-moss uppercase transition-colors hover:text-brass">
              {t("featured.all")} <Icon name="arrow-up-right" size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-8 space-y-3">
          <Marquee>
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area}
                href={`/properties/?locality=${encodeURIComponent(area)}`}
                className="mx-2 rounded-full border border-line bg-cream px-5 py-2.5 font-display text-[1rem] whitespace-nowrap text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-moss hover:bg-moss hover:text-cream"
              >
                <Bi en={area} hi={localityName(area, "hi")} />
              </Link>
            ))}
          </Marquee>
          <Marquee slow>
            {MARQUEE_EN.map((word, index) => (
              <span key={word} className="mx-4 font-display text-[clamp(1.4rem,3vw,2.2rem)] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(29,75,58,0.45)]">
                <Bi en={word} hi={HI_MARQUEE_WORDS[index] ?? word} />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-[86rem] px-5 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow={<>{t("process.eyebrow")}</>} title={t("process.title")} sub={t("process.sub")} />
        <ol className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((item, index) => (
            <Reveal as="li" key={item.step} delay={index * 70} className="group relative">
              <div className="flex items-center gap-3">
                <span className="font-display text-[2.6rem] leading-none text-moss/25 tnum transition-colors duration-500 group-hover:text-brass">
                  {item.step}
                </span>
                <span className="h-px flex-1 bg-line transition-colors duration-500 group-hover:bg-brass" />
              </div>
              <h3 className="mt-4 font-display text-[1.2rem] leading-snug text-ink">
                <Bi en={item.title} hi={HI_PROCESS[index]?.title ?? item.title} />
              </h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-stone">
                <Bi en={item.body} hi={HI_PROCESS[index]?.body ?? item.body} />
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[86rem] border-t border-line px-5 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow text-moss-soft">{t("faq.eyebrow")}</span>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.06] text-ink">
                {t("faq.title")}
              </h2>
              <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-stone">{t("faq.side")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={telLink(SITE.phone)} className="inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-[0.82rem] font-semibold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-ink">
                  {t("cta.call")} <Icon name="arrow-right" size={15} />
                </a>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.82rem] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:border-moss">
                  <Icon name="mail" size={15} /> <Bi en="Email us" hi="ईमेल करें" />
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <BilingualFaq en={FAQS} hi={HI_FAQS} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream md:py-24">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative mx-auto grid max-w-[86rem] gap-10 px-5 md:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.04]">
              <Bi en="Not on the website? Call anyway." hi="वेबसाइट पर न मिले, तो फ़ोन कीजिए।" />
            </h2>
            <p className="mt-4 max-w-xl text-cream/65">
              <Bi
                en={`He owns ${SITE.portfolioTotal} properties and only ${stats.total} are published here. Tell us the area, budget and requirement — you will have an answer within a day.`}
                hi={`उनके नाम ${SITE.portfolioTotal} प्रॉपर्टी हैं और यहाँ सिर्फ़ ${stats.total} लगी हैं। इलाका, बजट और ज़रूरत बताइए — एक दिन में जवाब।`}
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sell/" className="group inline-flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[0.8rem] font-bold tracking-[0.16em] text-ink uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft">
                {t("cta.form")}
                <Icon name="arrow-right" size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={telLink(SITE.phone)} className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft">
                <Icon name="phone" size={15} /> {t("cta.call")}
              </a>
              <Bi
                en={
                  <a href={whatsappLink(SITE.whatsapp, "Namaste! I want to sell or rent out my property.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft">
                    <Icon name="whatsapp" size={15} /> WhatsApp us
                  </a>
                }
                hi={
                  <a href={whatsappLink(SITE.whatsapp, "नमस्ते! मुझे अपनी प्रॉपर्टी बेचनी / किराये पर देनी है।")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft">
                    <Icon name="whatsapp" size={15} /> व्हाट्सएप करें
                  </a>
                }
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[3px] border border-cream/15 bg-cream/[0.04] p-7 backdrop-blur-sm">
              <p className="eyebrow text-brass-soft">{t("cta.visit")}</p>
              <p className="mt-4 leading-relaxed whitespace-pre-line text-cream/80">{SITE.officeAddress}</p>
              <dl className="mt-6 space-y-3 border-t border-cream/15 pt-5 text-[0.9rem]">
                <div className="flex items-center gap-3">
                  <Icon name="phone" size={16} className="text-brass-soft" />
                  <a href={telLink(SITE.phone)} className="rule-link">{SITE.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="mail" size={16} className="text-brass-soft" />
                  <a href={`mailto:${SITE.email}`} className="rule-link break-all">{SITE.email}</a>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="clock" size={16} className="mt-0.5 text-brass-soft" />
                  <span className="leading-relaxed whitespace-pre-line text-cream/70">
                    <Bi en={SITE.hours} hi={SITE.hoursHi} />
                  </span>
                </div>
              </dl>
              <a href={SITE.officeMapUrl} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-between rounded-full border border-cream/20 px-5 py-3 text-[0.75rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                {t("detail.openMaps")} <Icon name="external" size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** FAQ accordion is a client component, so both languages are passed as data. */
function BilingualFaq({ en, hi }: { en: Array<{ q: string; a: string }>; hi: Array<{ q: string; a: string }> }) {
  return (
    <>
      <div className="i18n-en">
        <FaqAccordion items={en} />
      </div>
      <div className="i18n-hi">
        <FaqAccordion items={hi} />
      </div>
    </>
  );
}


