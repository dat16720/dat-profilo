# 🎵 Hướng Dẫn Xây Dựng Ứng Dụng Web Âm Nhạc (Next.js)

Hướng dẫn từng bước nhỏ, dành cho người mới bắt đầu với Next.js.

## ✅ Đã triển khai trong repo

Các bước dưới đây **đã được làm trong project**:

- **Bước 1.1–1.2**: Đã cài package và tạo cấu trúc thư mục.
- **Bước 2**: SEO (metadata, JSON-LD từng bài, sitemap có /music, /music/[id], /pricing, /login, /register).
- **Bước 3**: NextAuth Credentials, trang Login/Register với react-hook-form + zod, API POST /api/auth/register.
- **Bước 4**: `getSession()` / `isVip()`, header hiển thị email + badge VIP + Đăng xuất.
- **Bước 5**: Trang Pricing, API POST /api/vip/activate (kích hoạt VIP demo khi đã đăng nhập).
- **Bước 6**: GET /api/music/[id]/stream (demo vs full theo VIP), component MusicPlayer trên trang bài hát.

**Chạy thử**: Tạo file `.env.local` với `AUTH_SECRET=...` (≥ 32 ký tự), chạy `yarn install` rồi `yarn dev`. Thêm file nhạc vào `public/audio/` (xem `public/audio/README.txt`).

---

## 📌 Tổng Quan Ứng Dụng

| Tính năng               | Mô tả ngắn                                                       |
| ----------------------- | ---------------------------------------------------------------- |
| **SEO**                 | Google index trang, bài hát, nghệ sĩ; meta, sitemap, JSON-LD     |
| **Đăng ký / Đăng nhập** | User tạo tài khoản, đăng nhập (email + mật khẩu hoặc OAuth)      |
| **Phân quyền**          | Khách: nghe demo; User đã đăng nhập: xem profile; VIP: nghe full |
| **Gói VIP**             | Mua gói (tháng/năm) để nghe toàn bộ nhạc không giới hạn          |
| **Nghe nhạc**           | Demo (30s–1 phút) cho free; full bản cho VIP                     |

---

## 🧩 Next.js App Router – Giải Thích Nhanh

- **`app/`**: Mỗi thư mục = 1 phần URL.
  - `app/page.tsx` → `/`
  - `app/login/page.tsx` → `/login`
  - `app/music/[id]/page.tsx` → `/music/123`
- **`layout.tsx`**: Layout chung cho tất cả trang con (header, footer, sidebar).
- **`page.tsx`**: Nội dung chính của route đó.
- **Server Component (mặc định)**: Chạy trên server, tốt cho SEO, không dùng `useState`/`useEffect`.
- **Client Component (`'use client'`)**: Chạy trên trình duyệt, dùng cho form, audio player, đăng nhập.

---

## 📋 Các Bước Thực Hiện (Chia Nhỏ)

### Giai đoạn 1: Chuẩn bị & cấu trúc

#### Bước 1.1 – Cài thêm thư viện cần thiết

```bash
yarn add zustand next-auth@beta zod react-hook-form @hookform/resolvers
```

- **zustand**: Quản lý state (user đã đăng nhập chưa, có phải VIP không).
- **next-auth**: Đăng nhập/đăng ký (email, OAuth).
- **zod** + **react-hook-form** + **@hookform/resolvers**: Validate form (login, register).

**Giải thích**: Next.js chỉ là “khung”; đăng nhập và form cần thư viện. Dùng từng bước sẽ dễ hiểu hơn.

---

#### Bước 1.2 – Tạo cấu trúc thư mục

```
app/
├── (auth)/                    # Nhóm route auth (layout chung)
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── register/page.tsx
├── (main)/                    # Trang nhạc + pricing (layout có header)
│   ├── layout.tsx
│   ├── music/
│   │   ├── page.tsx           # Danh sách bài hát
│   │   └── [id]/page.tsx      # Chi tiết 1 bài (SEO từng bài)
│   └── pricing/page.tsx       # Trang mua gói VIP
lib/
├── auth.ts                    # Cấu hình NextAuth
├── auth-utils.ts              # Hàm kiểm tra đăng nhập, VIP
└── validations/               # Schema Zod (login, register)
components/
├── auth/                      # Form đăng nhập, đăng ký
├── music/                     # Player, danh sách bài
└── layout/                    # Header có nút Login/VIP
```

**Giải thích**:

- `(auth)` và `(main)` là **Route Groups**: dùng ngoặc tròn để nhóm route mà **không** thêm segment vào URL.
  - `/login` vẫn là `/login`, không phải `/auth/login`.
