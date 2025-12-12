"use client"

import { Globe, Mail, Phone, AtSign } from "lucide-react"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import Navigation from "@/components/navigation"
import ThemeBackground from "@/components/theme-background"
import { useEffect, useState } from "react"

export default function ThanksPage() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen relative bg-background">
      <ThemeBackground />
      
      <main className="relative z-10">
        <Navigation />

        <div className="mx-auto max-w-5xl px-6 pt-24 pb-12">
          <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
            {/* Thank You Message */}
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">
                {t("thanks.title")}
              </h1>
              <p className="text-xl md:text-2xl text-foreground/60">
                {t("thanks.subtitle")}
              </p>
            </div>

            {/* Contact Information */}
            <div className="w-full max-w-md space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t("thanks.contactTitle")}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                  <Phone className="w-5 h-5 text-primary/70 shrink-0" />
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                    0866646200
                  </span>
                </div>

                <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                  <Mail className="w-5 h-5 text-primary/70 shrink-0" />
                  <a
                    href="mailto:dangdattd167@gmail.com"
                    className="text-foreground/80 group-hover:text-foreground transition-colors hover:text-primary"
                  >
                    dangdattd167@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                  <AtSign className="w-5 h-5 text-primary/70 shrink-0" />
                  <a
                    href="https://github.com/dat16720"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 group-hover:text-foreground transition-colors hover:text-primary"
                  >
                    @dat16720
                  </a>
                </div>

                <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                  <Globe className="w-5 h-5 text-primary/70 shrink-0" />
                  <a
                    href="https://datdt.io.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 group-hover:text-foreground transition-colors hover:text-primary"
                  >
                    www.datdt.io.vn
                  </a>
                </div>
              </div>

              {/* Back to Home */}
              <div className="pt-8 text-center">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  {t("thanks.backHome")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

