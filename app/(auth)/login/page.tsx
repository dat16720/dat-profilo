import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>
      <Suspense fallback={<div className="animate-pulse h-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />}>
        <LoginForm />
      </Suspense>
      <p className="text-center">
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Về trang chủ
        </Link>
      </p>
    </div>
  )
}
