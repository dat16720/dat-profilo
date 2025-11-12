# 📚 Hướng Dẫn: App Router vs Pages Router

## 🎯 Bạn đang dùng **APP ROUTER**

### Dấu hiệu nhận biết:

✅ **Có thư mục `app/`** với:

- `app/layout.tsx` - Root layout
- `app/page.tsx` - Trang chủ (`/`)
- `app/love/page.tsx` - Trang `/love`
- `app/love/layout.tsx` - Layout riêng cho `/love`

❌ **KHÔNG có thư mục `pages/`**

---

## 📁 Cấu Trúc App Router

```
app/
├── layout.tsx          → Root layout (áp dụng cho tất cả pages)
├── page.tsx            → Trang chủ: http://localhost:3000/
├── globals.css         → Global styles
├── robots.ts           → /robots.txt
├── sitemap.ts          → /sitemap.xml
└── love/
    ├── layout.tsx      → Layout riêng cho /love
    └── page.tsx        → Trang: http://localhost:3000/love
```

### Quy tắc routing:

| File Path                | URL Route             |
| ------------------------ | --------------------- |
| `app/page.tsx`           | `/`                   |
| `app/love/page.tsx`      | `/love`               |
| `app/about/page.tsx`     | `/about`              |
| `app/blog/[id]/page.tsx` | `/blog/123` (dynamic) |

---

## 🚀 Cách Xem Page `/love`

### Bước 1: Chạy Development Server

```bash
# Nếu chưa chạy, mở terminal và chạy:
yarn dev
# hoặc
npm run dev
```

### Bước 2: Mở trình duyệt

Sau khi server chạy, bạn sẽ thấy:

```
  ▲ Next.js 16.0.1
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Bước 3: Truy cập các routes

1. **Trang chủ:**

   ```
   http://localhost:3000/
   ```

2. **Trang tình yêu:**
   ```
   http://localhost:3000/love
   ```

---

## 🔍 So Sánh: App Router vs Pages Router

### App Router (Bạn đang dùng) ✅

**Cấu trúc:**

```
app/
  page.tsx          → /
  about/
    page.tsx        → /about
  blog/
    [id]/
      page.tsx      → /blog/123
```

**Đặc điểm:**

- ✅ Server Components mặc định
- ✅ Layouts lồng nhau
- ✅ Streaming & Suspense
- ✅ Metadata API
- ✅ Route Handlers (`route.ts`)
- ✅ Loading & Error boundaries

**File naming:**

- `page.tsx` = Route
- `layout.tsx` = Layout wrapper
- `loading.tsx` = Loading UI
- `error.tsx` = Error UI
- `route.ts` = API endpoint

### Pages Router (Cũ) ❌

**Cấu trúc:**

```
pages/
  index.tsx        → /
  about.tsx        → /about
  blog/
    [id].tsx       → /blog/123
```

**Đặc điểm:**

- ❌ Client Components mặc định
- ❌ Không có nested layouts
- ❌ Cần `getServerSideProps` cho SSR
- ❌ Metadata qua `Head` component

---

## 📝 Ví Dụ Cụ Thể: Page `/love`

### File: `app/love/page.tsx`

```typescript
export default function LovePage() {
  return <div>Trang tình yêu</div>;
}
```

**URL:** `http://localhost:3000/love`

### File: `app/love/layout.tsx`

```typescript
export default function LoveLayout({ children }) {
  return (
    <div>
      <header>Header riêng cho /love</header>
      {children}
    </div>
  );
}
```

**Layout này chỉ áp dụng cho `/love` và các routes con.**

---

## 🎨 Layout Hierarchy

```
app/layout.tsx (Root)
  └── app/page.tsx (/)
  └── app/love/layout.tsx (Layout riêng)
      └── app/love/page.tsx (/love)
```

**Kết quả:**

- `/` → Chỉ có root layout
- `/love` → Root layout + Love layout

---

## 🔧 Các Lệnh Quan Trọng

### Development:

```bash
yarn dev          # Chạy dev server
# Mở: http://localhost:3000
```

### Build:

```bash
yarn build        # Build production
yarn start         # Chạy production server
```

### Lint:

```bash
yarn lint         # Kiểm tra lỗi code
```

---

## 📍 Routes Hiện Tại Của Bạn

| Route          | File                | Mô tả                             |
| -------------- | ------------------- | --------------------------------- |
| `/`            | `app/page.tsx`      | Trang chủ portfolio               |
| `/love`        | `app/love/page.tsx` | Trang tình yêu với nhiều hiệu ứng |
| `/robots.txt`  | `app/robots.ts`     | Robots.txt (tự động)              |
| `/sitemap.xml` | `app/sitemap.ts`    | Sitemap (tự động)                 |

---

## 💡 Tips

1. **Tạo route mới:**

   ```
   app/
     new-page/
       page.tsx    → /new-page
   ```

2. **Dynamic routes:**

   ```
   app/
     blog/
       [id]/
         page.tsx  → /blog/123, /blog/456
   ```

3. **Route groups (không ảnh hưởng URL):**

   ```
   app/
     (marketing)/
       about/
         page.tsx  → /about (không có (marketing) trong URL)
   ```

4. **Metadata:**
   ```typescript
   // app/love/page.tsx
   export const metadata = {
     title: "Trang tình yêu",
   };
   ```

---

## ✅ Tóm Tắt

- **Bạn đang dùng:** App Router ✅
- **Cách xem `/love`:**
  1. Chạy `yarn dev`
  2. Mở `http://localhost:3000/love`
- **Cấu trúc:** `app/[route]/page.tsx` = `/[route]`

**Chúc bạn code vui vẻ! 🚀**
