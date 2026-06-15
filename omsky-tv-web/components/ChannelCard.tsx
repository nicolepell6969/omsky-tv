"use client";

import { Channel } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { Play, Heart } from "lucide-react";
import Link from "next/link";
import { getCountryFlag } from "@/lib/utils";

interface ChannelCardProps {
  channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.includes(channel.id);

  return (
    <div className="channel-card">
      <Link href={`/watch/${channel.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
          {channel.logo ? (
            <img
              src={channel.logo}
              alt={channel.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-5xl font-black text-white/20 group-hover:text-white/30 transition-colors duration-300">
                {channel.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="play-button">
            <div className="play-icon">
              <Play className="w-7 h-7 text-black fill-current ml-0.5" />
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Channel Info */}
        <div className="px-3 space-y-2">
          <h3 className="font-bold text-white truncate text-base leading-tight group-hover:text-[#1ed760] transition-colors duration-300">
            {channel.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span className="text-base">{getCountryFlag(channel.country)}</span>
            {channel.categories && channel.categories.length > 0 && (
              <span className="truncate font-medium">
                {channel.categories[0]}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(channel.id);
        }}
        className="absolute top-3 right-3 p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 hover:bg-black/90 hover:border-[#1ed760]/50 hover:scale-110 transition-all duration-300 z-10 group/fav"
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            isFavorite 
              ? "fill-[#1ed760] text-[#1ed760] scale-110" 
              : "text-white/70 group-hover/fav:text-white"
          }`}
        />
      </button>
    </div>
  );
}
