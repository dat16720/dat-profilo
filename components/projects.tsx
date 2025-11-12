"use client";

import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const [, setHoveredIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    {
      name: "Enterprise CRM Platform",
      description:
        "Hệ thống CRM toàn diện quản lý 10,000+ khách hàng, tích hợp email marketing, sales pipeline và analytics dashboard. Real-time collaboration với WebSocket.",
      technologies: ["Next.js 14", "TypeScript", "PostgreSQL", "Redis"],
      highlight: "10K+ Users",
      metrics: "98/100 Performance • 60% faster load",
      icon: "💼",
    },
    {
      name: "Social Network Platform",
      description:
        "Mạng xã hội với newsfeed real-time, messaging system, notification engine. Xử lý 100K+ posts/day, support image/video upload, like, comment, share.",
      technologies: ["React 18", "Node.js", "MongoDB", "AWS S3"],
      highlight: "100K+ Posts/day",
      metrics: "Real-time updates • Infinite scroll",
      icon: "🌐",
    },
    {
      name: "E-Learning Platform",
      description:
        "Nền tảng học tập online với video streaming, interactive quiz, progress tracking, certificate system. Phục vụ 100,000+ học viên, 5000+ courses.",
      technologies: ["Next.js", "GraphQL", "PostgreSQL", "AWS"],
      highlight: "100K+ Students",
      metrics: "WCAG 2.1 AA • Mobile-first",
      icon: "📚",
    },
    {
      name: "E-Commerce Marketplace",
      description:
        "Sàn thương mại điện tử với product catalog, shopping cart, payment gateway (Stripe, PayPal), order tracking. Xử lý 50,000+ đơn hàng/tháng.",
      technologies: ["React", "Redux", "Stripe", "Firebase"],
      highlight: "50K+ Orders/month",
      metrics: "Top 3 Google • SEO optimized",
      icon: "🛒",
    },
    {
      name: "Job Portal Platform",
      description:
        "Nền tảng tìm việc như TopCV với job posting, CV builder, applicant tracking system, matching algorithm. 10,000+ jobs, 50,000+ CVs.",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
      highlight: "50K+ CVs",
      metrics: "AI-powered matching • PDF export",
      icon: "💼",
    },
  ];

  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 2);

  return (
    <section id="projects" className="py-12 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Projects ({allProjects.length})
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
              className="group space-y-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-300"
              style={{
                transition: "all 300ms ease",
                transform: "translateY(0)",
              }}
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-3">
                <div className="text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
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

              <div className="flex gap-3 pt-2 border-t border-border/30 group-hover:border-primary/30 transition-colors">
                <a
                  href="#"
                  className="flex-1 px-4 py-2 bg-linear-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/40 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold text-sm hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
                <a
                  href="#"
                  className="flex-1 px-4 py-2 bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold text-sm hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                  Code
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
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </section>
  );
}
