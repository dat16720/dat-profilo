"use client"

import { Quote } from "lucide-react"

interface TestimonialsProps {
  language?: "vi" | "en"
}

export default function Testimonials({ language = "vi" }: TestimonialsProps = {}) {
  const content = {
    vi: {
      title: "Đánh Giá & Chứng Thực",
      subtitle: "Những lời nhận xét từ đồng nghiệp và khách hàng",
      testimonials: [
        {
          name: "Nguyễn Văn A",
          role: "CTO tại Tech Startup",
          avatar: "👨‍💼",
          content: "Đạt là một Senior Frontend Engineer xuất sắc. Code quality tuyệt vời, luôn deliver đúng deadline, và có khả năng leadership tốt. Team performance tăng 40% kể từ khi Đạt join.",
          rating: 5,
        },
        {
          name: "Trần Thị B",
          role: "Product Manager",
          avatar: "👩‍💼",
          content: "Làm việc với Đạt rất hiệu quả. Đạt không chỉ code tốt mà còn hiểu business logic sâu sắc, đưa ra nhiều giải pháp tối ưu cho product. Highly recommended!",
          rating: 5,
        },
        {
          name: "Lê Văn C",
          role: "Junior Developer",
          avatar: "👨‍💻",
          content: "Đạt là mentor tuyệt vời! Dạy rất tận tâm, code review chi tiết, và luôn động viên junior dev. Nhờ Đạt mà tôi đã thăng tiến lên mid-level sau 1 năm.",
          rating: 5,
        },
        {
          name: "Phạm Thị D",
          role: "CEO E-commerce Company",
          avatar: "👩‍💼",
          content: "Đạt rebuild toàn bộ frontend của chúng tôi, giảm load time 60%, tăng conversion rate 25%. ROI rất cao, definitely worth the investment!",
          rating: 5,
        },
      ],
    },
    en: {
      title: "Testimonials & Reviews",
      subtitle: "What colleagues and clients say about working with me",
      testimonials: [
        {
          name: "Nguyen Van A",
          role: "CTO at Tech Startup",
          avatar: "👨‍💼",
          content: "Dat is an outstanding Senior Frontend Engineer. Excellent code quality, always delivers on time, and has great leadership skills. Team performance increased by 40% since Dat joined.",
          rating: 5,
        },
        {
          name: "Tran Thi B",
          role: "Product Manager",
          avatar: "👩‍💼",
          content: "Working with Dat is very efficient. He not only codes well but also deeply understands business logic, proposing many optimal solutions for products. Highly recommended!",
          rating: 5,
        },
        {
          name: "Le Van C",
          role: "Junior Developer",
          avatar: "👨‍💻",
          content: "Dat is an excellent mentor! Very dedicated teaching, detailed code reviews, and always encouraging junior devs. Thanks to Dat, I was promoted to mid-level after 1 year.",
          rating: 5,
        },
        {
          name: "Pham Thi D",
          role: "CEO E-commerce Company",
          avatar: "👩‍💼",
          content: "Dat rebuilt our entire frontend, reduced load time by 60%, increased conversion rate by 25%. Very high ROI, definitely worth the investment!",
          rating: 5,
        },
      ],
    },
  }

  const text = content[language]

  return (
    <section
      id="testimonials"
      className="section-padding relative py-20 md:py-32 bg-background"
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

        <div className="grid gap-8 md:grid-cols-2">
          {text.testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group p-8 card-glass neon-border rounded-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-xl">★</span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-foreground/60">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

