"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function ToolsComingSoon() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="bg-gray-800 p-4 rounded-full mb-4 shadow-lg">
          <Lock size={32} className="text-gray-300" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Инструменты скоро будут доступны</h1>

        <p className="text-gray-400 max-w-md">
          Мы активно работаем над разделом с тренировками, поиском тиммейтов и мини-курсами.
          Следи за обновлениями — это будет 🔥
        </p>

        <Link href="/" className="mt-10 inline-block bg-white text-black px-6 py-2 rounded-xl shadow hover:bg-gray-200 transition">
            Вернуться на главную
        </Link>

      </motion.div>
    </main>
  );
}