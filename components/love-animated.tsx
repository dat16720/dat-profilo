"use client";

import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Stage = 1 | 2 | 3;

export default function LoveAnimated() {
  const { t } = useTranslation();
  const [stage, setStage] = useState<Stage>(1);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageOpacity, setMessageOpacity] = useState(0);
  const [boyVisible, setBoyVisible] = useState(false);

  // Generate random positions for hearts (only once)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backgroundHearts = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 3,
      })),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      })),
    []
  );

  const handleClickHere = () => {
    if (stage === 1) {
      // Move to stage 2: Show message
      setStage(2);
      setMessageVisible(true);
      // Fade in message
      const interval = setInterval(() => {
        setMessageOpacity((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev + 0.05;
        });
      }, 30);
    }
  };

  const handleMessageClick = () => {
    if (stage === 2) {
      // Move to stage 3: Boy appears
      setStage(3);
      setBoyVisible(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen h-screen overflow-hidden bg-linear-to-br from-pink-50 via-purple-50 to-rose-50 dark:from-pink-950 dark:via-purple-950 dark:to-rose-950">
      {/* Animated Background Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundHearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-pink-400/20 dark:text-pink-500/10 animate-float"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <span className="text-2xl">💖</span>
          </div>
        ))}
      </div>

      {/* Main Container - Responsive Layout */}
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center px-2 sm:px-4 md:px-8 py-4 md:py-0">
        {/* Stage 1 & 2: Girl on Left/Top */}
        <div className="absolute md:relative left-2 md:left-4 lg:left-8 top-[50%] md:top-auto z-20 flex flex-col items-center">
          {/* Girl Character */}
          <div className="relative">
            {/* Placeholder for girl image/GIF - Replace with actual image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 relative">
              {/* You can replace this with an actual image:
                <Image
                  src="/images/girl.gif"
                  alt="Girl"
                  fill
                  className="object-contain animate-bounce-slow"
                />
              */}
              <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl animate-bounce-slow">
                👩‍🦰
              </div>
            </div>

            {/* Pointing Arrow - Only in stage 1, hidden on mobile */}
            {stage === 1 && (
              <div
                className="md:block absolute top-1/2 right-0 translate-x-full animate-pointing"
                style={{ transform: "translateX(100%) rotate(-10deg)" }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl">👉</div>
              </div>
            )}
          </div>
        </div>

        {/* Stage 1: Click Here Cloud */}
        {stage === 1 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-xs sm:max-w-sm px-4">
            <div
              className="relative cursor-pointer group"
              onClick={handleClickHere}
            >
              <Heart className="w-6 h-6 text-primary animate-pulse" />
            </div>
          </div>
        )}

        {/* Stage 2 & 3: Message in Center */}
        {messageVisible && (
          <div
            className="absolute md:relative left-1/2 md:left-auto top-1/2 md:top-auto -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 z-20 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl px-2 sm:px-4 md:px-4"
            style={{ opacity: messageOpacity }}
            onClick={stage === 2 ? handleMessageClick : undefined}
          >
            <div className="relative">
              {/* Heart above message - only show in stage 2 */}
              {stage === 2 && (
                <div className="absolute -top-8 sm:-top-10 md:-top-12 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-pulse-heart z-10">
                  ❤️
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl overflow-y-auto max-h-[80vh] md:max-h-none ${
                  stage === 2
                    ? "cursor-pointer hover:scale-105 transition-transform"
                    : ""
                }`}
              >
                {/* Message Content */}
                <div className="space-y-3 sm:space-y-4 text-center">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-primary mb-2">
                    {t("love.title")}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 italic mb-3 sm:mb-4">
                    {t("love.subtitle")}
                  </p>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base lg:text-lg text-foreground/70 text-left">
                    <p className="text-center font-semibold text-sm sm:text-base md:text-lg">
                      {t("love.greeting")}
                    </p>
                    <p className="italic leading-relaxed">
                      {t("love.paragraph1")}
                    </p>
                    <p className="leading-relaxed">{t("love.paragraph2")}</p>
                    <p className="leading-relaxed">{t("love.paragraph3")}</p>
                  </div>

                  {/* Click hint for stage 2 */}
                  {stage === 2 && (
                    <div className="mt-4 sm:mt-6 animate-pulse">
                      <p className="text-xs sm:text-sm md:text-base text-primary/70">
                        {t("love.continue")} →
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Heart below message - only show in stage 2 */}
              {stage === 2 && (
                <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-pulse-heart z-10">
                  ❤️
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stage 3: Boy on Right/Bottom */}
        {boyVisible && (
          <div
            className={`absolute md:relative right-2 md:right-4 lg:right-8 top-[50%] md:top-auto z-25 flex flex-col items-center transition-all duration-1000 ${
              boyVisible ? "animate-pop-in" : "opacity-0 scale-0"
            }`}
          >
            {/* Boy Character */}
            <div className="relative">
              {/* Placeholder for boy image/GIF - Replace with actual image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 relative">
                {/* You can replace this with an actual image:
                  <Image
                    src="/images/boy.gif"
                    alt="Boy"
                    fill
                    className="object-contain animate-shake"
                  />
                */}
                <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl animate-shake">
                  👨‍🦱
                </div>
              </div>

              {/* Surprised effect - arms spread */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl animate-pulse">
                  ✨
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Surprise Message - Show separately, not overlapping */}
        {stage === 3 && boyVisible && (
          <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 z-30 pointer-events-none w-full max-w-xs">
            <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 animate-fade-in backdrop-blur-md rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl animate-bounce">
                💕
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-primary">
                {t("love.surprise")}
              </h2>
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-foreground/70">
                {t("love.surpriseMessage")}
              </p>
            </div>
          </div>
        )}

        {/* Floating hearts around for stage 2+ - Behind content */}
        {stage >= 2 && (
          <>
            {floatingHearts.map((heart, i) => (
              <div
                key={i}
                className="absolute text-xl sm:text-2xl animate-float pointer-events-none z-0"
                style={{
                  left: `${heart.left}%`,
                  top: `${heart.top}%`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                }}
              >
                💖
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
