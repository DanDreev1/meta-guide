"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface AddButtonProps {
  onClick: () => void;
}

export default function AdminAddButton({ onClick }: AddButtonProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Ошибка получения пользователя:", error.message);
        return;
      }

      const role = user?.user_metadata?.role;
      setIsAdmin(role === "admin");
    };

    checkAdmin();
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="mt-8 text-center">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Добавить данные таблицы
      </button>
    </div>
  );
}
