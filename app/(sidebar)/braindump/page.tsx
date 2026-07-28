"use client";

import { useState, useRef, useEffect } from "react";
import { BRAINDUMP_DATA, BRAINDUMP_YEARS, type BraindumpItem } from "@/lib/braindump-data";
import { FadeIn } from "@/components/FadeIn";

const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
function formatDate(dateStr: string) {
  const [year, month] = dateStr.split("-");
  const m = parseInt(month, 10);
  return `${MONTHS[m - 1] ?? ""} ${year}`;
}

function LocalVideo({ src, trimStart, trimEnd }: { src: string; trimStart?: number; trimEnd?: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onLoaded = () => {
      if (trimStart) video.currentTime = trimStart;
    };

    const onTimeUpdate = () => {
      if (trimEnd !== undefined && video.currentTime >= trimEnd) {
        video.currentTime = trimStart ?? 0;
        video.play();
      }
    };

    video.addEventListener("loadedmetadata", onLoaded);
    if (trimEnd !== undefined) video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [trimStart, trimEnd]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop={trimEnd === undefined}
      playsInline
      style={{ width: "100%", display: "block" }}
    />
  );
}

function ItemMeta({ label, date, visible }: { label?: string; date?: string; visible: boolean }) {
  return (
    <div className="braindump-meta" style={{
      height: 16,
      display: "flex",
      alignItems: "center",
      gap: 10,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.18s ease",
    }}>
      {label && (
        <span style={{ fontSize: 11, color: "var(--foreground)", letterSpacing: "0.01em" }}>
          {label}
        </span>
      )}
      {date && (
        <span style={{ fontSize: 11, color: "var(--subtle)", letterSpacing: "0.02em" }}>
          {formatDate(date)}
        </span>
      )}
    </div>
  );
}

function Item({ item }: { item: BraindumpItem }) {
  const [hovered, setHovered] = useState(false);

  if (item.type === "image") {
    return (
      <div
        style={{ breakInside: "avoid" as const }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={item.content} alt="" draggable={false} style={{ width: "100%", display: "block" }} />
        <ItemMeta label={item.label} date={item.date} visible={hovered} />
      </div>
    );
  }
  if (item.type === "video") {
    const isLocal = /\.(mp4|webm|mov|ogg)(\?|$)/i.test(item.content);
    return (
      <div
        style={{ breakInside: "avoid" as const }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isLocal ? (
          <LocalVideo src={item.content} trimStart={item.trimStart} trimEnd={item.trimEnd} />
        ) : (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={item.content}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>
        )}
        <ItemMeta label={item.label} date={item.date} visible={hovered} />
      </div>
    );
  }
  return null;
}

export default function BraindumpPage() {
  const [activeYear, setActiveYear] = useState<string>("2026");
  const items = (BRAINDUMP_DATA[activeYear] ?? []).filter(i => i.type !== "note");

  return (
    <div className="pb-16">
      <FadeIn step={0}>
        <div className="flex items-center gap-6 mb-8 pb-3">
          {BRAINDUMP_YEARS.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`text-sm transition-colors duration-150 bg-transparent border-none cursor-pointer p-0 ${activeYear === year ? 'text-foreground wiggle-active' : 'text-subtle hover:text-muted'}`}
            >
              {year}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn step={1}>
        {items.length === 0 ? (
          <p className="text-sm text-neutral-400 mt-8">nothing here yet.</p>
        ) : (
          <div style={{ columns: "3 200px", columnGap: "16px", rowGap: 0 }}>
            {items.map((item) => <Item key={item.id} item={item} />)}
          </div>
        )}
      </FadeIn>
    </div>
  );
}
