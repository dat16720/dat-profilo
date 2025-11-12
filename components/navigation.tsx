"use client";

import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeSelector from "./theme-selector";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

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
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-5xl px-6 flex items-center justify-between h-16">
        {/* Logo/Brand - Left */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-bold text-foreground hover:text-primary transition-colors"
        >
          DTD
        </Link>

        {/* Desktop Menu - Right */}
        <div className="hidden md:flex items-center gap-6">
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

          {/* Icons */}
          <div className="flex items-center gap-2 ml-4">
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-foreground/70" />
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
        <div className="md:hidden border-t border-border bg-card">
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
