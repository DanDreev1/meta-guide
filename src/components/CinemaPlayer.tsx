import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Maximize, Minimize, Volume2, VolumeX } from "lucide-react";
import { useYoutubePlayer } from "@/hooks/useYoutubePlayer";

interface CinemaPlayerProps {
  video: {
    title: string;
    tags: string[];
    videoUrl?: string;
  };
  onClose: () => void;
}

export default function CinemaPlayer({ video, onClose }: CinemaPlayerProps) {
  console.log("videoUrl", video.videoUrl);
  const { playerRef, playerInstance, isReady, isPlaying } = useYoutubePlayer(video.videoUrl);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(100);
  const [previousVolume, setPreviousVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeBar, setShowVolumeBar] = useState(false);


  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerInstance.current;
    if (!player) return;
  
    const newVolume = parseInt(e.target.value, 10);
    player.setVolume(newVolume);
    setVolume(newVolume);
  
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setPreviousVolume(newVolume);
    }
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerInstance.current;
      if (
        player &&
        typeof player.getCurrentTime === "function" &&
        typeof player.getDuration === "function"
      ) {
        const current = player.getCurrentTime();
        const duration = player.getDuration();
        if (duration > 0) {
          setProgress((current / duration) * 100);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [playerInstance]);  

  const togglePlayPause = () => {
    const player = playerInstance.current;
  
    if (!isReady || !player) {
      console.warn("⛔ Player is not ready or not available:", player);
      return;
    }
  
    try {
      const state = player.getPlayerState?.();
      if (state === window.YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } catch (err) {
      console.error("Ошибка при получении состояния плеера:", err);
    }
  };     

  const toggleMute = () => {
    const player = playerInstance.current;
    if (!player) return;
  
    if (isMuted) {
      player.setVolume(previousVolume);
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      player.setVolume(0);
      setVolume(0);
    }
  
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerInstance.current;
    if (player?.getDuration) {
      const newTime = (parseFloat(e.target.value) / 100) * player.getDuration();
      player.seekTo(newTime, true);
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleFullscreen = () => {
    const element = fullscreenRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-40 ${
            isMiniPlayer ? "bottom-4 right-4 w-[256px] h-[144px]" : "inset-0"
        }`}
        onClick={!isMiniPlayer ? () => {
            setIsMiniPlayer(true);
            setIsFullscreen(false);
        } : undefined}
      >
        <motion.div
          ref={fullscreenRef}
          initial={{ scale: 0.95, y: 50 }}
          animate={{
            scale: 1,
            y: 0,
            ...(isMiniPlayer
              ? {
                  position: "fixed",
                  bottom: 16,
                  right: 16,
                  top: "auto",
                  left: "auto",
                  translateX: "0%",
                  translateY: "0%",
                  width: 256,
                  height: 144,
                  maxWidth: 256,
                  borderRadius: 12,
                }
              : {
                  top: "55%",
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                  bottom: "auto",
                  right: "auto",
                  width: "60%",
                  height: "auto",
                  maxWidth: "1000px",
                  borderRadius: 0,
                  position: "absolute",
                }),
          }}
          exit={{ scale: 0.95, y: 50 }}
          transition={{ duration: isMiniPlayer ? 0.3 : 0 }}
          className={`bg-gray-900 overflow-hidden shadow-xl z-50 w-full h-full ${
            isMiniPlayer ? "rounded-xl" : ""
          }`}
          onClick={(e) => {
            if (isMiniPlayer) {
              setIsMiniPlayer(false);
            }
            e.stopPropagation();
          }}
        >
          <div className={`relative ${isMiniPlayer ? "w-full h-full" : "aspect-video"} bg-black`}>
            <div ref={playerRef} className="absolute inset-0 z-0" />

            <button
              onClick={togglePlayPause}
              className="absolute bottom-3 left-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-20"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-20"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>

            <div 
                onMouseEnter={() => setShowVolumeBar(true)}
                onMouseLeave={() => setShowVolumeBar(false)}
                className="absolute bottom-3 left-14 flex items-center gap-2 z-20"
            >
                <button
                    onClick={toggleMute}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <AnimatePresence>
                    {showVolumeBar && (
                    <motion.input
                        key="volume-bar"
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={volume}
                        onChange={handleVolumeChange}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 100, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 appearance-none bg-gray-700 rounded cursor-pointer"
                        style={{
                        background: `linear-gradient(to right, #ef4444 ${volume}%, #374151 ${volume}%)`,
                        }}
                    />
                    )}
                </AnimatePresence>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-30"
            >
              <X size={20} />
            </button>
          </div>

          {!isMiniPlayer && (
            <div className="p-4">
              <div className="relative w-full h-2 mt-2">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 rounded-full -translate-y-1/2" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-red-500 rounded-full -translate-y-1/2"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={handleSeek}
                  className="absolute top-1/2 left-0 w-full h-2 appearance-none bg-transparent z-10 cursor-pointer -translate-y-1/2"
                />
              </div>

              <h2 className="text-white text-xl font-bold mb-2 mt-4">{video.title}</h2>
              <p className="text-sm text-gray-400">{video.tags.map((tag) => `#${tag}`).join(" ")}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}