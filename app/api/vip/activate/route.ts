import { auth } from "@/lib/auth";
import { findUserById, setVipUntil } from "@/lib/db";
import { NextResponse } from "next/server";

const PLANS: Record<string, { months: number }> = {
  monthly: { months: 1 },
  yearly: { months: 12 },
};

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const plan = body.plan === "yearly" ? "yearly" : "monthly";
  const config = PLANS[plan];
  const user = await findUserById(session.user.id);
  if (!user) {
    return NextResponse.json(
      { message: "User không tồn tại" },
      { status: 404 }
    );
  }
  const until = new Date();
  until.setMonth(until.getMonth() + config.months);
  await setVipUntil(user.id, until.toISOString());
  return NextResponse.json({ ok: true, vipUntil: until.toISOString() });
}
