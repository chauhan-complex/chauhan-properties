import type { Metadata } from "next";
import Link from "next/link";
import { Counter, Reveal } from "@/components/primitives";
import { Icon } from "@/components/icons";
import AreaMap from "@/components/area-map";
import { Bi, dualT } from "@/lib/dual";
import { HI_JOURNEY, HI_TEAM_ROLES, HI_VALUES } from "@/lib/content-hi";
import { SERVICE_AREAS, SITE } from "@/data/site";
import { getStats } from "@/lib/data";
import { telLink, whatsappLink } from "@/lib/utils";
import { localityName } from "@/lib/hi";

export const metadata: Metadata = {
  title: "About Mukesh Singh Chauhan — Chauhan Properties, Sarojini Nagar",
  description: `A family-run property desk at Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar, Lucknow — handling land and property in Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand for over 20 years.`,
};

const VALUES_EN = [
  {
    icon: "shield",
    title: "Papers before promises",
    body: "No property is shown to a client until the revenue record, registry chain and mutation have been read. If something is off, the listing does not go up.",
  },
  {
    icon: "rupee",
    title: "One rate, told to both sides",
    body: "We never quote a seller one number and a buyer another to pocket the difference. Our commission is disclosed on day one, in writing.",
  },
  {
    icon: "handshake",
    title: "The deal is not the end",
    body: "Mutation, tax transfer, tenant handover, rent reminders — clients call us years later for the same file, and the file is still with us.",
  },
  {
    icon: "users",
    title: "Family, not a sales team",
    body: "You will speak to the owner, not to a telecaller reading a script. If he is on a site visit, you get his mobile number anyway.",
  },
];

const TEAM_EN = [
  {
    name: "Owner & principal dealer",
    body: "Handles every negotiation personally, verifies titles, and decides what goes on this website.",
  },
  {
    name: "Office desk & files",
    body: "Maintains the ledger of listings, client files, agreement drafts, stamp duty calculations and registry appointments.",
  },
  {
    name: "Site & measurement",
    body: "Photographs and films properties, arranges the amin, accompanies site visits and supervises boundary marking.",
  },
];

const TEAM_ICONS = ["ledger", "inbox", "ruler"];

