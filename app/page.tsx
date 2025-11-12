"use client";

import About from "@/components/about";
import Achievements from "@/components/achievements";
import Certs from "@/components/certs";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import LogoSection from "@/components/logo-section";
import Navigation from "@/components/navigation";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import ThemeBackground from "@/components/theme-background";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative bg-background">
      {/* Theme Background Overlay */}
      <ThemeBackground />

      {/* Main Content Container */}
      <main className="relative z-10">
        <Navigation />

        {/* Centered Single Column Layout */}
        <div className="mx-auto max-w-5xl">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Certs />
          <LogoSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
