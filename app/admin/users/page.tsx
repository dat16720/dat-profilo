import { requireAdmin } from "@/lib/auth-utils";
import { UserModel } from "@/lib/db/models/User";
import { dbConnect } from "@/lib/db/mongodb";
import Link from "next/link";

export const dynamic = "force-dynamic";

type UserRow = {
  _id: { toString: () => string }
  email: string
  name?: string | null
  role?: string
  vipUntil?: Date | null
  createdAt?: Date
}

export default async function AdminUsersPage() {
  const admin = await requireAdmin();
  if (!admin) return null;

  await dbConnect();
  const docs = (await UserModel.find()
    .select("email name role vipUntil createdAt")
    .sort({ createdAt: -1 })
    .lean()) as unknown as UserRow[];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Quản lý user</h1>
      <p className="text-zinc-500 text-sm">
        Chỉ admin mới xem được trang này. Đổi role user trong DB hoặc qua API (sẽ thêm).
      </p>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">VIP đến</th>
              <th className="px-4 py-2">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d._id.toString()} className="border-t border-zinc-200 dark:border-zinc-700">
                <td className="px-4 py-2">{d.email}</td>
                <td className="px-4 py-2">{d.name ?? "–"}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      d.role === "admin"
                        ? "text-amber-600 dark:text-amber-400 font-medium"
                        : ""
                    }
                  >
                    {d.role ?? "user"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {d.vipUntil
                    ? new Date(d.vipUntil).toLocaleDateString("vi-VN")
                    : "–"}
                </td>
                <td className="px-4 py-2">
                  {d.createdAt
                    ? new Date(d.createdAt).toLocaleDateString("vi-VN")
                    : "–"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-zinc-500">
        <Link href="/admin" className="hover:underline">
          ← Về tổng quan Admin
        </Link>
      </p>
    </div>
  );
}
