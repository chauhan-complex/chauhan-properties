import type { Metadata } from "next";
import Link from "next/link";
import PropertiesBrowser from "@/components/properties-browser";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/primitives";
import { Bi } from "@/lib/dual";
import { SITE } from "@/data/site";
import { getStats, listProperties } from "@/lib/data";
import { SERVICE_AREAS } from "@/data/site";

export const metadata: Metadata = {
  title: "Land & Property Listings — Amausi, Gauri, Miranpur Pinwat, Aurawan, Piparsand",
  description: `Every published listing from ${SITE.businessName}, Sarojini Nagar, Lucknow — land quoted at per sq.ft rates. ${SITE.portfolioTotal} properties handled, ${listProperties({}).length} published here; the rest are shared on a call to ${SITE.phone}.`,
};

export default function PropertiesPage() {
  const listings = listProperties({});
  const stats = getStats();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-ink py-14 text-cream md:py-16">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="pointer-events-none absolute -top-20 right-10 h-64 w-64 rounded-full bg-moss-soft/25 blur-3xl" />
        <div className="relative mx-auto max-w-[86rem] px-5 md:px-6">
          <nav className="flex items-center gap-2 text-[0.72rem] tracking-[0.18em] text-cream/45 uppercase">
            <Link href="/" className="transition-colors hover:text-brass-soft">
              <Bi en="Home" hi="होम" />
            </Link>
            <Icon name="chevron-right" size={12} />
            <span className="text-cream/80">
              <Bi en="Properties" hi="प्रॉपर्टी" />
            </span>
          </nav>

          <Reveal className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.04]">
                <Bi en="Land & property in our belt" hi="हमारे इलाके की ज़मीन और प्रॉपर्टी" />
              </h1>
              <p className="mt-3 max-w-xl text-[0.95rem] text-cream/60">
                <Bi
                  en={`Every listing below has had its papers read by us. Call ${SITE.phone} for a same-day site visit.`}
                  hi={`नीचे लगी हर प्रॉपर्टी के कागज़ हमने खुद पढ़े हैं। उसी दिन साइट विज़िट के लिए ${SITE.phone} पर कॉल करें।`}
                />
              </p>
              <p className="mt-2 max-w-xl text-[0.9rem] text-brass-soft/85">
                <Bi
                  en={`We hold ${SITE.portfolioTotal} properties in total and ${stats.total} are published here. Houses, buildings, flats and rentals are being added soon — for the rest, call the office.`}
                  hi={`हमारे पास कुल ${SITE.portfolioTotal} प्रॉपर्टी हैं, यहाँ ${stats.total} प्रकाशित हैं। मकान, बिल्डिंग, फ्लैट और किराये की प्रॉपर्टी जल्द जुड़ेंगी — बाकी के लिए ऑफिस में कॉल कीजिए।`}
                />
              </p>
            </div>
            <div className="flex gap-8">
              <Stat value={stats.total} labelEn="published" labelHi="प्रकाशित" />
              <Stat value={SITE.portfolioTotal} labelEn="in hand" labelHi="कुल प्रॉपर्टी" />
              <Stat value={SERVICE_AREAS.length} labelEn="villages" labelHi="गाँव" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-8 md:px-6 md:py-10">
        <PropertiesBrowser listings={listings} />
      </section>
    </>
  );
}

function Stat({ value, labelEn, labelHi }: { value: number; labelEn: string; labelHi: string }) {
  return (
    <div>
      <p className="font-display text-[2rem] leading-none text-brass-soft tnum">{value}</p>
      <p className="mt-1.5 text-[0.68rem] tracking-[0.18em] text-cream/50 uppercase">
        <Bi en={labelEn} hi={labelHi} />
      </p>
    </div>
  );
}
