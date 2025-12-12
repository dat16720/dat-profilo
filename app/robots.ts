import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://datdt.io.vn";

  return {
    rules: [
      {
        // Áp dụng cho tất cả các bot (Google, Bing, Facebook, etc.)
        userAgent: "*",
        // Cho phép crawl tất cả các trang
        allow: "/",
        // Chặn các thư mục không cần index
        // /api/ - API endpoints (không cần SEO)
        // /admin/ - Admin panel (bảo mật)
        disallow: ["/api/", "/admin/"],
      },
    ],
    // Chỉ đường đến sitemap để bot biết có những trang nào
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
