"use client";

import { Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeSelector from "./theme-selector";

export default function LoveHeader() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        {/* Logo/Title */}
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
          <span className="text-lg font-bold bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
            {t("love.title")}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => {
              const newLang = i18n.language === "vi" ? "en" : "vi";
              i18n.changeLanguage(newLang);
              localStorage.setItem("language", newLang);
            }}
            className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all hover:scale-105 cursor-pointer border border-pink-200/50 dark:border-pink-800/50 hover:bg-pink-50 dark:hover:bg-pink-950/30"
            aria-label="Change language"
          >
            <span className="font-mono gradient-text">
              {i18n.language === "vi" ? "VI" : "EN"}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-pink-50 dark:hover:bg-pink-950/30 rounded-lg transition-all hover:scale-110 group cursor-pointer border border-pink-200/50 dark:border-pink-800/50"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-foreground/70 group-hover:text-pink-500 transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-foreground/70 group-hover:text-pink-500 transition-colors" />
            )}
          </button>

          {/* Theme Selector */}
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
}
