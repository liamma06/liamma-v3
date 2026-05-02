"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "about", href: "/" },
  { label: "writing", href: "/writing" },
  { label: "brain dump", href: "/braindump" },
];

const SOCIAL_ITEMS = [
  { label: "X", href: "https://x.com/LiamMa6_" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/liam-tl/" },
  { label: "GitHub", href: "https://github.com/liamma06" },
  { label: "Email", href: "mailto:liam.jbr.ma@gmail.com" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--background)] h-12 flex items-center justify-end px-5">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex flex-col justify-center gap-[5px] w-6 h-6"
        >
          <span
            className="block h-px bg-neutral-700 transition-all duration-200 origin-center"
            style={open ? { transform: "translateY(6px) rotate(45deg)" } : {}}
          />
          <span
            className="block h-px bg-neutral-700 transition-all duration-200"
            style={open ? { opacity: 0 } : {}}
          />
          <span
            className="block h-px bg-neutral-700 transition-all duration-200 origin-center"
            style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : {}}
          />
        </button>
      </nav>

      {/* Overlay menu */}
      <div
        className="md:hidden fixed inset-0 z-20 bg-[var(--background)] flex flex-col px-8 pt-20 pb-10 transition-all duration-200"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      >
        <div className="flex flex-col gap-8 mt-4">
          {NAV_ITEMS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}
                className={`text-2xl transition-colors duration-150 ${
                  active ? "text-black font-medium" : "text-neutral-400"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto flex gap-6">
          {SOCIAL_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
