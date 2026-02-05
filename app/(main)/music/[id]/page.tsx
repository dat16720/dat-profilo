import { FullMusicPlayer } from "@/components/music/full-music-player";
import { getSongById } from "@/lib/db/songs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const song = await getSongById(id);
  if (!song) return { title: "Bài hát | Music App" };
  const title = `${song.title} - ${song.artist}`;
  const description = `Nghe ${song.title} của ${song.artist}. Demo miễn phí, VIP nghe full.`;
  const url = `https://datdt.io.vn/music/${song.id}`;
  const images = song.coverUrl
    ? [{ url: song.coverUrl, width: 1200, height: 630, alt: `${song.title} - ${song.artist}` }]
    : undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Music App",
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: song.coverUrl ? [song.coverUrl] : undefined,
    },
  };
}

export default async function MusicDetailPage({ params }: Props) {
  const { id } = await params;
  const song = await getSongById(id);
  if (!song) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: song.title,
    byArtist: { "@type": "Person", name: song.artist },
    url: `https://datdt.io.vn/music/${song.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FullMusicPlayer
        song={{
          id: song.id,
          title: song.title,
          artist: song.artist,
          coverUrl: song.coverUrl ?? undefined,
        }}
        lyrics={song.lyrics ?? undefined}
      />
    </>
  );
}
