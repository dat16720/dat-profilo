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
        title: "Frontend Developer",
        subtitle: "Software Engineer",
        location: "Hanoi Capital, Viet Nam",
        description:
          "Frontend Developer với 3 năm kinh nghiệm, chuyên về ReactJS, Next.js, JavaScript, TypeScript. Tập trung vào phát triển và bảo trì các tính năng web, tối ưu hiệu suất, và làm việc trong môi trường Agile. Đam mê học hỏi và phát triển để trở thành Techlead trong tương lai gần.",
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
      skills: {
        title: "Kỹ năng",
      },
      experience: {
        title: "Kinh nghiệm",
        items: [
          {
            company: "Galaxy Education JSC",
            role: "Frontend Engineer",
            period: "April 2025 - Present",
            description:
              "Phát triển platform giáo viên và học sinh - hệ thống quản lý giáo dục toàn diện với các tính năng: quản lý lớp học, bài giảng, bài tập, điểm số, tương tác giữa giáo viên và học sinh. Xây dựng các tính năng real-time cho việc học tập và giảng dạy trực tuyến.",
            tech: "React • Next.js • TypeScript • Node.js • MongoDB • Socket IO",
            achievement: "Education Platform • Real-time Learning",
            icon: "🎓",
          },
          {
            company: "Biso24",
            role: "Frontend Developer",
            period: "June 2022 - April 2025",
            description:
              "Phát triển và bảo trì các tính năng cho dự án E-Learning: tạo và quản trị khóa học bởi admin và user, tính năng thanh toán qua VN Pay và học khóa học cho user. Phát triển dự án ERP - hệ thống quản lý doanh nghiệp toàn diện với các module tích hợp: Warehouse (quản lý kho), Sales & CRM (quản lý bán hàng và khách hàng), Purchasing & SRM (quản lý nhà cung cấp), Workflow (tự động hóa quy trình). MVP Workflow với Kanban, Calendar, Gantt (sử dụng VueJs) - kéo thả task từ UI, export/import test case ra Excel/CSV, push notifications real-time qua Mail và Slack.",
            tech: "React • Next.js • JavaScript • TypeScript • Node.js • Express • MongoDB • Docker • Socket IO",
            achievement: "ERP System • E-Learning Platform",
            icon: "💼",
          },
          {
            company: "VTECH SOFTWARE",
            role: "Frontend Developer",
            period: "April 2022 - June 2022",
            description:
              "Phát triển dự án Social media - phần mềm xây dựng giống Facebook với các tính năng cơ bản như đăng bài, bình luận, nhắn tin và một số trò chơi, được sử dụng trong hệ sinh thái doanh nghiệp. Phát triển dự án Find job - ứng dụng giúp người dùng tìm việc, tạo CV với template.",
            tech: "React • JavaScript • Node.js",
            achievement: "Social Media • Job Portal",
            icon: "🌐",
          },
          {
            company: "JITS INNOVATION LAB",
            role: "Developer",
            period: "December 2021 - April 2022",
            description:
              "Thực tập phát triển dự án Corporate Management - triển khai các tính năng dưới sự hướng dẫn của leader sử dụng ReactJS, Redux cho Frontend và Sails.js cho Backend.",
            tech: "React • Redux • Sails.js",
            achievement: "Corporate Management",
            icon: "📚",
          },
        ],
      },
      projects: {
        title: "Dự án",
        showMore: "Xem thêm",
        showLess: "Thu gọn",
        liveDemo: "Xem demo",
        code: "Mã nguồn",
        items: [
          {
            name: "Education Platform - Galaxy Education",
            description:
              "Platform giáo viên và học sinh - hệ thống quản lý giáo dục toàn diện với các tính năng: quản lý lớp học, bài giảng, bài tập, điểm số, tương tác giữa giáo viên và học sinh. Hệ thống hỗ trợ học tập và giảng dạy trực tuyến với tính năng real-time, video call, chat, và chia sẻ tài liệu.",
            technologies: [
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "MongoDB",
              "Socket IO",
              "WebRTC",
            ],
            highlight: "Education Management",
            metrics: "Real-time Learning • Teacher-Student Platform",
            icon: "🎓",
          },
          {
            name: "ERP System - Biso24",
            description:
              "Hệ thống quản lý doanh nghiệp toàn diện với các module tích hợp: Warehouse (quản lý kho, team size: 5), Sales & CRM (quản lý bán hàng và khách hàng, team size: 5), Purchasing & SRM (quản lý nhà cung cấp, team size: 5), Workflow (tự động hóa quy trình). MVP Workflow với Kanban, Calendar, Gantt (sử dụng VueJs) - kéo thả task từ UI, export/import test case ra Excel/CSV, push notifications real-time qua Mail và Slack. Trong tất cả các module, hầu hết quản lý được thực hiện bằng bảng và form, các thao tác được thực hiện trên bảng, biểu đồ và form.",
            technologies: [
              "React",
              "Next.js",
              "Vue.js",
              "JavaScript",
              "TypeScript",
              "Node.js",
              "MongoDB",
              "Docker",
              "Socket IO",
            ],
            highlight: "Enterprise Management",
            metrics: "Multiple Modules • Real-time Notifications",
            icon: "💼",
          },
          {
            name: "E-Learning Platform - Biso24",
            description:
              "Nền tảng học tập trực tuyến với các tính năng: tạo và quản trị khóa học bởi admin, tạo và quản trị khóa học bởi user, thanh toán qua VN Pay và học khóa học cho user.",
            technologies: [
              "React",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Node.js",
              "Express",
              "MongoDB",
            ],
            highlight: "E-Learning System",
            metrics: "Course Management • Payment Integration",
            icon: "📚",
          },
          {
            name: "Social Media Platform - VTECH",
            description:
              "Phần mềm mạng xã hội được xây dựng giống Facebook với các tính năng cơ bản như đăng bài, bình luận, nhắn tin và một số trò chơi. Được sử dụng trong hệ sinh thái doanh nghiệp.",
            technologies: ["React", "JavaScript", "Node.js"],
            highlight: "Social Network",
            metrics: "Posting • Messaging • Games",
            icon: "🌐",
          },
          {
            name: "Job Portal - VTECH",
            description:
              "Ứng dụng giúp người dùng tìm việc, tạo CV với template. Hệ thống quản lý ứng viên và việc làm.",
            technologies: ["React", "JavaScript", "Node.js"],
            highlight: "Job Search Platform",
            metrics: "CV Builder • Job Matching",
            icon: "💼",
          },
          {
            name: "Corporate Management - JITS",
            description:
              "Hệ thống quản lý doanh nghiệp. Triển khai các tính năng dưới sự hướng dẫn của leader sử dụng ReactJS, Redux cho Frontend và Sails.js cho Backend.",
            technologies: ["React", "Redux", "Sails.js"],
            highlight: "Corporate System",
            metrics: "Internship Project • Team Collaboration",
            icon: "🏢",
          },
          {
            name: "E-commerce & Payment Gateway",
            description:
              "Dự án ngoài: Website thương mại điện tử và cổng thanh toán. Hệ thống mua sắm trực tuyến với tích hợp thanh toán.",
            technologies: ["React", "Node.js", "Payment Gateway"],
            highlight: "E-commerce Platform",
            metrics: "Payment Integration • Online Shopping",
            icon: "🛒",
          },
        ],
      },
      certs: {
        title: "Chứng chỉ",
        showMore: "Xem thêm",
        showLess: "Thu gọn",
      },
      footer: {
        inspired: "Lấy cảm hứng từ tailwindcss.com.",
        built: "Được xây dựng bởi DTD. Mã nguồn có sẵn trên",
        tagline: "Frontend Engineer & UI/UX Designer",
        about: {
          title: "Về Tôi",
          me: "Giới thiệu",
          skills: "Kỹ năng",
          experience: "Kinh nghiệm",
          achievements: "Thành tích",
        },
        projects: {
          title: "Dự Án",
          all: "Tất cả dự án",
          github: "GitHub",
          thanks: "Cảm ơn",
        },
        contact: {
          title: "Liên Hệ",
        },
        social: {
          title: "Mạng Xã Hội",
        },
        copyright: "Đặng Trọng Đạt. Tất cả quyền được bảo lưu.",
        sourceCode: "Mã nguồn",
        thanks: "Cảm ơn",
      },
      thanks: {
        title: "CẢM ƠN!",
        subtitle: "Rất mong được liên hệ với bạn!",
        contactTitle: "ĐẶNG TRỌNG ĐẠT",
        backHome: "Về trang chủ",
      },
      achievements: {
        title: "Thành Tích & Chứng Chỉ",
        subtitle: "Các cột mốc đáng tự hào trong sự nghiệp",
        categories: [
          {
            title: "🏆 Giải Thưởng",
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
                description:
                  "Cloud architecture, deployment, và CI/CD pipelines",
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
                description:
                  "Production-ready boilerplate với 2K+ GitHub stars",
              },
            ],
          },
        ],
      },
      love: {
        home: "Trang chủ",
        title: "To My Beloved",
        subtitle:
          "Một thông điệp từ trái tim được tạo nên bằng tình yêu vô hạn và sự dịu dàng",
        greeting: "💕 Người yêu thân mến của tôi 💕",
        paragraph1:
          "Có vô số từ ngữ đang nhảy múa trong trái tim tôi, khao khát được đến với bạn, nhưng đôi khi những từ ngữ đơn thuần không thể diễn tả hết chiều sâu của những gì tôi cảm nhận. Trong thế giới kỹ thuật số này, tôi đã dệt nên những dòng code, mỗi dòng là một lời thì thầm của tình cảm, hy vọng truyền đạt những gì giọng nói của tôi không thể diễn tả đầy đủ.",
        paragraph2:
          "Mỗi pixel, mỗi animation, mỗi transition nhẹ nhàng đều được tạo ra với bạn trong tâm trí. Như một họa sĩ với tấm vải của mình, tôi đã đổ hết trái tim vào việc tạo ra một thứ gì đó đẹp đẽ—một thứ có thể mang lại nụ cười trên khuôn mặt bạn và sự ấm áp trong trái tim bạn. Trang này không chỉ là code; nó là một bức thư tình được viết bằng ngôn ngữ công nghệ, một minh chứng cho cách bạn truyền cảm hứng cho tôi theo những cách tôi chưa từng tưởng tượng.",
        paragraph3:
          "Khi bạn nhìn vào trang này, tôi hy vọng bạn không chỉ thấy màu sắc và animation, mà còn thấy sự phản chiếu của cảm xúc tôi—cách trái tim tôi đập nhanh khi nghĩ về bạn, cách sự hiện diện của bạn thắp sáng thế giới của tôi, và lòng biết ơn vô hạn tôi cảm thấy vì có bạn trong cuộc đời.",
        closing: "❤️ Tôi yêu bạn vượt quá mọi từ ngữ ❤️",
        closingSub: "Mãi mãi và luôn luôn, với tất cả trái tim tôi",
        quote:
          "Tình yêu không phải là tìm một người hoàn hảo, mà là học cách nhìn một người không hoàn hảo một cách hoàn hảo.",
        footer: "Được tạo nên bằng ❤️ và sự tận tâm vô tận",
        clickHere: "Ấn vào đây",
        continue: "Tiếp tục",
        surprise: "Bất ngờ!",
        surpriseMessage: "Cả hai đều bất ngờ khi gặp nhau... 💕",
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
        title: "Frontend Developer",
        subtitle: "Software Engineer",
        location: "Hanoi Capital, Viet Nam",
        description:
          "Frontend Developer with 3 years of experience, specializing in ReactJS, Next.js, JavaScript, TypeScript. Focused on developing and maintaining web features, performance optimization, and working in Agile environment. Passionate about learning and developing to become a Techlead in the near future.",
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
      skills: {
        title: "Skills",
      },
      experience: {
        title: "Experience",
        items: [
          {
            company: "Galaxy Education JSC",
            role: "Frontend Engineer",
            period: "April 2025 - Present",
            description:
              "Develop teacher and student platform - comprehensive education management system with features: class management, lessons, assignments, grades, interaction between teachers and students. Building real-time features for online learning and teaching.",
            tech: "React • Next.js • TypeScript • Node.js • MongoDB • Socket IO",
            achievement: "Education Platform • Real-time Learning",
            icon: "🎓",
          },
          {
            company: "Biso24",
            role: "Frontend Developer",
            period: "June 2022 - April 2025",
            description:
              "Develop and maintain features for E-Learning project: create and administer courses by admin and user, payment feature via VN Pay and learn courses for users. Develop ERP project - comprehensive enterprise management system with integrated modules: Warehouse (inventory management), Sales & CRM (sales and customer management), Purchasing & SRM (supplier management), Workflow (process automation). MVP Workflow with Kanban, Calendar, Gantt (using VueJs) - drag and drop tasks from UI, export/import test cases to Excel/CSV, push real-time notifications via Mail and Slack.",
            tech: "React • Next.js • JavaScript • TypeScript • Node.js • Express • MongoDB • Docker • Socket IO",
            achievement: "ERP System • E-Learning Platform",
            icon: "💼",
          },
          {
            company: "VTECH SOFTWARE",
            role: "Frontend Developer",
            period: "April 2022 - June 2022",
            description:
              "Develop Social media project - software built like Facebook with basic features such as posting, commenting, messaging and some games, used in corporate ecosystem. Develop Find job project - application to help users find jobs, create CV with template.",
            tech: "React • JavaScript • Node.js",
            achievement: "Social Media • Job Portal",
            icon: "🌐",
          },
          {
            company: "JITS INNOVATION LAB",
            role: "Developer",
            period: "December 2021 - April 2022",
            description:
              "Internship developing Corporate Management project - implement features under leader's guidance using ReactJS, Redux for Frontend and Sails.js for Backend.",
            tech: "React • Redux • Sails.js",
            achievement: "Corporate Management",
            icon: "📚",
          },
        ],
      },
      projects: {
        title: "Projects",
        showMore: "Show More",
        showLess: "Show Less",
        liveDemo: "Live Demo",
        code: "Code",
        items: [
          {
            name: "Education Platform - Galaxy Education",
            description:
              "Teacher and student platform - comprehensive education management system with features: class management, lessons, assignments, grades, interaction between teachers and students. System supports online learning and teaching with real-time features, video call, chat, and document sharing.",
            technologies: [
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "MongoDB",
              "Socket IO",
              "WebRTC",
            ],
            highlight: "Education Management",
            metrics: "Real-time Learning • Teacher-Student Platform",
            icon: "🎓",
          },
          {
            name: "ERP System - Biso24",
            description:
              "Comprehensive enterprise management system with integrated modules: Warehouse (inventory management, team size: 5), Sales & CRM (sales and customer management, team size: 5), Purchasing & SRM (supplier management, team size: 5), Workflow (process automation). MVP Workflow with Kanban, Calendar, Gantt (using VueJs) - drag and drop tasks from UI, export/import test cases to Excel/CSV, push real-time notifications via Mail and Slack. In all modules, most management is done using tables and forms, and operations are performed on tables, charts, and forms.",
            technologies: [
              "React",
              "Next.js",
              "Vue.js",
              "JavaScript",
              "TypeScript",
              "Node.js",
              "MongoDB",
              "Docker",
              "Socket IO",
            ],
            highlight: "Enterprise Management",
            metrics: "Multiple Modules • Real-time Notifications",
            icon: "💼",
          },
          {
            name: "E-Learning Platform - Biso24",
            description:
              "Online learning platform with features: create and administer courses by admin, create and administer courses by user, payment via VN Pay and learn courses for users.",
            technologies: [
              "React",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Node.js",
              "Express",
              "MongoDB",
            ],
            highlight: "E-Learning System",
            metrics: "Course Management • Payment Integration",
            icon: "📚",
          },
          {
            name: "Social Media Platform - VTECH",
            description:
              "Social media software built like Facebook with basic features such as posting, commenting, messaging and some games. Used in corporate ecosystem.",
            technologies: ["React", "JavaScript", "Node.js"],
            highlight: "Social Network",
            metrics: "Posting • Messaging • Games",
            icon: "🌐",
          },
          {
            name: "Job Portal - VTECH",
            description:
              "Application to help users find jobs, create CV with template. Candidate and job management system.",
            technologies: ["React", "JavaScript", "Node.js"],
            highlight: "Job Search Platform",
            metrics: "CV Builder • Job Matching",
            icon: "💼",
          },
          {
            name: "Corporate Management - JITS",
            description:
              "Corporate management system. Implement features under leader's guidance using ReactJS, Redux for Frontend and Sails.js for Backend.",
            technologies: ["React", "Redux", "Sails.js"],
            highlight: "Corporate System",
            metrics: "Internship Project • Team Collaboration",
            icon: "🏢",
          },
          {
            name: "E-commerce & Payment Gateway",
            description:
              "External project: E-commerce website and payment gateway. Online shopping system with payment integration.",
            technologies: ["React", "Node.js", "Payment Gateway"],
            highlight: "E-commerce Platform",
            metrics: "Payment Integration • Online Shopping",
            icon: "🛒",
          },
        ],
      },
      certs: {
        title: "Certifications",
        showMore: "Show More",
        showLess: "Show Less",
      },
      footer: {
        inspired: "Inspired by tailwindcss.com.",
        built: "Built by DTD. The source code is available on",
        tagline: "Frontend Engineer & UI/UX Designer",
        about: {
          title: "About",
          me: "About Me",
          skills: "Skills",
          experience: "Experience",
          achievements: "Achievements",
        },
        projects: {
          title: "Projects",
          all: "All Projects",
          github: "GitHub",
          thanks: "Thanks",
        },
        contact: {
          title: "Contact",
        },
        social: {
          title: "Social",
        },
        copyright: "Dang Trong Dat. All rights reserved.",
        sourceCode: "Source Code",
        thanks: "Thanks",
      },
      thanks: {
        title: "THANK YOU!",
        subtitle: "Looking forward to contact!",
        contactTitle: "DANG TRONG DAT",
        backHome: "Back to Home",
      },
      achievements: {
        title: "Achievements & Certifications",
        subtitle: "Proud milestones in my career journey",
        categories: [
          {
            title: "🏆 Awards",
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
                description:
                  "Production-ready boilerplate with 2K+ GitHub stars",
              },
            ],
          },
        ],
      },
      love: {
        home: "Home",
        title: "To My Beloved",
        subtitle:
          "A heartfelt message crafted with infinite love and tenderness",
        greeting: "💕 My Dearest Love 💕",
        paragraph1:
          "There are countless words dancing in my heart, yearning to reach you, yet sometimes mere words fall short of capturing the depth of what I feel. In this digital realm, I've woven together lines of code, each one a whisper of my affection, hoping to convey what my voice cannot fully express.",
        paragraph2:
          "Every pixel, every animation, every gentle transition has been crafted with you in mind. Like a painter with their canvas, I've poured my heart into creating something beautiful—something that might bring a smile to your face and warmth to your heart. This page is more than code; it's a love letter written in the language of technology, a testament to how you inspire me in ways I never imagined possible.",
        paragraph3:
          "When you look at this page, I hope you see not just colors and animations, but the reflection of my feelings—the way my heart skips a beat when I think of you, the way your presence lights up my world, and the infinite gratitude I feel for having you in my life.",
        closing: "❤️ I Love You Beyond Words ❤️",
        closingSub: "Forever and always, with all my heart",
        quote:
          "Love is not about finding a perfect person, but learning to see an imperfect person perfectly.",
        footer: "Made with ❤️ and endless devotion",
        clickHere: "Click here",
        continue: "Continue",
        surprise: "Surprise!",
        surpriseMessage: "Both are surprised to meet each other... 💕",
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
