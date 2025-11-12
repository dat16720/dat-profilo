"use client";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <div className="space-y-2 text-sm text-foreground/60">
          <p>Inspired by tailwindcss.com.</p>
          <p>
            Built by DTD. The source code is available on{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://dangdat.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              dangdat.dev
            </a>
            <a
              href="https://dangdat.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              dangdat.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
