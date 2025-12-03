"use client";

import LoveAnimated from "@/components/love-animated";
import { useEffect, useState } from "react";

export default function LovePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      <LoveAnimated />
    </div>
  );
}
