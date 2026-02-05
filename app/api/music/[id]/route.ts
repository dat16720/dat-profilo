import { getSongById } from "@/lib/db/songs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const song = await getSongById(id);
    if (!song) {
      return NextResponse.json(
        { message: "Bài hát không tồn tại." },
        { status: 404 }
      );
    }
    return NextResponse.json(song);
  } catch (err) {
    console.error("[GET /api/music/[id]]", err);
    return NextResponse.json({ message: "Lỗi tải bài hát." }, { status: 500 });
  }
}
