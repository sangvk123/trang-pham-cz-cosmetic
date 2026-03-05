import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trang Pham Cosmetics | My pham chinh hang Han Quoc tai Sec",
  description: "Cua hang my pham Han Quoc chinh hang tai Sec. K-beauty skincare, makeup. Originalni korejska kosmetika v Cesku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${figtree.variable} font-[family-name:var(--font-figtree)] antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
