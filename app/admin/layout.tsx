import { getSession, isAdmin } from '@/lib/auth-utils'
import {
  Disc3,
  LayoutDashboard,
  Music2,
  Shield,
  Upload,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type React from 'react'

const adminNavClass =
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-amber-600 dark:hover:text-amber-400'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login?callbackUrl=/admin')
  }
  if (!isAdmin(session)) {
    redirect('/music')
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl supports-backdrop-filter:bg-white/70 dark:supports-backdrop-filter:bg-zinc-900/70">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-semibold text-amber-600 dark:text-amber-400 transition-colors hover:bg-amber-500/10 dark:hover:bg-amber-500/10"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
              <Shield className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Khu vực Admin</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/admin" className={adminNavClass}>
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Tổng quan</span>
            </Link>
            <Link href="/admin/users" className={adminNavClass}>
              <Users className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">User</span>
            </Link>
            <Link href="/admin/upload" className={adminNavClass}>
              <Upload className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Upload</span>
            </Link>
            <Link href="/admin/songs" className={adminNavClass}>
              <Disc3 className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Bài hát</span>
            </Link>
            <Link
              href="/music"
              className={`${adminNavClass} text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300`}
            >
              <Music2 className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Về trang nhạc</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  )
}
