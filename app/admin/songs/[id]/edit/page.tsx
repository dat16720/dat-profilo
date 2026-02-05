import { EditSongForm } from "@/components/admin/edit-song-form";
import { getSongById } from "@/lib/db/songs";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditSongPage({ params }: Props) {
  const { id } = await params;
  const song = await getSongById(id);
  if (!song) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Sửa bài hát</h1>
      <p className="text-zinc-500 text-sm">
        <Link href={`/music/${song.id}`} className="underline">
          {song.title}
        </Link>
        {" · "}
        <Link href="/admin/songs" className="underline">
          ← Danh sách bài hát
        </Link>
      </p>
      <EditSongForm song={song} />
    </div>
  );
}
