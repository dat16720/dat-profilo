import mongoose from "mongoose";
import { SongModel } from "./models/Song";
import { dbConnect } from "./mongodb";

export type Song = {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string | null;
  demoUrl?: string | null;
  audioUrl?: string | null;
  lyrics: string | null;
};

type SongLean = {
  _id: mongoose.Types.ObjectId;
  title: string;
  artist: string;
  coverUrl?: string | null;
  demoUrl?: string | null;
  audioUrl?: string | null;
  lyrics?: string | null;
};

function docToSong(doc: SongLean): Song {
  const raw = doc.lyrics;
  const lyrics =
    typeof raw === "string"
      ? raw
      : Array.isArray(raw)
      ? (raw as { text?: string }[]).map((l) => l?.text ?? "").join("\n")
      : null;
  return {
    id: doc._id.toString(),
    title: doc.title,
    artist: doc.artist,
    coverUrl: doc.coverUrl ?? null,
    demoUrl: doc.demoUrl ?? null,
    audioUrl: doc.audioUrl ?? null,
    lyrics: lyrics ?? null,
  };
}

export async function getSongs(): Promise<Song[]> {
  await dbConnect();
  const docs = await SongModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((d) => docToSong(d as unknown as SongLean));
}

export async function getSongById(id: string): Promise<Song | null> {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const doc = await SongModel.findById(id).lean();
  if (!doc) return null;
  return docToSong(doc as unknown as SongLean);
}

export async function getAllSongIds(): Promise<string[]> {
  await dbConnect();
  const docs = await SongModel.find().select("_id").lean();
  return docs.map((d) =>
    (d as { _id: mongoose.Types.ObjectId })._id.toString()
  );
}

export type CreateSongInput = {
  title: string;
  artist: string;
  coverUrl?: string | null;
  demoUrl?: string | null;
  audioUrl?: string | null;
  lyrics?: string | null;
};

export async function createSong(data: CreateSongInput): Promise<Song> {
  await dbConnect();
  const lyricsToSave = typeof data.lyrics === "string" ? data.lyrics : null;
  const doc = await SongModel.create({
    title: data.title,
    artist: data.artist,
    coverUrl: data.coverUrl ?? null,
    demoUrl: data.demoUrl ?? null,
    audioUrl: data.audioUrl ?? null,
    lyrics: lyricsToSave,
  });
  return docToSong(doc.toObject() as SongLean);
}

export type UpdateSongInput = Partial<{
  title: string;
  artist: string;
  coverUrl: string | null;
  demoUrl: string | null;
  audioUrl: string | null;
  lyrics: string | null;
}>;

export async function updateSong(
  id: string,
  data: UpdateSongInput
): Promise<Song | null> {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const oid = new mongoose.Types.ObjectId(id);
  const setPayload: Record<string, unknown> = {};
  if (data.title !== undefined) setPayload.title = data.title;
  if (data.artist !== undefined) setPayload.artist = data.artist;
  if (data.coverUrl !== undefined) setPayload.coverUrl = data.coverUrl;
  if (data.demoUrl !== undefined) setPayload.demoUrl = data.demoUrl;
  if (data.audioUrl !== undefined) setPayload.audioUrl = data.audioUrl;
  if (data.lyrics !== undefined) setPayload.lyrics = data.lyrics;

  if (Object.keys(setPayload).length === 0) return null;

  const col = SongModel.collection;
  const result = await col.updateOne({ _id: oid }, { $set: setPayload });
  if (result.matchedCount === 0) return null;
  const doc = await SongModel.findById(id).lean();
  if (!doc) return null;
  return docToSong(doc as unknown as SongLean);
}

export async function deleteSong(id: string): Promise<boolean> {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  const result = await SongModel.deleteOne({ _id: id });
  return result.deletedCount === 1;
}
