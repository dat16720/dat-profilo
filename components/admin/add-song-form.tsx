"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddSongForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const lyricsRaw = (formData.get("lyrics") as string) || "";
    const body = {
      title: formData.get("title"),
      artist: formData.get("artist"),
      coverUrl: (formData.get("coverUrl") as string) || undefined,
      demoUrl: (formData.get("demoUrl") as string) || undefined,
      audioUrl: (formData.get("audioUrl") as string) || undefined,
      lyrics: lyricsRaw.trim() || null,
    };

    if (!body.title || !body.artist) {
      setError("Điền đủ: Tên bài, Ca sĩ.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message ?? "Tạo bài hát thất bại.");
        return;
      }
      setSuccess(`Đã thêm bài "${data.title}".`);
      form.reset();
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded">
          {success}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Tên bài hát *</label>
        <input
          name="title"
          type="text"
          required
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ca sĩ *</label>
        <input
          name="artist"
          type="text"
          required
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          URL bản demo (Cloudinary sau khi upload audio)
        </label>
        <input
          name="demoUrl"
          type="url"
          placeholder="https://res.cloudinary.com/..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
        <p className="text-xs text-zinc-500 mt-1">
          Dán URL từ trang{" "}
          <Link href="/admin/upload" className="underline">
            Upload
          </Link>{" "}
          (chọn loại audio, upload xong copy URL).
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          URL bản full (Cloudinary)
        </label>
        <input
          name="audioUrl"
          type="url"
          placeholder="https://res.cloudinary.com/..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">URL ảnh bìa</label>
        <input
          name="coverUrl"
          type="url"
          placeholder="https://..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Lời bài hát</label>
        <textarea
          name="lyrics"
          rows={10}
          placeholder="Nhập toàn bộ lời bài hát, mỗi dòng một câu..."
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Đang tạo..." : "Thêm bài hát"}
      </button>
    </form>
  );
}
