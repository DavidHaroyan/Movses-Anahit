'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, VolumeX, Volume2 } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/wedding.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={togglePlay}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl glassmorphism transition-all duration-300 ${isPlaying ? 'bg-wedding-champagne text-white' : 'bg-white text-wedding-champagne'}`}
      aria-label="Toggle Music"
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white border-dashed"
            />
            <Volume2 className="w-6 h-6 z-10" />
          </>
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </div>
    </motion.button>
  );
}
