import { requireAdmin } from "@/lib/auth-utils";
import Link from "next/link";

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Tổng quan Admin</h1>
      <p className="text-zinc-500">
        Bạn đang đăng nhập với quyền <strong>admin</strong>. Chỉ user có role admin mới vào được khu vực này.
      </p>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/users" className="text-blue-600 dark:text-blue-400 hover:underline">
            Quản lý user
          </Link>
          <span className="text-zinc-500 text-sm ml-2">– Xem danh sách, đổi role (user/admin)</span>
        </li>
        <li>
          <Link href="/admin/upload" className="text-blue-600 dark:text-blue-400 hover:underline">
            Upload
          </Link>
          <span className="text-zinc-500 text-sm ml-2">– Upload ảnh, video, audio lên Cloudinary</span>
        </li>
        <li>
          <Link href="/admin/songs" className="text-blue-600 dark:text-blue-400 hover:underline">
            Thêm bài hát
          </Link>
          <span className="text-zinc-500 text-sm ml-2">– Tạo bài mới, dán URL audio từ Upload để phát trên web</span>
        </li>
      </ul>
    </div>
  );
}
