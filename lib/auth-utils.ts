import { auth } from "@/lib/auth";

export type SessionUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
  vipUntil?: string | null;
  role?: "user" | "admin";
};

/** Trả về session hiện tại (server-side). */
export async function getSession() {
  return auth();
}

/** Kiểm tra user hiện tại có phải VIP (còn hạn) không. */
export function isVip(session: { user?: SessionUser } | null): boolean {
  if (!session?.user) return false;
  const vipUntil = session.user.vipUntil;
  return vipUntil ? new Date(vipUntil) > new Date() : false;
}

/** Kiểm tra user hiện tại có phải admin không. */
export function isAdmin(session: { user?: SessionUser } | null): boolean {
  return session?.user?.role === "admin";
}

/** Kết quả khi requireAdmin() thành công (đã đăng nhập + role admin). */
export type AdminResult = {
  session: { user: SessionUser };
  user: SessionUser;
};

/**
 * Trả về session nếu đã đăng nhập và là admin; null nếu không.
 * Dùng trong API/layout: nếu null thì trả 403 hoặc redirect.
 */
export async function requireAdmin(): Promise<AdminResult | null> {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") return null;
  return { session: { user: session.user }, user: session.user };
}
