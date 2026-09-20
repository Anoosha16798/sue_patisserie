"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

export type ThemeId = "white" | "dark" | "pastel";

const STORAGE_KEY = "sue-theme";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "pastel";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "white" || stored === "dark" || stored === "pastel") {
    return stored;
  }
  return "pastel";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}

const THEMES: { id: ThemeId; label: string }[] = [
  { id: "white", label: "White" },
  { id: "dark", label: "Dark" },
  { id: "pastel", label: "Pastel" },
];

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex rounded-full border border-line bg-card p-1"
      role="group"
      aria-label="Colour theme"
    >
      {THEMES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setTheme(item.id)}
          className={`rounded-full px-3 py-1 text-[10px] tracking-[0.14em] uppercase transition ${
            theme === item.id
              ? "bg-invert text-on-invert"
              : "text-muted hover:text-fg"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