export default function AboutPage() {
  const t = dualT;
  const stats = getStats();
  const since = Number(SITE.sinceYear) || 2005;
  const years = Math.max(1, new Date().getFullYear() - since);
  const enParagraphs = SITE.aboutLong.split(/\n{2,}/).filter(Boolean);
  const hiParagraphs = SITE.aboutLongHi.split(/\n{2,}/).filter(Boolean);

  const years5 = [String(since), String(since + 5), String(since + 11), String(since + 16)];
  const journeyEn = [
    {
      title: "A desk at Sarojini Nagar",
      body: "Chauhan Properties opens on the Kanpur Road side of Lucknow with a ledger, a scooter and plots in the villages around Amausi, Gauri and Piparsand. Most clients are families selling an ancestral house or buying their first plot.",
    },
    {
      title: "The village belt becomes the specialty",
      body: "Miranpur Pinwat, Aurawan and the fields around them — bigha, biswa and khesra work that most city dealers avoid. Amin measurements and boundary marking become part of the service.",
    },
    {
      title: "Houses, shops and rentals join the book",
      body: "As the belt grows, independent houses, shops and rentals are added alongside land. Registry, mutation and rent agreements are handled end to end.",
    },
    {
      title: `${SITE.portfolioTotal} properties, one ledger`,
      body: "Today the desk works with owners across five villages. Most of what we handle is never advertised — it is shared on a call, which is why this website publishes only a few listings and asks you to phone for the rest.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-ink py-16 text-cream md:py-20">
        <div className="absolute inset-0 opacity-[0.22]">
          <AreaMap tone="dark" compact />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="relative mx-auto max-w-[86rem] px-5 md:px-6">
          <nav className="flex items-center gap-2 text-[0.72rem] tracking-[0.18em] text-cream/45 uppercase">
            <Link href="/" className="transition-colors hover:text-brass-soft">
              <Bi en="Home" hi="होम" />
            </Link>
            <Icon name="chevron-right" size={12} />
            <span className="text-cream/80">{t("about.crumb")}</span>
          </nav>
          <Reveal className="mt-6 max-w-3xl">
            <span className="eyebrow text-brass-soft">{t("about.eyebrow", { year: SITE.sinceYear })}</span>
            <h1 className="mt-4 font-display text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.02]">{SITE.ownerName}</h1>
            <p className="mt-3 text-[1rem] tracking-[0.16em] text-cream/60 uppercase">
              <Bi en={SITE.ownerRole} hi={SITE.ownerRoleHi} />
            </p>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-cream/75">
              <Bi en={SITE.aboutShort} hi={SITE.aboutShortHi} />
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="relative">
                <div className="absolute -top-4 -right-4 h-full w-full rounded-[3px] border border-brass/40" />
                <div className="relative overflow-hidden rounded-[3px] border border-line bg-moss/10 p-5">
                  <AreaMap tone="light" />
                  <p className="mt-3 text-center text-[0.76rem] tracking-[0.18em] text-stone uppercase">
                    <Bi en="The belt we work in" hi="हमारा कार्यक्षेत्र" />
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100} className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[3px] border border-line bg-line">
              {[
                { key: "years", value: years, labelKey: "about.stats.years" },
                { key: "held", value: SITE.portfolioTotal, labelEn: "Properties in hand", labelHi: "कुल प्रॉपर्टी" },
                { key: "live", value: stats.total, labelKey: "about.stats.listings" },
              ].map((item) => (
                <div key={item.key} className="bg-cream px-3 py-5 text-center">
                  <p className="font-display text-[1.7rem] leading-none text-moss">
                    <Counter to={item.value} />
                  </p>
                  <p className="mt-2 text-[0.62rem] tracking-[0.16em] text-stone uppercase">
                    {item.labelKey ? t(item.labelKey) : <Bi en={item.labelEn} hi={item.labelHi} />}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          <div>
            <Reveal>
              <span className="eyebrow text-moss-soft">{t("about.storyEyebrow")}</span>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.06] text-ink">
                {t("about.storyTitle")}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {enParagraphs.map((paragraph, index) => (
                <p key={`en-${index}`} className="i18n-en text-[1rem] leading-[1.85] text-ink/80">
                  {paragraph}
                </p>
              ))}
              {hiParagraphs.map((paragraph, index) => (
                <p key={`hi-${index}`} className="i18n-hi text-[1rem] leading-[1.85] text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <Reveal delay={120} className="mt-10">
              <h3 className="font-display text-[1.4rem] text-ink">{t("about.journeyTitle")}</h3>
              <ol className="mt-6 space-y-8 border-l border-line pl-8">
                {journeyEn.map((item, index) => (
                  <li key={item.title} className="group relative">
                    <span className="absolute top-1.5 -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border border-line bg-cream transition-colors duration-400 group-hover:border-brass group-hover:bg-brass">
                      <span className="h-1.5 w-1.5 rounded-full bg-moss transition-colors group-hover:bg-ink" />
                    </span>
                    <p className="font-display text-[1.05rem] text-brass tnum">{years5[index]}</p>
                    <h4 className="mt-1 font-display text-[1.2rem] leading-snug text-ink">
                      <Bi en={item.title} hi={HI_JOURNEY[index]?.title ?? item.title} />
                    </h4>
                    <p className="mt-1.5 max-w-xl text-[0.93rem] leading-relaxed text-stone">
                      <Bi en={item.body} hi={HI_JOURNEY[index]?.body ?? item.body} />
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep/40 py-16 md:py-24">
        <div className="mx-auto max-w-[86rem] px-5 md:px-6">
          <Reveal>
            <span className="eyebrow text-moss-soft">{t("about.valuesEyebrow")}</span>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.06] text-ink">
              {t("about.valuesTitle")}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line md:grid-cols-2">
            {VALUES_EN.map((value, index) => (
              <Reveal key={value.title} delay={index * 70}>
                <div className="group h-full bg-cream p-7 transition-colors duration-500 hover:bg-paper">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-moss transition-all duration-500 group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                    <Icon name={value.icon} size={21} strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-5 font-display text-[1.3rem] leading-snug text-ink">
                    <Bi en={value.title} hi={HI_VALUES[index]?.title ?? value.title} />
                  </h3>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-stone">
                    <Bi en={value.body} hi={HI_VALUES[index]?.body ?? value.body} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="eyebrow text-moss-soft">{t("about.teamEyebrow")}</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] text-ink">
              {t("about.teamTitle")}
            </h2>
            <p className="mt-4 max-w-lg text-[0.96rem] leading-relaxed text-stone">{t("about.teamBody")}</p>
            <div className="mt-8 rounded-[3px] border border-line bg-cream p-5">
              <p className="eyebrow text-moss-soft">{t("about.areasTitle")}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-[0.92rem] text-ink/85">
                {SERVICE_AREAS.map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <Icon name="pin" size={14} className="text-brass" />
                    <Bi en={area} hi={localityName(area, "hi")} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="space-y-4">
            {TEAM_EN.map((member, index) => (
              <Reveal key={member.name} delay={index * 80}>
                <div className="group flex gap-5 rounded-[3px] border border-line bg-cream p-6 transition-all duration-400 hover:-translate-y-1 hover:border-brass/60">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-moss text-cream">
                    <Icon name={TEAM_ICONS[index]} size={20} strokeWidth={1.4} />
                  </span>
                  <div>
                    <p className="text-[0.66rem] tracking-[0.2em] text-brass uppercase">
                      {index === 0 ? SITE.ownerName : <Bi en={`Member ${index + 1}`} hi={`सदस्य ${index + 1}`} />}
                    </p>
                    <h3 className="mt-1.5 font-display text-[1.22rem] leading-snug text-ink">
                      <Bi en={member.name} hi={HI_TEAM_ROLES[index]?.name ?? member.name} />
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-stone">
                      <Bi en={member.body} hi={HI_TEAM_ROLES[index]?.body ?? member.body} />
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-moss py-16 text-cream">
        <div className="animate-drift pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-brass/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-[86rem] flex-wrap items-center justify-between gap-8 px-5 md:px-6">
          <div>
            <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-tight">{t("about.ctaTitle")}</h2>
            <p className="mt-2 max-w-xl text-[0.95rem] text-cream/70">{t("about.ctaSub")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={telLink(SITE.phone)} className="inline-flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[0.8rem] font-bold tracking-[0.16em] text-ink uppercase transition-transform hover:-translate-y-0.5">
              <Icon name="phone" size={16} /> {SITE.phone}
            </a>
            <Link href="/properties/" className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
              {t("common.browse")} <Icon name="arrow-right" size={16} />
            </Link>
            <Bi
              en={
                <a href={whatsappLink(SITE.whatsapp, "Namaste! I read about Chauhan Properties on your website.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                  <Icon name="whatsapp" size={16} /> WhatsApp
                </a>
              }
              hi={
                <a href={whatsappLink(SITE.whatsapp, "नमस्ते! मैंने आपकी वेबसाइट पर आपके बारे में पढ़ा।")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                  <Icon name="whatsapp" size={16} /> व्हाट्सएप
                </a>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
