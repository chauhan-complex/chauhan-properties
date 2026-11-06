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
  const [sheetOpen, setSheetOpen] = useState(false);
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

  // The filter sheet locks the page behind it; Escape closes it.
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = listings.filter((property) => {
      if (purpose !== "all" && property.purpose !== purpose) return false;
      if (category !== "all") {
        const wanted = category as Property["category"];
        if (property.category !== wanted && !(property.covers ?? []).includes(wanted)) return false;
      }
      if (locality !== "all" && property.locality !== locality) return false;
      if (term) {
        const haystack =
          `${property.title} ${property.titleHi} ${property.locality} ${property.address}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
    const sorted = [...filtered];
    const priced = (p: Property, asc: boolean) => {
      const n = Number(p.price);
      if (!p.price || n === 0) return asc ? Number.POSITIVE_INFINITY : -1;
      return n;
    };
    if (sort === "price_asc") sorted.sort((a, b) => priced(a, true) - priced(b, true));
    else if (sort === "price_desc") sorted.sort((a, b) => priced(b, false) - priced(a, false));
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

  function clearAll() {
    setPurpose("all");
    setCategory("all");
    setLocality("all");
    setQ("");
    setSort("newest");
  }

  const controls = {
    purpose,
    setPurpose,
    category,
    setCategory,
    locality,
    setLocality,
    q,
    setQ,
    sort,
    setSort,
    cats: categoryOptions(lang),
    t,
    lang,
  };

  return (
    <div>
      {/* ── sticky bar ───────────────────────────────────────────────
          Mobile: one 56px row (Filters + Sort). Everything else lives in the
          slide-up sheet, so results always get nearly the whole screen.
          Desktop: the full inline rail, where there is room for it. */}
      <div className="sticky top-[68px] z-30 -mx-5 border-y border-line bg-paper/95 backdrop-blur-md md:-mx-6 lg:top-[104px]">
        {/* mobile row */}
        <div className="flex items-center gap-2 px-4 py-2.5 md:hidden">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.8rem] font-semibold transition-colors",
              activeCount
                ? "border-moss bg-moss text-cream"
                : "border-line bg-cream text-ink",
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

          <label className="relative min-w-0 flex-1">
            <Icon
              name="sliders"
              size={14}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label={t("filter.sort.newest")}
              className="w-full appearance-none rounded-full border border-line bg-cream py-2.5 pr-8 pl-8 text-[0.78rem] font-medium text-ink focus:border-moss focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {lang === "hi" ? s.hi : s.en}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={13}
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-stone"
            />
          </label>

          {activeCount ? (
            <button
              type="button"
              onClick={clearAll}
              aria-label={t("filter.clearAll")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-clay"
            >
              <Icon name="close" size={15} />
            </button>
          ) : null}
        </div>

        {/* active filter chips (mobile) — so you can see what is applied */}
        {activeCount ? (
          <div className="rail flex gap-2 overflow-x-auto px-4 pb-2.5 md:hidden">
            {purpose !== "all" ? (
              <Chip label={t(`purpose.${purpose}`)} onClear={() => setPurpose("all")} />
            ) : null}
            {category !== "all" ? (
              <Chip
                label={controls.cats.find((c) => c.value === category)?.label ?? category}
                onClear={() => setCategory("all")}
              />
            ) : null}
            {locality !== "all" ? (
              <Chip label={localityName(locality, lang)} onClear={() => setLocality("all")} />
            ) : null}
            {q.trim() ? <Chip label={`“${q.trim()}”`} onClear={() => setQ("")} /> : null}
          </div>
        ) : null}

        {/* desktop rail */}
        <div className="hidden px-6 py-4 md:block">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-line bg-cream">
              {(["all", "sale", "rent", "lease"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPurpose(value)}
                  className={cn(
                    "px-4 py-2 text-[0.78rem] font-semibold whitespace-nowrap transition-colors duration-300",
                    purpose === value
                      ? "bg-moss text-cream"
                      : "text-ink/70 hover:bg-paper-deep hover:text-ink",
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
                ...controls.cats.map((c) => ({ value: c.value, label: c.label })),
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
              <Icon
                name="search"
                size={16}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-stone"
              />
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
        </div>
      </div>

      {/* ── mobile filter sheet ── */}
      {sheetOpen ? (
        <div className="fixed inset-0 z-[75] flex flex-col justify-end md:hidden">
          <button
            type="button"
            aria-label={t("nav.close")}
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div className="relative max-h-[86svh] overflow-y-auto rounded-t-[10px] border-t border-line bg-paper shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-paper/95 px-5 py-3.5 backdrop-blur">
              <span className="font-display text-[1.15rem] text-ink">{t("filter.filters")}</span>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label={t("nav.close")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-stone"
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5">
              <Field label={t("filter.allDeals")}>
                <div className="grid grid-cols-2 gap-2">
                  {(["all", "sale", "rent", "lease"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPurpose(value)}
                      className={cn(
                        "rounded-[3px] border px-3 py-3 text-[0.86rem] font-semibold transition-colors",
                        purpose === value
                          ? "border-moss bg-moss text-cream"
                          : "border-line bg-cream text-ink/80",
                      )}
                    >
                      {value === "all" ? t("filter.allDeals") : t(`purpose.${value}`)}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={t("search.category")}>
                <BigSelect
                  value={category}
                  onChange={setCategory}
                  options={[
                    { value: "all", label: t("filter.allTypes") },
                    ...controls.cats.map((c) => ({ value: c.value, label: c.label })),
                  ]}
                />
              </Field>

              <Field label={t("search.locality")}>
                <BigSelect
                  value={locality}
                  onChange={setLocality}
                  options={[
                    { value: "all", label: t("filter.allAreas") },
                    ...SERVICE_AREAS.map((area) => ({ value: area, label: localityName(area, lang) })),
                  ]}
                />
              </Field>

              <Field label={t("filter.sort.newest")}>
                <BigSelect
                  value={sort}
                  onChange={(value) => setSort(value as Sort)}
                  options={SORTS.map((s) => ({ value: s.value, label: lang === "hi" ? s.hi : s.en }))}
                />
              </Field>

              <Field label={t("filter.searchPlaceholder")}>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("filter.searchPlaceholder")}
                  className="w-full rounded-[3px] border border-line bg-cream px-4 py-3 text-[0.92rem] text-ink focus:border-moss focus:outline-none"
                />
              </Field>

              <div className="rounded-[3px] border border-line bg-cream p-4">
                <p className="text-[0.86rem] leading-relaxed text-stone">
                  {lang === "hi"
                    ? "यहाँ लगी हर प्रॉपर्टी मालिक की अपनी है और ज़मीन का भाव प्रति वर्ग फुट बताया जाता है। कितना रकबा चाहिए व्हाट्सएप पर बताइए — रजिस्ट्री और स्टांप ड्यूटी सहित पूरा हिसाब वे लगा देंगे।"
                    : "Every listing here is the owner's own property, and land is quoted per square foot. Tell us the area you need on WhatsApp and we will work out the total, including registry and stamp duty."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={whatsappLink(
                      SITE.whatsapp,
                      lang === "hi"
                        ? "नमस्ते! मुझे ज़मीन का रकबा और कुल भाव जानना है।"
                        : "Namaste! I want to know the area and total price for a parcel.",
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2.5 text-[0.74rem] font-bold tracking-[0.12em] text-cream uppercase"
                  >
                    <Icon name="whatsapp" size={14} /> {t("cta.whatsapp")}
                  </a>
                  <a
                    href={telLink(SITE.phone)}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.74rem] font-semibold tracking-[0.12em] text-ink uppercase"
                  >
                    <Icon name="phone" size={14} /> {SITE.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 flex items-center gap-3 border-t border-line bg-paper/95 px-5 py-3.5 backdrop-blur">
              {activeCount ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-full border border-line px-5 py-3 text-[0.78rem] font-semibold text-clay"
                >
                  {t("filter.clearAll")}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-moss px-6 py-3.5 text-[0.8rem] font-bold tracking-[0.14em] text-cream uppercase"
              >
                {lang === "hi"
                  ? `${rows.length} प्रॉपर्टी दिखाएँ`
                  : `Show ${rows.length} ${rows.length === 1 ? "property" : "properties"}`}
                <Icon name="arrow-right" size={15} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── results ── */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 md:mt-6">
        <p className="text-[0.86rem] text-stone">
          <span className="font-semibold text-ink tnum">{rows.length}</span>{" "}
          {rows.length === 1 ? t("list.foundOne") : t("list.found")}
        </p>
        <div className="hidden overflow-hidden rounded-full border border-line bg-cream md:flex">
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
              className={cn(
                "px-3.5 py-2 transition-colors duration-300",
                view === mode ? "bg-ink text-cream" : "text-stone hover:text-ink",
              )}
            >
              <Icon name={icon} size={15} />
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-5 rounded-[3px] border border-dashed border-line bg-cream px-6 py-14 text-center">
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
        <div
          className={cn(
            "mt-5",
            view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4",
          )}
        >
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

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1.5 text-[0.76rem] text-ink/80"
    >
      {label}
      <Icon name="close" size={12} className="text-clay" />
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-2 block text-[0.68rem] font-semibold tracking-[0.18em] text-stone uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function BigSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[3px] border border-line bg-cream px-4 py-3 pr-10 text-[0.92rem] font-medium text-ink focus:border-moss focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={16}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-stone"
      />
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
      <Icon
        name={icon}
        size={15}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-stone"
      />
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
      <Icon
        name="chevron-down"
        size={14}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-stone"
      />
    </label>
  );
}
