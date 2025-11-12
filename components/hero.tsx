"use client";

import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* Logo lớn trên cùng */}
        <div className="text-center mb-8">
          <div className="inline-block text-8xl md:text-9xl font-bold text-foreground/20 select-none">
            ĐT
          </div>
        </div>

        {/* Profile Picture & Info */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Picture */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary/20 to-accent/20 border-2 border-border overflow-hidden relative">
              <Image
                src="/images/me.jpg"
                alt="Đặng Trọng Đạt"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Info Column */}
          <div className="flex-1 space-y-4">
            {/* Name */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {t("hero.name")}
              </h1>
              <p className="text-lg text-foreground/60">{t("hero.subtitle")}</p>
            </div>

            {/* Contact Info - Vertical List */}
            <div className="space-y-2 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <span>{t("hero.title")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t("hero.location")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>0866646200</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>dangdattd167@gmail.com</span>
              </div>
              <div>
                <a
                  href="https://datdt.io.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  datdt.io.vn
                </a>
              </div>
              <div className="text-foreground/50 text-xs">
                coding 12 mins today
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/%C4%91%E1%BA%A1t-%C4%91%E1%BA%B7ng-58ab07307/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/dat16720"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
