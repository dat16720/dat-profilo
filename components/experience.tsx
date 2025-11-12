"use client";

import { useState } from "react";

export default function Experience() {
  const [, setHoveredIndex] = useState<number | null>(null);

  const experiences = [
    {
      company: "Tech Startup Việt Nam",
      role: "Senior Frontend Engineer",
      period: "2023 - Hiện tại",
      description:
        "Lead team 5 developers xây dựng platform CRM phục vụ 10,000+ users với Next.js 14, TypeScript. Tối ưu performance đạt 98/100 Lighthouse score, giảm 60% load time. Thiết kế và implement Design System với 80+ components tái sử dụng.",
      icon: "💼",
      tech: "Next.js • React • TypeScript • Tailwind",
      achievement: "98/100 Performance",
    },
    {
      company: "E-commerce Enterprise",
      role: "Frontend Developer",
      period: "2021 - 2023",
      description:
        "Phát triển platform thương mại điện tử xử lý 50,000+ đơn hàng/tháng với React 18, Redux Toolkit. Implement real-time notifications với WebSocket, tích hợp payment gateways. Optimize SEO đưa website lên top 3 Google cho 20+ keywords chính.",
      icon: "🛒",
      tech: "React • Redux • Node.js • MongoDB",
      achievement: "50K+ orders/month",
    },
    {
      company: "EdTech Company",
      role: "Frontend Developer",
      period: "2020 - 2021",
      description:
        "Xây dựng nền tảng học tập online phục vụ 100,000+ học viên với React, Next.js. Develop interactive video player với quiz system, progress tracking. Implement responsive design hỗ trợ mọi thiết bị, đạt WCAG 2.1 AA accessibility standards.",
      icon: "📚",
      tech: "React • Next.js • GraphQL • PostgreSQL",
      achievement: "100K+ students",
    },
  ];

  return (
    <section id="experience" className="py-12 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Experience</h2>
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
              className="group space-y-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-300"
              style={{
                transition: "all 300ms ease",
                transform: "translateY(0)",
              }}
            >
              {/* Icon & Header */}
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0 group-hover:scale-110 transition-transform">
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-1">
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
