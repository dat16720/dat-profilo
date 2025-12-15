"use client";

import About from "@/components/about";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import Skills from "@/components/skills";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load các components nặng
const ThemeBackground = dynamic(
  () => import("@/components/theme-background"),
  {
    ssr: false,
    loading: () => null,
  }
);

const Projects = dynamic(() => import("@/components/projects"), {
  ssr: true,
});

const Achievements = dynamic(() => import("@/components/achievements"), {
  ssr: true,
});

const Certs = dynamic(() => import("@/components/certs"), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="min-h-screen relative bg-background">
      {/* Theme Background Overlay - Lazy loaded */}
      <Suspense fallback={null}>
        <ThemeBackground />
      </Suspense>

      <main className="relative z-10">
        <Navigation />

        {/* Centered Single Column Layout */}
        <div className="mx-auto max-w-5xl">
          <Hero />
          <About />
          <Skills />
          <Experience />
          {/* Lazy load các sections không cần thiết ngay */}
          <Suspense fallback={<div className="py-16" />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="py-16" />}>
            <Achievements />
          </Suspense>
          <Suspense fallback={<div className="py-16" />}>
            <Certs />
          </Suspense>
          <Footer />
        </div>
      </main>
    </div>
  );
}
