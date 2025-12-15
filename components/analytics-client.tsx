"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

export function AnalyticsClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay Analytics để không block initial render
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return <Analytics />;
}
