'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SongRowActions({ songId }: { songId: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Bạn có chắc muốn xóa bài hát này?')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/songs/${songId}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        alert(data.message ?? 'Xóa thất bại')
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <span className="flex items-center gap-2 shrink-0">
      <Link
        href={`/admin/songs/${songId}/edit`}
        className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
      >
        Sửa
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-sm text-red-600 dark:text-red-400 hover:underline disabled:opacity-50"
      >
        {deleting ? 'Đang xóa...' : 'Xóa'}
      </button>
    </span>
  )
}
