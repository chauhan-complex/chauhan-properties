import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-cream text-brass">
        <Icon name="map" size={28} />
      </span>
      <p className="mt-6 eyebrow text-moss-soft">Error 404</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.2rem)] leading-tight text-ink">
        This plot is not on our map.
      </h1>
      <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-stone">
        The page you asked for does not exist — or a listing may have been sold and taken down. Try
        the property search, or call the office and we will find what you need.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-[0.78rem] font-bold tracking-[0.16em] text-cream uppercase transition-colors hover:bg-ink"
        >
          Browse properties <Icon name="arrow-right" size={15} />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.78rem] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:border-moss"
        >
          Back home <Icon name="house" size={15} />
        </Link>
      </div>
    </section>
  );
}
