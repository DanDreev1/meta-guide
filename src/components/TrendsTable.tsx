'use client';

import { useEffect, useState } from 'react';
import AdminForm from "./AdminForm"
import { supabase } from '@/lib/supabaseClient';

interface Hero {
  name: string;
  roles: string[];
  picks: number;
  bans: number;
  winrate: number;
}

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
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    roles: '',
    picks: '',
    bans: '',
    winrate: '',
  });

  // Проверка роли пользователя
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.role === 'admin') {
        setIsAdmin(true);
      }
    };
    getUser();
  }, []);

  // Загрузка героев с сервера
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/meta?rank=${encodeURIComponent(selectedRank)}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');

        const parsed = data.map((hero: any) => ({
          ...hero,
          roles: typeof hero.roles === 'string'
            ? hero.roles.replace(/[{}"]/g, '').split(',').map((r: string) => r.trim())
            : Array.isArray(hero.roles)
              ? hero.roles
              : [],
        }));

        setHeroes(parsed);
      } catch (err) {
        console.error('Ошибка при загрузке:', err);
        setHeroes([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRank) fetchData();
  }, [selectedRank]);

  // Отправка формы
  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      rank: selectedRank,
      roles: formData.roles.split(',').map(r => r.trim()),
      picks: parseFloat(formData.picks),
      bans: parseFloat(formData.bans),
      winrate: parseFloat(formData.winrate),
    };

    const res = await fetch('/api/meta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    alert(result.message || result.error);
    setShowForm(false);
  };

  const filteredHeroes = heroes.filter(hero =>
    selectedRole ? hero.roles?.includes(selectedRole) : true
  );

  const sortedHeroes = [...filteredHeroes]
    .sort((a, b) => {
      if (!selectedFilter) return 0;
      if (selectedFilter === 'Пики') return b.picks - a.picks;
      if (selectedFilter === 'Баны') return b.bans - a.bans;
      if (selectedFilter === 'Винрейт') return b.winrate - a.winrate;
      return 0;
    })
    .slice(0, 5);

  if (!selectedRank) {
    return <p className="text-gray-400 mt-4">Выберите ранг для отображения таблицы</p>;
  }

  if (loading) {
    return <p className="text-gray-400 mt-4">Загрузка...</p>;
  }

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
              <td className="py-2 px-4 border border-gray-700">{hero.roles.join(', ')}</td>
              <td className="py-2 px-4 border border-gray-700">{hero.picks.toFixed(2)}%</td>
              <td className="py-2 px-4 border border-gray-700">{hero.bans.toFixed(2)}%</td>
              <td className="py-2 px-4 border border-gray-700">{hero.winrate.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedHeroes.length === 0 && (
        <p className="text-gray-400 mt-4">Нет подходящих персонажей</p>
      )}

      {isAdmin && (
        <>
            <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => setShowForm(true)}
            >
            Добавить данные таблицы
            </button>

            {showForm && <AdminForm selectedRank={selectedRank} onClose={() => setShowForm(false)} />}
        </>
      )}
    </div>
  );
}