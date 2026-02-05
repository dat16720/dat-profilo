import { AddSongForm } from "@/components/admin/add-song-form";
import { SongRowActions } from "@/components/admin/song-row-actions";
import { getSongs } from "@/lib/db/songs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminSongsPage() {
  const songs = await getSongs();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Thêm bài hát</h1>
      <p className="text-zinc-500 text-sm">
        Upload file audio ở trang{" "}
        <Link href="/admin/upload" className="text-amber-600 dark:text-amber-400 underline">
          Upload
        </Link>
        , copy URL rồi dán vào form dưới. Demo = bản ngắn, Full = bản đầy đủ (VIP nghe).
      </p>
      <AddSongForm />

      <h2 className="text-xl font-semibold pt-4 border-t border-zinc-200 dark:border-zinc-700">
        Danh sách bài đã có
      </h2>
      <ul className="space-y-2">
        {songs.map((s) => (
          <li key={s.id} className="flex items-center gap-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
            {s.coverUrl ? (
              <img
                src={s.coverUrl}
                alt=""
                className="w-10 h-10 rounded object-cover shrink-0"
              />
            ) : (
              <span className="w-10 h-10 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm shrink-0">🎵</span>
            )}
            <Link
              href={`/music/${s.id}`}
              className="font-medium hover:underline flex-1 min-w-0 truncate"
            >
              {s.title}
            </Link>
            <span className="text-zinc-500 text-sm shrink-0">{s.artist}</span>
            {s.demoUrl && (
              <span className="text-xs text-green-600 dark:text-green-400 shrink-0">demo</span>
            )}
            {s.audioUrl && (
              <span className="text-xs text-amber-600 dark:text-amber-400 shrink-0">full</span>
            )}
            <SongRowActions songId={s.id} />
          </li>
        ))}
      </ul>
      <p className="text-sm">
        <Link href="/admin" className="text-zinc-500 hover:underline">
          ← Về tổng quan Admin
        </Link>
      </p>
    </div>
  );
}
