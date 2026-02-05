import { UploadForm } from "@/components/admin/upload-form";
import Link from "next/link";

export default function AdminUploadPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Upload file (chỉ Admin)</h1>
      <p className="text-zinc-500 text-sm">
        Chỉ tài khoản admin mới vào được trang này và gọi API upload. User thường sẽ nhận 403.
      </p>
      <UploadForm />
      <p className="text-sm">
        <Link href="/admin" className="text-zinc-500 hover:underline">
          ← Về tổng quan Admin
        </Link>
      </p>
    </div>
  );
}
