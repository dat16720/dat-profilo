"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Experience() {
  const [, setHoveredIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const experiences = t("experience.items", { returnObjects: true }) as Array<{
    company: string;
    role: string;
    period: string;
    description: string;
    icon: string;
    tech: string;
    achievement: string;
  }>;

  return (
    <section id="experience" className="py-16 border-t border-primary/10">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold mb-8 gradient-text">
          {t("experience.title")}
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={(e) => {
                setHoveredIndex(idx);
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                setHoveredIndex(null);
                e.currentTarget.style.transform = "translateY(0)";
              }}
              className="group space-y-3 p-5 neon-box rounded-lg hover:scale-[1.02] transition-all duration-300"
              style={{
                transition: "all 300ms ease",
                transform: "translateY(0)",
              }}
            >
              {/* Icon & Header */}
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                    {exp.company}
                  </h3>
                  <p className="text-sm gradient-text font-semibold mb-1">
                    {exp.role}
                  </p>
                  <p className="text-xs text-foreground/50 font-mono mb-2">
                    {exp.period}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exp.tech.split(" • ").map((tech, tidx) => (
                      <span
                        key={tidx}
                        className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors">
                {exp.description}
              </p>

              {/* Achievement Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full group-hover:bg-accent/20 transition-colors">
                <span className="text-accent text-sm">⚡</span>
                <span className="text-xs font-semibold text-accent">
                  {exp.achievement}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
