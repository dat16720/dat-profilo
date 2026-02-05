import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export type ResourceType = "image" | "video" | "raw";

export type UploadResult = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
};

function checkConfig(): void {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Thiếu CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY hoặc CLOUDINARY_API_SECRET trong .env.local"
    );
  }
}

/**
 * Upload file lên Cloudinary (ảnh, video, audio, file bất kỳ).
 * - image: ảnh (jpg, png, webp...), có thể resize.
 * - video: video (mp4, webm...), Cloudinary có thể transcode.
 * - raw: file “thô” (audio mp3/wav, pdf, v.v.) – trả về đúng file, không xử lý.
 */
export async function uploadFile(
  buffer: Buffer,
  options: {
    resourceType: ResourceType;
    folder?: string;
    publicId?: string;
    maxWidth?: number; // chỉ dùng khi resourceType === "image"
  } = { resourceType: "image" }
): Promise<UploadResult> {
  checkConfig();
  const {
    resourceType = "image",
    folder = "music-app",
    publicId,
    maxWidth,
  } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: resourceType,
        transformation:
          resourceType === "image" && maxWidth
            ? [{ width: maxWidth, crop: "limit" }]
            : undefined,
      },
      (err, result) => {
        if (err) return reject(err);
        if (!result || !result.secure_url) {
          return reject(new Error("Upload không trả về URL"));
        }
        const res = result as {
          secure_url: string;
          public_id: string;
          width?: number;
          height?: number;
          duration?: number;
          format?: string;
        };
        resolve({
          url: res.secure_url,
          publicId: res.public_id,
          width: res.width,
          height: res.height,
          duration: res.duration,
          format: res.format,
        });
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Upload ảnh (wrapper: resourceType = "image").
 */
export async function uploadImage(
  buffer: Buffer,
  options: {
    folder?: string;
    publicId?: string;
    maxWidth?: number;
  } = {}
): Promise<UploadResult> {
  return uploadFile(buffer, { ...options, resourceType: "image" });
}

/**
 * Upload video (mp4, webm, ...).
 */
export async function uploadVideo(
  buffer: Buffer,
  options: { folder?: string; publicId?: string } = {}
): Promise<UploadResult> {
  return uploadFile(buffer, { ...options, resourceType: "video" });
}

/**
 * Upload audio / file thô (mp3, wav, pdf, ...) – Cloudinary trả về đúng file, không chuyển mã.
 */
export async function uploadAudio(
  buffer: Buffer,
  options: { folder?: string; publicId?: string } = {}
): Promise<UploadResult> {
  return uploadFile(buffer, { ...options, resourceType: "raw" });
}

/**
 * Upload file “raw” bất kỳ (audio, doc, ...).
 */
export async function uploadRaw(
  buffer: Buffer,
  options: { folder?: string; publicId?: string } = {}
): Promise<UploadResult> {
  return uploadFile(buffer, { ...options, resourceType: "raw" });
}

/**
 * Xóa file trên Cloudinary (ảnh, video, raw đều dùng destroy với resource_type).
 */
export async function deleteFile(
  publicId: string,
  resourceType: ResourceType = "image"
): Promise<void> {
  checkConfig();
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

/** @deprecated Dùng deleteFile(publicId, 'image') */
export async function deleteImage(publicId: string): Promise<void> {
  return deleteFile(publicId, "image");
}

/**
 * Kiểm tra đã cấu hình Cloudinary chưa.
 */
export function isCloudinaryConfigured(): boolean {
  return !!(cloudName && apiKey && apiSecret);
}
