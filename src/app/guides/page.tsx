"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useInView } from "react-intersection-observer";
import CinemaPlayer from "@/components/CinemaPlayer";
import CharacterSelect from "@/components/ui/CharacterSelect";
import { useDebounce } from "@/hooks/useDebounce";
import AdminGuideForm from "@/components/AdminGuideForm";

import VideoCard from "@/components/VideoCard";

import { supabase } from '@/lib/supabaseClient'

// Данные по ролям
const roles = [
  { name: "Мид", image: "/roles/mid.webp" },
  { name: "Роум", image: "/roles/roam.webp" },
  { name: "Лес", image: "/roles/jungle.webp" },
  { name: "Опыт", image: "/roles/exp.webp" },
  { name: "Золото", image: "/roles/gold.webp" },
];

interface VideoData {
    id: string;
    title: string;
    tags: string[];
    video_url: string;
    created_at: string;
}

// Категории
const categories = ["База", "Для про", "Прокачка мышления", "Стратегии"];

export default function GuidesPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const videoLoadCache = useRef<{ [role: string]: number }>({});
  const [visibleCount, setVisibleCount] = useState(6);

  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const [loading, setLoading] = useState(true);

  const [guides, setGuides] = useState<VideoData[]>([]);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.role === 'admin') {
        setIsAdmin(true);
      }

      const res = await fetch("/api/guides");
      const data = await res.json();
      setGuides(data);
      setLoading(false);
    };
    getUserAndData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('guides')
          .select('*')
          .order('created_at', { ascending: false });
  
        if (error) console.error(error);
        else setGuides(data!);
      } catch (err) {
        console.error('Ошибка при получении данных:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [supabase]);  

  useEffect(() => {
    const fetchGuides = async () => {
      const res = await fetch("/api/guides");
      const data = await res.json();
  
      const normalized = data.map((item: any) => ({
        ...item,
        videoUrl: item.video_url,
      }));
  
      setGuides(normalized);
    };
    fetchGuides();
  }, []);  

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const filteredVideos = selectedRole
  ? guides.filter((video) => {
      const matchesRole = video.tags.includes(selectedRole.toLowerCase());
      const matchesSearch = search
        ? video.title.toLowerCase().includes(search.toLowerCase()) ||
          video.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
        : true;
      const matchesCharacter = selectedCharacter
        ? video.tags.includes(selectedCharacter.toLowerCase())
        : true;
      const matchesCategory = selectedCategory
        ? video.tags.includes(selectedCategory.toLowerCase())
        : true;

      return matchesRole && matchesSearch && matchesCharacter && matchesCategory;
    })
  : [];

  const visibleVideos = filteredVideos.slice(0, visibleCount);

    
  useEffect(() => {
    if (inView && visibleCount < filteredVideos.length) {
      setVisibleCount((prev) => prev + 6);
    }
  }, [inView, filteredVideos.length]);
  
  useEffect(() => {
    const cached = sessionStorage.getItem(`visible-${selectedRole}`);
    setVisibleCount(cached ? parseInt(cached) : 6);
  }, [selectedRole]);  

  useEffect(() => {
    // при смене роли
    const count = videoLoadCache.current[selectedRole ?? ""] ?? 6;
    setVisibleCount(count);
  }, [selectedRole]);
  
  // при догрузке
  useEffect(() => {
    if (selectedRole) {
      videoLoadCache.current[selectedRole] = visibleCount;
    }
  }, [visibleCount, selectedRole]);

  return (
    <>
        {selectedVideo && (
            <CinemaPlayer
                video={selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        )}

        <main className="px-6 py-12 pt-30 w-full max-w-[1800px] mx-auto">
        {/* Выбор ролей */}
        <AnimatePresence>
            {!selectedRole && (
                <motion.section
                    key="roles"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                >
                {roles.map((role) => (
                    <motion.div
                        key={role.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full cursor-pointer rounded-xl overflow-hidden border-2 bg-gray-900 ${
                            selectedRole === role.name ? "border-white" : "border-transparent"
                        }`}
                        onClick={() => setSelectedRole(role.name)}
                    >
                    {/* Картинка с высотой */}
                    <div className="w-full h-[300px] md:h-[360px] lg:h-[420px] relative">
                        <Image
                            src={role.image}
                            alt={role.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Название роли */}
                    <div className="text-center py-3 bg-gray-800 font-semibold text-white text-base sm:text-lg">
                        {role.name}
                    </div>
                    </motion.div>
                ))}
                </motion.section>
            )}
        </AnimatePresence>

        {/* После выбора роли */}
        <AnimatePresence>
            {selectedRole && (
            <motion.section
                key="filters"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-8"
            >
                <Button
                        variant="ghost"
                        className="w-fit text-white flex items-center gap-2 mb-4 border-white border-1"
                        onClick={() => setSelectedRole(null)}
                    >
                    <ArrowLeft size={18} /> Назад к ролям
                </Button>

                {/* Поиск */}
                <Input
                    placeholder={`Поиск видео для роли ${selectedRole}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-900 text-white border-gray-700"
                />

                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <Button 
                            key={cat} 
                            onClick={() => setSelectedCategory(prev => prev === cat.toLowerCase() ? null : cat.toLowerCase())}
                            variant="outline"
                            className={`border-white/20 hover:bg-white/10 hover:text-white ${selectedCategory === cat.toLowerCase() ? 'bg-white/10 text-white' : 'text-black'}`}
                        >
                        {cat}
                      </Button>                      
                    ))}
                </div>

                <CharacterSelect
                    selectedRole={selectedRole}
                    selectedCharacter={selectedCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                />

                {isAdmin && <AdminGuideForm />}

                {/* Тайтл перед видео */}
                <h3 className="text-2xl font-bold text-white mt-4">Самые популярные видео</h3>

                {/* Заглушка под видео */}

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleVideos.map((video, idx) => (
                    <motion.div
                        key={`${video.title}-${idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="cursor-pointer"
                    >
                        <VideoCard
                            title={video.title}
                            tags={video.tags}
                            videoUrl={video.video_url}
                            onClick={() => {
                                setFullscreen(false);
                                setTimeout(() => {
                                setSelectedVideo(video);
                                setFullscreen(true);
                                }, 50);
                            }}
                        />
                    </motion.div>
                ))}

                </div>

                {visibleCount < filteredVideos.length ? (
                    <div ref={loadMoreRef} className="h-10" />
                ) : (
                    <p className="text-center text-sm text-gray-500 mt-6">Вы посмотрели все видео</p>
                )}

            </motion.section>
            )}
        </AnimatePresence>
        </main>
    </> 
  );
}
