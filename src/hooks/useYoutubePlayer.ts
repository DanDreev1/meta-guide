import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const useYoutubePlayer = (videoUrl?: string) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerInstance = useRef<YT.Player | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const extractVideoId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] || null;
  };

  useEffect(() => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return;

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer(videoId);
      } else {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
          createPlayer(videoId);
        };
      }
    };

    const createPlayer = (videoId: string) => {
      if (!playerRef.current) return;

      if (playerInstance.current) {
        playerInstance.current.destroy();
      }

      playerInstance.current = new window.YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true);
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    loadYouTubeAPI();
  }, [videoUrl]);

  return { playerRef, playerInstance, isReady, isPlaying };
};