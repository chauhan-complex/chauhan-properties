import type { ReactNode } from "react";
import { translate } from "@/lib/i18n";

/**
 * Static hosting cannot read cookies on the server, so both languages are
 * rendered into the HTML and CSS shows only the active one
 * (`html[lang="hi"] .i18n-en { display: none }`). An inline script in the head
 * sets <html lang> from the visitor's cookie before the first paint, so there is
 * no flash of the wrong language — and Google can read both versions.
 */

export function T({ k, vars }: { k: string; vars?: Record<string, string | number> }) {
  return (
    <>
      <span className="i18n-en">{translate("en", k, vars)}</span>
      <span className="i18n-hi">{translate("hi", k, vars)}</span>
    </>
  );
}

export function Bi({ en, hi }: { en: ReactNode; hi: ReactNode }) {
  return (
    <>
      <span className="i18n-en">{en}</span>
      <span className="i18n-hi">{hi}</span>
    </>
  );
}

/** Drop-in replacement for `createT(lang)` inside server components. */
export function dualT(key: string, vars?: Record<string, string | number>): ReactNode {
  return <T k={key} vars={vars} />;
}
