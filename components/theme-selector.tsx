"use client"

import { useThemeColor } from "@/lib/theme/theme-context"
import { themeColors } from "@/lib/theme/theme-colors"
import { Check, Palette } from "lucide-react"
import { useState } from "react"

export default function ThemeSelector() {
  const { themeColor, setThemeColor } = useThemeColor()
  const [isOpen, setIsOpen] = useState(false)
  const currentTheme = themeColors[themeColor]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-card border-2 hover:bg-muted transition-all group"
        style={{
          borderColor: `rgb(${currentTheme.light.primary})`,
        }}
        aria-label={`Current theme: ${currentTheme.name}`}
      >
        <Palette 
          className="w-5 h-5 transition-transform group-hover:rotate-12" 
          style={{ color: `rgb(${currentTheme.light.primary})` }}
        />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background"
          style={{ backgroundColor: `rgb(${currentTheme.light.accent})` }}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-12 right-0 z-50 p-4 bg-card border border-border rounded-lg shadow-lg min-w-[200px]">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Theme Color
            </h3>
            <p className="text-xs text-foreground/60 mb-3">
              Current: {currentTheme.name}
            </p>
            <div className="space-y-2">
              {Object.entries(themeColors).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setThemeColor(key as keyof typeof themeColors)
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full border border-border"
                      style={{
                        background: `rgb(${value.light.primary})`,
                      }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-border"
                      style={{
                        background: `rgb(${value.light.accent})`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-foreground flex-1 text-left">
                    {value.name}
                  </span>
                  {themeColor === key && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

