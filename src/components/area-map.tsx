import { cn } from "@/lib/utils";
import { AREAS, areaNearText, areaRateShort, type Area } from "@/data/site";

/**
 * Hand-drawn survey map of the belt we work in — Amausi, Gauri, Miranpur
 * Pinwat, Aurawan and Piparsand. Pure SVG, no stock photography.
 * Rates and landmarks come from src/data/site.ts.
 *
 * SVG <text> does not wrap, so the landmark line is broken into <tspan> rows by
 * wrapLines() and clamped to the width of its own plot box — that is what keeps
 * long names like "Greenberry World School" inside the boundary.
 */

const POSITIONS: Record<string, { x: number; y: number; w: number; h: number }> = {
  Amausi: { x: 96, y: 130, w: 190, h: 118 },
  Gauri: { x: 302, y: 70, w: 188, h: 118 },
  "Miranpur Pinwat": { x: 498, y: 150, w: 202, h: 118 },
  Aurawan: { x: 200, y: 288, w: 210, h: 118 },
  Piparsand: { x: 498, y: 322, w: 196, h: 114 },
};

const NEAR_FONT = 10;
const NEAR_MAX_LINES = 2;
/** How many landmarks the map shows before wrapping — the full list is on the rate card. */
const NEAR_SHOWN = 3;

/**
 * Wrap to a per-line character budget. Line 0 gets a smaller budget because the
 * "near " / "पास में " prefix is drawn on it, so nothing can spill past the box.
 */
function wrapLines(text: string, budgets: number[], maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const budget = budgets[Math.min(lines.length, budgets.length - 1)];
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= budget) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    if (lines.length >= maxLines) {
      current = "";
      break;
    }
    current = word;
  }
  if (current && lines.length < maxLines) lines.push(current);

  const shown = lines.join(" ").replace(/\s+/g, " ").trim();
  const full = text.replace(/\s+/g, " ").trim();
  if (shown.length < full.length && lines.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[·,\s]+$/, "")} …`;
  }
  return lines.slice(0, maxLines);
}

export { AREAS };

/**
 * Renders the map in both languages; CSS shows the active one. Use this instead
 * of <AreaMap/> directly so Hindi visitors see Hindi labels.
 */
export function AreaMapBilingual({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  return (
    <>
      <div className="i18n-en h-full w-full">
        <AreaMap lang="en" tone={tone} compact={compact} />
      </div>
      <div className="i18n-hi h-full w-full">
        <AreaMap lang="hi" tone={tone} compact={compact} />
      </div>
    </>
  );
}

export default function AreaMap({
  lang = "en",
  tone = "dark",
  className,
  compact = false,
}: {
  lang?: "en" | "hi";
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
}) {
  const dark = tone === "dark";
  const line = dark ? "rgba(253,250,243,0.16)" : "rgba(29,75,58,0.22)";
  const accent = dark ? "#e0b153" : "#c08a22";
  const text = dark ? "rgba(253,250,243,0.85)" : "#0c1613";
  const muted = dark ? "rgba(253,250,243,0.55)" : "rgba(12,22,19,0.62)";

  const renderArea = (area: Area, index: number) => {
    const pos = POSITIONS[area.name] ?? { x: 100 + index * 60, y: 200, w: 160, h: 110 };
    const label = lang === "hi" ? area.nameHi : area.name;
    const rate = areaRateShort(area, lang);
    const landmarks = areaNearText(area, lang, true);

    /* Devanagari glyphs are wider per character, and line 0 also carries the
       "near " / "पास में " prefix — both are subtracted from the budget. */
    const charWidth = lang === "hi" ? 6.2 : 5.2;
    const prefixChars = lang === "hi" ? 9 : 6;
    const usable = pos.w - 20;
    const budgets = [
      Math.max(8, Math.floor((usable - prefixChars * charWidth) / charWidth)),
      Math.max(8, Math.floor(usable / charWidth)),
    ];
    const nearLines = landmarks ? wrapLines(landmarks, budgets, NEAR_MAX_LINES) : [];
    const cx = pos.x + pos.w / 2;

    return (
      <g key={area.name}>
        <rect
          x={pos.x}
          y={pos.y}
          width={pos.w}
          height={pos.h}
          fill={dark ? "rgba(224,177,83,0.07)" : "rgba(192,138,34,0.07)"}
          stroke={accent}
          strokeWidth="1.4"
          strokeDasharray="7 5"
          className="animate-dash"
          style={{ animationDelay: `${index * 400}ms` }}
        />
        {[
          [pos.x, pos.y],
          [pos.x + pos.w, pos.y],
          [pos.x, pos.y + pos.h],
          [pos.x + pos.w, pos.y + pos.h],
        ].map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r="3" fill={accent} />
        ))}

        {compact ? (
          <text x={cx} y={pos.y + pos.h / 2 + 5} textAnchor="middle" fill={text} fontSize="15" fontWeight="600">
            {label}
          </text>
        ) : (
          <>
            <text x={cx} y={pos.y + 30} textAnchor="middle" fill={text} fontSize="15" fontWeight="600">
              {label}
            </text>
            <text x={cx} y={pos.y + 51} textAnchor="middle" fill={accent} fontSize="11" fontWeight="500">
              {rate}
            </text>
            {nearLines.map((row, i) => (
              <text
                key={row + i}
                x={cx}
                y={pos.y + 69 + i * 12.5}
                textAnchor="middle"
                fill={muted}
                fontSize={NEAR_FONT}
              >
                {i === 0 ? (lang === "hi" ? "पास में " : "near ") : ""}
                {row}
              </text>
            ))}
          </>
        )}
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 760 470"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={
        lang === "hi"
          ? "अमौसी, गौरी, मीरानपुर पिनवट, औरावां और पिपरसंड का क्षेत्र नक्शा"
          : "Area map of Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand"
      }
    >
      <defs>
        <pattern id="survey-grid" width="38" height="38" patternUnits="userSpaceOnUse">
          <path d="M38 0H0V38" fill="none" stroke={line} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="760" height="470" fill="url(#survey-grid)" opacity={dark ? 0.5 : 0.8} />

      {/* Kanpur Road / NH-27 */}
      <path
        d="M-10 402 C 150 372, 300 424, 470 388 S 700 336, 780 352"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeOpacity="0.65"
      />
      <text x="24" y="424" fill={muted} fontSize="13" letterSpacing="2.4">
        {lang === "hi" ? "कानपुर रोड · NH-27" : "KANPUR ROAD · NH-27"}
      </text>

      <text x="24" y="46" fill={muted} fontSize="13" letterSpacing="2.4">
        {lang === "hi" ? "लखनऊ की तरफ ←" : "← TOWARDS LUCKNOW"}
      </text>
      <text x="628" y="46" fill={muted} fontSize="13" letterSpacing="2.4">
        {lang === "hi" ? "→ उन्नाव" : "UNNAO →"}
      </text>

      {/* office marker, kept clear of every plot box */}
      <g>
        <circle cx="30" cy="74" r="5.5" fill={accent} />
        <circle cx="30" cy="74" r="12" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55" />
        <text x="48" y="79" fill={text} fontSize="11.5" fontWeight="600">
          {lang === "hi" ? "चौहान कॉम्प्लेक्स — ऑफिस" : "Chauhan Complex — office"}
        </text>
      </g>

      {AREAS.map(renderArea)}

      <text x="620" y="452" fill={muted} fontSize="11" letterSpacing="1.6">
        {lang === "hi" ? "स्केल अनुसार नहीं" : "NOT TO SCALE"}
      </text>
    </svg>
  );
}
