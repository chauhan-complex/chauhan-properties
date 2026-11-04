"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icons";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

/** Scroll-triggered fade + rise. Stagger with `delay`. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      data-visible={inView ? "true" : "false"}
      className={cn("reveal", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

/** Heading whose lines slide up from behind a mask. */
export function LineMask({
  lines,
  className,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span className="line-mask" key={index}>
          <span style={{ ["--line-delay" as string]: `${delay + index * 110}ms` }}>{line}</span>
        </span>
      ))}
    </span>
  );
}

const GLYPHS_LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ//<>*#$%&";
const GLYPHS_DEVANAGARI = "कखगघचछजझटठडढतथदधनपफबभमयरलवशषसह ािीुूृेैोौंःँ";

/** Scramble with the right alphabet — Devanagari words must not decode through Latin letters. */
function pickGlyphs(target: string) {
  return /[\u0900-\u097F]/.test(target) ? GLYPHS_DEVANAGARI : GLYPHS_LATIN;
}

/** Words that decode themselves, letter by letter, on a loop. */
export function ScrambleWords({
  words,
  className,
  interval = 2800,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const frame = useRef(0);
  const raf = useRef<number | null>(null);
  const hostRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // The inactive language is hidden by CSS — show the plain word and skip the animation.
    const hidden = hostRef.current ? hostRef.current.offsetParent === null : false;
    if (reduced || hidden || words.length < 2) {
      setText(words[index] ?? "");
      return;
    }
    const target = words[index] ?? "";
    const glyphs = pickGlyphs(target);
    frame.current = 0;
    const tick = () => {
      const progress = frame.current / 2;
      const out = target
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < progress) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join("");
      setText(out);
      frame.current += 1;
      if (progress <= target.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setText(target);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [index, reduced, words]);

  useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [interval, words.length]);

  return (
    <span ref={hostRef} className={className} aria-live="polite">
      <span className="sr-only">{words[index]}</span>
      <span aria-hidden="true">{reduced ? words[index] : text}</span>
    </span>
  );
}

/** Number that rolls up the first time it is scrolled into view. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** Infinite horizontal ticker that pauses on hover. */
export function Marquee({
  children,
  slow = false,
  className,
}: {
  children: ReactNode;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee-host relative overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={slow ? { animationName: "marquee", animationDuration: "70s" } : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Page-top progress rail tied to scroll depth. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
      <div
        className="h-full origin-left bg-gradient-to-r from-brass via-brass-soft to-moss-soft transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  tone = "ink",
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "paper";
  action?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? (
          <div
            className={cn(
              "eyebrow mb-3 flex items-center gap-2",
              align === "center" && "justify-center",
              tone === "paper" ? "text-brass-soft" : "text-moss-soft",
            )}
          >
            <span
              className={cn(
                "inline-block h-px w-8",
                tone === "paper" ? "bg-brass-soft/70" : "bg-moss-soft/60",
              )}
            />
            {eyebrow}
          </div>
        ) : null}
        <h2
          className={cn(
            "text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.06]",
            tone === "paper" ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
        {sub ? (
          <p
            className={cn(
              "mt-3 text-[0.98rem] leading-relaxed",
              tone === "paper" ? "text-cream/70" : "text-stone",
            )}
          >
            {sub}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}

export function ArrowButton({
  children,
  href,
  variant = "solid",
  className,
  type,
  onClick,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "brass" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[0.82rem] font-semibold tracking-[0.14em] uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";
  const variants: Record<string, string> = {
    solid: "bg-moss text-cream hover:bg-ink",
    brass: "bg-brass text-ink hover:bg-brass-soft",
    outline: "border border-line text-ink hover:border-moss hover:bg-cream",
    ghost: "text-ink hover:text-moss",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        <Icon name="arrow-right" size={16} strokeWidth={1.8} />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {content}
      </a>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {content}
    </button>
  );
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return useMemo(() => new Date(now), [now]);
}
