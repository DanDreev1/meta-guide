import { useRef, useState, useEffect } from "react";
import { extractVideoId } from "@/lib/extractVideoId";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const useYoutubePlayer = (videoUrl?: string) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<YT.Player | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!videoUrl) return;

    const videoId = extractVideoId(videoUrl);
    if (!videoId) return;

    const createPlayer = () => {
      if (!playerRef.current) return;

      playerInstance.current = new window.YT.Player(playerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (e) => setIsPlaying(e.data === window.YT.PlayerState.PLAYING),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    return () => {
      playerInstance.current?.destroy();
      playerInstance.current = null;
    };
  }, [videoUrl]);

  return { playerRef, playerInstance, isReady, isPlaying };
};