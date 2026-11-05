import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/enquiry-form";
import OpenStatus from "@/components/open-status";
import { Reveal } from "@/components/primitives";
import { Icon } from "@/components/icons";
import { Bi, dualT } from "@/lib/dual";
import { SITE } from "@/data/site";
import { HI_LANDMARKS } from "@/lib/content-hi";
import { mapsCoords, mapsEmbedUrl, telLink, whatsappLink } from "@/lib/utils";
import { embedUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Chauhan Properties, Sarojini Nagar, Lucknow",
  description: `Call ${SITE.phone}, WhatsApp, or visit Chauhan Complex, Kudrat Vihar Colony, Sarojini Nagar, Lucknow 226008. Site visits arranged the same day across Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand.`,
};

const LANDMARKS_EN = [
  "Chauhan Complex, Kudrat Vihar Colony — Sarojini Nagar, Lucknow 226008",
  "On the Kanpur Road side, about 20 minutes from Amausi airport",
  "Parking in front of the complex; tea is always on — walk in without an appointment",
];

export default function ContactPage() {
  const t = dualT;
  const embed = embedUrl(SITE.officeLat, SITE.officeLng, 17) ||
    (SITE.officeMapUrl ? mapsEmbedUrl(SITE.officeMapUrl, 17) : "");
  const coords = SITE.officeMapUrl ? mapsCoords(SITE.officeMapUrl) : null;

  const cards = [
    {
      key: "call",
      icon: "phone",
      labelKey: "contact.card.call",
      value: SITE.phone,
      href: telLink(SITE.phone),
      noteKey: "contact.card.callNote",
      actionKey: "form.callNow",
      primary: true,
    },
    {
      key: "whatsapp",
      icon: "whatsapp",
      labelKey: "contact.card.wa",
      valueEn: "Send photos, location or a requirement",
      valueHi: "फोटो, लोकेशन या ज़रूरत भेजिए",
      href: whatsappLink(SITE.whatsapp, "Namaste! I have a property requirement in Lucknow."),
      noteKey: "contact.card.waNote",
      actionKey: "contact.open",
      external: true,
    },
    {
      key: "email",
      icon: "mail",
      labelKey: "contact.card.email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      noteKey: "contact.card.emailNote",
      actionKey: "contact.open",
    },
    {
      key: "visit",
      icon: "pin",
      labelKey: "contact.card.visit",
      valueEn: SITE.officeAddress.split("\n").slice(0, 2).join(", "),
      valueHi: "चौहान कॉम्प्लेक्स, कुदरत विहार कॉलोनी, सरोजिनी नगर",
      href: SITE.officeMapUrl,
      noteKey: "contact.card.visitNote",
      actionKey: "detail.openMaps",
      external: true,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-ink py-16 text-cream md:py-20">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-moss-soft/25 blur-3xl" />
        <div className="relative mx-auto max-w-[86rem] px-5 md:px-6">
          <nav className="flex items-center gap-2 text-[0.72rem] tracking-[0.18em] text-cream/45 uppercase">
            <Link href="/" className="transition-colors hover:text-brass-soft">
              <Bi en="Home" hi="होम" />
            </Link>
            <Icon name="chevron-right" size={12} />
            <span className="text-cream/80">{t("contact.crumb")}</span>
          </nav>
          <Reveal className="mt-6 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="eyebrow text-brass-soft">{t("contact.title")}</span>
              <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.03]">
                <Bi en="Call, WhatsApp, or walk in." hi="कॉल कीजिए, व्हाट्सएप कीजिए, या चले आइए।" />
              </h1>
              <p className="mt-5 text-[1rem] leading-relaxed text-cream/70">
                <Bi
                  en={`There is no call centre and no ticket system. ${SITE.ownerName} answers ${SITE.phone} himself between 10 am and 8 pm, and site visits are arranged the same day in most of our belt.`}
                  hi={`कोई कॉल सेंटर नहीं, कोई टिकट सिस्टम नहीं। ${SITE.ownerName} खुद ${SITE.phone} पर सुबह 10 से शाम 8 बजे तक फोन उठाते हैं, और हमारे इलाके में ज़्यादातर साइट विज़िट उसी दिन हो जाती है।`}
                />
              </p>
            </div>
            <OpenStatus />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-14 md:px-6 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Reveal key={card.key} delay={index * 70}>
              <a
                href={card.href}
                {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="card-lift group flex h-full flex-col rounded-[3px] border border-line bg-cream p-6"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-400 ${
                    card.primary
                      ? "border-brass bg-brass text-ink"
                      : "border-line text-moss group-hover:border-brass group-hover:bg-brass group-hover:text-ink"
                  }`}
                >
                  <Icon name={card.icon} size={20} strokeWidth={1.5} />
                </span>
                <p className="mt-5 text-[0.68rem] tracking-[0.18em] text-stone uppercase">{t(card.labelKey)}</p>
                <p className="mt-1.5 font-display text-[1.14rem] leading-snug break-words text-ink">
                  {"value" in card ? card.value : <Bi en={card.valueEn} hi={card.valueHi} />}
                </p>
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-stone">{t(card.noteKey)}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[0.72rem] font-semibold tracking-[0.16em] text-moss uppercase">
                  {t(card.actionKey)}
                  <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div id="office-map" className="overflow-hidden rounded-[3px] border border-line bg-cream">
              {embed ? (
                <iframe
                  src={embed}
                  title="Office location map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[420px] w-full grayscale-[0.15]"
                />
              ) : null}
              <div className="border-t border-line p-6">
                <h2 className="font-display text-[1.4rem] text-ink">{t("contact.officeTitle")}</h2>
                <p className="mt-2 leading-relaxed whitespace-pre-line text-stone">{SITE.officeAddress}</p>
                {coords ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[0.74rem] text-stone tnum">
                    <Icon name="pin" size={13} className="text-brass" />
                    {t("contact.exactPin")} — {coords.lat}, {coords.lng}
                  </p>
                ) : null}
                <ul className="mt-4 space-y-2">
                  {LANDMARKS_EN.map((item, index) => (
                    <li key={item} className="flex items-start gap-2 text-[0.86rem] text-stone">
                      <Icon name="check" size={14} className="mt-1 shrink-0 text-moss-soft" />
                      <Bi en={item} hi={HI_LANDMARKS[index] ?? item} />
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                  <a
                    href={SITE.officeMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-[0.75rem] font-semibold tracking-[0.16em] text-cream uppercase transition-colors hover:bg-ink"
                  >
                    <Icon name="external" size={14} /> {t("contact.directions")}
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[0.75rem] tracking-[0.16em] text-stone uppercase">
                    <Icon name="clock" size={14} className="text-brass" />
                    <Bi en={SITE.hours.split("\n")[0]} hi={SITE.hoursHi.split("\n")[0]} />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-[3px] border border-line bg-paper-deep/40 p-6 md:p-8">
              <h2 className="font-display text-[1.6rem] text-ink">{t("contact.formTitle")}</h2>
              <p className="mt-1.5 text-[0.9rem] text-stone">{t("contact.formSub")}</p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
