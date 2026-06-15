"use client";

import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title?: string;
  onError?: () => void;
}

export function VideoPlayer({ src, title, onError }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Plyr
    playerRef.current = new Plyr(videoRef.current, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
      settings: ['quality', 'speed'],
      quality: {
        default: 720,
        options: [1080, 720, 480, 360],
      },
      ratio: '16:9',
      autoplay: true,
    });

    // Handle events
    const video = videoRef.current;
    
    const handleCanPlay = () => {
      setLoading(false);
      setError(false);
    };

    const handleError = () => {
      setLoading(false);
      setError(true);
      onError?.();
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handlePlaying = () => {
      setLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      playerRef.current?.destroy();
    };
  }, [src, onError]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        crossOrigin="anonymous"
      >
        <source src={src} type="application/x-mpegURL" />
        <source src={src} type="video/mp4" />
      </video>

      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-white mx-auto" />
            <p className="text-white text-sm">Loading stream...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90">
          <div className="text-center space-y-4 px-4">
            <div className="text-red-500 text-6xl">⚠️</div>
            <div>
              <h3 className="text-white text-xl font-semibold">Stream Unavailable</h3>
              <p className="text-gray-400 text-sm mt-2">
                This channel is currently offline or the stream URL is invalid.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
