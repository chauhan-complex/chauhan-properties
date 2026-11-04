"use client";

import { useEffect, useMemo, useState } from "react";
import PropertyCard from "./property-card";
import { Reveal } from "./primitives";
import { Icon } from "./icons";
import { useLang } from "./lang-provider";
import type { Property } from "@/data/site";
import { SERVICE_AREAS, SITE } from "@/data/site";
import { cn, telLink, whatsappLink } from "@/lib/utils";
import { categoryOptions, localityName } from "@/lib/hi";

type Sort = "newest" | "price_asc" | "price_desc";

const SORTS: Array<{ value: Sort; en: string; hi: string }> = [
  { value: "newest", en: "Newest first", hi: "सबसे नई पहले" },
  { value: "price_asc", en: "Rate: low to high", hi: "भाव: कम से ज़्यादा" },
  { value: "price_desc", en: "Rate: high to low", hi: "भाव: ज़्यादा से कम" },
];

function readUrl() {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

/** Client-side filter + sort over the published listings. Works on static hosting. */
export default function PropertiesBrowser({ listings }: { listings: Property[] }) {
  const { t, lang } = useLang();
  const [purpose, setPurpose] = useState("all");
  const [category, setCategory] = useState("all");
  const [locality, setLocality] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showMore, setShowMore] = useState(false);
  const [ready, setReady] = useState(false);

  // Pick up ?purpose=…&locality=… from the home-page search form or a shared link
  useEffect(() => {
    const params = readUrl();
    setPurpose(params.get("purpose") || "all");
    setCategory(params.get("category") || "all");
    setLocality(params.get("locality") || "all");
    setQ(params.get("q") || "");
    setSort((params.get("sort") as Sort) || "newest");
    setReady(true);

    const onPop = () => {
      const next = readUrl();
      setPurpose(next.get("purpose") || "all");
      setCategory(next.get("category") || "all");
      setLocality(next.get("locality") || "all");
      setQ(next.get("q") || "");
      setSort((next.get("sort") as Sort) || "newest");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Keep the address bar shareable
  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    if (purpose !== "all") params.set("purpose", purpose);
    if (category !== "all") params.set("category", category);
    if (locality !== "all") params.set("locality", locality);
    if (q.trim()) params.set("q", q.trim());
    if (sort !== "newest") params.set("sort", sort);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [purpose, category, locality, q, sort, ready]);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = listings.filter((property) => {
      if (purpose !== "all" && property.purpose !== purpose) return false;
      if (category !== "all" && property.category !== category) return false;
      if (locality !== "all" && property.locality !== locality) return false;
      if (term) {
        const haystack = `${property.title} ${property.titleHi} ${property.locality} ${property.address}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
    const sorted = [...filtered];
    if (sort === "price_asc") sorted.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "price_desc") sorted.sort((a, b) => Number(b.price) - Number(a.price));
    else
      sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime(),
      );
    return sorted;
  }, [listings, purpose, category, locality, q, sort]);

  const activeCount = [purpose !== "all", category !== "all", locality !== "all", !!q.trim()].filter(
    Boolean,
  ).length;
  const cats = categoryOptions(lang);

  function clearAll() {
    setPurpose("all");
    setCategory("all");
    setLocality("all");
    setQ("");
    setSort("newest");
  }

  return (
    <div>
      {/* filter rail */}
      <div className="sticky top-[68px] z-30 -mx-5 border-y border-line bg-paper/95 px-5 py-4 backdrop-blur-md md:-mx-6 md:px-6 lg:top-[104px]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex overflow-hidden rounded-full border border-line bg-cream">
            {(["all", "sale", "rent", "lease"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPurpose(value)}
                className={cn(
                  "px-4 py-2 text-[0.78rem] font-semibold whitespace-nowrap transition-colors duration-300",
                  purpose === value ? "bg-moss text-cream" : "text-ink/70 hover:bg-paper-deep hover:text-ink",
                )}
              >
                {value === "all" ? t("filter.allDeals") : t(`purpose.${value}`)}
              </button>
            ))}
          </div>

          <Select
            value={category}
            onChange={setCategory}
            icon="building"
            options={[
              { value: "all", label: t("filter.allTypes") },
              ...cats.map((c) => ({ value: c.value, label: c.label })),
            ]}
          />

          <Select
            value={locality}
            onChange={setLocality}
            icon="pin"
            options={[
              { value: "all", label: t("filter.allAreas") },
              ...SERVICE_AREAS.map((area) => ({ value: area, label: localityName(area, lang) })),
            ]}
          />

          <div className="relative min-w-[180px] flex-1">
            <Icon name="search" size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-stone" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("filter.searchPlaceholder")}
              className="w-full rounded-full border border-line bg-cream py-2.5 pr-4 pl-10 text-[0.86rem] text-ink transition-colors placeholder:text-stone/70 focus:border-moss focus:outline-none"
            />
          </div>

          <Select
            value={sort}
            onChange={(value) => setSort(value as Sort)}
            icon="sliders"
            options={SORTS.map((s) => ({ value: s.value, label: lang === "hi" ? s.hi : s.en }))}
          />

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.78rem] font-semibold transition-colors",
              showMore ? "border-moss bg-moss text-cream" : "border-line bg-cream text-ink hover:border-moss",
            )}
          >
            <Icon name="sliders" size={15} />
            {t("filter.filters")}
            {activeCount ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-[0.65rem] text-ink tnum">
                {activeCount}
              </span>
            ) : null}
          </button>

          {activeCount ? (
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-clay transition-opacity hover:opacity-70"
            >
              <Icon name="close" size={14} /> {t("filter.clearAll")}
            </button>
          ) : null}
        </div>

        <div className={cn("grid transition-all duration-500 ease-out", showMore ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <div className="overflow-hidden">
            <div className="rounded-[3px] border border-line bg-cream p-5">
              <p className="text-[0.88rem] text-stone">
                <Bi2
                  lang={lang}
                  en="Land here is quoted per square foot. Tell us the area you need on WhatsApp and we will work out the total, including registry and stamp duty."
                  hi="यहाँ ज़मीन का भाव प्रति वर्ग फुट बताया जाता है। आपको कितना रकबा चाहिए, व्हाट्सएप पर बताइए — रजिस्ट्री और स्टांप ड्यूटी सहित पूरा हिसाब हम लगा देंगे।"
                />
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(SITE.whatsapp, lang === "hi" ? "नमस्ते! मुझे ज़मीन का रकबा और कुल भाव जानना है।" : "Namaste! I want to know the area and total price for a parcel.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-[0.76rem] font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-ink"
                >
                  <Icon name="whatsapp" size={15} /> {t("cta.whatsapp")}
                </a>
                <a
                  href={telLink(SITE.phone)}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[0.76rem] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:border-moss"
                >
                  <Icon name="phone" size={15} /> {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* results */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.86rem] text-stone">
          <span className="font-semibold text-ink tnum">{rows.length}</span>{" "}
          {rows.length === 1 ? t("list.foundOne") : t("list.found")}
        </p>
        <div className="flex overflow-hidden rounded-full border border-line bg-cream">
          {(
            [
              { mode: "grid", icon: "complex", label: t("list.gridView") },
              { mode: "list", icon: "menu", label: t("list.listView") },
            ] as const
          ).map(({ mode, icon, label }) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              title={label}
              aria-label={label}
              aria-pressed={view === mode}
              className={cn("px-3.5 py-2 transition-colors duration-300", view === mode ? "bg-ink text-cream" : "text-stone hover:text-ink")}
            >
              <Icon name={icon} size={15} />
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-6 rounded-[3px] border border-dashed border-line bg-cream px-6 py-16 text-center">
          <Icon name="search" size={28} className="mx-auto text-brass" />
          <h3 className="mt-4 font-display text-2xl text-ink">{t("list.empty.title")}</h3>
          <p className="mx-auto mt-2 max-w-md text-[0.94rem] text-stone">{t("list.empty.body")}</p>
          <a
            href={telLink(SITE.phone)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-[0.78rem] font-semibold tracking-[0.16em] text-cream uppercase transition-colors hover:bg-ink"
          >
            <Icon name="phone" size={15} /> {t("list.empty.cta")}
          </a>
        </div>
      ) : (
        <div className={cn("mt-6", view === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4")}>
          {rows.map((property, index) => (
            <Reveal key={property.slug} delay={Math.min(index, 8) * 55}>
              <PropertyCard property={property} index={index} variant={view === "grid" ? "grid" : "list"} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  icon: string;
}) {
  return (
    <label className="relative">
      <Icon name={icon} size={15} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-stone" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-line bg-cream py-2.5 pr-9 pl-9 text-[0.82rem] font-medium text-ink transition-colors hover:border-moss focus:border-moss focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" size={14} className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-stone" />
    </label>
  );
}

/** Small helper for client-side bilingual text without the CSS trick. */
function Bi2({ lang, en, hi }: { lang: string; en: string; hi: string }) {
  return <>{lang === "hi" ? hi : en}</>;
}
