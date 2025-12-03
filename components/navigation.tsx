"use client";

import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeSelector from "./theme-selector";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full shadow-lg shadow-primary/5 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto max-w-5xl px-6 flex items-center justify-between h-16">
        {/* Logo/Brand - Left */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-bold relative group"
        >
          <span className="relative z-10 gradient-text">DTD</span>
          <span className="absolute inset-0 blur-lg from-primary to-accent opacity-0 group-hover:opacity-50 transition-opacity" />
        </Link>

        {/* Desktop Menu - Right */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "#about")}
            className="text-sm text-foreground/70 hover:text-foreground transition-all relative group px-3 py-2 rounded-lg hover:bg-primary/5"
          >
            <span className="relative z-10">{t("nav.about")}</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 from-primary to-accent group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#skills"
            onClick={(e) => scrollToSection(e, "#skills")}
            className="text-sm text-foreground/70 hover:text-foreground transition-all relative group px-3 py-2 rounded-lg hover:bg-primary/5"
          >
            <span className="relative z-10">{t("nav.skills")}</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 from-primary to-accent group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#experience"
            onClick={(e) => scrollToSection(e, "#experience")}
            className="text-sm text-foreground/70 hover:text-foreground transition-all relative group px-3 py-2 rounded-lg hover:bg-primary/5"
          >
            <span className="relative z-10">{t("nav.experience")}</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 from-primary to-accent group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, "#projects")}
            className="text-sm text-foreground/70 hover:text-foreground transition-all relative group px-3 py-2 rounded-lg hover:bg-primary/5"
          >
            <span className="relative z-10">{t("nav.projects")}</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 from-primary to-accent group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#achievements"
            onClick={(e) => scrollToSection(e, "#achievements")}
            className="text-sm text-foreground/70 hover:text-foreground transition-all relative group px-3 py-2 rounded-lg hover:bg-primary/5"
          >
            <span className="relative z-10">{t("nav.achievements")}</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 from-primary to-accent group-hover:w-full transition-all duration-300" />
          </a>

          {/* Icons */}
          <div className="flex items-center gap-2 ml-4">
            <button
              className="p-2 hover:bg-primary/10 rounded-lg transition-all hover:scale-110 group"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
            </button>
            <button
              onClick={() =>
                i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
              }
              className="px-3 py-1.5 text-sm font-medium neon-box rounded-lg transition-all hover:scale-105 cursor-pointer"
              aria-label="Change language"
            >
              <span className="font-mono gradient-text">
                {i18n.language === "vi" ? "VI" : "EN"}
              </span>
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-primary/10 rounded-lg transition-all hover:scale-110 group cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
              )}
            </button>
            <ThemeSelector />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden transition-all duration-300 ${
            isScrolled ? "backdrop-blur-xl" : ""
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "#about")}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {t("nav.about")}
            </a>
            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, "#skills")}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {t("nav.skills")}
            </a>
            <a
              href="#experience"
              onClick={(e) => scrollToSection(e, "#experience")}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {t("nav.experience")}
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "#projects")}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {t("nav.projects")}
            </a>
            <a
              href="#achievements"
              onClick={(e) => scrollToSection(e, "#achievements")}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {t("nav.achievements")}
            </a>
            <div className="flex items-center gap-2 pt-2">
              <button
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-foreground/70" />
              </button>
              <button
                onClick={() =>
                  i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
                }
                className="px-3 py-1.5 text-sm font-medium hover:bg-muted rounded-lg transition-colors border border-border"
                aria-label="Change language"
              >
                {i18n.language === "vi" ? "VI" : "EN"}
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-foreground/70" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground/70" />
                )}
              </button>
              <ThemeSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
