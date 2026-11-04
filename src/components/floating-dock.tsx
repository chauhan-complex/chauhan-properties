"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { cn, telLink, whatsappLink } from "@/lib/utils";

export default function FloatingDock({
  phone,
  whatsapp,
  message = "Namaste! I would like details about a property on your website.",
}: {
  phone: string;
  whatsapp: string;
  message?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* desktop rail */}
      <div
        className={cn(
          "fixed right-5 bottom-6 z-50 hidden flex-col items-center gap-2.5 transition-all duration-500 md:flex",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        <DockButton
          href={whatsappLink(whatsapp || phone, message)}
          external
          label="WhatsApp us"
          tone="whatsapp"
        >
          <Icon name="whatsapp" size={20} />
        </DockButton>
        <DockButton href={telLink(phone)} label={`Call ${phone}`} tone="brass">
          <Icon name="phone" size={19} />
        </DockButton>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream/90 text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-moss hover:text-moss"
        >
          <Icon name="chevron-down" size={18} className="rotate-180" />
        </button>
      </div>

      {/* mobile action bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px border-t border-line bg-line transition-transform duration-500 md:hidden",
          show ? "translate-y-0" : "translate-y-full",
        )}
      >
        <a
          href={telLink(phone)}
          className="flex items-center justify-center gap-2 bg-ink py-3.5 text-[0.78rem] font-semibold tracking-[0.14em] text-cream uppercase"
        >
          <Icon name="phone" size={16} /> Call
        </a>
        <a
          href={whatsappLink(whatsapp || phone, message)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-brass py-3.5 text-[0.78rem] font-semibold tracking-[0.14em] text-ink uppercase"
        >
          <Icon name="whatsapp" size={16} /> WhatsApp
        </a>
      </div>
    </>
  );
}

function DockButton({
  href,
  label,
  children,
  tone,
  external = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  tone: "brass" | "whatsapp";
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5",
        tone === "whatsapp" ? "bg-[#1d4b3a] text-cream hover:bg-moss-soft" : "bg-brass text-ink hover:bg-brass-soft",
      )}
    >
      <span
        className="absolute inset-0 rounded-full border border-current opacity-30"
        aria-hidden="true"
      />
      {children}
    </a>
  );
}
