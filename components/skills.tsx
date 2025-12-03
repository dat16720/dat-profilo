"use client";

import { useTranslation } from "react-i18next";

export default function Skills() {
  const { t } = useTranslation();

  const techIcons = [
    { name: "JavaScript", icon: "JS" },
    { name: "TypeScript", icon: "TS" },
    { name: "HTML5", icon: "📄" },
    { name: "CSS3", icon: "🎨" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Redux", icon: "🔄" },
    { name: "Node.js", icon: "🟢" },
    { name: "Express", icon: "🚀" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Docker", icon: "🐳" },
    { name: "Socket IO", icon: "🔌" },
    { name: "Git", icon: "📝" },
    { name: "Jira", icon: "📋" },
    { name: "Tanstack Query", icon: "⚡" },
    { name: "Zustand", icon: "🐻" },
    { name: "Ant Design", icon: "🐜" },
    { name: "Bootstrap", icon: "🎨" },
    { name: "Material UI", icon: "📦" },
    { name: "Tailwind CSS", icon: "💨" },
    { name: "Shadcn UI", icon: "✨" },
  ];

  return (
    <section id="skills" className="py-16 border-t border-primary/10">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold mb-8 gradient-text">
          {t("skills.title")}
        </h2>
        <div className="flex flex-wrap gap-3">
          {techIcons.map((tech, idx) => (
            <div
              key={idx}
              className="group px-5 py-3 neon-box rounded-lg text-sm font-medium hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl group-hover:scale-125 transition-transform">
                  {tech.icon}
                </span>
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
