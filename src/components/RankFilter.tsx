"use client";

import { useState } from "react";
import TrendsTable from "@/components/TrendsTable";

const ranks = [
  "Мифический",
  "Мифическая честь",
  "Мифическая Слава",
  "Мифический Бессмертный",
  "Киберспорт",
];

const roles = ["roam", "mid", "jungle", "exp", "gold"];

const filters = ["Пики", "Баны", "Винрейт"];

const rankSources: Record<string, { text: string; url: string }> = {
  "< Мифический": {
    text: "Источник откуда берется информация",
    url: "https://m.mobilelegends.com/rank",
  },
  "Мифический": {
    text: "Источник откуда берется информация",
    url: "https://m.mobilelegends.com/rank",
  },
  "Мифическая честь": {
    text: "Источник откуда берется информация",
    url: "https://m.mobilelegends.com/rank",
  },
  "Мифическая Слава": {
    text: "Источник откуда берется информация",
    url: "https://m.mobilelegends.com/rank",
  },
  "Мифический Бессмертный": {
    text: "Источник откуда берется информация",
    url: "https://m.mobilelegends.com/rank",
  },
  "Киберспорт": {
    text: "Ожидается окончание MCC SEASON 5 и статистики с турнира",
    url: "",
  },
};

export default function RankFilter() {
  const [selectedRank, setSelectedRank] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Фильтр по рангу */}
      <div className="flex flex-wrap gap-2">
        {ranks.map((rank) => (
          <button
            key={rank}
            onClick={() => setSelectedRank(selectedRank === rank ? "" : rank)}
            className={`px-4 py-2 rounded-md text-sm border ${
              selectedRank === rank
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {rank}
          </button>
        ))}
      </div>

      {/* Фильтр по роли */}
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(selectedRole === role ? null : role)}
            className={`px-4 py-2 rounded-md text-sm border ${
              selectedRole === role
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Фильтр по Пики/Баны/Винрейт */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
            className={`px-4 py-2 rounded-md text-sm border ${
              selectedFilter === filter
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Источник данных */}
      {selectedRank && (
        <div className="text-xs text-gray-400 mt-2">
          {rankSources[selectedRank]?.text}:{" "}
          <a
            href={rankSources[selectedRank]?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400"
          >
            {rankSources[selectedRank]?.url}
          </a>
        </div>
      )}

      <TrendsTable
        selectedRank={selectedRank}
        selectedRole={selectedRole}
        selectedFilter={selectedFilter}
      />
    </div>
  );
}