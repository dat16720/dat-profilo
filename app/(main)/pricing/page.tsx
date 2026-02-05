import { PricingCards } from '@/components/pricing/pricing-cards'

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">Chọn gói VIP</h1>
      <PricingCards />
      <p className="text-center text-sm text-zinc-500">
        Đã đăng nhập có thể dùng &quot;Kích hoạt VIP (demo)&quot; để test. Thanh toán thật (Momo, VNPay...) tích hợp sau.
      </p>
    </div>
  )
}
