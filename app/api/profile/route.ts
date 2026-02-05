import { getSession } from "@/lib/auth-utils";
import { findUserById, updateUserProfile } from "@/lib/db";
import { NextResponse } from "next/server";

/** GET: Lấy thông tin profile (user đăng nhập). */
export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }
  const user = await findUserById(session.user.id);
  if (!user) {
    return NextResponse.json(
      { message: "Không tìm thấy user" },
      { status: 404 }
    );
  }
  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    vipUntil: user.vipUntil,
    role: user.role,
  });
}

/** PATCH: Cập nhật tên (user đăng nhập). */
export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }
  let body: { name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Body JSON không hợp lệ" },
      { status: 400 }
    );
  }
  const name =
    typeof body.name === "string" ? body.name.trim() || null : undefined;
  if (name === undefined) {
    return NextResponse.json(
      { message: "Gửi field name (string) để cập nhật" },
      { status: 400 }
    );
  }
  await updateUserProfile(session.user.id, { name });
  return NextResponse.json({ ok: true });
}
