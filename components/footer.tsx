"use client";

import { Github, Globe, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo/Brand - Left Column */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={180}
              height={180}
              loading="lazy"
              sizes="180px"
              className="h-auto w-auto"
            />
            <p className="text-sm text-foreground/60 my-4">
              {t("footer.tagline")}
            </p>
          </div>

          {/* About Column */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.about.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, "#about")}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  {t("footer.about.me")}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={(e) => scrollToSection(e, "#skills")}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  {t("footer.about.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => scrollToSection(e, "#experience")}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  {t("footer.about.experience")}
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  onClick={(e) => scrollToSection(e, "#achievements")}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  {t("footer.about.achievements")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:dangdattd167@gmail.com"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span>
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>dangdattd167@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:0866646200"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span>
                    <Phone className="w-4 h-4" />
                  </span>
                  <span>0866646200</span>
                </a>
              </li>
              <li>
                <a
                  href="https://datdt.io.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span>
                    <Globe className="w-4 h-4" />
                  </span>
                  <span>datdt.io.vn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.social.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/dat16720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/%C4%91%E1%BA%A1t-%C4%91%E1%BA%B7ng-58ab07307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <div>
              <p>
                © {new Date().getFullYear()} {t("footer.copyright")}
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/dat16720"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.sourceCode")}
              </a>
              <span className="text-foreground/30">•</span>
              <Link
                href="/thanks"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.thanks")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
