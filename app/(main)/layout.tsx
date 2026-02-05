import { MainNav } from '@/components/layout/main-nav'
import type { Metadata } from 'next'
import Link from 'next/link'
import type React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | Music App',
    default: 'Nghe nhạc trực tuyến | Music App',
  },
  description: 'Nghe nhạc trực tuyến. Demo miễn phí, nâng cấp VIP để nghe trọn bộ.',
  openGraph: {
    title: 'Nghe nhạc trực tuyến | Music App',
    description: 'Nghe nhạc trực tuyến. Demo miễn phí, VIP nghe full.',
  },
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl supports-backdrop-filter:bg-white/70 dark:supports-backdrop-filter:bg-zinc-900/70">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-semibold text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold">
              M
            </span>
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>
          <MainNav />
        </div>
      </header>
      <main className="flex-1 h-[calc(100vh-56px)]">{children}</main>
    </div>
  )
}
