import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OGSnap - Dynamic OG Image API",
  description: "Generate beautiful Open Graph images via API. Perfect for blogs, SaaS, and social sharing.",
  openGraph: {
    title: "OGSnap - Dynamic OG Image API",
    description: "Generate beautiful Open Graph images via API.",
    images: ["/api/v1/image?title=OGSnap&subtitle=Dynamic%20OG%20Image%20API&template=gradient"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OGSnap - Dynamic OG Image API",
    description: "Generate beautiful Open Graph images via API.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
