import { getSession } from "@/lib/auth-utils";
import { uploadImage } from "@/lib/cloudinary";
import { updateUserProfile } from "@/lib/db";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** POST: Upload avatar (user đăng nhập), lưu URL vào profile. */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
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

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: "Chỉ chấp nhận ảnh: JPEG, PNG, WebP, GIF" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImage(buffer, {
      folder: "avatars",
      maxWidth: 400,
    });
    await updateUserProfile(session.user.id, { avatarUrl: result.url });
    return NextResponse.json({ url: result.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Upload avatar thất bại";
    return NextResponse.json({ message }, { status: 500 });
  }
}
