import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  vi: {
    translation: {
      nav: {
        about: "Về tôi",
        skills: "Kỹ năng",
        experience: "Kinh nghiệm",
        projects: "Dự án",
        achievements: "Thành tích",
        testimonials: "Đánh giá",
      },
      hero: {
        name: "Đặng Trọng Đạt",
        title: "Senior Frontend Engineer @Galaxy Education JSC",
        subtitle: "Yet another chatbot user",
        location: "Hanoi Capital, Viet Nam",
        description:
          "Frontend Developer với hơn 2 năm kinh nghiệm, chuyên về ReactJS và Next.js. Tập trung vào clean architecture, SEO, Typescript, Tailwind CSS, UI libraries (Shadcn UI, Material UI). Đam mê tạo ra responsive, high-quality user interfaces và cải thiện developer experience thông qua reusable components và clean code.",
        stats: {
          projects: "Dự án hoàn thành",
          performance: "Performance Score",
          experience: "Năm kinh nghiệm",
        },
        cta: "Liên hệ ngay",
        availability: "Sẵn sàng cho dự án tiếp theo!",
        availabilityDesc:
          "Đang tìm kiếm cơ hội làm việc với các team chuyên nghiệp, dự án thử thách và công nghệ hiện đại.",
      },
    },
  },
  en: {
    translation: {
      nav: {
        about: "About",
        skills: "Skills",
        experience: "Experience",
        projects: "Projects",
        achievements: "Achievements",
        testimonials: "Reviews",
      },
      hero: {
        name: "Đặng Trọng Đạt",
        title: "Senior Frontend Engineer @Galaxy Education JSC",
        subtitle: "Yet another chatbot user",
        location: "Hanoi Capital, Viet Nam",
        description:
          "Frontend Developer with over 2 years of experience, specializing in ReactJS and Next.js. Focused on clean architecture, SEO, Typescript, Tailwind CSS, UI libraries (Shadcn UI, Material UI). Passionate about creating responsive, high-quality user interfaces and improving developer experience through reusable components and clean code.",
        stats: {
          projects: "Projects Completed",
          performance: "Performance Score",
          experience: "Years Experience",
        },
        cta: "Get in touch",
        availability: "Ready for next project!",
        availabilityDesc:
          "Looking for opportunities to work with professional teams, challenging projects and modern technologies.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
