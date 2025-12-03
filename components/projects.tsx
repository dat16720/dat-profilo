"use client";

import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const [, setHoveredIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const allProjects = t("projects.items", { returnObjects: true }) as Array<{
    name: string;
    description: string;
    technologies: string[];
    highlight: string;
    metrics: string;
    icon: string;
  }>;

  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 2);

  return (
    <section id="projects" className="py-16 border-t border-primary/10">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold mb-8">
          <span className="gradient-text">{t("projects.title")}</span>
          <span className="text-foreground/50 text-2xl ml-2">({allProjects.length})</span>
        </h2>
        <div className="space-y-6">
          {displayedProjects.map((project, idx) => (
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
              className="group space-y-4 p-6 neon-box rounded-lg hover:scale-[1.02] transition-all duration-300"
              style={{
                transition: "all 300ms ease",
                transform: "translateY(0)",
              }}
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4">
                <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-accent">
                      {project.highlight}
                    </span>
                    <span className="text-xs text-foreground/50">•</span>
                    <span className="text-xs text-foreground/50">
                      {project.metrics}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, tidx) => (
                  <span
                    key={tidx}
                    className="px-3 py-1 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/30 hover:border-primary/80 hover:bg-primary/20 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-3 border-t border-primary/10 group-hover:border-primary/30 transition-colors">
                <a
                  href="#"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-xl hover:shadow-primary/50 rounded-lg transition-all flex items-center justify-center gap-2 font-bold text-sm hover:scale-110 relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    {t("projects.liveDemo")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
                <a
                  href="#"
                  className="flex-1 px-4 py-2.5 neon-box rounded-lg transition-all flex items-center justify-center gap-2 font-bold text-sm hover:scale-110"
                >
                  <Github className="w-4 h-4" />
                  {t("projects.code")}
                </a>
              </div>
            </div>
          ))}
        </div>
        {allProjects.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm text-primary hover:underline"
          >
            {showAll ? t("projects.showLess") : t("projects.showMore")}
          </button>
        )}
      </div>
    </section>
  );
}
