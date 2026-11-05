"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import { useLang } from "./lang-provider";
import { cn, isDirectVideo, youtubeId } from "@/lib/utils";
import { captionFromFilename, isOpaqueUrl, videoList } from "@/lib/media";

interface GalleryProps {
  images: string[];
  videoUrl?: string | null;
  title: string;
  /** Explicit captions, used when the filenames are opaque (e.g. Google Drive URLs). */
  captions?: Array<{ en: string; hi: string }>;
}

type Media = { type: "image" | "video"; src: string; caption: string };

export default function Gallery({ images, videoUrl, title, captions }: GalleryProps) {
  const { t, lang } = useLang();

  const videos = videoList(videoUrl);
  const photoMedia: Media[] = images
    .filter(Boolean)
    .map((src, i) => ({
      type: "image" as const,
      src,
      caption:
        captions?.[i]?.[lang] ??
        (isOpaqueUrl(src) ? "" : captionFromFilename(src, lang).full),
    }));
  const videoMedia: Media[] = videos.map((src, i) => ({
    type: "video" as const,
    src,
    caption:
      videos.length > 1
        ? lang === "hi"
          ? `वीडियो टूर ${i + 1}`
          : `Video tour ${i + 1}`
        : lang === "hi"
          ? "पूरा वीडियो टूर"
          : "Full video tour",
  }));

  /* Videos come first in the strip so nobody has to hunt through the photos to
     find them, but the stage opens on the best exterior photo rather than a
     paused video frame. */
  const media: Media[] = [...videoMedia, ...photoMedia];
  const firstPhotoIndex = videoMedia.length;

  const [index, setIndex] = useState(firstPhotoIndex);
  const [lightbox, setLightbox] = useState(false);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const current = media[index] ?? { type: "image", src: "/fallback-property.svg" };
  const hasVideo = videoMedia.length > 0;
  const onVideo = current.type === "video";

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + media.length) % media.length);
    },
    [media.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  useEffect(() => {
    const node = stripRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  if (media.length === 0) {
    return (
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[3px] border border-line bg-paper-deep">
        <Image src="/fallback-property.svg" alt={title} fill sizes="100vw" className="object-cover" />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Fixed-height stage + object-contain: phone photos arrive in mixed
            orientations; contain guarantees nothing is cropped, and the fixed
            height guarantees the page below never shifts when you change photo. */}
        <div className="group relative h-[440px] overflow-hidden rounded-[3px] border border-line bg-ink sm:h-[560px] lg:h-[620px]">
          {current.type === "image" ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute inset-0 h-full w-full cursor-zoom-in"
              aria-label={t("gallery.fullscreen")}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={`${title} — ${current.caption || `${t("gallery.photoOf")} ${index + 1}`}`}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 62vw"
                className="object-contain"
              />
            </button>
          ) : (
            <VideoStage src={current.src} title={title} label={t("gallery.watch")} />
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />

          {/* Always-visible shortcut to the walkthrough — nobody should have to
              page through 24 photos to discover there is a video. */}
          {hasVideo && !onVideo ? (
            <button
              type="button"
              onClick={() => setIndex(0)}
              className="group absolute top-4 left-4 z-10 flex items-center gap-2.5 rounded-full bg-brass px-4 py-2.5 text-[0.76rem] font-bold tracking-[0.14em] text-ink uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft"
            >
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-ink text-brass">
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-ink" />
                <Icon name="play" size={13} strokeWidth={1.8} />
              </span>
              {lang === "hi" ? "वीडियो टूर देखें" : "Watch the video tour"}
            </button>
          ) : null}

          {onVideo ? (
            <button
              type="button"
              onClick={() => setIndex(firstPhotoIndex)}
              className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2.5 text-[0.76rem] font-semibold tracking-[0.14em] text-cream uppercase backdrop-blur transition-colors hover:bg-ink"
            >
              <Icon name="photo" size={14} />
              {lang === "hi" ? "तस्वीरें देखें" : "Back to photos"}
            </button>
          ) : null}

          {current.caption ? (
            <span className="absolute bottom-4 left-4 max-w-[62%] rounded-full bg-ink/70 px-3.5 py-1.5 text-[0.74rem] font-medium text-cream backdrop-blur-sm">
              {current.caption}
            </span>
          ) : null}

          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            <span className="rounded-full bg-ink/70 px-3 py-1.5 text-[0.72rem] font-medium text-cream backdrop-blur-sm tnum">
              {index + 1} / {media.length}
            </span>
            {current.type === "image" ? (
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[0.72rem] font-medium text-cream backdrop-blur-sm transition-colors hover:bg-brass hover:text-ink"
              >
                <Icon name="photo" size={13} /> {t("gallery.fullscreen")}
              </button>
            ) : null}
          </div>

          {media.length > 1 ? (
            <>
              <NavButton side="left" onClick={() => go(-1)} label={t("gallery.prev")} />
              <NavButton side="right" onClick={() => go(1)} label={t("gallery.next")} />
            </>
          ) : null}
        </div>

        {media.length > 1 ? (
          <div
            ref={stripRef}
            className="rail mt-3 flex gap-2.5 overflow-x-auto pb-2"
            role="tablist"
            aria-label={t("gallery.photoOf")}
          >
            {media.map((item, i) => (
              <button
                key={`${item.src}-${i}`}
                type="button"
                data-index={i}
                role="tab"
                aria-selected={i === index}
                aria-label={item.caption || `${title} ${i + 1}`}
                title={item.caption}
                onClick={() => setIndex(i)}
                className={cn(
                  "relative h-[68px] w-[100px] shrink-0 overflow-hidden rounded-[3px] border transition-all duration-300",
                  i === index
                    ? "border-brass opacity-100"
                    : "border-line opacity-65 hover:-translate-y-0.5 hover:opacity-100",
                )}
              >
                {item.type === "image" ? (
                  <Image src={item.src} alt="" fill sizes="120px" className="object-cover" />
                ) : (
                  <span className="flex h-full w-full flex-col items-center justify-center gap-1 bg-ink text-cream">
                    <Icon name="play" size={20} className="text-brass-soft" />
                    <span className="text-[0.55rem] font-bold tracking-[0.16em] text-brass-soft uppercase">
                      {lang === "hi" ? "वीडियो" : "Video"}
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-ink/96 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery.fullscreen")}
          onClick={() => setLightbox(false)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-cream/70">
            <span className="text-[0.8rem] tracking-[0.18em] uppercase tnum">
              {index + 1} / {media.length}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[0.75rem] tracking-[0.16em] uppercase transition-colors hover:border-brass-soft hover:text-brass-soft"
            >
              <Icon name="close" size={15} /> {t("gallery.close")}
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            {current.type === "image" ? (
              <Image
                src={current.src}
                alt={`${title} — ${current.caption || `${t("gallery.photoOf")} ${index + 1}`}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6">
                <div className="relative aspect-video w-full max-w-4xl">
                  <VideoStage src={current.src} title={title} label={t("gallery.watch")} />
                </div>
              </div>
            )}
            <NavButton side="left" onClick={() => go(-1)} tone="light" label={t("gallery.prev")} />
            <NavButton side="right" onClick={() => go(1)} tone="light" label={t("gallery.next")} />
          </div>
        </div>
      ) : null}
    </>
  );
}

function NavButton({
  side,
  onClick,
  tone = "dark",
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  tone?: "dark" | "light";
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur transition-all duration-300 hover:scale-110",
        side === "left" ? "left-3" : "right-3",
        tone === "dark"
          ? "bg-ink/55 text-cream hover:bg-brass hover:text-ink"
          : "bg-cream/15 text-cream hover:bg-brass hover:text-ink",
      )}
    >
      <Icon name={side === "left" ? "chevron-left" : "chevron-right"} size={19} />
    </button>
  );
}

function VideoStage({ src, title, label }: { src: string; title: string; label: string }) {
  const yt = youtubeId(src);
  if (yt) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0`}
        title={`${title} — video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }
  if (isDirectVideo(src)) {
    return (
      <video
        src={src}
        title={`${title} — walkthrough`}
        controls
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full bg-ink object-cover"
      />
    );
  }
  return (
    <a
      href={src}
      target="_blank"
      rel="noreferrer"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink text-cream"
    >
      <Icon name="play" size={34} className="text-brass-soft" />
      <span className="text-[0.8rem] tracking-[0.18em] uppercase">{label}</span>
    </a>
  );
}
