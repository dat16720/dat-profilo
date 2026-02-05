import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    coverUrl: { type: String, default: null },
    demoUrl: { type: String, default: null },
    audioUrl: { type: String, default: null },
    /** Lời bài hát (văn bản thuần, xuống dòng = \n). */
    lyrics: { type: String, default: null },
  },
  { timestamps: true, strict: true }
);

export const SongModel =
  mongoose.models?.Song ?? mongoose.model("Song", SongSchema);
