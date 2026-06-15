"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  http_referrer?: string;
  user_agent?: string;
  onError?: () => void;
}

export function VideoPlayer({ 
  src, 
  poster, 
  http_referrer, 
  user_agent, 
  onError 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setLoading(true);
    setError(false);

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Build HLS config with custom headers if needed
    const hlsConfig: Partial<Hls['config']> = {
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90,
      maxBufferLength: 30,
      maxMaxBufferLength: 60,
    };

    // Add custom headers for referrer/user-agent if provided
    if (http_referrer || user_agent) {
      hlsConfig.xhrSetup = (xhr: XMLHttpRequest) => {
        if (http_referrer) {
          xhr.setRequestHeader('Referer', http_referrer);
        }
        if (user_agent) {
          xhr.setRequestHeader('User-Agent', user_agent);
        }
      };
    }

    // Check if HLS is supported
    if (Hls.isSupported()) {
      const hls = new Hls(hlsConfig as any);
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.log('Autoplay prevented:', err);
          setLoading(false);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data);
        
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Network error, attempting recovery...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Media error, attempting recovery...');
              hls.recoverMediaError();
              break;
            default:
              console.log('Fatal error, cannot recover');
              setError(true);
              setLoading(false);
              onError?.();
              break;
          }
        }
      });

      video.addEventListener('loadeddata', () => {
        setLoading(false);
      });

      video.addEventListener('waiting', () => {
        setLoading(true);
      });

      video.addEventListener('playing', () => {
        setLoading(false);
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src;
      
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((err) => {
          console.log('Autoplay prevented:', err);
          setLoading(false);
        });
      });

      video.addEventListener('loadeddata', () => {
        setLoading(false);
      });

      video.addEventListener('error', () => {
        setError(true);
        setLoading(false);
        onError?.();
      });
    } else {
      setError(true);
      setLoading(false);
      console.error('HLS not supported in this browser');
    }

    // Cleanup
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, http_referrer, user_agent, onError]);

  if (error) {
    return (
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <p className="text-xl mb-2">⚠️ Stream Error</p>
          <p className="text-sm text-gray-400 text-center">
            Unable to load the stream. The channel may be offline or the stream URL is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        playsInline
        poster={poster}
        preload="metadata"
      />
    </div>
  );
}
