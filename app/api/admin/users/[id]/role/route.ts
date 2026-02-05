import { requireAdmin } from "@/lib/auth-utils";
import { setUserRole } from "@/lib/db";
import { USER_ROLES, type UserRole } from "@/lib/db/models/User";
import { NextResponse } from "next/server";

/** PATCH: Đổi role user (chỉ admin). Body: { role: "user" | "admin" } */
export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Chỉ admin mới thực hiện được." },
      { status: 403 }
    );
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "Thiếu id user." }, { status: 400 });
  }

  let body: { role?: string };
  try {
    body = await _req.json();
  } catch {
    return NextResponse.json(
      { message: "Body JSON không hợp lệ." },
      { status: 400 }
    );
  }

  const role = body.role;
  if (!role || !USER_ROLES.includes(role as UserRole)) {
    return NextResponse.json(
      { message: 'role phải là "user" hoặc "admin".' },
      { status: 400 }
    );
  }

  try {
    await setUserRole(id, role as UserRole);
    return NextResponse.json({ ok: true, role });
  } catch (err) {
    console.error("[PATCH /api/admin/users/[id]/role]", err);
    return NextResponse.json({ message: "Lỗi server." }, { status: 500 });
  }
}
