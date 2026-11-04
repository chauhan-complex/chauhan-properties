"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { useLang } from "./lang-provider";
import { SITE } from "@/data/site";
import { cn, normalizePhone, telLink, whatsappLink } from "@/lib/utils";

export interface EnquiryFormProps {
  propertyTitle?: string;
  propertyTitleHi?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}

/**
 * Static-site enquiry form: nothing is POSTed anywhere. The visitor's details
 * are composed into a WhatsApp message and an email they send with one tap, so
 * the enquiry reaches the owner directly with no server and no third party.
 */
export default function EnquiryForm({
  propertyTitle,
  propertyTitleHi,
  tone = "light",
  compact = false,
}: EnquiryFormProps) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", message: "" });
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const dark = tone === "dark";
  const fieldClass = cn(
    "w-full rounded-[3px] border px-4 py-3 text-[0.92rem] transition-colors focus:outline-none",
    dark
      ? "border-cream/20 bg-cream/5 text-cream placeholder:text-cream/40 focus:border-brass-soft"
      : "border-line bg-paper text-ink placeholder:text-stone/70 focus:border-moss",
  );
  const labelClass = cn(
    "mb-1.5 block text-[0.68rem] font-semibold tracking-[0.18em] uppercase",
    dark ? "text-cream/60" : "text-stone",
  );

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const title = lang === "hi" && propertyTitleHi ? propertyTitleHi : (propertyTitle ?? "");
  const bodyLines = [
    lang === "hi" ? `नमस्ते ${SITE.ownerName} जी,` : `Namaste ${SITE.ownerName},`,
    "",
    lang === "hi" ? `नाम: ${form.name}` : `Name: ${form.name}`,
    lang === "hi" ? `मोबाइल: ${form.phone}` : `Mobile: ${form.phone}`,
    form.email ? (lang === "hi" ? `ईमेल: ${form.email}` : `Email: ${form.email}`) : "",
    form.budget ? (lang === "hi" ? `बजट / अपेक्षित दाम: ${form.budget}` : `Budget: ${form.budget}`) : "",
    title ? (lang === "hi" ? `प्रॉपर्टी: ${title}` : `Property: ${title}`) : "",
    "",
    form.message || (lang === "hi" ? "कृपया और जानकारी भेजिए।" : "Please share more details."),
    "",
    lang === "hi" ? "(वेबसाइट से भेजा गया)" : "(sent from the website)",
  ].filter((line) => line !== "");

  const message = bodyLines.join("\n");
  const subject = title
    ? lang === "hi"
      ? `पूछताछ: ${title}`
      : `Website enquiry: ${title}`
    : lang === "hi"
      ? "वेबसाइट से पूछताछ"
      : "Enquiry from your website";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return setError(t("form.errName"));
    if (normalizePhone(form.phone).length !== 10) return setError(t("form.errPhone"));
    setReady(true);
  }

  if (ready) {
    return (
      <div
        className={cn(
          "rounded-[3px] border p-7 text-center",
          dark ? "border-brass-soft/40 bg-ink/40 text-cream" : "border-moss/30 bg-cream",
        )}
      >
        <span className={cn("mx-auto flex h-14 w-14 items-center justify-center rounded-full", dark ? "bg-brass text-ink" : "bg-moss text-cream")}>
          <Icon name="check" size={26} strokeWidth={2} />
        </span>
        <h3 className={cn("mt-4 font-display text-2xl", dark ? "text-cream" : "text-ink")}>
          {t("form.thanks", { name: form.name.split(" ")[0] })}
        </h3>
        <p className={cn("mt-2 text-[0.93rem]", dark ? "text-cream/70" : "text-stone")}>
          {lang === "hi"
            ? "यह साइट सीधे संदेश नहीं भेजती — नीचे व्हाट्सएप या ईमेल दबाइए, आपका संदेश तैयार मिलेगा और हमें उसी नंबर से जवाब मिल जाएगा।"
            : "This website does not store messages — press WhatsApp or Email below and your details are already filled in. We reply on the number you send from."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(SITE.whatsapp, message)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-[0.78rem] font-bold tracking-[0.16em] text-ink uppercase transition-transform hover:-translate-y-0.5"
          >
            <Icon name="whatsapp" size={16} /> {t("form.continueWa")}
          </a>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition-colors",
              dark ? "border-cream/25 text-cream hover:border-brass-soft" : "border-line text-ink hover:border-moss",
            )}
          >
            <Icon name="mail" size={15} /> {lang === "hi" ? "ईमेल भेजें" : "Send email"}
          </a>
          <a
            href={telLink(SITE.phone)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition-colors",
              dark ? "border-cream/25 text-cream hover:border-brass-soft" : "border-line text-ink hover:border-moss",
            )}
          >
            <Icon name="phone" size={15} /> {t("form.callNow")}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setReady(false)}
          className={cn("mt-5 text-[0.8rem] underline underline-offset-4", dark ? "text-cream/60" : "text-stone")}
        >
          {lang === "hi" ? "दोबारा भरें" : "Edit details"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {title && !compact ? (
        <div className={cn("mb-5 flex items-start gap-3 rounded-[3px] border px-4 py-3 text-[0.85rem]", dark ? "border-cream/15 bg-cream/5 text-cream/80" : "border-line bg-paper text-stone")}>
          <Icon name="ledger" size={17} className="mt-0.5 shrink-0 text-brass" />
          <span>
            {t("form.enquiryFor")} <strong className={dark ? "text-cream" : "text-ink"}>{title}</strong>
          </span>
        </div>
      ) : null}

      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
        <label className="block">
          <span className={labelClass}>{t("form.name")} *</span>
          <input className={fieldClass} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" required />
        </label>
        <label className="block">
          <span className={labelClass}>{t("form.phone")} *</span>
          <div className="relative">
            <span className={cn("absolute top-1/2 left-4 -translate-y-1/2 text-[0.9rem]", dark ? "text-cream/50" : "text-stone")}>+91</span>
            <input
              className={cn(fieldClass, "pl-12")}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value.replace(/[^\d\s-]/g, "").slice(0, 14))}
              placeholder="98xxxxxxxx"
              inputMode="tel"
              autoComplete="tel"
              required
            />
          </div>
        </label>
        {!compact ? (
          <>
            <label className="block">
              <span className={labelClass}>{t("form.email")}</span>
              <input className={fieldClass} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
            </label>
            <label className="block">
              <span className={labelClass}>{t("form.budget")}</span>
              <input className={fieldClass} value={form.budget} onChange={(e) => set("budget", e.target.value)} placeholder={lang === "hi" ? "जैसे 200 वर्ग फुट / ₹40 लाख" : "e.g. 200 sq.ft / ₹40 lakh"} />
            </label>
          </>
        ) : null}
      </div>

      <label className="mt-4 block">
        <span className={labelClass}>{t("form.message")}</span>
        <textarea className={cn(fieldClass, "min-h-[110px] resize-y")} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder={t("form.messagePlaceholder")} />
      </label>

      {error ? (
        <p className={cn("mt-3 flex items-center gap-2 text-[0.85rem]", dark ? "text-brass-soft" : "text-clay")} role="alert">
          <Icon name="close" size={14} /> {error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className={cn(
            "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[0.8rem] font-bold tracking-[0.16em] uppercase transition-all duration-300",
            dark ? "bg-brass text-ink hover:-translate-y-0.5 hover:bg-brass-soft" : "bg-moss text-cream hover:-translate-y-0.5 hover:bg-ink",
          )}
        >
          {t("form.submit")}
          <Icon name="arrow-right" size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className={cn("text-[0.78rem]", dark ? "text-cream/50" : "text-stone")}>{t("form.orCall", { phone: SITE.phone })}</p>
      </div>

      <p className={cn("mt-4 text-[0.72rem]", dark ? "text-cream/40" : "text-stone/80")}>{t("form.privacy")}</p>
    </form>
  );
}
