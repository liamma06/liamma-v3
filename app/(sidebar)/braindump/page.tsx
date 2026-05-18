"use client";

import { useState } from "react";
import { BRAINDUMP_DATA, BRAINDUMP_YEARS, type BraindumpItem } from "@/lib/braindump-data";
import { FadeIn } from "@/components/FadeIn";

function Item({ item }: { item: BraindumpItem }) {
  if (item.type === "image") {
    return (
      <div style={{ marginBottom: "16px", breakInside: "avoid" as const }}>
        <img src={item.content} alt="" draggable={false} style={{ width: "100%", display: "block" }} />
      </div>
    );
  }
  if (item.type === "video") {
    return (
      <div style={{ marginBottom: "16px", breakInside: "avoid" as const }}>
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={item.content}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>
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
              className={`text-sm transition-colors duration-150 ${activeYear === year ? "wiggle-active" : ""}`}
              style={{ color: activeYear === year ? 'var(--foreground)' : 'var(--subtle)' }}
              onMouseEnter={(e) => {
                if (activeYear !== year) (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
              }}
              onMouseLeave={(e) => {
                if (activeYear !== year) (e.currentTarget as HTMLButtonElement).style.color = 'var(--subtle)';
              }}
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
          <div style={{ columns: "3 200px", columnGap: "16px" }}>
            {items.map((item) => <Item key={item.id} item={item} />)}
          </div>
        )}
      </FadeIn>
    </div>
  );
}
