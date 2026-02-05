import { auth } from "@/lib/auth";
import { findUserById } from "@/lib/db";
import { getSongById } from "@/lib/db/songs";
import { createReadStream, existsSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { Readable } from "stream";

const AUDIO_DIR = path.join(process.cwd(), "public", "audio");

/** Kiểm tra VIP từ DB để tránh session JWT cache sai (chỉ cho phép full khi vipUntil còn hạn). */
async function isVipFromDb(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;
  const user = await findUserById(session.user.id);
  if (!user?.vipUntil) return false;
  return new Date(user.vipUntil) > new Date();
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const song = await getSongById(id);
  if (!song) {
    return NextResponse.json(
      { message: "Bài hát không tồn tại" },
      { status: 404 }
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Đăng nhập để nghe nhạc." },
      { status: 401 }
    );
  }

  const vip = await isVipFromDb();
  const streamUrl = vip && song.audioUrl ? song.audioUrl : song.demoUrl;
  if (streamUrl) {
    const res = NextResponse.redirect(streamUrl, 302);
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    res.headers.set("Pragma", "no-cache");
    return res;
  }

  const fileName = vip ? `${id}-full.mp3` : `${id}-demo.mp3`;
  const fallbackName = vip ? "full.mp3" : "demo.mp3";
  const filePath = path.join(AUDIO_DIR, fileName);
  const fallbackPath = path.join(AUDIO_DIR, fallbackName);

  const finalPath = existsSync(filePath)
    ? filePath
    : existsSync(fallbackPath)
    ? fallbackPath
    : null;
  if (!finalPath) {
    return NextResponse.json(
      {
        message:
          "Chưa có file nhạc. Thêm URL trong Admin (demoUrl/audioUrl) hoặc file vào public/audio.",
      },
      { status: 404 }
    );
  }

  const nodeStream = createReadStream(finalPath);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;
  return new NextResponse(webStream, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Accept-Ranges": "bytes",
    },
  });
}
