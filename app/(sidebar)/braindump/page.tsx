"use client";

import { useState, useRef } from "react";
import { BRAINDUMP_DATA, BRAINDUMP_YEARS, type BraindumpItem } from "@/lib/braindump-data";

function NoteCard({ item }: { item: BraindumpItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ marginBottom: "16px", breakInside: "avoid" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "#fff6f0",
          border: "1px solid #fdd9c0",
          boxShadow: "2px 3px 10px rgba(0,0,0,0.06)",
          borderRadius: "4px",
          padding: "14px 16px",
          transform: hovered
            ? `rotate(${item.rotation ?? 0}deg) scale(1.04)`
            : `rotate(${item.rotation ?? 0}deg) scale(1)`,
          transition: "transform 0.2s ease",
          fontSize: "13px",
          lineHeight: "1.6",
          color: "var(--foreground)",
        }}
      >
        {item.content}
      </div>
      {item.date && (
        <p
          style={{
            fontSize: "11px",
            color: "var(--subtle)",
            margin: "5px 0 0 2px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          {item.date}
        </p>
      )}
    </div>
  );
}

function ImageCard({ item }: { item: BraindumpItem }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderRadius: "6px",
        overflow: "hidden",
        marginBottom: "16px",
        breakInside: "avoid",
        transform: hovered
          ? `rotate(${item.rotation ?? 0}deg) scale(1.04)`
          : `rotate(${item.rotation ?? 0}deg) scale(1)`,
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ position: "relative" }}>
        <img
          src={item.content}
          alt={item.label ?? ""}
          draggable={false}
          style={{
            width: "100%",
            display: "block",
            opacity: hovered && item.video ? 0 : 1,
            transition: "opacity 0.3s",
          }}
        />
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />
        )}
      </div>
      {item.label && (
        <p
          style={{
            fontSize: "11px",
            color: "var(--subtle)",
            margin: 0,
            padding: "6px 10px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          {item.label}
        </p>
      )}
    </div>
  );
}

function VideoCard({ item }: { item: BraindumpItem }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderRadius: "6px",
        overflow: "hidden",
        marginBottom: "16px",
        breakInside: "avoid",
      }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={item.content}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      </div>
      {item.label && (
        <p style={{ fontSize: "11px", color: "var(--subtle)", padding: "6px 10px", margin: 0 }}>
          {item.label}
        </p>
      )}
    </div>
  );
}

export default function BraindumpPage() {
  const [activeYear, setActiveYear] = useState<string>("2026");
  const items = BRAINDUMP_DATA[activeYear] ?? [];

  return (
    <div className="pb-16">
      {/* Year tabs */}
      <div className="flex items-center gap-6 mb-8 pb-3">
        {BRAINDUMP_YEARS.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`text-sm transition-colors duration-150 ${activeYear === year ? "wiggle-active" : ""}`}
            style={{ color: activeYear === year ? "#171717" : "#a3a3a3" }}
            onMouseEnter={(e) => {
              if (activeYear !== year)
                (e.currentTarget as HTMLButtonElement).style.color = "#525252";
            }}
            onMouseLeave={(e) => {
              if (activeYear !== year)
                (e.currentTarget as HTMLButtonElement).style.color = "#a3a3a3";
            }}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      {items.length === 0 ? (
        <p className="text-sm text-neutral-400 mt-8">nothing here yet.</p>
      ) : (
        <div
          style={{
            columns: "3 200px",
            columnGap: "16px",
          }}
        >
          {items.map((item) => {
            if (item.type === "note") return <NoteCard key={item.id} item={item} />;
            if (item.type === "image") return <ImageCard key={item.id} item={item} />;
            if (item.type === "video") return <VideoCard key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}
