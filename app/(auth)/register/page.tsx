import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">Đăng ký</h1>
      <RegisterForm />
      <p className="text-center">
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Về trang chủ
        </Link>
      </p>
    </div>
  )
}
