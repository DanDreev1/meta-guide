"use client";

import Link from "next/link";
import { Home, Book, Flame, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-around mb-12 relative sm:justify-between">
      {/* Логотип */}
      <h1 className="text-3xl font-bold tracking-tight">MetaGuide.gg</h1>

      {/* Навигация desktop */}
      <nav className="hidden md:flex gap-6 text-sm md:text-base items-center absolute left-1/2 -translate-x-1/2">
        <Link href="/" className="flex items-center gap-1 hover:text-gray-300 transition">
          <Home size={18} /> Главная
        </Link>
        <Link href="/guides" className="flex items-center gap-1 hover:text-gray-300 transition">
          <Book size={18} /> Гайды
        </Link>
        <Link href="/meta" className="flex items-center gap-1 hover:text-gray-300 transition">
          <Flame size={18} /> Мета
        </Link>
        <Link href="/tools" className="flex items-center gap-1 text-gray-500 italic cursor-not-allowed">
          🛠️ Инструменты
        </Link>
      </nav>

      {/* Discord + Profile desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="#">
          <button className="bg-white text-black rounded-2xl px-4 py-2 shadow-md hover:bg-gray-200">
            Join Discord
          </button>
        </Link>
        <Link href="/profile" className="hover:text-gray-300 transition">
          <User size={24} />
        </Link>
      </div>

      {/* Burger icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-900 p-6 flex flex-col justify-between z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-4 mt-12">
            <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-gray-300 transition"
            >
                <Flame size={18} /> Главная
            </Link>

            <Link
                href="/guides"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-gray-300 transition"
            >
                <Book size={18} /> Гайды
            </Link>

            <Link
                href="/meta"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-gray-300 transition"
            >
                <Flame size={18} /> Мета
            </Link>

            <Link
                href="/tools"
                className="flex items-center gap-2 text-gray-500 italic md:cursor-not-allowed md:pointer-events-none"
            >
                🛠 Инструменты
            </Link>
        </nav>

        <div className="flex flex-col gap-4">
          <Link href="#">
            <button className="bg-white text-black rounded-2xl px-4 py-2 shadow-md hover:bg-gray-200 w-full">
              Join Discord
            </button>
          </Link>
          <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <User size={20} /> Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
