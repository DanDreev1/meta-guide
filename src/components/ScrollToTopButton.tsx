// components/ScrollToTopButton.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-700 text-white shadow-lg transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } hover:bg-gray-600`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}
