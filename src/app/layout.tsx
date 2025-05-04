import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast'

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
      <body className="min-h-screen bg-black text-white">
        <Header />
        <div className="px-6 sm:px-8 sm:py-8">
          {children}
        </div>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
