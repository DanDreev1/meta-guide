import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
    title: "MetaGuide.gg – Гайды и мета MLBB",
    description: "Получай мета-гайды и советы от профи.",
};  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white px-0 py-4 sm:px-6 sm:py-8">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
