"use client";

import { Award, BookOpen, Code, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, typeof Trophy> = {
  "🏆 Giải Thưởng": Trophy,
  "🏆 Awards": Trophy,
  "📜 Chứng Chỉ Chuyên Môn": Award,
  "📜 Professional Certifications": Award,
  "📚 Đóng Góp Cộng Đồng": BookOpen,
  "📚 Community Contributions": BookOpen,
  "💻 Dự Án Cá Nhân": Code,
  "💻 Personal Projects": Code,
};

export default function Achievements() {
  const { t } = useTranslation();

  const achievements = t("achievements", { returnObjects: true }) as {
    title: string;
    subtitle: string;
    categories: Array<{
      title: string;
      items: Array<{
        name: string;
        org: string;
        year: string;
        description: string;
      }>;
    }>;
  };

  return (
    <section
      id="achievements"
      className="section-padding relative py-20 md:py-32 bg-linear-to-b from-background to-background/50"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {achievements.title}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {achievements.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {achievements.categories.map((category, catIdx) => {
            const IconComponent = iconMap[category.title] || Trophy;
            return (
              <div key={catIdx}>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <IconComponent className="w-6 h-6 text-primary" />
                  {category.title}
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-6 card-glass neon-border rounded-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                          {item.name}
                        </h4>
                        <span className="text-xs font-semibold text-accent px-3 py-1 bg-accent/10 rounded-full">
                          {item.year}
                        </span>
                      </div>

                      <div className="text-sm text-primary font-semibold mb-3">
                        {item.org}
                      </div>

                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
