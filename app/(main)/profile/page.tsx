import { ProfileForm } from '@/components/profile/profile-form'
import { getSession } from '@/lib/auth-utils'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tài khoản',
  description: 'Thông tin tài khoản và cài đặt cá nhân.',
}

export default async function ProfilePage() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login?callbackUrl=/profile')
  }
  return <ProfileForm />
}
