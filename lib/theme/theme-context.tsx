"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { themeColors, type ThemeColor } from "./theme-colors";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: ReactNode }) {
  // Lazy initialization to avoid setState in effect
  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme-color") as ThemeColor;
      if (saved && themeColors[saved]) {
        return saved;
      }
    }
    return "cyan";
  });

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const isDark = root.classList.contains("dark");
      const colors = themeColors[themeColor];

      if (isDark) {
        root.style.setProperty("--primary", colors.dark.primary);
        root.style.setProperty("--accent", colors.dark.accent);
      } else {
        root.style.setProperty("--primary", colors.light.primary);
        root.style.setProperty("--accent", colors.light.accent);
      }
    };

    // Update immediately
    updateColors();

    // Save to localStorage
    localStorage.setItem("theme-color", themeColor);

    // Listen for theme mode changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [themeColor]);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeColor must be used within ThemeColorProvider");
  }
  return context;
}
