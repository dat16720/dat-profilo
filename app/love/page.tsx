"use client";

import { Flower2, Heart, Music, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function LovePage() {
  const [mounted, setMounted] = useState(false);
  const [hearts, setHearts] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      duration: number;
      size: number;
    }>
  >([]);
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      duration: number;
    }>
  >([]);
  const [stars, setStars] = useState<
    Array<{ id: number; delay: number; duration: number; x: number; y: number }>
  >([]);
  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      x: number;
      delay: number;
      duration: number;
      color: string;
    }>
  >([]);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);
  const [extraSparkles, setExtraSparkles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      // Tạo hearts floating với nhiều kích thước
      const newHearts = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 3,
        size: 6 + Math.random() * 10,
      }));
      setHearts(newHearts);

      // Tạo sparkles
      const newSparkles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      }));
      setSparkles(newSparkles);

      // Tạo stars với vị trí ngẫu nhiên
      const newStars = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: i * 0.3,
        duration: 1.5 + Math.random() * 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setStars(newStars);

      // Tạo confetti
      const colors = ["#ec4899", "#f43f5e", "#a855f7", "#f59e0b", "#10b981"];
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setConfetti(newConfetti);

      // Tạo floating particles
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 3,
      }));
      setParticles(newParticles);

      // Tạo extra sparkles
      const newExtraSparkles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      }));
      setExtraSparkles(newExtraSparkles);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-pink-50 via-purple-50 to-rose-50 dark:from-pink-950 dark:via-purple-950 dark:to-rose-950">
      {/* Animated Background Hearts với nhiều kích thước */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-400/30 dark:text-pink-500/20 animate-float"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <Heart
              className="fill-current"
              style={{
                width: `${heart.size}px`,
                height: `${heart.size}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Confetti Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute rounded-full animate-float"
            style={{
              left: `${item.x}%`,
              top: "-10px",
              width: "8px",
              height: "8px",
              backgroundColor: item.color,
              opacity: 0.7,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-pink-300/20 dark:bg-pink-500/10 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: "4px",
              height: "4px",
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-sparkle"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400/60" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full space-y-12">
          {/* Header with Animation */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-block animate-bounce-slow relative">
              <Heart className="w-20 h-20 text-pink-500 fill-pink-500 mx-auto drop-shadow-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-20 h-20 text-pink-400 fill-pink-400 animate-pulse opacity-50" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent animate-gradient-shift drop-shadow-2xl">
              To My Beloved
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 animate-fade-in-up-delay italic">
              A heartfelt message crafted with infinite love and tenderness
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Flower2
                className="w-6 h-6 text-pink-400 animate-float"
                style={{ animationDelay: "0s" }}
              />
              <Music
                className="w-6 h-6 text-rose-400 animate-float"
                style={{ animationDelay: "0.5s" }}
              />
              <Star
                className="w-6 h-6 text-purple-400 fill-purple-400 animate-twinkle"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Main Message Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse-glow" />

            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-200/50 dark:border-pink-800/50">
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p className="animate-fade-in-up-delay-2 text-foreground/90 text-2xl md:text-3xl font-semibold text-center">
                  💕 My Dearest Love 💕
                </p>
                <p className="animate-fade-in-up-delay-3 text-foreground/80 italic">
                  There are countless words dancing in my heart, yearning to
                  reach you, yet sometimes mere words fall short of capturing
                  the depth of what I feel. In this digital realm, I&apos;ve
                  woven together lines of code, each one a whisper of my
                  affection, hoping to convey what my voice cannot fully
                  express.
                </p>
                <p className="animate-fade-in-up-delay-4 text-foreground/80">
                  Every pixel, every animation, every gentle transition has been
                  crafted with you in mind. Like a painter with their canvas,
                  I&apos;ve poured my heart into creating something
                  beautiful—something that might bring a smile to your face and
                  warmth to your heart. This page is more than code; it&apos;s a
                  love letter written in the language of technology, a testament
                  to how you inspire me in ways I never imagined possible.
                </p>
                <p className="animate-fade-in-up-delay-5 text-foreground/80">
                  When you look at this page, I hope you see not just colors and
                  animations, but the reflection of my feelings—the way my heart
                  skips a beat when I think of you, the way your presence lights
                  up my world, and the infinite gratitude I feel for having you
                  in my life.
                </p>
                <div className="animate-fade-in-up-delay-5 text-center pt-6 space-y-3">
                  <p className="font-bold text-2xl md:text-3xl bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                    ❤️ I Love You Beyond Words ❤️
                  </p>
                  <p className="text-foreground/70 text-sm italic">
                    Forever and always, with all my heart
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Hearts Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Forever Yours",
              "My Heart",
              "My Everything",
              "My Sunshine",
              "My Dream",
              "My Joy",
              "My Love",
              "My World",
            ].map((text, i) => (
              <div
                key={i}
                className="relative group cursor-pointer"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute -inset-1 bg-linear-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity animate-pulse-glow" />
                <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-pink-200/50 dark:border-pink-800/50 animate-float-card group-hover:scale-105 transition-transform">
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500 mx-auto mb-3 group-hover:scale-125 transition-transform animate-pulse" />
                  <p className="text-sm text-foreground/70 font-medium">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stars Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => (
              <Star
                key={star.id}
                className="absolute w-6 h-6 text-yellow-400 fill-yellow-400 animate-twinkle"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Additional Sparkles around content */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {extraSparkles.map((sparkle) => (
              <Sparkles
                key={sparkle.id}
                className="absolute w-5 h-5 text-pink-300/40 dark:text-pink-400/30 animate-sparkle"
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                  animationDelay: `${sparkle.delay}s`,
                  animationDuration: `${sparkle.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Footer Message */}
          <div className="text-center space-y-6 animate-fade-in-up-delay-6 pt-8">
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-linear-to-r from-pink-500/20 via-rose-500/20 to-purple-500/20 rounded-full blur-xl" />
              <p className="relative text-foreground/70 italic text-lg md:text-xl px-6 py-4 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-pink-200/30 dark:border-pink-800/30">
                &ldquo;Love is not about finding a perfect person, but learning
                to see an imperfect person perfectly.&rdquo;
              </p>
            </div>
            <div className="flex justify-center gap-3 items-center">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
              <Heart
                className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <Heart
                className="w-8 h-8 text-purple-500 fill-purple-500 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <p className="text-foreground/50 text-sm">
              Made with ❤️ and endless devotion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
