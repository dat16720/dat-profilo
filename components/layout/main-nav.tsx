'use client'

import {
  Crown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Music2,
  User,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const navLinkClass =
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'

export function MainNav() {
  const { data: session, status } = useSession()
  const isVip = session?.user?.vipUntil
    ? new Date(session.user.vipUntil) > new Date()
    : false
  const isAdmin = (session?.user as { role?: string })?.role === 'admin'

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      <Link href="/music" className={navLinkClass}>
        <Music2 className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Khám phá nhạc</span>
      </Link>
      <Link href="/pricing" className={navLinkClass}>
        <Crown className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Gói VIP</span>
      </Link>
      {status === 'loading' ? (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-300" />
        </span>
      ) : session ? (
        <>
          {isAdmin && (
            <Link
              href="/admin"
              className={`${navLinkClass} text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-500/10`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
          {isVip && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
              <Crown className="h-3.5 w-3.5" />
              VIP
            </span>
          )}
          <Link href="/profile" className={`${navLinkClass} truncate max-w-[160px]`}>
            <User className="h-4 w-4 shrink-0" />
            <span className="truncate">{session.user?.name || session.user?.email}</span>
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/music' })}
            className={`${navLinkClass} text-zinc-500 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400`}
            aria-label="Đăng xuất"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className={`${navLinkClass} bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200`}
        >
          <LogIn className="h-4 w-4 shrink-0" />
          <span>Đăng nhập</span>
        </Link>
      )}
    </nav>
  )
}
