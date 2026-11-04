import { cn } from "@/lib/utils";

/**
 * Hand-drawn survey map of the belt we work in — Amausi, Gauri, Miranpur Pinwat,
 * Aurawan and Piparsand. Pure SVG, no stock photography, animated boundary lines.
 */

export const AREAS = [
  {
    name: "Amausi",
    hi: "अमौसी",
    x: 150,
    y: 150,
    w: 130,
    h: 96,
    rate: "₹1,000 – ₹2,500 / sq.ft",
    rateHi: "₹1,000 – ₹2,500 प्रति वर्ग फुट",
    parcels: 3,
  },
  {
    name: "Gauri",
    hi: "गौरी",
    x: 330,
    y: 108,
    w: 118,
    h: 84,
    rate: "On request",
    rateHi: "भाव पूछिए",
    parcels: 0,
  },
  {
    name: "Miranpur Pinwat",
    hi: "मीरानपुर पिनवट",
    x: 486,
    y: 168,
    w: 168,
    h: 118,
    rate: "₹1,200 – ₹3,500 / sq.ft",
    rateHi: "₹1,200 – ₹3,500 प्रति वर्ग फुट",
    parcels: 4,
  },
  {
    name: "Aurawan",
    hi: "औरावां",
    x: 236,
    y: 300,
    w: 132,
    h: 92,
    rate: "₹1,500 / sq.ft",
    rateHi: "₹1,500 प्रति वर्ग फुट",
    parcels: 1,
  },
  {
    name: "Piparsand",
    hi: "पिपरसंड",
    x: 512,
    y: 336,
    w: 140,
    h: 92,
    rate: "₹1,000 / sq.ft",
    rateHi: "₹1,000 प्रति वर्ग फुट",
    parcels: 1,
  },
];

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
  const text = dark ? "rgba(253,250,243,0.82)" : "#0c1613";
  const muted = dark ? "rgba(253,250,243,0.5)" : "rgba(12,22,19,0.6)";

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

      {/* Lucknow side marker */}
      <text x="24" y="52" fill={muted} fontSize="13" letterSpacing="2.4">
        {lang === "hi" ? "लखनऊ की तरफ ←" : "← TOWARDS LUCKNOW"}
      </text>
      <text x="612" y="52" fill={muted} fontSize="13" letterSpacing="2.4">
        {lang === "hi" ? "→ उन्नाव" : "UNNAO →"}
      </text>

      {AREAS.map((area, index) => {
        const label = lang === "hi" ? area.hi : area.name;
        const rate = lang === "hi" ? area.rateHi : area.rate;
        return (
          <g key={area.name}>
            <rect
              x={area.x}
              y={area.y}
              width={area.w}
              height={area.h}
              fill={dark ? "rgba(224,177,83,0.07)" : "rgba(192,138,34,0.07)"}
              stroke={accent}
              strokeWidth="1.4"
              strokeDasharray="7 5"
              className="animate-dash"
              style={{ animationDelay: `${index * 400}ms` }}
            />
            {/* corner stakes */}
            {[
              [area.x, area.y],
              [area.x + area.w, area.y],
              [area.x, area.y + area.h],
              [area.x + area.w, area.y + area.h],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill={accent} />
            ))}
            <text
              x={area.x + area.w / 2}
              y={area.y + area.h / 2 - (compact ? 0 : 4)}
              textAnchor="middle"
              fill={text}
              fontSize={compact ? 15 : 17}
              fontWeight="600"
            >
              {label}
            </text>
            {!compact ? (
              <>
                <text
                  x={area.x + area.w / 2}
                  y={area.y + area.h / 2 + 18}
                  textAnchor="middle"
                  fill={muted}
                  fontSize="12.5"
                >
                  {rate}
                </text>
                {area.parcels > 0 ? (
                  <text
                    x={area.x + area.w / 2}
                    y={area.y + area.h / 2 + 36}
                    textAnchor="middle"
                    fill={accent}
                    fontSize="11.5"
                    letterSpacing="1.4"
                  >
                    {lang === "hi"
                      ? `${area.parcels} पार्सल लिस्टेड`
                      : `${area.parcels} PARCEL${area.parcels > 1 ? "S" : ""} LISTED`}
                  </text>
                ) : null}
              </>
            ) : null}
          </g>
        );
      })}

      {/* office marker */}
      <g>
        <circle cx="86" cy="330" r="6" fill={accent} />
        <circle cx="86" cy="330" r="13" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55" />
        <text x="106" y="326" fill={text} fontSize="13" fontWeight="600">
          {lang === "hi" ? "चाउहान कॉम्प्लेक्स" : "Chauhan Complex"}
        </text>
        <text x="106" y="343" fill={muted} fontSize="11.5">
          {lang === "hi" ? "ऑफिस · सरोजिनी नगर" : "office · Sarojini Nagar"}
        </text>
      </g>

      <text x="620" y="452" fill={muted} fontSize="11" letterSpacing="1.6">
        {lang === "hi" ? "स्केल अनुसार नहीं" : "NOT TO SCALE"}
      </text>
    </svg>
  );
}
