"use client"

import { useState } from "react"
import { charactersData } from "@/lib/data/charactersData"

export default function AdminForm({
  selectedRank,
  onClose,
}: {
  selectedRank: string
  onClose: () => void
}) {
  const [mode, setMode] = useState<"custom" | "json">("custom")
  const [formData, setFormData] = useState({
    name: "",
    picks: "",
    bans: "",
    winrate: "",
  })
  const [jsonInput, setJsonInput] = useState("")

  const handleCustomSubmit = async () => {
    const character = charactersData.find(
      (c) => c.name.toLowerCase() === formData.name.toLowerCase()
    )
    if (!character) return alert("Герой не найден")

    const payload = {
      name: character.name,
      rank: selectedRank,
      roles: character.roles,
      picks: parseFloat(formData.picks),
      bans: parseFloat(formData.bans),
      winrate: parseFloat(formData.winrate),
    }

    const res = await fetch("/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = await res.json()
    alert(result.message || result.error)
  }

  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-md text-white">
      <div className="flex flex-col gap-2">
          <input
            placeholder="Имя героя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          />
          <input
            placeholder="Пики (%)"
            value={formData.picks}
            onChange={(e) => setFormData({ ...formData, picks: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          />
          <input
            placeholder="Баны (%)"
            value={formData.bans}
            onChange={(e) => setFormData({ ...formData, bans: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          />
          <input
            placeholder="Винрейт (%)"
            value={formData.winrate}
            onChange={(e) => setFormData({ ...formData, winrate: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          />
          <div className="flex gap-2">
            <button onClick={handleCustomSubmit} className="bg-blue-500 px-4 py-2 rounded">
              Отправить
            </button>
            <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded">
              Закрыть
            </button>
          </div>
        </div>
    </div>
  )
}