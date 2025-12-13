"use client";

import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        {/* <div className="relative w-full mb-12">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={800}
            height={160}
            className="w-full h-auto object-contain"
            priority
          />
        </div> */}

        {/* Profile Picture & Info */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Picture */}
          <div className="shrink-0 mx-auto md:mx-0 relative group">
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full from-primary via-accent to-primary opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500 animate-pulse-glow" />

            {/* Rotating border */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(var(--primary), 0.5) 25%, transparent 50%, rgba(var(--accent), 0.5) 75%, transparent 100%)",
                animation: "rotate-slow 8s linear infinite",
              }}
            />

            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 group-hover:scale-105 neon-box">
              <Image
                src="/images/me.jpg"
                alt="Đặng Trọng Đạt"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
                sizes="128px"
              />
            </div>
          </div>

          {/* Info Column */}
          <div className="flex-1 space-y-4 animate-fade-in-up">
            {/* Name */}
            <div className="relative">
              <h1 className="text-3xl md:text-4xl font-bold mb-1 relative inline-block">
                <span className="relative z-10 gradient-text">
                  {t("hero.name")}
                </span>
                <div className="absolute -inset-1 from-primary/20 via-accent/20 to-primary/20 blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              </h1>
              <p className="text-lg text-foreground/60 font-medium tracking-wide">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Contact Info - Vertical List */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform">
                <span className="text-primary/70 font-mono">▶</span>
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {t("hero.title")}
                </span>
              </div>
              <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform">
                <MapPin className="w-4 h-4 text-primary/70" />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {t("hero.location")}
                </span>
              </div>
              <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform">
                <Phone className="w-4 h-4 text-primary/70" />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  0866646200
                </span>
              </div>
              <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform">
                <Mail className="w-4 h-4 text-primary/70" />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  dangdattd167@gmail.com
                </span>
              </div>
              <div className="group hover:translate-x-1 transition-transform">
                <a
                  href="https://datdt.io.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors font-mono relative inline-block"
                >
                  <span className="relative z-10">datdt.io.vn</span>
                  <span className="absolute inset-0 bg-primary/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              <div className="text-foreground/50 text-xs font-mono mt-4 px-3 py-1 bg-primary/5 border border-primary/20 rounded inline-block">
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse mr-2" />
                coding 12 mins today
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              <a
                href="https://www.linkedin.com/in/%C4%91%E1%BA%A1t-%C4%91%E1%BA%B7ng-58ab07307/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-4 py-2 text-sm neon-box rounded-lg hover:scale-105 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://github.com/dat16720"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-4 py-2 text-sm neon-box rounded-lg hover:scale-105 transition-all duration-300"
              >
                <Github className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
