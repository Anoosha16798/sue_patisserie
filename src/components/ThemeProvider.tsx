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
  if (typeof window === "undefined") return "white";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "white" || stored === "dark" || stored === "pastel") {
    return stored;
  }
  return "white";
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

const SWATCHES: { id: ThemeId; label: string; fill: string; ring: string }[] = [
  { id: "white", label: "Light", fill: "#f7f4ef", ring: "#1c1917" },
  { id: "dark", label: "Dark", fill: "#141210", ring: "#d4a574" },
  { id: "pastel", label: "Pastel", fill: "#e8c5d0", ring: "#9a5b6c" },
];

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Colour theme">
      {SWATCHES.map((item) => (
        <button
          key={item.id}
          type="button"
          title={item.label}
          aria-label={item.label}
          aria-pressed={theme === item.id}
          onClick={() => setTheme(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded-full"
        >
          <span
            className="block h-3.5 w-3.5 rounded-full border"
            style={{
              background: item.fill,
              borderColor: theme === item.id ? item.ring : "var(--line)",
              boxShadow: theme === item.id ? `0 0 0 1.5px ${item.ring}` : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
