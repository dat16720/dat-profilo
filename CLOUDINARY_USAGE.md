# Cách dùng Cloudinary (Image, Audio, Video, Raw)

Cloudinary hỗ trợ **ảnh**, **video** và **raw** (audio, file bất kỳ). Đã cấu hình `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` trong `.env.local` là dùng được.

---

## 1. Upload qua API (đã đăng nhập)

**Endpoint:** `POST /api/upload`

**Body:** `FormData` với:

| Key                 | Bắt buộc                     | Mô tả                                                                  |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `file` hoặc `image` | Có                           | File cần upload                                                        |
| `type`              | Không (mặc định `image`)     | Loại: `image`, `video`, `audio`                                        |
| `folder`            | Không (mặc định `music-app`) | Thư mục trên Cloudinary (ví dụ `music-app/covers`, `music-app/tracks`) |

### Ví dụ: Upload ảnh (bìa bài hát, avatar)

```js
const form = new FormData();
form.append("file", fileInput.files[0]);
form.append("type", "image");
form.append("folder", "music-app/covers");

const res = await fetch("/api/upload", {
  method: "POST",
  body: form,
});
const { url, publicId } = await res.json();
// url = https://res.cloudinary.com/xxx/... → dùng làm coverUrl, avatar...
```

**Ảnh:** Cho phép jpeg, png, webp, gif, svg.

### Ví dụ: Upload audio (MP3, WAV)

```js
const form = new FormData();
form.append("file", audioFile); // File MP3, WAV...
form.append("type", "audio");
form.append("folder", "music-app/tracks");

const res = await fetch("/api/upload", {
  method: "POST",
  body: form,
});
const { url, publicId } = await res.json();
// url = link trực tiếp file nhạc trên Cloudinary → lưu vào DB (Song.audioUrl chẳng hạn)
```

**Audio:** Cho phép mp3, wav, ogg, webm (raw, Cloudinary không chuyển mã).

### Ví dụ: Upload video

```js
form.append("type", "video");
form.append("folder", "music-app/videos");
```

**Video:** Cho phép mp4, webm, mov, avi.

**Response** (chung): `{ url, publicId, width?, height?, duration?, format?, type }`.

---

## 2. Dùng trực tiếp trong code (Server)

Khi xử lý ở server (API route, Server Action):

```ts
import {
  uploadImage,
  uploadVideo,
  uploadAudio,
  uploadRaw,
  uploadFile,
  deleteFile,
  type ResourceType,
} from "@/lib/cloudinary";

// Ảnh
const img = await uploadImage(buffer, { folder: "covers", maxWidth: 1200 });

// Audio (mp3, wav...)
const audio = await uploadAudio(buffer, { folder: "tracks" });

// Video
const video = await uploadVideo(buffer, { folder: "videos" });

// File bất kỳ (raw)
const raw = await uploadRaw(buffer, { folder: "docs" });

// Hoặc dùng chung một hàm
const result = await uploadFile(buffer, {
  resourceType: "audio", // "image" | "video" | "raw"
  folder: "music-app/tracks",
});

// Xóa (phải đúng resource_type)
await deleteFile(publicId, "image");
await deleteFile(publicId, "raw"); // audio đã upload dạng raw
await deleteFile(publicId, "video");
```

---

## 3. Lưu URL vào MongoDB

- **Ảnh bìa bài hát:** Upload `type=image` → lấy `url` → lưu vào `Song.coverUrl`.
- **File nhạc:** Upload `type=audio` → lấy `url` → lưu vào `Song.audioUrl` (hoặc `demoUrl` / `fullUrl` tùy bạn thiết kế). Stream route có thể redirect tới `url` thay vì đọc file từ `public/audio/`.
- **Video:** Tương tự, lưu `url` vào model tương ứng.

---

## 4. Tóm tắt resource_type

| type (API) | resource_type (Cloudinary) | Dùng cho                              |
| ---------- | -------------------------- | ------------------------------------- |
| `image`    | image                      | Ảnh (bìa, avatar, banner...)          |
| `video`    | video                      | Video (mp4, webm...)                  |
| `audio`    | raw                        | Audio (mp3, wav...) – trả về file gốc |

Như vậy Cloudinary vừa dùng được cho **sound (audio)**, vừa **image**, **video** và file raw khác; chỉ cần gửi đúng `type` và đúng loại file khi gọi `POST /api/upload`.
