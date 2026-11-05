"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icons";
import { Monogram } from "./site-header";
import { useLang } from "./lang-provider";
import { CATEGORIES, LOCALITIES, telLink, whatsappLink, type Purpose } from "@/lib/utils";
import { categoryText, localityName } from "@/lib/hi";
import { SITE } from "@/data/site";
import { getStats } from "@/lib/data";

const purposes: Array<{ value: Purpose; key: string }> = [
  { value: "sale", key: "footer.forSale" },
  { value: "rent", key: "footer.forRent" },
  { value: "lease", key: "footer.forLease" },
];

export default function SiteFooter({ published }: { published?: number }) {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();
  const areas = getStats().localities.length ? getStats().localities : LOCALITIES;
  const listed = published ?? getStats().total;

  return (
    <footer className="relative overflow-hidden bg-ink text-cream/75">
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-moss-soft/30 blur-3xl" />

      <div className="relative mx-auto max-w-[86rem] px-5 pt-16 pb-8 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3 text-brass-soft">
              <Monogram className="h-11 w-11" />
              <div>
                <p className="font-display text-2xl leading-none text-cream">{SITE.businessName}</p>
                <p className="mt-1.5 text-[0.6rem] tracking-[0.3em] text-cream/50 uppercase">
                  {lang === "hi" ? "लखनऊ" : "Lucknow"} · est. {SITE.sinceYear}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed">
              {lang === "hi" ? SITE.aboutShortHi : SITE.aboutShort}
            </p>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-[0.78rem] text-brass-soft tnum">
              <Icon name="ledger" size={14} />
              {lang === "hi"
                ? `उनकी ${SITE.portfolioTotal} प्रॉपर्टी · यहाँ ${listed} प्रकाशित`
                : `${SITE.portfolioTotal} properties he owns · ${listed} published here`}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SITE.facebookUrl ? (
                <SocialPill href={SITE.facebookUrl} label="Facebook">f</SocialPill>
              ) : null}
              {SITE.instagramUrl ? (
                <SocialPill href={SITE.instagramUrl} label="Instagram">ig</SocialPill>
              ) : null}
              {SITE.youtubeUrl ? (
                <SocialPill href={SITE.youtubeUrl} label="YouTube">yt</SocialPill>
              ) : null}
            </div>
          </div>

          <FooterColumn title={t("footer.deals")}>
            {purposes.map((item) => (
              <FooterLink key={item.value} href={`/properties/?purpose=${item.value}`}>
                {t(item.key)}
              </FooterLink>
            ))}
            <FooterLink href="/sell/">{t("footer.sellLink")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("footer.types")}>
            {CATEGORIES.slice(0, 6).map((item) => (
              <FooterLink key={item.value} href={`/properties/?category=${item.value}`}>
                {categoryText(item.value, lang)}
              </FooterLink>
            ))}
          </FooterColumn>

          <div>
            <h3 className="eyebrow text-brass-soft">{t("footer.reach")}</h3>
            <ul className="mt-5 space-y-4 text-[0.92rem]">
              <li className="flex gap-3">
                <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-brass-soft" />
                <span className="leading-relaxed whitespace-pre-line">{SITE.officeAddress}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" size={17} className="mt-0.5 shrink-0 text-brass-soft" />
                <a href={telLink(SITE.phone)} className="rule-link hover:text-cream">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="whatsapp" size={17} className="mt-0.5 shrink-0 text-brass-soft" />
                <a
                  href={whatsappLink(
                    SITE.whatsapp,
                    lang === "hi"
                      ? "नमस्ते! मुझे एक प्रॉपर्टी के बारे में पूछना है।"
                      : "Namaste! I have a property enquiry.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rule-link hover:text-cream"
                >
                  {t("footer.chatWa")}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" size={17} className="mt-0.5 shrink-0 text-brass-soft" />
                <a href={`mailto:${SITE.email}`} className="rule-link break-all hover:text-cream">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8">
          <h3 className="eyebrow text-cream/40">{t("footer.localities")}</h3>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.82rem] text-cream/55">
            {areas.map((area: string) => (
              <Link
                key={area}
                href={`/properties/?locality=${encodeURIComponent(area)}`}
                className="rule-link transition-colors hover:text-brass-soft"
              >
                {localityName(area, lang)}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-[0.76rem] leading-relaxed text-cream/40">{t("footer.note")}</p>

        <div className="mt-8 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[0.75rem] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.businessName}, {lang === "hi" ? "लखनऊ" : "Lucknow"}. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-4">
            <Link href="/about/" className="rule-link hover:text-cream">{t("footer.about")}</Link>
            <Link href="/contact/" className="rule-link hover:text-cream">{t("footer.contact")}</Link>
            <Link href="/properties/" className="rule-link hover:text-cream">{t("footer.allListings")}</Link>
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="relative overflow-hidden border-t border-cream/10 py-4 text-center select-none">
        <p className="font-display text-[clamp(2.4rem,10vw,7.5rem)] leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(253,250,243,0.13)]">
          {SITE.businessName.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow text-brass-soft">{title}</h3>
      <ul className="mt-5 space-y-2.5 text-[0.92rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="rule-link transition-colors hover:text-cream">
        {children}
      </Link>
    </li>
  );
}

function SocialPill({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-[0.68rem] font-semibold tracking-wide text-cream/70 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft"
    >
      {children}
    </a>
  );
}
