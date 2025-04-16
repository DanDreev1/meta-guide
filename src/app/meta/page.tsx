"use client";

import HeroOfTheWeek from "@/components/HeroOfTheWeek";
import RankFilter from "@/components/RankFilter";

export default function MetaPage() {
  return (
    <main className="px-6 py-12 w-full max-w-[1800px] mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-10">Мета</h1>

      <h2 className="text-2xl font-semibold text-white mb-4">Герой недели</h2>
      <HeroOfTheWeek />

      {/* Тренды */}
      <section className="mb-16 mt-16">
        {/* Таблица для выбранного ранга */}
        <h2 className="text-2xl font-bold text-white mb-4">Тренды</h2>

        <RankFilter />

      </section>

      {/* Анализ патчей */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Анализ последних патчей</h2>
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          Coming soon...
        </div>
      </section>
    </main>
  );
}
