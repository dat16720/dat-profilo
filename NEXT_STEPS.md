# Các bước tiếp theo – Music App

Thứ tự gợi ý sau khi đã có: Auth, VIP, Stream, MongoDB user, Cloudinary.

---

## 1. Bài hát lưu trong MongoDB (ưu tiên)

**Hiện tại:** Danh sách bài hát nằm trong `lib/music-data.ts` (mảng tĩnh).

**Làm tiếp:**

- Tạo model **Song** trong MongoDB (title, artist, duration, demoDuration, coverUrl từ Cloudinary).
- API: `GET /api/music` (danh sách), `GET /api/music/[id]` (chi tiết).
- Trang `/music` và `/music/[id]` lấy data từ API/DB thay vì `lib/music-data.ts`.
- Stream vẫn dùng `/api/music/[id]/stream` (đọc file theo id; file có thể lưu path hoặc URL).

**Lợi ích:** Thêm/sửa bài không cần sửa code, có thể gắn ảnh bìa (Cloudinary).

---

## 2. Trang Profile user

- Route: `/profile` (cần đăng nhập).
- Hiển thị: email, tên, avatar, trạng thái VIP (hết hạn ngày nào).
- Cho phép: đổi tên, upload avatar (gọi `/api/upload` → lưu URL vào User trong MongoDB).
- Model User cần thêm field `image` (optional) lưu URL ảnh Cloudinary.

---

## 3. Bảo vệ route (middleware)

- Trang chỉ dành cho user đã đăng nhập: `/profile`, có thể `/pricing` (nếu muốn bắt buộc đăng nhập trước khi xem giá).
- Dùng Next.js middleware: kiểm tra session, nếu chưa đăng nhập thì redirect về `/login?callbackUrl=...`.

---

## 4. Quản lý bài hát (admin đơn giản)

- Route: `/admin/songs` (chỉ user đăng nhập, sau có thể thêm role admin).
- CRUD: thêm bài mới (title, artist, duration, upload ảnh bìa), sửa, xóa (soft delete hoặc xóa hẳn).
- File nhạc: upload lên Cloudinary (dạng raw/audio) hoặc lưu vào storage khác, lưu URL vào Song; stream route đọc từ URL đó.

---

## 5. Thanh toán thật (Momo / VNPay / Stripe)

- Trang `/pricing`: thay nút “Kích hoạt VIP (demo)” bằng “Thanh toán” → chuyển đến cổng thanh toán.
- Webhook: khi thanh toán thành công, gọi API nội bộ để cập nhật `vipUntil` cho user (từ MongoDB).
- Cần đăng ký merchant Momo/VNPay hoặc Stripe và cấu hình webhook URL.

---

## 6. Trải nghiệm nghe nhạc

- Tìm kiếm / filter trên trang `/music` (theo tên bài, ca sĩ).
- Playlist / Yêu thích: model (ví dụ Favourite hoặc Playlist), user bấm “Thêm vào yêu thích” → lưu vào MongoDB.
- Trang “Bài đã thích” hoặc “Playlist” của user.

---

Bạn có thể làm lần lượt: **1 → 2 → 3 → 4 → 5 → 6**. Nếu muốn, tôi có thể viết chi tiết code cho **Bước 1 (Bài hát từ MongoDB)** trước.
