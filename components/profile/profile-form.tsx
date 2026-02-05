'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

type Profile = {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  vipUntil: string | null
  role: string
}

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nameValue, setNameValue] = useState('')
  const [nameSaving, setNameSaving] = useState(false)
  const [nameMessage, setNameMessage] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarSaving, setAvatarSaving] = useState(false)
  const [avatarMessage, setAvatarMessage] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    const res = await fetch('/api/profile')
    if (!res.ok) {
      setError(res.status === 401 ? 'Chưa đăng nhập' : 'Không tải được thông tin')
      setProfile(null)
      setLoading(false)
      return
    }
    const data = await res.json()
    setProfile(data)
    setNameValue(data.name ?? '')
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  async function onSubmitName(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return
    setNameMessage(null)
    setNameSaving(true)
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameValue.trim() || null }),
    })
    const data = await res.json().catch(() => ({}))
    setNameSaving(false)
    if (res.ok) {
      setProfile((p) => (p ? { ...p, name: nameValue.trim() || null } : null))
      setNameMessage('Đã cập nhật tên.')
    } else {
      setNameMessage(data.message ?? 'Cập nhật thất bại.')
    }
  }

  async function onSubmitAvatar(e: React.FormEvent) {
    e.preventDefault()
    if (!avatarFile) {
      setAvatarMessage('Chọn ảnh trước khi gửi.')
      return
    }
    setAvatarMessage(null)
    setAvatarSaving(true)
    const formData = new FormData()
    formData.append('file', avatarFile)
    const res = await fetch('/api/profile/avatar', { method: 'POST', body: formData })
    const data = await res.json().catch(() => ({}))
    setAvatarSaving(false)
    if (res.ok) {
      setProfile((p) => (p ? { ...p, avatarUrl: data.url } : null))
      setAvatarFile(null)
      setAvatarMessage('Đã đổi avatar.')
    } else {
      setAvatarMessage(data.message ?? 'Upload thất bại.')
    }
  }

  if (loading) {
    return <p className="text-zinc-500">Đang tải...</p>
  }
  if (error || !profile) {
    return (
      <p className="text-red-600 dark:text-red-400">
        {error ?? 'Không có thông tin'}
      </p>
    )
  }

  const isVip = profile.vipUntil ? new Date(profile.vipUntil) > new Date() : false

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Tài khoản</h1>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 shrink-0">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="96px"
              unoptimized
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-3xl text-zinc-500">
              👤
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            {profile.name || 'Chưa đặt tên'}
          </p>
          <p className="text-sm text-zinc-500 truncate">{profile.email}</p>
          {isVip && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium">
              VIP đến {new Date(profile.vipUntil!).toLocaleDateString('vi-VN')}
            </span>
          )}
          {profile.role === 'admin' && (
            <span className="ml-1 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-600 text-xs">
              Admin
            </span>
          )}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Đổi tên hiển thị</h2>
        <form onSubmit={onSubmitName} className="flex flex-wrap items-end gap-2">
          <label className="flex-1 min-w-[200px]">
            <span className="sr-only">Tên</span>
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              placeholder="Tên hiển thị"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
            />
          </label>
          <button
            type="submit"
            disabled={nameSaving}
            className="px-4 py-2 rounded-lg bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 font-medium disabled:opacity-50"
          >
            {nameSaving ? 'Đang lưu...' : 'Cập nhật'}
          </button>
        </form>
        {nameMessage && (
          <p className={`text-sm ${nameMessage.startsWith('Đã') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {nameMessage}
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Đổi avatar</h2>
        <form onSubmit={onSubmitAvatar} className="flex flex-wrap items-end gap-2">
          <label className="flex-1 min-w-[200px]">
            <span className="sr-only">Chọn ảnh</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => {
                const f = e.target.files?.[0]
                setAvatarFile(f ?? null)
                setAvatarMessage(null)
              }}
              className="w-full text-sm text-zinc-600 dark:text-zinc-400 file:mr-2 file:py-2 file:px-3 file:rounded file:border-0 file:bg-zinc-200 file:dark:bg-zinc-600"
            />
          </label>
          <button
            type="submit"
            disabled={avatarSaving || !avatarFile}
            className="px-4 py-2 rounded-lg bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 font-medium disabled:opacity-50"
          >
            {avatarSaving ? 'Đang tải...' : 'Đổi avatar'}
          </button>
        </form>
        {avatarMessage && (
          <p className={`text-sm ${avatarMessage.startsWith('Đã') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {avatarMessage}
          </p>
        )}
      </section>
    </div>
  )
}
