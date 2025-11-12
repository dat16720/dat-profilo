"use client"

import { useThemeColor } from "@/lib/theme/theme-context"
import { themeColors } from "@/lib/theme/theme-colors"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeBackground() {
  const { themeColor } = useThemeColor()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const colors = themeColors[themeColor]
  const isDark = theme === "dark"
  const primary = isDark ? colors.dark.primary : colors.light.primary
  const accent = isDark ? colors.dark.accent : colors.light.accent

  return (
    <>
      {/* Gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgb(${primary}) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgb(${accent}) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Animated blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-blob"
          style={{
            background: `radial-gradient(circle, rgb(${primary}) 0%, transparent 70%)`,
          }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-2000"
          style={{
            background: `radial-gradient(circle, rgb(${accent}) 0%, transparent 70%)`,
          }}
        />
        <div 
          className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-4000"
          style={{
            background: `radial-gradient(circle, rgb(${primary}) 0%, transparent 70%)`,
          }}
        />
      </div>
    </>
  )
}

