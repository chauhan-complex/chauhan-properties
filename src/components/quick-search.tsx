"use client";

import Link from "next/link";
import { Icon } from "./icons";
import { useLang } from "./lang-provider";
import { CATEGORIES, cn, localityName } from "@/lib/utils";
import { categoryOptions } from "@/lib/hi";
import { SERVICE_AREAS } from "@/data/site";

/**
 * Plain HTML GET form — works on static hosting with no JavaScript round trip.
 * /properties/ reads the query string in the browser and filters instantly.
 */
export default function QuickSearch() {
  const { t, lang } = useLang();
  const cats = categoryOptions(lang);
  const fieldBase =
    "w-full appearance-none rounded-none border-0 bg-transparent px-4 py-3.5 pr-10 text-[0.94rem] font-medium text-ink focus:outline-none";
  const cellClass = "group relative flex-1 border-line bg-cream transition-colors duration-300 hover:bg-paper";

  const chips =
    lang === "hi"
      ? [
          { label: "सभी ज़मीन / प्लॉट", href: "/properties/?category=plot" },
          { label: "मीरानपुर पिनवट", href: "/properties/?locality=Miranpur%20Pinwat" },
          { label: "अमौसी", href: "/properties/?locality=Amausi" },
          { label: "औरावां", href: "/properties/?locality=Aurawan" },
          { label: "पिपरसंड", href: "/properties/?locality=Piparsand" },
          { label: "गौरी", href: "/properties/?locality=Gauri" },
        ]
      : [
          { label: "All land & plots", href: "/properties/?category=plot" },
          { label: "Miranpur Pinwat", href: "/properties/?locality=Miranpur%20Pinwat" },
          { label: "Amausi", href: "/properties/?locality=Amausi" },
          { label: "Aurawan", href: "/properties/?locality=Aurawan" },
          { label: "Piparsand", href: "/properties/?locality=Piparsand" },
          { label: "Gauri", href: "/properties/?locality=Gauri" },
        ];

  return (
    <div className="w-full">
      <form
        action="/properties/"
        method="get"
        className="flex flex-col overflow-hidden rounded-[4px] border border-cream/15 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] md:flex-row md:items-stretch"
      >
        <label className={cn(cellClass, "border-b md:border-r md:border-b-0")}>
          <span className="eyebrow block px-4 pt-3 text-stone">{t("search.purpose")}</span>
          <select name="purpose" defaultValue="all" className={fieldBase} aria-label={t("search.purpose")}>
            <option value="all">{t("purpose.all")}</option>
            <option value="sale">{t("purpose.sale")}</option>
            <option value="rent">{t("purpose.rent")}</option>
            <option value="lease">{t("purpose.lease")}</option>
          </select>
          <Chevron />
        </label>

        <label className={cn(cellClass, "border-b md:border-r md:border-b-0")}>
          <span className="eyebrow block px-4 pt-3 text-stone">{t("search.category")}</span>
          <select name="category" defaultValue="all" className={fieldBase} aria-label={t("search.category")}>
            <option value="all">{t("category.all")}</option>
            {cats.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <Chevron />
        </label>

        <label className={cn(cellClass)}>
          <span className="eyebrow block px-4 pt-3 text-stone">{t("search.locality")}</span>
          <select name="locality" defaultValue="all" className={fieldBase} aria-label={t("search.locality")}>
            <option value="all">{t("search.any")}</option>
            {SERVICE_AREAS.map((area) => (
              <option key={area} value={area}>
                {localityName(area, lang)}
              </option>
            ))}
          </select>
          <Chevron />
        </label>

        <button
          type="submit"
          className="group relative flex items-center justify-center gap-2.5 bg-brass px-8 py-5 text-[0.8rem] font-bold tracking-[0.18em] text-ink uppercase transition-colors duration-300 hover:bg-brass-soft md:py-0"
        >
          <Icon name="search" size={17} className="transition-transform duration-300 group-hover:scale-110" />
          {t("search.submit")}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-1 text-cream/50">{t("search.quick")}:</span>
        {chips.map((chip) => (
          <Link
            key={chip.label}
            href={chip.href}
            className="rounded-full border border-cream/20 px-3.5 py-1.5 text-[0.76rem] text-cream/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft"
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/3 text-moss">
      <Icon name="chevron-down" size={16} />
    </span>
  );
}
