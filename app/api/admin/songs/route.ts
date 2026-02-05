import { requireAdmin } from "@/lib/auth-utils";
import { createSong, type CreateSongInput } from "@/lib/db/songs";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSongSchema = z.object({
  title: z.string().min(1, "Nhập tên bài hát"),
  artist: z.string().min(1, "Nhập tên ca sĩ"),
  coverUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  lyrics: z.string().nullable().optional(),
});

/** POST: Tạo bài hát mới (chỉ admin). Body: title, artist, coverUrl?, demoUrl?, audioUrl?, lyrics? */
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Chỉ admin mới thêm bài hát." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Body JSON không hợp lệ." },
      { status: 400 }
    );
  }

  const parsed = createSongSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ";
    return NextResponse.json({ message: msg }, { status: 400 });
  }

  const data = parsed.data;
  const toUrl = (s: string | undefined) =>
    s && s.trim().startsWith("http") ? s.trim() : null;
  const rawBody = body as { lyrics?: unknown };
  const lyricsValue =
    typeof data.lyrics === "string"
      ? data.lyrics
      : typeof rawBody.lyrics === "string"
      ? rawBody.lyrics
      : null;
  const input: CreateSongInput = {
    title: data.title,
    artist: data.artist,
    coverUrl: toUrl(data.coverUrl),
    demoUrl: toUrl(data.demoUrl),
    audioUrl: toUrl(data.audioUrl),
    lyrics: lyricsValue,
  };

  try {
    const song = await createSong(input);
    return NextResponse.json({
      id: song.id,
      title: song.title,
      artist: song.artist,
      demoUrl: song.demoUrl,
      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl,
      lyrics: song.lyrics,
    });
  } catch (err) {
    console.error("[POST /api/admin/songs]", err);
    return NextResponse.json({ message: "Lỗi tạo bài hát." }, { status: 500 });
  }
}