- `[id]` là **Dynamic Route**: mỗi bài hát một ID → URL `/music/1`, `/music/2`.
- Trong repo hiện tại: trang chủ `/` vẫn là portfolio; phần âm nhạc bắt đầu từ **/music**, **/pricing**. Nếu bạn muốn trang chủ là “Trang chủ Music”, có thể thay nội dung `app/page.tsx` bằng nội dung giống `(main)` (đã có mẫu trong hướng dẫn).

---

### Giai đoạn 2: SEO cho âm nhạc

#### Bước 2.1 – Meta & JSON-LD cho trang chủ (âm nhạc)

- Trong `app/layout.tsx` (hoặc layout của trang chủ):
  - `title`, `description`, `keywords` hướng đến “web nghe nhạc”.
  - Thêm **JSON-LD** kiểu `WebSite` hoặc `MusicGroup`/`MusicRecording` (tùy bạn đang làm “trang chủ” hay “trang bài hát”).

**Giải thích**: Google đọc meta và JSON-LD để hiển thị snippet đẹp, có thể hiển thị bài hát trong kết quả tìm kiếm.

#### Bước 2.2 – SEO từng bài hát (trang `/music/[id]`)

- Trong `app/music/[id]/page.tsx`:
  - Dùng `generateMetadata({ params })` để trả về `title`, `description`, `openGraph` theo từng bài (tên bài, ca sĩ).
  - Thêm JSON-LD `MusicRecording` (tên bài, artist, duration, url).

**Giải thích**: Mỗi URL bài hát có meta riêng → Google index từng bài, dễ tìm theo tên bài/ca sĩ.

#### Bước 2.3 – Sitemap & robots

- Cập nhật `app/sitemap.ts`: thêm các URL quan trọng: `/`, `/music`, `/music/1`, `/music/2`, ... (có thể lấy từ API hoặc file/database).
- `app/robots.ts`: giữ cho phép index các trang công khai (trang chủ, bài hát, pricing), có thể chặn `/api` hoặc trang admin nếu sau này có.

---

### Giai đoạn 3: Đăng ký & Đăng nhập

#### Bước 3.1 – Cấu hình NextAuth

- Tạo `lib/auth.ts`:
  - Cấu hình **Credentials** (email + password) và/hoặc **Google/GitHub** (OAuth).
  - **Callbacks**: trong `jwt` và `session` thêm thông tin như `userId`, `isVip` (lấy từ database sau).

**Giải thích**: NextAuth tạo session (phiên đăng nhập). Mỗi request có thể biết “ai đang đăng nhập” qua session.

#### Bước 3.2 – Trang đăng nhập `/login`

- `app/(auth)/login/page.tsx`:
  - Form email + mật khẩu.
  - Dùng `react-hook-form` + `zod` để validate.
  - Gọi `signIn('credentials', { email, password })` từ NextAuth.
  - Sau khi thành công → redirect về `/` hoặc `/music`.

#### Bước 3.3 – Trang đăng ký `/register`

- `app/(auth)/register/page.tsx`:
  - Form email, mật khẩu, xác nhận mật khẩu.
  - Validate bằng zod.
  - Gửi API (hoặc Server Action) để **tạo user** trong database (bước sau sẽ nối DB).
  - Sau khi tạo xong → redirect sang `/login` hoặc tự đăng nhập luôn.

**Giải thích**: Đăng ký = tạo bản ghi user; đăng nhập = kiểm tra email/password và tạo session.

---

### Giai đoạn 4: Phân quyền (Role / VIP)

#### Bước 4.1 – Khái niệm

- **Khách (chưa đăng nhập)**: Chỉ xem trang chủ, danh sách bài, nghe **demo**.
- **User đã đăng nhập**: Có profile, lịch sử nghe (sau này), vẫn nghe **demo** nếu chưa mua VIP.
- **User VIP**: Nghe **full** toàn bộ bài.

#### Bước 4.2 – Lưu “VIP” ở đâu?

- Trong database: bảng `users` có cột `vipUntil` (ngày hết hạn VIP) hoặc bảng `subscriptions`.
- Trong session: NextAuth callback thêm `isVip` (và `vipUntil`) vào session từ DB.

#### Bước 4.3 – Kiểm tra quyền trong code

- Tạo `lib/auth-utils.ts`:
  - `getSession()` (NextAuth) → có session = đã đăng nhập.
  - Kiểm tra `session.user.vipUntil > new Date()` → VIP còn hiệu lực.
