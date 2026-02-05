"use client";

import Link from "next/link";
import { useState } from "react";

type UploadType = "image" | "video" | "audio";

export function UploadForm() {
  const [type, setType] = useState<UploadType>("image");
  const [folder, setFolder] = useState("music-app");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    url: string;
    publicId: string;
    type: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const accept =
    type === "image"
      ? "image/jpeg,image/png,image/webp,image/gif"
      : type === "video"
        ? "video/mp4,video/webm"
        : "audio/mpeg,audio/mp3,audio/wav,audio/ogg";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Chọn file để upload.");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      formData.append("folder", folder);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message ?? "Upload thất bại.");
        return;
      }
      setResult({
        url: data.url,
        publicId: data.publicId,
        type: data.type ?? type,
      });
      setFile(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Upload lên Cloudinary</h1>
      <p className="text-zinc-500 text-sm">
        Chỉ admin mới truy cập được trang này. Upload ảnh, video hoặc audio.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Loại file</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as UploadType);
              setFile(null);
              setResult(null);
            }}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
          >
            <option value="image">Ảnh (image)</option>
            <option value="video">Video</option>
            <option value="audio">Audio (sound)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thư mục (folder)</label>
          <input
            type="text"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="music-app"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">File</label>
          <input
            type="file"
            accept={accept}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm text-zinc-600 dark:text-zinc-400 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-200 dark:file:bg-zinc-700 file:font-medium"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !file}
          className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Đang upload..." : "Upload"}
        </button>
      </form>

      {result && (
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            Upload thành công ({result.type})
          </p>
          <p className="text-sm break-all">
            <span className="text-zinc-500">URL: </span>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {result.url}
            </a>
          </p>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(result!.url);
            }}
            className="text-sm px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            Copy URL
          </button>
          <p className="text-sm text-zinc-500">publicId: {result.publicId}</p>
          {result.type === "audio" && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              → Dán URL này vào trang{" "}
              <Link href="/admin/songs" className="underline">
                Thêm bài hát
              </Link>{" "}
              (Demo URL hoặc Full URL).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
