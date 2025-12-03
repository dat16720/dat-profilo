"use client";

import { useTranslation } from "react-i18next";

export default function About() {
  const { i18n } = useTranslation();

  const content = {
    vi: {
      title: "Về Tôi",
      subtitle:
        "Frontend Developer với niềm đam mê phát triển và bảo trì phần mềm",
      intro:
        "Làm việc như một Software Engineer, áp dụng kiến thức trong lĩnh vực testing và maintenance để đáp ứng nhu cầu cụ thể của mọi người. Mong muốn làm việc trong một đội ngũ gồm những cá nhân có động lực, cùng hướng tới sự phát triển của công ty và các mục tiêu của nó. Khao khát học hỏi từ các chuyên gia có kinh nghiệm và các dự án trong công ty. Nâng cao kỹ năng tư duy phản biện, mở rộng kiến thức và phát triển đạo đức làm việc mạnh mẽ để trở thành Techlead trong tương lai gần.",
      highlights: [
        {
          icon: "🎯",
          title: "Kỹ năng kỹ thuật",
          description:
            "Có 3 năm kinh nghiệm trong Frontend development. Thành thạo JavaScript, TypeScript, HTML5, CSS3. Có kiến thức và kinh nghiệm với ReactJS, NextJs, Redux, NodeJs, Express.",
        },
        {
          icon: "⚡",
          title: "Tối ưu hiệu suất",
          description:
            "Có kiến thức về tối ưu hiệu suất code. Làm việc với các công nghệ như Docker, Socket IO. Quen thuộc với các công cụ mã nguồn mở như Git, Jira, Tanstack query, Zustand.",
        },
        {
          icon: "👥",
          title: "Làm việc nhóm",
          description:
            "Có tinh thần làm việc nhóm tốt và trách nhiệm cao. Có khả năng làm việc trong môi trường Agile. Có khả năng đọc và viết tài liệu tiếng Anh.",
        },
      ],
      expertise: [
        "React & Next.js",
        "JavaScript & TypeScript",
        "Node.js & Express",
        "MongoDB",
        "Docker & Socket IO",
        "UI Libraries (Ant Design, Bootstrap, Material-UI, Tailwind, Shadcn)",
      ],
      stats: [
        { label: "Năm kinh nghiệm", value: "3", icon: "💼" },
        { label: "Dự án đã làm", value: "6+", icon: "🚀" },
        { label: "Công ty đã làm việc", value: "3", icon: "👥" },
        { label: "Kỹ năng chính", value: "10+", icon: "⚡" },
      ],
      education: {
        title: "Học vấn",
        institution: "Học viện Kỹ thuật Mật mã - KMA",
        major: "An toàn thông tin",
        period: "2018 - 2023",
      },
    },
    en: {
      title: "About Me",
      subtitle:
        "Frontend Developer passionate about developing and maintaining software",
      intro:
        "To work as a Software Engineer applying my knowledge in the field of testing, and maintenance to cater to the specific needs of the people. I wish to work in a team of motivated individuals who wish to work towards the advancement of the company and its goals. Desire to learn from experienced professionals and projects within the company. Enhance critical thinking skills, expand knowledge, and develop a strong work ethic to become a Techlead in the near future.",
      highlights: [
        {
          icon: "🎯",
          title: "Technical Skills",
          description:
            "Have 3 years of experience in Frontend development. Proficient in JavaScript, TypeScript, HTML5, CSS3. Have knowledge and experience with ReactJS, NextJs, Redux, NodeJs, Express.",
        },
        {
          icon: "⚡",
          title: "Performance Optimization",
          description:
            "Have knowledge with optimized performance code. Work with technologies like Docker, Socket IO. Familiarity with open source tools & frameworks like Git, Jira, Tanstack query, Zustand.",
        },
        {
          icon: "👥",
          title: "Team Collaboration",
          description:
            "Have good team working spirit and high responsibility. The ability of demonstrated, hands-on development experience within an Agile environment. Have ability to read and write with English documents.",
        },
      ],
      expertise: [
        "React & Next.js",
        "JavaScript & TypeScript",
        "Node.js & Express",
        "MongoDB",
        "Docker & Socket IO",
        "UI Libraries (Ant Design, Bootstrap, Material-UI, Tailwind, Shadcn)",
      ],
      stats: [
        { label: "Years Experience", value: "3", icon: "💼" },
        { label: "Projects Completed", value: "6+", icon: "🚀" },
        { label: "Companies Worked", value: "3", icon: "👥" },
        { label: "Core Skills", value: "10+", icon: "⚡" },
      ],
      education: {
        title: "Education",
        institution: "Academy of Cryptography Techniques - KMA",
        major: "Information Security",
        period: "2018 - 2023",
      },
    },
  };

  const text = content[i18n.language === "vi" ? "vi" : "en"];

  return (
    <section id="about" className="py-16 border-t border-primary/10 relative">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold mb-8 gradient-text">
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
              className="text-center p-4 neon-box rounded-lg hover:scale-105 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-foreground/70 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="space-y-4 mb-8">
          {text.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-5 neon-box rounded-lg hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">{highlight.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
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
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-4 text-lg">Core Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {text.expertise.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 text-sm font-medium neon-box rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="p-5 neon-box rounded-lg hover:scale-[1.02] transition-all duration-300 group">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-4 text-lg">
            {text.education.title}
          </h3>
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground">
                  {text.education.institution}
                </h4>
                <p className="text-sm text-foreground/70">
                  {text.education.major}
                </p>
              </div>
              <p className="text-xs text-foreground/50 font-mono">
                {text.education.period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
