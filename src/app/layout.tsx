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
  title: {
    default: "Trang Pham Cosmetics | Mỹ phẩm chính hãng Hàn Quốc tại Séc",
    template: "%s | Trang Pham Cosmetics",
  },
  description: "Cửa hàng mỹ phẩm Hàn Quốc chính hãng tại Séc. K-beauty skincare, makeup. Originální korejská kosmetika v Česku.",
  keywords: ["mỹ phẩm Hàn Quốc", "K-beauty", "korejská kosmetika", "Korean cosmetics", "skincare", "makeup", "Praha", "Czech Republic"],
  authors: [{ name: "Trang Pham Cosmetics" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["cs_CZ", "en_US"],
    siteName: "Trang Pham Cosmetics",
    title: "Trang Pham Cosmetics | Mỹ phẩm chính hãng Hàn Quốc tại Séc",
    description: "Cửa hàng mỹ phẩm Hàn Quốc chính hãng tại Séc. K-beauty skincare, makeup.",
  },
  metadataBase: new URL("https://trangphamcosmetics.cz"),
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
