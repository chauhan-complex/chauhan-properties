"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { useLang } from "./lang-provider";
import { SITE } from "@/data/site";
import { cn, normalizePhone, telLink, whatsappLink } from "@/lib/utils";
import { categoryOptions } from "@/lib/hi";

const DEALS = ["sell", "rent", "lease"] as const;
const AREA_UNITS = ["sqft", "sqmt", "sqyd", "acre", "bigha", "biswa"];
const UNIT_HI: Record<string, string> = {
  sqft: "वर्ग फुट",
  sqmt: "वर्ग मीटर",
  sqyd: "वर्ग गज",
  acre: "एकड़",
  bigha: "बीघा",
  biswa: "बिस्वा",
};
const PAPERS = ["registry", "mutation", "khatauni", "plan", "tax", "rent", "unsure"] as const;
const WHEN = ["anytime", "morning", "evening", "whatsapp"] as const;

/** Composes the owner's details into a WhatsApp message and an email. No server. */
export default function SellForm() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    deal: "sell",
    category: "plot",
    locality: "",
    area: "",
    areaUnit: "sqft",
    price: "",
    details: "",
    when: "anytime",
  });
  const [papers, setPapers] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function togglePaper(paper: string) {
    setPapers((prev) => (prev.includes(paper) ? prev.filter((p) => p !== paper) : [...prev, paper]));
  }

  const cats = categoryOptions(lang);
  const categoryLabel = cats.find((c) => c.value === form.category)?.label ?? form.category;

  const lines = [
    lang === "hi" ? `नमस्ते ${SITE.ownerName} जी, अपनी प्रॉपर्टी की जानकारी भेज रहा/रही हूँ:` : `Namaste ${SITE.ownerName}, details of my property:`,
    "",
    `${lang === "hi" ? "क्या करना है" : "I want to"}: ${t(`sell.deal.${form.deal}`)}`,
    `${lang === "hi" ? "नाम" : "Name"}: ${form.name}`,
    `${lang === "hi" ? "मोबाइल" : "Mobile"}: ${form.phone}`,
    form.email ? `${lang === "hi" ? "ईमेल" : "Email"}: ${form.email}` : "",
    `${lang === "hi" ? "प्रकार" : "Type"}: ${categoryLabel}`,
    `${lang === "hi" ? "इलाका" : "Locality"}: ${form.locality}`,
    form.area ? `${lang === "hi" ? "रकबा" : "Area"}: ${form.area} ${lang === "hi" ? UNIT_HI[form.areaUnit] : form.areaUnit}` : "",
    form.price ? `${lang === "hi" ? "अपेक्षित दाम" : "Expected price"}: ${form.price}` : "",
    papers.length ? `${lang === "hi" ? "कागज़" : "Papers"}: ${papers.map((p) => t(`sell.paper.${p}`)).join(", ")}` : "",
    `${lang === "hi" ? "कॉल का समय" : "Best time to call"}: ${t(`sell.when.${form.when}`)}`,
    form.details ? `${lang === "hi" ? "विवरण" : "Details"}: ${form.details}` : "",
  ].filter((line) => line !== "");

  const message = lines.join("\n");
  const subject = lang === "hi" ? `प्रॉपर्टी: ${form.locality || categoryLabel}` : `Property to ${form.deal}: ${form.locality || categoryLabel}`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return setError(t("form.errName"));
    if (normalizePhone(form.phone).length !== 10) return setError(t("form.errPhone"));
    if (!form.locality.trim()) return setError(t("sell.errLocality"));
    setReady(true);
  }

  const label = "mb-1.5 block text-[0.68rem] font-semibold tracking-[0.18em] text-stone uppercase";
  const field =
    "w-full rounded-[3px] border border-line bg-paper px-4 py-3 text-[0.92rem] text-ink transition-colors placeholder:text-stone/60 focus:border-moss focus:outline-none";

  if (ready) {
    return (
      <div className="rounded-[3px] border border-moss/30 bg-cream p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-moss text-cream">
          <Icon name="check" size={26} strokeWidth={2} />
        </span>
        <h3 className="mt-4 font-display text-2xl text-ink">{t("sell.sentTitle", { name: form.name.split(" ")[0] })}</h3>
        <p className="mx-auto mt-2 max-w-md text-[0.93rem] text-stone">
          {lang === "hi"
            ? "नीचे व्हाट्सएप या ईमेल दबाइए — आपकी सारी जानकारी पहले से भरी हुई है। एक कार्यदिवस में जवाब मिलेगा।"
            : "Press WhatsApp or Email below — everything you typed is already filled in. You will have an answer within one working day."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(SITE.whatsapp, message)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-[0.78rem] font-bold tracking-[0.16em] text-ink uppercase transition-transform hover:-translate-y-0.5"
          >
            <Icon name="whatsapp" size={16} /> {t("sell.sentWa")}
          </a>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.78rem] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:border-moss"
          >
            <Icon name="mail" size={15} /> {lang === "hi" ? "ईमेल भेजें" : "Send email"}
          </a>
          <a
            href={telLink(SITE.phone)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.78rem] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:border-moss"
          >
            <Icon name="phone" size={15} /> {t("form.callNow")}
          </a>
        </div>
        <button type="button" onClick={() => setReady(false)} className="mt-6 text-[0.8rem] text-stone underline underline-offset-4 hover:text-moss">
          {t("sell.sentAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[3px] border border-line bg-cream p-6 md:p-8">
      <h2 className="font-display text-[1.6rem] text-ink">{t("sell.formTitle")}</h2>
      <p className="mt-1.5 text-[0.88rem] text-stone">{t("sell.formSub")}</p>

      <div className="mt-6">
        <span className={label}>{t("sell.dealLabel")}</span>
        <div className="flex flex-wrap gap-2">
          {DEALS.map((deal) => (
            <button
              key={deal}
              type="button"
              onClick={() => set("deal", deal)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.82rem] font-semibold transition-all duration-300",
                form.deal === deal ? "border-moss bg-moss text-cream" : "border-line text-ink/75 hover:border-moss",
              )}
            >
              {t(`sell.deal.${deal}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{t("form.name")} *</span>
          <input className={field} value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </label>
        <label className="block">
          <span className={label}>{t("form.phone")} *</span>
          <div className="relative">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[0.9rem] text-stone">+91</span>
            <input
              className={cn(field, "pl-12")}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value.replace(/[^\d\s]/g, "").slice(0, 12))}
              placeholder="98xxxxxxxx"
              inputMode="tel"
              required
            />
          </div>
        </label>
        <label className="block">
          <span className={label}>{t("sell.typeLabel")} *</span>
          <select className={field} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {cats.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>{t("sell.localityLabel")} *</span>
          <input
            className={field}
            value={form.locality}
            onChange={(e) => set("locality", e.target.value)}
            placeholder={lang === "hi" ? "जैसे अमौसी, मीरानपुर पिनवट" : "e.g. Amausi, Miranpur Pinwat"}
            required
          />
        </label>
        <label className="block">
          <span className={label}>{t("sell.areaLabel")}</span>
          <div className="flex gap-2">
            <input className={cn(field, "flex-1")} value={form.area} onChange={(e) => set("area", e.target.value.replace(/[^\d.]/g, ""))} placeholder="200" inputMode="decimal" />
            <select className={cn(field, "w-32")} value={form.areaUnit} onChange={(e) => set("areaUnit", e.target.value)} aria-label={t("sell.areaLabel")}>
              {AREA_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {lang === "hi" ? UNIT_HI[unit] : unit}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="block">
          <span className={label}>{form.deal === "sell" ? t("sell.priceLabel") : t("sell.rentLabel")}</span>
          <input
            className={field}
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder={lang === "hi" ? "जैसे ₹1,500 प्रति वर्ग फुट" : "e.g. ₹1,500 per sq.ft"}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>{t("form.email")}</span>
          <input className={field} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </label>
      </div>

      <div className="mt-5">
        <span className={label}>{t("sell.papersLabel")}</span>
        <div className="flex flex-wrap gap-2">
          {PAPERS.map((paper) => (
            <button
              key={paper}
              type="button"
              onClick={() => togglePaper(paper)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-all duration-300",
                papers.includes(paper) ? "border-brass bg-brass text-ink" : "border-line text-ink/75 hover:border-moss",
              )}
            >
              {t(`sell.paper.${paper}`)}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-5 block">
        <span className={label}>{t("sell.detailsLabel")}</span>
        <textarea className={cn(field, "min-h-[110px] resize-y")} value={form.details} onChange={(e) => set("details", e.target.value)} placeholder={t("sell.detailsPlaceholder")} />
      </label>

      <div className="mt-4">
        <span className={label}>{t("sell.whenLabel")}</span>
        <div className="flex flex-wrap gap-2">
          {WHEN.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => set("when", option)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-all duration-300",
                form.when === option ? "border-moss bg-moss text-cream" : "border-line text-ink/75 hover:border-moss",
              )}
            >
              {t(`sell.when.${option}`)}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="mt-4 flex items-center gap-2 text-[0.86rem] text-clay" role="alert">
          <Icon name="close" size={14} /> {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-moss px-7 py-4 text-[0.82rem] font-bold tracking-[0.16em] text-cream uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink sm:w-auto"
      >
        {lang === "hi" ? "जानकारी तैयार करें" : "Prepare my message"}
        <Icon name="arrow-right" size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
      </button>

      <p className="mt-4 text-[0.74rem] text-stone">{t("sell.privacy")}</p>
    </form>
  );
}
