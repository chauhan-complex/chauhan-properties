import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icons";
import { Bi } from "@/lib/dual";
import type { Property } from "@/data/site";
import { cn } from "@/lib/utils";
import { captionFromFilename } from "@/lib/media";
import { areaText, categoryText, listingPriceText, localityName, purposeText } from "@/lib/hi";

/** Cards have limited room — show three landmarks and an ellipsis. */
function shortList(items: string[], max = 3) {
  if (!items.length) return "";
  if (items.length <= max) return items.join(", ");
  return `${items.slice(0, max).join(", ")}…`;
}

const purposeStyles: Record<string, string> = {
  sale: "bg-moss text-cream",
  rent: "bg-clay text-cream",
  lease: "bg-ink text-brass-soft",
};

/**
 * Renders both languages side by side; CSS shows the active one, so the same
 * card works in server-rendered pages and inside client components.
 */
export default function PropertyCard({
  property,
  index = 0,
  variant = "grid",
}: {
  property: Property;
  index?: number;
  variant?: "grid" | "list";
}) {
  const cover = property.images[0] ?? "/fallback-property.svg";
  const areaEn = areaText(property.areaValue, property.areaUnit, "en");
  const areaHi = areaText(property.areaValue, property.areaUnit, "hi");
  const priceEn = listingPriceText(property, "en");
  const priceHi = listingPriceText(property, "hi");
  const isList = variant === "list";

  return (
    <article
      className={cn(
        "card-lift group relative flex overflow-hidden rounded-[3px] border border-line bg-cream",
        isList ? "flex-col sm:flex-row" : "flex-col",
      )}
      style={{ ["--reveal-delay" as string]: `${Math.min(index, 6) * 70}ms` }}
    >
      <Link
        href={`/properties/${property.slug}/`}
        className={cn("relative block overflow-hidden bg-paper-deep", isList ? "sm:w-[38%] sm:shrink-0" : "")}
      >
        <div className={cn("relative w-full", isList ? "aspect-4/3 sm:h-full" : "aspect-4/3")}>
          <Image
            src={cover}
            alt={`${property.title}${cover.startsWith("/photos/") ? ` — ${captionFromFilename(cover, "en").full}` : ""}`}
            fill
            sizes={isList ? "(max-width: 640px) 100vw, 38vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent opacity-80" />
        </div>

        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-3 py-1 text-[0.62rem] font-semibold tracking-[0.18em] uppercase shadow-sm",
            purposeStyles[property.purpose],
          )}
        >
          <Bi en={purposeText(property.purpose, "en")} hi={purposeText(property.purpose, "hi")} />
        </span>

        {property.status === "sold" ? (
          <span className="absolute top-3 right-3 rounded-full bg-ink/85 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-cream uppercase">
            <Bi en="Sold" hi="बिक चुकी" />
          </span>
        ) : property.featured ? (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-brass px-3 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-ink uppercase">
            <Icon name="spark" size={11} strokeWidth={1.8} /> <Bi en="Featured" hi="विशेष" />
          </span>
        ) : null}

        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[0.68rem] font-medium text-cream/90">
          {property.images.length ? (
            <span className="flex items-center gap-1 rounded-full bg-ink/55 px-2.5 py-1 backdrop-blur-sm">
              <Icon name="photo" size={12} /> {property.images.length}
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-ink/55 px-2.5 py-1 backdrop-blur-sm">
              <Icon name="photo" size={12} /> <Bi en="Photos on request" hi="फ़ोटो माँगने पर" />
            </span>
          )}
          {property.videoUrl ? (
            <span className="flex items-center gap-1 rounded-full bg-ink/55 px-2.5 py-1 backdrop-blur-sm">
              <Icon name="play" size={12} />{" "}
              <Bi en="Video tour" hi="वीडियो टूर" />
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[1.55rem] leading-none text-moss">
              <Bi en={priceEn} hi={priceHi} />
            </p>
            <p className="mt-1.5 text-[0.68rem] tracking-[0.14em] text-stone uppercase tnum">
              <Bi
                en={`${areaEn ? `${areaEn} · ` : ""}${categoryText(property.category, "en")}`}
                hi={`${areaHi ? `${areaHi} · ` : ""}${categoryText(property.category, "hi")}`}
              />
            </p>
            {!property.price || Number(property.price) === 0 ? (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-brass/50 px-2.5 py-1 text-[0.66rem] font-semibold tracking-[0.14em] text-brass uppercase">
                <Icon name="phone" size={11} /> <Bi en="Deal direct with owner" hi="सीधे मालिक से बात" />
              </p>
            ) : null}
          </div>
          <span className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-stone transition-all duration-400 group-hover:border-moss group-hover:bg-moss group-hover:text-cream sm:flex">
            <Icon name="arrow-up-right" size={15} />
          </span>
        </div>

        <h3 className="mt-3.5 text-[1.02rem] leading-snug font-semibold text-ink">
          <Link href={`/properties/${property.slug}/`} className="rule-link">
            <Bi en={property.title} hi={property.titleHi || property.title} />
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-[0.84rem] text-stone">
          <Icon name="pin" size={14} className="text-brass" />
          <Bi
            en={`${property.locality}, Lucknow`}
            hi={`${localityName(property.locality, "hi")}, लखनऊ`}
          />
        </p>

        {property.near.length || property.nearHi.length ? (
          <p className="mt-1.5 flex items-start gap-1.5 text-[0.8rem] leading-snug text-stone/90">
            <Icon name="map" size={14} className="mt-0.5 shrink-0 text-moss-soft" />
            <Bi
              en={`near ${shortList(property.near)}`}
              hi={`पास में ${shortList(property.nearHi)}`}
            />
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3.5 text-[0.78rem] text-stone">
          {property.bedrooms ? (
            <span className="flex items-center gap-1.5">
              <Icon name="bed" size={15} className="text-moss-soft" />
              {property.bedrooms} <Bi en="bed" hi="बेड" />
            </span>
          ) : null}
          {property.bathrooms ? (
            <span className="flex items-center gap-1.5">
              <Icon name="bath" size={15} className="text-moss-soft" />
              {property.bathrooms} <Bi en="bath" hi="बाथ" />
            </span>
          ) : null}
          {areaEn ? (
            <span className="flex items-center gap-1.5">
              <Icon name="area" size={15} className="text-moss-soft" />
              <Bi en={areaEn} hi={areaHi} />
            </span>
          ) : null}
          <span className="ml-auto text-[0.72rem] text-stone/70">
            <Bi en="Land parcel" hi="ज़मीन का पार्सल" />
          </span>
        </div>

        <Link
          href={`/properties/${property.slug}/`}
          className="mt-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.18em] text-moss uppercase transition-colors hover:text-brass sm:hidden"
        >
          <Bi en="View details" hi="पूरी जानकारी" /> <Icon name="arrow-right" size={14} />
        </Link>
      </div>
    </article>
  );
}
