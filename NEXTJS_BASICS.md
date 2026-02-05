# Next.js Cơ Bản – Cho Người Mới

## Next.js là gì?

Next.js là **framework React** giúp bạn xây dựng web có:

- **Routing (điều hướng)**: Mỗi file trong `app/` tương ứng một URL, không cần cấu hình tay.
- **SEO**: Nội dung render trên server → Google đọc được.
- **API**: Tạo API ngay trong project (thư mục `app/api/`).

---

## Cấu trúc thư mục `app/`

| Đường dẫn file            | URL khi chạy           |
| ------------------------- | ---------------------- |
| `app/page.tsx`            | `/`                    |
| `app/about/page.tsx`      | `/about`               |
| `app/music/page.tsx`      | `/music`               |
| `app/music/[id]/page.tsx` | `/music/1`, `/music/2` |

- **page.tsx**: Trang mà user thấy khi vào URL đó.
- **layout.tsx**: Phần bao ngoài (header, footer) dùng chung cho nhiều trang.
- **[id]**: Dynamic segment – mỗi giá trị (1, 2, 3…) là một URL khác nhau.

---

## Route Groups: `(tên-thư-mục)`

Thư mục đặt trong **dấu ngoặc tròn** như `(auth)` hoặc `(main)` **không** xuất hiện trên URL.

- `app/(auth)/login/page.tsx` → URL vẫn là **/login** (không phải /auth/login).
- Dùng để nhóm nhiều trang dùng chung một layout mà không thêm segment vào đường dẫn.

---

## Server Component vs Client Component

- **Server Component** (mặc định): Chạy trên server, không dùng `useState`, `useEffect`. Tốt cho SEO, lấy data.
- **Client Component**: Khai báo `'use client'` ở đầu file. Chạy trên trình duyệt, dùng được state, form, audio.

**Ví dụ**: Trang danh sách bài hát có thể là Server Component (lấy data). Nút play, form đăng nhập nên là Client Component.

---

## Metadata & SEO

Trong `page.tsx` hoặc `layout.tsx` bạn có thể export **metadata**:

```ts
export const metadata = {
  title: "Tên trang",
  description: "Mô tả cho Google",
};
```

Với trang động (có `[id]`), dùng **generateMetadata**:

```ts
export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: `Bài hát ${params.id}` };
}
```

---

## Chạy project

```bash
yarn install   # Cài dependency (lần đầu)
yarn dev       # Chạy máy dev, mở http://localhost:3000
```

Sau khi thêm các file trong `app/`, bạn chỉ cần vào đúng URL (ví dụ `/music`, `/login`) để xem trang.
