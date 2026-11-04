"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "./lang-provider";
import { Icon } from "./icons";
import { cn, telLink, whatsappLink } from "@/lib/utils";

export interface HeaderSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  hours: string;
  sinceYear: string;
}

const NAV = [
  { href: "/", key: "nav.home" },
  { href: "/properties", key: "nav.properties" },
  { href: "/sell", key: "nav.sell" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="4" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M8 21 20 10l12 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 20v10h16V20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.7" />
      <circle cx="20" cy="24.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 26.9V31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function SiteHeader({ settings }: { settings: HeaderSettings }) {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* utility strip */}
        <div className="hidden bg-ink text-cream/80 md:block">
          <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-6 py-2 text-[0.74rem] tracking-wide">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <Icon name="pin" size={14} className="text-brass-soft" />
                {t("nav.location")}
              </span>
              <span className="hidden items-center gap-2 lg:flex">
                <Icon name="clock" size={14} className="text-brass-soft" />
                {settings.hours.split("\n")[0]}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={whatsappLink(settings.whatsapp || settings.phone, "Namaste! I saw your property website.")}
                target="_blank"
                rel="noreferrer"
                className="rule-link flex items-center gap-2 hover:text-cream"
              >
                <Icon name="whatsapp" size={14} className="text-brass-soft" />
                WhatsApp
              </a>
              <a href={telLink(settings.phone)} className="rule-link flex items-center gap-2 hover:text-cream">
                <Icon name="phone" size={14} className="text-brass-soft" />
                {settings.phone}
              </a>
              <LangToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>

        {/* main bar */}
        <div
          className={cn(
            "transition-all duration-500",
            scrolled
              ? "border-b border-line bg-paper/95 backdrop-blur-md shadow-[0_10px_30px_-24px_rgba(12,22,19,0.8)]"
              : "border-b border-transparent bg-paper/80 backdrop-blur-sm",
          )}
        >
          <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-5 py-3 md:px-6">
            <Link href="/" className="group flex items-center gap-3">
              <Monogram
                className={cn(
                  "text-moss transition-transform duration-500 group-hover:-rotate-6",
                  scrolled ? "h-9 w-9" : "h-11 w-11",
                )}
              />
              <span className="leading-none">
                <span
                  className={cn(
                    "block font-display font-semibold tracking-tight text-ink transition-all duration-500",
                    scrolled ? "text-lg" : "text-xl md:text-2xl",
                  )}
                >
                  {settings.businessName}
                </span>
                <span className="mt-1 block text-[0.6rem] font-medium uppercase tracking-[0.3em] text-stone">
                  Lucknow · est. {settings.sinceYear}
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.86rem] font-medium transition-colors duration-300",
                    isActive(item.href) ? "text-moss" : "text-ink/75 hover:text-ink",
                  )}
                >
                  {t(item.key)}
                  <span
                    className={cn(
                      "absolute inset-x-4 bottom-1 h-px origin-left bg-brass transition-transform duration-400",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={telLink(settings.phone)}
                className="hidden items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-ink sm:flex"
              >
                <Icon name="phone" size={15} />
                {t("nav.call")}
              </a>
              <div className="lg:hidden">
                <LangToggle lang={lang} setLang={setLang} compact />
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? t("nav.close") : t("nav.menu")}
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-moss hover:text-moss lg:hidden"
              >
                <Icon name={open ? "close" : "menu"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-24 pb-10 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col divide-y divide-cream/10">
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-baseline justify-between py-4 font-display text-3xl text-cream transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: `${80 + index * 55}ms` }}
            >
              {t(item.key)}
              <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-brass-soft">
                0{index + 1}
              </span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto grid gap-3 pt-8">
          <a
            href={telLink(settings.phone)}
            className="flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
          >
            <Icon name="phone" size={17} /> {settings.phone}
          </a>
          <a
            href={whatsappLink(
              settings.whatsapp || settings.phone,
              "Namaste! I would like to know about a property.",
            )}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-cream/25 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream"
          >
            <Icon name="whatsapp" size={17} /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

function LangToggle({
  lang,
  setLang,
  compact = false,
}: {
  lang: "en" | "hi";
  setLang: (l: "en" | "hi") => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border p-0.5",
        compact ? "border-line" : "border-cream/20",
      )}
      role="group"
      aria-label="Language / भाषा"
    >
      {(["en", "hi"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide transition-colors duration-300",
            lang === code
              ? compact
                ? "bg-moss text-cream"
                : "bg-brass text-ink"
              : compact
                ? "text-stone hover:text-ink"
                : "text-cream/60 hover:text-cream",
          )}
        >
          {code === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  );
}
