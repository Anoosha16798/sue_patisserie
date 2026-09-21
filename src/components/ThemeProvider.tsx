"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

export type ThemeId = "white" | "black";

const STORAGE_KEY = "sue-theme";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "white";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "white" || stored === "black") return stored;
  if (stored === "dark") return "black";
  return "white";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "white" ? "black" : "white");
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
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

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Colour theme">
      <button
        type="button"
        title="White"
        aria-label="White theme"
        aria-pressed={theme === "white"}
        onClick={() => setTheme("white")}
        className="flex h-8 w-8 items-center justify-center rounded-full"
      >
        <span
          className="block h-3.5 w-3.5 rounded-full border"
          style={{
            background: "#faf8f4",
            borderColor: theme === "white" ? "var(--fg)" : "var(--line)",
            boxShadow: theme === "white" ? "0 0 0 1.5px var(--fg)" : "none",
          }}
        />
      </button>
      <button
        type="button"
        title="Black"
        aria-label="Black theme"
        aria-pressed={theme === "black"}
        onClick={() => setTheme("black")}
        className="flex h-8 w-8 items-center justify-center rounded-full"
      >
        <span
          className="block h-3.5 w-3.5 rounded-full border"
          style={{
            background: "#0c0b0a",
            borderColor: theme === "black" ? "var(--accent)" : "var(--line)",
            boxShadow: theme === "black" ? "0 0 0 1.5px var(--accent)" : "none",
          }}
        />
      </button>
    </div>
  );
}
