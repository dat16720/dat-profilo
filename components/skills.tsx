"use client";

export default function Skills() {
  const techIcons = [
    { name: "TypeScript", icon: "TS" },
    { name: "JavaScript", icon: "JS" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Shadcn UI", icon: "✨" },
    { name: "Material UI", icon: "📦" },
    { name: "Git", icon: "📝" },
    { name: "GitHub", icon: "🐙" },
    { name: "Figma", icon: "🎨" },
    { name: "Vercel", icon: "▲" },
    { name: "Netlify", icon: "🌐" },
    { name: "Docker", icon: "🐳" },
    { name: "Kubernetes", icon: "☸️" },
    { name: "AWS", icon: "☁️" },
    { name: "Google Cloud", icon: "☁️" },
  ];

  return (
    <section id="skills" className="py-12 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Stack</h2>
        <div className="flex flex-wrap gap-4">
          {techIcons.map((tech, idx) => (
            <div
              key={idx}
              className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground/70 hover:text-foreground hover:border-primary/50 transition-colors"
            >
              {tech.icon} {tech.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