- Trong component hoặc API:
  - Nếu **không** VIP → chỉ cho phát **demo** (đoạn 30s–1 phút);
  - Nếu VIP → trả về file **full** hoặc stream full.

**Giải thích**: Mỗi request đều kiểm tra session; từ session biết có phải VIP hay không → quyết định trả về demo hay full.

---

### Giai đoạn 5: Mua gói VIP

#### Bước 5.1 – Trang bảng giá `/pricing`

- Liệt kê các gói: ví dụ “1 tháng”, “1 năm”, giá.
- Nút “Mua” → chuyển đến bước thanh toán (cổng thanh toán VN: Momo, VNPay, Stripe...).

#### Bước 5.2 – Thanh toán (đơn giản hóa lúc đầu)

- Chưa cần tích hợp thật: có thể có nút “Mua demo” → ghi vào DB là user này VIP đến ngày X (test).
- Sau này: gọi API Momo/VNPay/Stripe → webhook cập nhật `vipUntil` khi thanh toán thành công.

**Giải thích**: VIP = đánh dấu trong DB + phản ánh vào session; thanh toán chỉ là cách “kích hoạt” VIP.

---

### Giai đoạn 6: Nghe nhạc – Demo vs Full

#### Bước 6.1 – File nhạc

- Mỗi bài có 2 file (hoặc 1 file full + cắt demo ở backend):
  - **Demo**: 30s–1 phút (hoặc 1 file mp3 ngắn).
  - **Full**: bản đầy đủ.

#### Bước 6.2 – API phát nhạc

- Route API ví dụ: `GET /api/music/[id]/stream`.
  - Kiểm tra session + VIP.
  - Nếu VIP → stream file **full**.
  - Nếu không VIP → stream file **demo** hoặc trả về range (bytes) chỉ đoạn đầu (HTTP Range request).

#### Bước 6.3 – Player trên trang

- Component dùng thẻ `<audio>` hoặc thư viện (react-h5-audio-player, v.v.).
- Source `src` lấy từ API trên (có token/session để phân quyền).
- UI: hiển thị “Demo” / “VIP” để user biết đang nghe bản nào.

**Giải thích**: Trình duyệt chỉ cần URL phát; URL đó do server kiểm tra quyền rồi trả về đúng file (demo/full).

---

## 🗂 Thứ Tự Làm Đề Xuất

1. **Cấu trúc thư mục** (1.2) và **cài package** (1.1).
2. **NextAuth** (3.1) + **Login/Register** (3.2, 3.3) – có thể dùng dữ liệu giả trong memory trước.
3. **Auth utils** (4.2, 4.3) và **gắn VIP vào session**.
4. **Trang pricing** (5.1) + logic “mua demo” để set VIP (5.2).
5. **API stream nhạc** (6.2) + **player** (6.3).
6. **SEO** (2.1, 2.2, 2.3): meta, JSON-LD, sitemap từng bài.

---

## 📁 File Bạn Sẽ Tạo/Chỉnh Từng Bước

| Bước | File / Việc                                                                  |
| ---- | ---------------------------------------------------------------------------- |
| 1.1  | `package.json` – chạy yarn add                                               |
| 1.2  | Tạo `app/(auth)/`, `app/(main)/`, `lib/auth.ts`, `lib/auth-utils.ts` (khung) |
| 2.x  | `app/layout.tsx`, `app/music/[id]/page.tsx`, `app/sitemap.ts`                |
| 3.x  | `lib/auth.ts` (đầy đủ), `app/(auth)/login/page.tsx`, `register/page.tsx`     |
| 4.x  | `lib/auth-utils.ts`, callbacks trong `lib/auth.ts`                           |
| 5.x  | `app/(main)/pricing/page.tsx`, API hoặc Action “kích hoạt VIP”               |
| 6.x  | `app/api/music/[id]/stream/route.ts`, component player                       |

---

## 🔜 Bước Tiếp Theo Cụ Thể

Bạn có thể bắt đầu bằng:

1. **Bước 1.1**: Chạy lệnh `yarn add ...` ở trên.
2. **Bước 1.2**: Tạo các thư mục và file rỗng/cơ bản (layout, page) cho `(auth)` và `(main)`.

Sau khi xong 1.1 và 1.2, bạn nói “đã xong” hoặc “làm tiếp bước 2”, mình sẽ hướng dẫn chi tiết từng file (code mẫu) cho **Bước 2 (SEO)** hoặc **Bước 3 (Đăng nhập)** tùy bạn chọn.

---

_Tài liệu này nằm trong repo: `MUSIC_APP_GUIDE.md`._
