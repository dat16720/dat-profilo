'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export type Song = {
  id: string
  title: string
  artist: string
  coverUrl?: string | null
  demoUrl?: string | null
  audioUrl?: string | null
}

export function MusicList() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/music')
      .then((res) => {
        if (!res.ok) throw new Error('Không tải được danh sách')
        return res.json()
      })
      .then((data: Song[]) => {
        if (!cancelled) setSongs(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Lỗi tải bài hát')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return <p className="text-zinc-500">Đang tải bài hát...</p>
  }
  if (error) {
    return (
      <p className="text-red-600 dark:text-red-400">
        {error}
      </p>
    )
  }
  if (songs.length === 0) {
    return (
      <p className="text-zinc-500">
        Chưa có bài hát nào. Admin có thể thêm bài tại trang Quản lý bài hát.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {songs.map((song) => (
        <li key={song.id}>
          <Link
            href={`/music/${song.id}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          >
            <span className="relative w-12 h-12 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-700 shrink-0">
              {song.coverUrl ? (
                <img
                  src={song.coverUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-lg">🎵</span>
              )}
            </span>
            <span className="font-medium flex-1 min-w-0 truncate">{song.title}</span>
            <span className="text-zinc-500 text-sm shrink-0">
              {song.artist}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
