"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface LazyImageProps extends ImageProps {
  loaderText?: string;
  className?: string;
  wrapperClassName?: string;
}

export default function LazyImage({
  loaderText = "Загрузка изображения...",
  className = "",
  wrapperClassName = "",
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full aspect-[250/407] ${wrapperClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 text-white text-sm z-10">
          {loaderText}
        </div>
      )}
      <Image
        {...props}
        fill
        className={`${className} transition-transform duration-500 ease-in-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        } group-hover:scale-110`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
