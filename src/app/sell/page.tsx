import type { Metadata } from "next";
import Link from "next/link";
import SellForm from "@/components/sell-form";
import { Counter, Reveal } from "@/components/primitives";
import { Icon } from "@/components/icons";
import { Bi, dualT } from "@/lib/dual";
import { HI_DOCUMENTS, HI_NEXT_STEPS } from "@/lib/content-hi";
import { SITE, SERVICE_AREAS } from "@/data/site";
import { getStats } from "@/lib/data";
import { telLink, whatsappLink } from "@/lib/utils";
import { localityName } from "@/lib/hi";

export const metadata: Metadata = {
  title: "Sell or Rent Out Your Property in Lucknow",
  description: `Give ${SITE.businessName}, Sarojini Nagar, a mandate to sell, rent or lease your land, plot, house, shop or building. Honest valuation, verified buyers, no upfront fee. Call ${SITE.phone}.`,
};

const NEXT_STEPS: Array<{ icon: string; title: string; body: string }> = [
  {
    icon: "phone",
    title: "We call you back within a day",
    body: "We note the location, size and papers you hold, and tell you the realistic dealing rate — not an inflated number to win the mandate.",
  },
  {
    icon: "ruler",
    title: "We inspect and measure the property",
    body: "A site visit, measurement where needed, revenue record check, and photographs plus a walkthrough video for the listing.",
  },
  {
    icon: "users",
    title: "We bring verified buyers",
    body: "Shared with our buyer list and on WhatsApp. Every enquiry is screened — you meet only serious people, and we come with them.",
  },
  {
    icon: "handshake",
    title: "Negotiation, registry and handover",
    body: "We sit both sides down, arrange stamp duty and the sub-registrar appointment, and stay until mutation and possession are complete.",
  },
];

const DOCUMENTS: string[] = [
  "Sale deed / registry of the property",
  "Mutation certificate (dakhil-kharij)",
  "Khatauni & khesra for land and agricultural property",
  "Latest property tax receipt",
  "Approved plan or sanction letter, if any",
  "Existing rent or lease agreement, if tenanted",
  "PAN and Aadhaar of all owners",
  "Power of attorney, if the owner cannot attend",
];

const PROMISES = [
  { id: "fee", value: 0, en: "Upfront listing fee", hi: "अग्रिम लिस्टिंग शुल्क" },
  { id: "held", value: SITE.portfolioTotal, en: "Properties he owns", hi: "उनकी कुल प्रॉपर्टी" },
  { id: "published", value: getStats().total, en: "Published on this website", hi: "इस वेबसाइट पर प्रकाशित" },
  { id: "years", value: 20, en: "Years in the business", hi: "साल का अनुभव" },
];

export default function SellPage() {
  const t = dualT;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-ink py-16 text-cream md:py-20">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="animate-drift pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-brass/15 blur-3xl" />
        <div className="relative mx-auto max-w-[86rem] px-5 md:px-6">
          <nav className="flex items-center gap-2 text-[0.72rem] tracking-[0.18em] text-cream/45 uppercase">
            <Link href="/" className="transition-colors hover:text-brass-soft">
              <Bi en="Home" hi="होम" />
            </Link>
            <Icon name="chevron-right" size={12} />
            <span className="text-cream/80">{t("sell.crumb")}</span>
          </nav>

          <Reveal className="mt-6 max-w-3xl">
            <span className="eyebrow text-brass-soft">{t("sell.eyebrow")}</span>
            <h1 className="mt-4 font-display text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.03]">{t("sell.title")}</h1>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-cream/70">{t("sell.sub")}</p>
          </Reveal>

          <Reveal delay={140} className="mt-10 grid gap-px overflow-hidden rounded-[3px] border border-cream/15 bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((item) => (
              <div key={item.id} className="bg-ink px-5 py-5">
                <p className="font-display text-[1.9rem] leading-none text-brass-soft">
                  {item.id === "fee" ? "0" : <Counter to={item.value} suffix={item.id === "years" ? "+" : ""} />}
                </p>
                <p className="mt-2 text-[0.72rem] tracking-[0.18em] text-cream/55 uppercase">
                  <Bi en={item.en} hi={item.hi} />
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-14 md:px-6 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <SellForm />
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow text-moss-soft">{t("sell.stepsEyebrow")}</span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight text-ink">
                {t("sell.stepsTitle")}
              </h2>
            </Reveal>

            <ol className="mt-8 space-y-6">
              {NEXT_STEPS.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 70}>
                  <div className="group flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-moss transition-all duration-400 group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                        <Icon name={step.icon} size={19} strokeWidth={1.4} />
                      </span>
                      {index < NEXT_STEPS.length - 1 ? <span className="mt-2 w-px flex-1 bg-line" /> : null}
                    </div>
                    <div className="pb-1">
                      <p className="text-[0.68rem] tracking-[0.2em] text-brass uppercase tnum">
                        {t("sell.step")} {index + 1}
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.16rem] leading-snug text-ink">
                        <Bi en={step.title} hi={HI_NEXT_STEPS[index]?.title ?? step.title} />
                      </h3>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-stone">
                        <Bi en={step.body} hi={HI_NEXT_STEPS[index]?.body ?? step.body} />
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120} className="mt-10 rounded-[3px] border border-line bg-cream p-6">
              <h3 className="flex items-center gap-2 font-display text-[1.25rem] text-ink">
                <Icon name="ledger" size={19} className="text-brass" />
                {t("sell.docsTitle")}
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {DOCUMENTS.map((doc, index) => (
                  <li key={doc} className="flex items-start gap-2 text-[0.86rem] text-stone">
                    <Icon name="check" size={14} className="mt-0.5 shrink-0 text-moss-soft" />
                    <Bi en={doc} hi={HI_DOCUMENTS[index] ?? doc} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.8rem] text-stone/90">{t("sell.docsNote")}</p>
            </Reveal>

            <Reveal delay={160} className="mt-8">
              <h3 className="eyebrow text-moss-soft">{t("sell.areasTitle")}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span key={area} className="rounded-full border border-line bg-cream px-3.5 py-1.5 text-[0.8rem] text-ink/80">
                    <Bi en={area} hi={localityName(area, "hi")} />
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-moss py-14 text-cream">
        <div className="mx-auto flex max-w-[86rem] flex-wrap items-center justify-between gap-8 px-5 md:px-6">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight">{t("sell.ctaTitle")}</h2>
            <p className="mt-2 text-[0.95rem] text-cream/70">
              {SITE.ownerName} · <Bi en={SITE.ownerRole} hi={SITE.ownerRoleHi} />
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={telLink(SITE.phone)} className="inline-flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[0.8rem] font-bold tracking-[0.16em] text-ink uppercase transition-transform hover:-translate-y-0.5">
              <Icon name="phone" size={16} /> {SITE.phone}
            </a>
            <Bi
              en={
                <a href={whatsappLink(SITE.whatsapp, "Namaste! I want to sell / rent out my property in Lucknow.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                  <Icon name="whatsapp" size={16} /> WhatsApp us
                </a>
              }
              hi={
                <a href={whatsappLink(SITE.whatsapp, "नमस्ते! मुझे लखनऊ में अपनी प्रॉपर्टी बेचनी / किराये पर देनी है।")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft">
                  <Icon name="whatsapp" size={16} /> व्हाट्सएप करें
                </a>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
