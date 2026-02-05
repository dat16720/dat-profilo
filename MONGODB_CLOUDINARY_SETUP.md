# Cấu hình MongoDB và Cloudinary

## 1. Tạo file `.env.local`

Sao chép từ `.env.example` và điền giá trị thật (**không commit** file này):

```env
AUTH_SECRET=your-secret-at-least-32-chars

# MongoDB Atlas
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.xxxxx.mongodb.net/DATABASE?retryWrites=true&w=majority

# Cloudinary (Dashboard → Settings → API Keys)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

- **MONGODB_URI**: Connection string từ MongoDB Atlas (Connect → Drivers). Thay `USER`, `PASSWORD`, và tên cluster/database.
- **CLOUDINARY_CLOUD_NAME**: Trong Cloudinary Dashboard, góc trên bên trái (ví dụ `dxxxxxx`).
- **CLOUDINARY_API_KEY** và **CLOUDINARY_API_SECRET**: Lấy ở Settings → API Keys.

## 2. MongoDB

- Đã dùng **Mongoose**, kết nối được cache theo process (phù hợp Next.js).
- Model **User**: `email`, `passwordHash` (bcrypt), `name`, `vipUntil` (Date).
- Collection mặc định: `users` (tên model viết thường + số nhiều).

## 3. Cloudinary

- **Upload ảnh**: Gọi API `POST /api/upload` (cần đăng nhập).
  - Body: `FormData` với key `file` hoặc `image` (file ảnh).
  - Tùy chọn: `folder` (mặc định `music-app`).
  - Trả về: `{ url, publicId, width?, height? }`.
- Trong code server: `import { uploadImage, deleteImage, isCloudinaryConfigured } from '@/lib/cloudinary'`.

## 4. Bảo mật

**Quan trọng**: Nếu bạn đã từng gửi mật khẩu hoặc API key trong chat/email:

1. **MongoDB**: Đổi mật khẩu user trong Atlas (Database Access → Edit user).
2. **Cloudinary**: Tạo lại API key/secret (Settings → API Keys) và cập nhật `.env.local`.

Luôn dùng `.env.local` cho secret; file này đã được liệt kê trong `.gitignore`.
