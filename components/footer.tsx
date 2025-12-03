"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <div className="space-y-2 text-sm text-foreground/60">
          <p>{t("footer.inspired")}</p>
          <p>
            {t("footer.built")}{" "}
            <a
              href="https://github.com/dat16720"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://datdt.io.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              datdt.io.vn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
