import { getSongs } from "@/lib/db/songs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const songs = await getSongs();
    return NextResponse.json(songs);
  } catch (err) {
    console.error("[GET /api/music]", err);
    return NextResponse.json(
      { message: "Lỗi tải danh sách bài hát." },
      { status: 500 }
    );
  }
}
