"use client";

import { Award, BookOpen, Code, Trophy } from "lucide-react";

interface AchievementsProps {
  language?: "vi" | "en";
}

export default function Achievements({
  language = "vi",
}: AchievementsProps = {}) {
  const content = {
    vi: {
      title: "Thành Tích & Chứng Chỉ",
      subtitle: "Các cột mốc đáng tự hào trong sự nghiệp",
      categories: [
        {
          title: "🏆 Giải Thưởng",
          icon: Trophy,
          items: [
            {
              name: "Best Frontend Engineer 2024",
              org: "Tech Company Award",
              year: "2024",
              description:
                "Được trao cho engineer có contribution xuất sắc nhất trong việc cải thiện performance và UX",
            },
            {
              name: "Team Leader of the Year",
              org: "Internal Recognition",
              year: "2023",
              description:
                "Lead team đạt 98% sprint completion rate và giảm 40% bugs",
            },
          ],
        },
        {
          title: "📜 Chứng Chỉ Chuyên Môn",
          icon: Award,
          items: [
            {
              name: "Meta React Advanced Certification",
              org: "Meta (Facebook)",
              year: "2024",
              description:
                "Advanced React patterns, performance optimization, và best practices",
            },
            {
              name: "AWS Certified Developer",
              org: "Amazon Web Services",
              year: "2023",
              description: "Cloud architecture, deployment, và CI/CD pipelines",
            },
            {
              name: "Next.js Expert Certification",
              org: "Vercel",
              year: "2023",
              description:
                "Advanced Next.js features, SSR, SSG, và optimization techniques",
            },
          ],
        },
        {
          title: "📚 Đóng Góp Cộng Đồng",
          icon: BookOpen,
          items: [
            {
              name: "Open Source Contributor",
              org: "GitHub",
              year: "2020-Present",
              description:
                "500+ contributions, 10+ packages published on NPM với 50K+ downloads/month",
            },
            {
              name: "Technical Writer",
              org: "Dev.to & Medium",
              year: "2021-Present",
              description:
                "30+ bài viết về React/Next.js với 100K+ views và 5K+ followers",
            },
          ],
        },
        {
          title: "💻 Dự Án Cá Nhân",
          icon: Code,
          items: [
            {
              name: "React Performance Monitor",
              org: "NPM Package",
              year: "2024",
              description:
                "Tool monitor performance của React apps, 10K+ downloads/month",
            },
            {
              name: "Next.js Boilerplate Pro",
              org: "Open Source",
              year: "2023",
              description: "Production-ready boilerplate với 2K+ GitHub stars",
            },
          ],
        },
      ],
    },
    en: {
      title: "Achievements & Certifications",
      subtitle: "Proud milestones in my career journey",
      categories: [
        {
          title: "🏆 Awards",
          icon: Trophy,
          items: [
            {
              name: "Best Frontend Engineer 2024",
              org: "Tech Company Award",
              year: "2024",
              description:
                "Awarded for outstanding contribution in improving performance and UX",
            },
            {
              name: "Team Leader of the Year",
              org: "Internal Recognition",
              year: "2023",
              description:
                "Led team achieving 98% sprint completion rate and 40% bug reduction",
            },
          ],
        },
        {
          title: "📜 Professional Certifications",
          icon: Award,
          items: [
            {
              name: "Meta React Advanced Certification",
              org: "Meta (Facebook)",
              year: "2024",
              description:
                "Advanced React patterns, performance optimization, and best practices",
            },
            {
              name: "AWS Certified Developer",
              org: "Amazon Web Services",
              year: "2023",
              description:
                "Cloud architecture, deployment, and CI/CD pipelines",
            },
            {
              name: "Next.js Expert Certification",
              org: "Vercel",
              year: "2023",
              description:
                "Advanced Next.js features, SSR, SSG, and optimization techniques",
            },
          ],
        },
        {
          title: "📚 Community Contributions",
          icon: BookOpen,
          items: [
            {
              name: "Open Source Contributor",
              org: "GitHub",
              year: "2020-Present",
              description:
                "500+ contributions, 10+ NPM packages with 50K+ downloads/month",
            },
            {
              name: "Technical Writer",
              org: "Dev.to & Medium",
              year: "2021-Present",
              description:
                "30+ articles on React/Next.js with 100K+ views and 5K+ followers",
            },
          ],
        },
        {
          title: "💻 Personal Projects",
          icon: Code,
          items: [
            {
              name: "React Performance Monitor",
              org: "NPM Package",
              year: "2024",
              description:
                "Tool to monitor React app performance, 10K+ downloads/month",
            },
            {
              name: "Next.js Boilerplate Pro",
              org: "Open Source",
              year: "2023",
              description: "Production-ready boilerplate with 2K+ GitHub stars",
            },
          ],
        },
      ],
    },
  };

  const text = content[language];

  return (
    <section
      id="achievements"
      className="section-padding relative py-20 md:py-32 bg-linear-to-b from-background to-background/50"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {text.title}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {text.categories.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <category.icon className="w-6 h-6 text-primary" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
