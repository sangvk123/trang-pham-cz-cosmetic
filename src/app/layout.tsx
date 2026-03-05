import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Trang Pham Cz Cosmetic - My pham chinh hang tai Sec",
  description: "Cua hang my pham chinh hang danh cho nguoi Viet va nguoi Sec tai Czech Republic. Skincare, Makeup, Body Care. 100% authentic cosmetics.",
  keywords: "my pham, cosmetics, kosmetika, skincare, makeup, Czech Republic, Sec, Vietnamese cosmetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
