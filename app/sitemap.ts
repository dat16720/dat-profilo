import { getAllSongIds } from "@/lib/db/songs";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://datdt.io.vn";
  const currentDate = new Date();
  const songIds = await getAllSongIds();

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
