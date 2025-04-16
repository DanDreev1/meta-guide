"use client";

import { metaTrendsData } from "@/lib/data/metaTrends";

interface TrendsTableProps {
  selectedRank: string;
  selectedRole: string | null;
  selectedFilter: string | null;
}

export default function TrendsTable({
  selectedRank,
  selectedRole,
  selectedFilter,
}: TrendsTableProps) {
  if (!selectedRank) {
    return <p className="text-gray-400 mt-4">Выберите ранг для отображения таблицы</p>;
  }

  const selectedData = metaTrendsData.find(
    (rankData) => rankData.rank === selectedRank
  );

  if (!selectedData) {
    return <p className="text-gray-400 mt-4">Нет данных для этого ранга</p>;
  }

  const filteredHeroes = selectedData.heroes.filter((hero) => {
    const roleMatch = selectedRole ? hero.roles.includes(selectedRole) : true;
    return roleMatch;
  });

  const sortedHeroes = [...filteredHeroes].sort((a, b) => {
    if (!selectedFilter) return 0;
  
    if (selectedFilter === "Пики")
      return parseFloat(b.picks) - parseFloat(a.picks);
  
    if (selectedFilter === "Баны")
      return parseFloat(b.bans) - parseFloat(a.bans);
  
    if (selectedFilter === "Винрейт")
      return parseFloat(b.winrate) - parseFloat(a.winrate);
  
    return 0;
  }).slice(0, 5); // только топ-5  

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="py-2 px-4 border border-gray-700">Персонаж</th>
            <th className="py-2 px-4 border border-gray-700">Роль</th>
            <th className="py-2 px-4 border border-gray-700">Пики</th>
            <th className="py-2 px-4 border border-gray-700">Баны</th>
            <th className="py-2 px-4 border border-gray-700">Винрейт</th>
          </tr>
        </thead>

        <tbody>
          {sortedHeroes.map((hero, idx) => (
            <tr key={idx} className="hover:bg-gray-800">
              <td className="py-2 px-4 border border-gray-700">{hero.name}</td>
              <td className="py-2 px-4 border border-gray-700">
                {hero.roles.join(", ")}
              </td>
              <td className="py-2 px-4 border border-gray-700">{hero.picks}</td>
              <td className="py-2 px-4 border border-gray-700">{hero.bans}</td>
              <td className="py-2 px-4 border border-gray-700">{hero.winrate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedHeroes.length === 0 && (
        <p className="text-gray-400 mt-4">Нет подходящих персонажей</p>
      )}
    </div>
  );
}
