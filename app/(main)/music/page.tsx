import { MusicList } from "@/components/music/music-list";

export const dynamic = "force-dynamic";

export default function MusicListPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Bài hát</h1>
      <MusicList />
    </div>
  );
}
