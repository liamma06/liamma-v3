"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

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

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="text-neutral-400 hover:text-neutral-700 transition-colors duration-150"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

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
                style={{ textDecoration: "none", color: active ? 'var(--foreground)' : 'var(--subtle)' }}
                className="text-2xl transition-colors duration-150"
              >
                {label}
              </Link>
            );
          })}
          <ThemeButton />
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
