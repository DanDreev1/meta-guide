"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LazyImage from "@/components/LazyImage";

import Image from "next/image";
import Link from "next/link";

const heroNames = ["Калея", "Харит", "Джусинь", "Хилос", "Хильда", "Фани"];

export default function MetaGuideHome() {
  return (
    <main className="px-4 py-10 pt-30 sm:px-6">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          className="text-4xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Стань мастером в MLBB
        </motion.h2>
        <p className="text-gray-400 text-lg mb-6">
          Гайды, мета-аналитика и билды от игроков, которые знают, что делают.
        </p>
        <Link href="/meta">
            <button className="bg-white text-black text-lg px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-300">
                Получить билд дня / мету недели
            </button>
        </Link>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-semibold mb-4">Популярные герои недели</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {heroNames.map((name, idx) => (
            <div
                key={idx}
                className="relative w-full max-w-[250px] aspect-[250/407] bg-gray-800 rounded-xl overflow-hidden group mx-auto"
            >
                <LazyImage
                    src={`/popular-hero/popular-hero${idx + 1}.webp`}
                    alt={`Популярный герой ${idx + 1}`}
                    className="object-cover transition-transform duration-100 ease-in-out group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center text-sm py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {name}
                </div>
            </div>
            ))}
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-semibold mb-4">Последние гайды</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-gray-900 border-none shadow-lg rounded-2xl p-4">
              <div className="aspect-video bg-gray-800 rounded-lg mb-3"></div>
              <h4 className="text-lg font-medium mb-1">Гайд #{idx + 1}</h4>
              <p className="text-gray-400 text-sm">Краткое описание гайда и что вы узнаете.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-semibold mb-4">Видео / Туториалы</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
              YouTube Video {idx + 1}
            </div>
          ))}
        </div>
      </section>
      <ScrollToTopButton />
    </main>
  );
}

function HeroCard({ index, name }: { index: number; name: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
  
    return (
      <div className="relative w-full max-w-[250px] aspect-[250/407] bg-gray-800 rounded-xl overflow-hidden group mx-auto">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm z-10 bg-gray-900/70">
            Картинка загружается...
          </div>
        )}
  
        <Image
          src={`/popular-hero/popular-hero${index}.webp`}
          alt={`Популярный герой ${index}`}
          fill
          className={`object-cover duration-300 ease-in-out group-hover:scale-110 ${!isLoaded && "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
  
        {/* Плашка с именем героя */}
        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {name}
        </div>
      </div>
    );
}