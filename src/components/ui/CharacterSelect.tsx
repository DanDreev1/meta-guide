import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { charactersData } from "@/lib/data/charactersData";

interface CharacterFilterProps {
  selectedCharacter: string | null;
  setSelectedCharacter: (name: string | null) => void;
  selectedRole: string | null;
}

const classOptions = ["Поддержка", "Танк", "Маг", "Стрелок", "Боец", "Убийца"];

export default function CharacterFilter({
  selectedCharacter,
  setSelectedCharacter,
  selectedRole,
}: CharacterFilterProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const filteredCharacters = charactersData.filter((character) => {
    const roleMatch = selectedRole ? character.roles.includes(selectedRole.toLowerCase()) : true;
    const classMatch = selectedClasses.length > 0
      ? selectedClasses.every((cls) => character.class && Array.isArray(character.class) && character.class.includes(cls))
      : true;
    return roleMatch && classMatch;
  });

  const visibleCharacters = showAll
    ? filteredCharacters
    : filteredCharacters.slice(0, 6);

  return (
    <div>
      {/* Фильтры классов */}
      <div className="flex flex-wrap gap-2 mb-4">
        {classOptions.map((cls) => (
          <button
            key={cls}
            onClick={() => toggleClass(cls)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
              selectedClasses.includes(cls)
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex flex-wrap gap-2">
        {filteredCharacters.map((char) => (
          <button
            key={char.name}
            onClick={() =>
              setSelectedCharacter(
                selectedCharacter === char.name ? null : char.name
              )
            }
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
              selectedCharacter === char.name
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {char.name}
          </button>
        ))}
      </div>

      {/* Mobile view with animation */}
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={showAll ? "expanded" : "collapsed"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {visibleCharacters.map((char) => (
                <button
                  key={char.name}
                  onClick={() =>
                    setSelectedCharacter(
                      selectedCharacter === char.name ? null : char.name
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                    selectedCharacter === char.name
                      ? "bg-white text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {char.name}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {filteredCharacters.length > 6 && (
          <div className="mt-2 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-400 text-sm hover:underline"
            >
              {showAll ? "Скрыть" : "Показать всех"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
