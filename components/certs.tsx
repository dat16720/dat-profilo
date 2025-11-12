"use client";

import { useState } from "react";

export default function Certs() {
  const [showAll, setShowAll] = useState(false);

  const allCerts = [
    {
      name: "Next.js Fundamentals",
      org: "Vercel",
      date: "2024",
    },
    {
      name: "Next.js Advanced",
      org: "Vercel",
      date: "2024",
    },
    {
      name: "React Advanced Patterns",
      org: "Meta",
      date: "2023",
    },
    {
      name: "AWS Certified Developer",
      org: "Amazon",
      date: "2023",
    },
  ];

  const displayedCerts = showAll ? allCerts : allCerts.slice(0, 2);

  return (
    <section id="certs" className="py-12 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Certs ({allCerts.length})
        </h2>
        <div className="space-y-4">
          {displayedCerts.map((cert, idx) => (
            <div key={idx} className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{cert.name}</h3>
                <p className="text-sm text-foreground/70">{cert.org}</p>
              </div>
              <p className="text-xs text-foreground/50">{cert.date}</p>
            </div>
          ))}
        </div>
        {allCerts.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm text-primary hover:underline"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </section>
  );
}

