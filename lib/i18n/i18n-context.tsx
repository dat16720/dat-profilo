"use client";

import { useEffect, type ReactNode } from "react";
import "./config";

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem("language");
    if (savedLang && (savedLang === "vi" || savedLang === "en")) {
      import("i18next").then((i18n) => {
        i18n.default.changeLanguage(savedLang);
      });
    }
  }, []);

  return <>{children}</>;
}
