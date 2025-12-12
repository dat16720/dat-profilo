import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://datdt.io.vn";
  const currentDate = new Date();

  return [
    // Trang chủ - priority cao nhất, cập nhật thường xuyên
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Trang love - priority thấp hơn, cập nhật ít thường xuyên hơn
    {
      url: `${baseUrl}/love`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
