import { requireAdmin } from "@/lib/auth-utils";
import { UserModel } from "@/lib/db/models/User";
import { dbConnect } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

type UserLean = {
  _id: { toString: () => string };
  email: string;
  name?: string | null;
  role?: string;
  vipUntil?: Date | null;
  createdAt?: Date;
};

/** GET: Danh sách user (chỉ admin). */
export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Chỉ admin mới xem được." },
      { status: 403 }
    );
  }

  try {
    await dbConnect();
    const users = (await UserModel.find()
      .select("email name role vipUntil createdAt")
      .sort({ createdAt: -1 })
      .lean()) as unknown as UserLean[];

    const list = users.map((u) => ({
      id: u._id.toString(),
      email: u.email,
      name: u.name ?? null,
      role: u.role ?? "user",
      vipUntil: u.vipUntil ? new Date(u.vipUntil).toISOString() : null,
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null,
    }));

    return NextResponse.json(list);
  } catch (err) {
    console.error("[GET /api/admin/users]", err);
    return NextResponse.json({ message: "Lỗi server." }, { status: 500 });
  }
}
