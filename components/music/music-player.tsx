'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useMemo } from 'react'

type MusicPlayerProps = {
  songId: string
  songTitle: string
  artist: string
  /** Đang phát từ demoUrl (demo) hay audioUrl (full) – hiển thị cho user. */
  playMode?: 'demo' | 'full'
}

export function MusicPlayer({ songId, songTitle, artist, playMode }: MusicPlayerProps) {
  const { data: session, status } = useSession()
  const streamUrl = useMemo(() => `/api/music/${songId}/stream`, [songId])
  const isVip = session?.user?.vipUntil
    ? new Date(session.user.vipUntil) > new Date()
    : false
  const mode = playMode ?? (isVip ? 'full' : 'demo')

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-medium">{songTitle}</p>
          <p className="text-sm text-zinc-500">{artist}</p>
        </div>
        {status === 'authenticated' && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${mode === 'full'
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
              }`}
          >
            {mode === 'full' ? 'Đang phát: Bản full' : 'Đang phát: Demo'}
          </span>
        )}
      </div>
      {session ? (
        <audio
          controls
          className="w-full h-10"
          src={streamUrl}
          preload="metadata"
        >
          Trình duyệt không hỗ trợ phát audio.
        </audio>
      ) : (
        <div className="py-4 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Đăng nhập để nghe demo; nâng cấp VIP để nghe bản full.
          </p>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(`/music/${songId}`)}`}
            className="inline-block px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90"
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
