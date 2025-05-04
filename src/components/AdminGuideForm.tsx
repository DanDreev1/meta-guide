"use client";

import { useState } from "react";

export default function AdminGuideForm() {
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    tags: "",
  });

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      video_url: formData.video_url,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    const res = await fetch("/api/guides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    alert(result.message || result.error);
  };

  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-md text-white">
      <div className="flex flex-col gap-2">
        <input
          placeholder="Название гайда"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-gray-700 p-2 rounded"
        />
        <input
          placeholder="Ссылка на видео (YouTube)"
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          className="bg-gray-700 p-2 rounded"
        />
        <input
          placeholder="Теги (через запятую) пример: танк,инициатор,топ"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="bg-gray-700 p-2 rounded"
        />
        <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 rounded">
          Отправить гайд
        </button>
      </div>
    </div>
  );
}
