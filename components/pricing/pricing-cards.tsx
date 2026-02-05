'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const PLANS = [
  {
    id: 'monthly',
    name: '1 tháng',
    price: '49.000đ',
    features: ['Nghe full toàn bộ bài hát', 'Không quảng cáo'],
  },
  {
    id: 'yearly',
    name: '1 năm',
    price: '399.000đ',
    features: ['Nghe full toàn bộ bài hát', 'Tiết kiệm hơn 30%'],
  },
] as const

export function PricingCards() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleActivate(planId: string) {
    setError(null)
    setLoadingId(planId)
    try {
      const res = await fetch('/api/vip/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message ?? 'Kích hoạt thất bại')
        return
      }
      await update()
      router.refresh()
    } finally {
      setLoadingId(null)
    }
  }

  if (status === 'loading') {
    return <p className="text-center text-zinc-500">Đang tải...</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {error && (
        <p className="col-span-full text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 space-y-4"
        >
          <h2 className="font-semibold text-lg">{plan.name}</h2>
          <p className="text-2xl font-bold">{plan.price}</p>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            {plan.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {session ? (
            <button
              type="button"
              disabled={loadingId !== null}
              onClick={() => handleActivate(plan.id)}
              className="w-full py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loadingId === plan.id ? 'Đang xử lý...' : 'Kích hoạt VIP (demo)'}
            </button>
          ) : (
            <Link
              href="/login"
              className="block text-center py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90"
            >
              Đăng nhập để mua
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
