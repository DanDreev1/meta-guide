import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-600 mt-10 space-y-4 px-4 sm:px-0">
      
      <div className="flex justify-center space-x-4">
        <Link href="#" className="hover:text-white">Discord</Link>
        <Link href="#" className="hover:text-white">Telegram</Link>
        <Link href="#" className="hover:text-white">YouTube</Link>
        <Link href="#" className="hover:text-white">Twitter</Link>
      </div>

      <p className="text-xs text-gray-600">
        &copy; 2025 MetaGuide.gg — Создано для геймеров, геймером.
      </p>

      {/* Footer: Moonton дисклеймер */}
      <div className="w-full bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-6 text-sm text-gray-300 text-center mt-10 border-t border-white/10 backdrop-blur-md">
        <div className="flex justify-center items-center gap-3 mb-4">
            <Link
            href="https://www.moonton.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            >
            <Image
                src="/moonton-logo.png"
                alt="Moonton Logo"
                width={80}
                height={55}
                className="mx-auto drop-shadow-md"
            />
            </Link>
        </div>
        <p className="leading-relaxed max-w-4xl mx-auto px-4">
            Все ресурсы, изображения и персонажи MLBB, использованные на этом сайте, являются собственностью 
            <span className="font-semibold text-white"> Moonton</span>. Контент предоставлен исключительно в 
            <span className="italic text-gray-400"> образовательных и информационных целях</span>. 
            Никакие ресурсы MLBB не продаются. Любой запрос на удаление будет 
            <span className="text-red-400 font-medium"> немедленно удовлетворён</span>.
        </p>
      </div>
    </footer>
  );
}