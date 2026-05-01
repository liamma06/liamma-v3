"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Add new theme names here
export type Theme = "light" | "dark";
const THEMES: Theme[] = ["light", "dark"];

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: Theme[];
}>({ theme: "light", setTheme: () => {}, themes: THEMES });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial =
      stored && THEMES.includes(stored)
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
