# Phân quyền Admin / User

## Role

- **user**: Mặc định. Xem nhạc, mua VIP, profile (khi có).
- **admin**: Vào được `/admin`, gọi API `/api/admin/*`, xem danh sách user, đổi role.

## Cấu hình admin đầu tiên

**Cách 1 – Dùng biến môi trường (khuyến nghị)**

Trong `.env.local` thêm:

```env
ADMIN_EMAIL=your-admin@example.com
```

User **đăng ký** với đúng email này sẽ được gán role **admin**. Chỉ có hiệu lực khi **tạo tài khoản mới** (đăng ký), không đổi role user cũ.

**Cách 2 – Sửa trực tiếp trong MongoDB**

Vào MongoDB Atlas → Collections → `users` → tìm document user cần làm admin → sửa field `role` thành `"admin"`. User đó cần **đăng xuất rồi đăng nhập lại** để session có role mới.

## Trong code

**Server (API, layout, page):**

```ts
import { getSession, isAdmin, requireAdmin } from "@/lib/auth-utils";

// Đã đăng nhập và là admin?
const session = await getSession();
if (isAdmin(session)) {
  // hiển thị link Admin, cho vào /admin
}

// Bắt buộc admin (trả về null nếu không phải admin)
const admin = await requireAdmin();
if (!admin) {
  return NextResponse.json({ message: "Chỉ admin." }, { status: 403 });
  // hoặc redirect("/login") / redirect("/music")
}
```

**Client (header, nav):**

Session từ `useSession()` có `user.role`. Ví dụ chỉ hiện link Admin khi `session?.user?.role === "admin"` (đã làm trong `MainNav`).

## Route đã bảo vệ

- **Layout `/admin`**: Chưa đăng nhập → redirect `/login?callbackUrl=/admin`. Đã đăng nhập nhưng không phải admin → redirect `/music`.
- **GET /api/admin/users**: Trả 403 nếu không phải admin.
- **PATCH /api/admin/users/[id]/role**: Chỉ admin. Body `{ "role": "user" | "admin" }` để đổi role user (theo `id`).

## Đổi role user qua API

```bash
# Đổi user có id = xxx thành admin (gửi khi đã đăng nhập bằng tài khoản admin)
curl -X PATCH http://localhost:3000/api/admin/users/USER_ID_HERE/role \
  -H "Content-Type: application/json" \
  -H "Cookie: ..." \
  -d '{"role":"admin"}'
```

Thay `USER_ID_HERE` bằng `_id` của user trong MongoDB (ObjectId dạng string).
