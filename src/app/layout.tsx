import type { Metadata } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trang Pham Cosmetics | Mỹ phẩm chính hãng Hàn Quốc tại Séc",
  description: "Cửa hàng mỹ phẩm Hàn Quốc chính hãng tại Séc. K-beauty skincare, makeup. Originální korejská kosmetika v Česku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${figtree.variable} ${playfair.variable} font-[family-name:var(--font-figtree)] antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
