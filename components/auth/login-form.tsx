'use client'

import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/music'
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(data: LoginInput) {
    setServerError(null)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (result?.error) {
      setServerError('Email hoặc mật khẩu không đúng.')
      return
    }
    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded">
          {serverError}
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
      <p className="text-center text-sm text-zinc-500">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
          Đăng ký
        </Link>
      </p>
    </form>
  )
}
