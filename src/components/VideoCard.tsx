"use client";

import React, { useState } from "react";
import Image from "next/image";
import { extractVideoId } from "@/lib/extractVideoId";

type VideoCardProps = {
  title: string;
  tags: string[];
  videoUrl?: string;
  onClick: () => void;
};

export default function VideoCard({ title, tags, videoUrl, onClick }: VideoCardProps) {
  const [error, setError] = useState(false);

  const videoId = videoUrl ? extractVideoId(videoUrl) : null;
  const previewImage = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  return (
    <div
      className="bg-gray-800 rounded-xl shadow p-3 cursor-pointer hover:scale-[1.02] transition"
      onClick={onClick}
    >
      {videoUrl && !error ? (
        <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-cover"
              onError={() => setError(true)}
            />
          )}

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-semibold">
            ▶ Нажмите для просмотра
          </div>
        </div>
      ) : (
        <div className="aspect-video bg-gray-700 rounded-md mb-2 flex items-center justify-center text-gray-400 text-sm">
          Видео недоступно
        </div>
      )}

      <h4 className="text-sm font-medium mb-1 text-white">{title}</h4>
      <p className="text-xs text-gray-400">{tags.map((tag) => `#${tag}`).join(" ")}</p>
    </div>
  );
}