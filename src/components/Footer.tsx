import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-600 mt-16 space-y-4 px-4 sm:px-0">
      
      <div className="flex justify-center space-x-4">
        <Link href="#" className="hover:text-white">Discord</Link>
        <Link href="#" className="hover:text-white">Telegram</Link>
        <Link href="#" className="hover:text-white">YouTube</Link>
        <Link href="#" className="hover:text-white">Twitter</Link>
      </div>

      <p className="text-xs text-gray-600">
        &copy; 2025 MetaGuide.gg — Built for gamers, by a gamer.
      </p>

      {/* Логотип Moonton и дисклеймер */}
      <div className="bg-gray-900/50 p-4 rounded-xl text-xs text-gray-400 mt-6 max-w-xl mx-auto text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
        <Link
            href="https://www.moonton.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-2"
        >
            <Image
            src="/moonton-logo.png"
            alt="Moonton Logo"
            width={75}
            height={50}
            className="mx-auto"
            />
        </Link>
        </div>
        <p>
            All MLBB assets, images, and characters used on this site are property of Moonton. Content on this website is provided for educational and informational purposes only. No MLBB assets are being sold directly. Any request for content removal will be respected immediately.
        </p>
      </div>
    </footer>
  );
}