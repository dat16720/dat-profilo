import { requireAdmin } from "@/lib/auth-utils";
import {
  uploadAudio,
  uploadImage,
  uploadVideo,
  type ResourceType,
} from "@/lib/cloudinary";
import { NextResponse } from "next/server";

const ALLOWED: Record<string, { resourceType: ResourceType; types: string[] }> =
  {
    image: {
      resourceType: "image",
      types: [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/svg+xml",
      ],
    },
    video: {
      resourceType: "video",
      types: ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"],
    },
    audio: {
      resourceType: "raw",
      types: [
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/ogg",
        "audio/webm",
        "audio/x-wav",
      ],
    },
  };

/** Chỉ admin mới được upload (image / video / audio). */
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Chỉ admin mới có quyền upload." },
      { status: 403 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { message: "Không đọc được form data" },
      { status: 400 }
    );
  }

  const file = formData.get("file") ?? formData.get("image");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { message: 'Gửi kèm file với key "file" hoặc "image"' },
      { status: 400 }
    );
  }

  const typeParam = (formData.get("type") as string) || "image";
  const config = ALLOWED[typeParam];
  if (!config) {
    return NextResponse.json(
      { message: 'type phải là "image", "video" hoặc "audio"' },
      { status: 400 }
    );
  }

  const mime = file.type;
  if (!config.types.includes(mime)) {
    return NextResponse.json(
      {
        message: `Loại file không hợp lệ cho ${typeParam}. Cho phép: ${config.types.join(
          ", "
        )}`,
      },
      { status: 400 }
    );
  }

  const folder = (formData.get("folder") as string) || "music-app";

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result =
      config.resourceType === "image"
        ? await uploadImage(buffer, { folder, maxWidth: 1920 })
        : config.resourceType === "video"
        ? await uploadVideo(buffer, { folder })
        : await uploadAudio(buffer, { folder });

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      duration: result.duration,
      format: result.format,
      type: typeParam,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload thất bại";
    return NextResponse.json({ message }, { status: 500 });
  }
}
