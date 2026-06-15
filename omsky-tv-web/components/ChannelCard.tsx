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
    <div className="group relative spotify-card">
      {/* Card Content */}
      <Link href={`/watch/${channel.id}`} className="block">
        {/* Logo/Thumbnail */}
        <div className="relative aspect-square mb-4 bg-[#282828] rounded-md overflow-hidden">
          {channel.logo ? (
            <img
              src={channel.logo}
              alt={channel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#b3b3b3]">
              {channel.name.charAt(0).toUpperCase()}
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="spotify-play-button">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="space-y-1">
          <h3 className="font-bold text-white truncate text-base">
            {channel.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[#b3b3b3]">
            <span>{getCountryFlag(channel.country)}</span>
            {channel.categories && channel.categories.length > 0 && (
              <span className="truncate">
                {channel.categories.slice(0, 2).join(", ")}
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
        className="absolute top-2 right-2 p-2 rounded-full bg-black/70 hover:bg-black/90 transition-all hover:scale-110 z-10"
      >
        <Heart
          className={`w-4 h-4 ${
            isFavorite ? "fill-[#1ed760] text-[#1ed760]" : "text-white"
          }`}
        />
      </button>
    </div>
  );
}
