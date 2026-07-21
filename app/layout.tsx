import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sage Decision Intelligence",
  description: "AI that transforms complex enterprise decisions into confident execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#f6f7f5]">{children}</body>
    </html>
  );
}
