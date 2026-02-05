import { requireAdmin } from "@/lib/auth-utils";
import { deleteSong, getSongById, updateSong } from "@/lib/db/songs";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSongSchema = z.object({
  title: z.string().min(1).optional(),
  artist: z.string().min(1).optional(),
  coverUrl: z.string().nullable().optional(),
  demoUrl: z.string().nullable().optional(),
  audioUrl: z.string().nullable().optional(),
  lyrics: z.string().nullable().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

/** PATCH: Cập nhật bài hát (chỉ admin). */
export async function PATCH(req: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Chỉ admin mới sửa bài hát." },
      { status: 403 }
    );
  }

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Body JSON không hợp lệ." },
      { status: 400 }
    );
  }

  const parsed = updateSongSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ";
    return NextResponse.json({ message: msg }, { status: 400 });
  }

  const toUrl = (s: string | null | undefined) =>
    s === null || s === undefined
      ? null
      : s.trim().startsWith("http")
      ? s.trim()
      : null;

  const data = parsed.data;
  const rawBody = body as { lyrics?: unknown };
  const lyricsValue =
    typeof data.lyrics === "string"
      ? data.lyrics
      : data.lyrics === null
      ? null
      : typeof rawBody.lyrics === "string"
      ? rawBody.lyrics
      : rawBody.lyrics === null
      ? null
      : undefined;

  const update: Record<string, unknown> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.artist !== undefined) update.artist = data.artist;
  if (data.coverUrl !== undefined)
    update.coverUrl = toUrl(data.coverUrl ?? null);
  if (data.demoUrl !== undefined) update.demoUrl = toUrl(data.demoUrl ?? null);
  if (data.audioUrl !== undefined)
    update.audioUrl = toUrl(data.audioUrl ?? null);
  if (lyricsValue !== undefined) update.lyrics = lyricsValue;

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { message: "Gửi ít nhất một field để cập nhật." },
      { status: 400 }
    );
  }

  const song = await updateSong(id, update as Parameters<typeof updateSong>[1]);
  if (!song) {
    return NextResponse.json(
      { message: "Không tìm thấy bài hát." },
      { status: 404 }
    );
  }
  return NextResponse.json(song);
}

/** DELETE: Xóa bài hát (chỉ admin). */
export async function DELETE(_req: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Chỉ admin mới xóa bài hát." },
      { status: 403 }
    );
  }

  const { id } = await params;
  const existed = await getSongById(id);
  if (!existed) {
    return NextResponse.json(
      { message: "Không tìm thấy bài hát." },
      { status: 404 }
    );
  }

  const ok = await deleteSong(id);
  if (!ok) {
    return NextResponse.json({ message: "Xóa thất bại." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}
