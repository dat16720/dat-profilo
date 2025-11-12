"use client";

import { useTranslation } from "react-i18next";

export default function About() {
  const { i18n } = useTranslation();

  const content = {
    vi: {
      title: "Về Tôi",
      subtitle:
        "Senior Frontend Engineer với niềm đam mê tạo ra trải nghiệm web xuất sắc",
      intro:
        "4+ năm kinh nghiệm phát triển ứng dụng web quy mô lớn với React & Next.js. Lead team 5 developers, mentor junior devs, và xây dựng kiến trúc Frontend cho các sản phẩm phục vụ 100,000+ users.",
      highlights: [
        {
          icon: "🎯",
          title: "Technical Excellence",
          description:
            "Chuyên sâu về React ecosystem, performance optimization, và modern web architecture. Giảm load time trung bình 60% cho các dự án.",
        },
        {
          icon: "👥",
          title: "Leadership & Mentorship",
          description:
            "Lead & mentor team 5 developers, conduct code reviews, và xây dựng best practices. 3 junior devs đã thăng tiến lên mid-level.",
        },
        {
          icon: "📈",
          title: "Business Impact",
          description:
            "Deliver các tính năng tăng conversion rate 25%, giảm bounce rate 40%, và improve user satisfaction score lên 4.8/5.",
        },
      ],
      expertise: [
        "React & Next.js Architecture",
        "Performance Optimization",
        "Design Systems",
        "Team Leadership",
        "Code Review & Mentoring",
        "CI/CD & Testing",
      ],
      stats: [
        { label: "Năm kinh nghiệm", value: "4+", icon: "💼" },
        { label: "Dự án thành công", value: "50+", icon: "🚀" },
        { label: "Team members", value: "5", icon: "👥" },
        { label: "Users impacted", value: "100K+", icon: "👤" },
      ],
    },
    en: {
      title: "About Me",
      subtitle:
        "Senior Frontend Engineer passionate about creating exceptional web experiences",
      intro:
        "4+ years experience developing large-scale web applications with React & Next.js. Lead team of 5 developers, mentor juniors, and build Frontend architecture for products serving 100,000+ users.",
      highlights: [
        {
          icon: "🎯",
          title: "Technical Excellence",
          description:
            "Deep expertise in React ecosystem, performance optimization, and modern web architecture. Reduced average load time by 60% across projects.",
        },
        {
          icon: "👥",
          title: "Leadership & Mentorship",
          description:
            "Lead & mentor team of 5 developers, conduct code reviews, and establish best practices. 3 juniors promoted to mid-level.",
        },
        {
          icon: "📈",
          title: "Business Impact",
          description:
            "Delivered features that increased conversion rate by 25%, reduced bounce rate by 40%, and improved user satisfaction to 4.8/5.",
        },
      ],
      expertise: [
        "React & Next.js Architecture",
        "Performance Optimization",
        "Design Systems",
        "Team Leadership",
        "Code Review & Mentoring",
        "CI/CD & Testing",
      ],
      stats: [
        { label: "Years Experience", value: "4+", icon: "💼" },
        { label: "Projects Delivered", value: "50+", icon: "🚀" },
        { label: "Team Members", value: "5", icon: "👥" },
        { label: "Users Impacted", value: "100K+", icon: "👤" },
      ],
    },
  };

  const text = content[i18n.language === "vi" ? "vi" : "en"];

  return (
    <section id="about" className="py-12 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {text.title}
        </h2>

        {/* Intro */}
        <div className="mb-8">
          <p className="text-foreground/70 leading-relaxed mb-4">
            {text.intro}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {text.stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="space-y-4 mb-8">
          {text.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{highlight.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Expertise */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Core Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {text.expertise.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm border border-border rounded bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
