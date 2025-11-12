import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "💕 To My Beloved",
  description: "A special message from the heart, crafted with love and care",
  openGraph: {
    title: "💕 To My Beloved",
    description: "A special message from the heart, crafted with love and care",
    type: "website",
    images: [
      {
        url: "/images/natra.jpg",
        width: 1200,
        height: 630,
        alt: "A special message from the heart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "💕 Gửi đến người tôi yêu",
    description: "Một thông điệp đặc biệt từ trái tim",
    images: ["/images/natra.jpg"],
  },
};

export default function LoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
