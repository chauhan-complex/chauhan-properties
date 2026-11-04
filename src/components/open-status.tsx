"use client";

import { useEffect, useState } from "react";
import { useLang } from "./lang-provider";

/** Live open/closed indicator in Indian time — computed in the browser. */
export default function OpenStatus() {
  const { t } = useLang();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const day = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const open = day === "Sun" ? false : hour + minute / 60 >= 10 && hour + minute / 60 < 20;

  return (
    <div className="flex items-center gap-3 rounded-full border border-cream/20 px-5 py-3">
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full rounded-full ${open ? "animate-pulse-ring bg-brass-soft" : "bg-cream/30"}`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-brass-soft" : "bg-cream/40"}`} />
      </span>
      <span className="text-[0.78rem] tracking-[0.16em] text-cream/70 uppercase">
        {open ? t("contact.deskOpen") : day === "Sun" ? t("contact.sundayLabel") : t("contact.deskClosed")}
      </span>
    </div>
  );
}
