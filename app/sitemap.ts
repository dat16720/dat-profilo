import { getAllSongIds } from "@/lib/db/songs";
import type { MetadataRoute } from "next";

/** Sitemap dùng DB nên để dynamic, tránh build-time prerender khi chưa có MONGODB_URI. */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://datdt.io.vn";
  const currentDate = new Date();
  let songIds: string[] = [];
  if (process.env.MONGODB_URI) {
    try {
      songIds = await getAllSongIds();
    } catch {
      // Bỏ qua lỗi DB khi build hoặc runtime thiếu kết nối
    }
  }

  const musicPages: MetadataRoute.Sitemap = songIds.map((id) => ({
    url: `${baseUrl}/music/${id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/love`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    ...musicPages,
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
