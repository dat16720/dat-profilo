'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Song = {
  id: string
  title: string
  artist: string
  coverUrl?: string | null
  demoUrl?: string | null
  audioUrl?: string | null
  lyrics?: string | null
}

export function EditSongForm({ song }: { song: Song }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    const lyricsRaw = (formData.get('lyrics') as string) || ''
    const body = {
      title: (formData.get('title') as string) || undefined,
      artist: (formData.get('artist') as string) || undefined,
      coverUrl: (formData.get('coverUrl') as string) || null,
      demoUrl: (formData.get('demoUrl') as string) || null,
      audioUrl: (formData.get('audioUrl') as string) || null,
      lyrics: lyricsRaw.trim() || null,
    }
    if (!body.title?.trim() || !body.artist?.trim()) {
      setError('Tên bài và Ca sĩ không được để trống.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/songs/${song.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message ?? 'Cập nhật thất bại.')
        return
      }
      setSuccess('Đã lưu.')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded">
          {success}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Tên bài hát *</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={song.title}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ca sĩ *</label>
        <input
          name="artist"
          type="text"
          required
          defaultValue={song.artist}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">URL bản demo</label>
        <input
          name="demoUrl"
          type="url"
          defaultValue={song.demoUrl ?? ''}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">URL bản full</label>
        <input
          name="audioUrl"
          type="url"
          defaultValue={song.audioUrl ?? ''}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">URL ảnh bìa</label>
        <input
          name="coverUrl"
          type="url"
          defaultValue={song.coverUrl ?? ''}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Lời bài hát</label>
        <textarea
          name="lyrics"
          rows={10}
          defaultValue={song.lyrics ?? ''}
          placeholder="Nhập toàn bộ lời bài hát..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
        <Link
          href="/admin/songs"
          className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          Hủy
        </Link>
      </div>
    </form>
  )
}
