"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Tv } from "lucide-react";
import type { Channel } from "@/lib/types";

interface ChannelCardProps {
  channel: Channel;
}

// Generate logo URL from channel name using ui-avatars or logo placeholder
function getChannelLogoUrl(channel: Channel): string {
  // Try to use channel website favicon
  if (channel.website) {
    try {
      const domain = new URL(channel.website).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      // Fallback if URL parsing fails
    }
  }
  
  // Fallback: Generate colorful avatar from channel name
  const name = encodeURIComponent(channel.name);
  const colors = ['1ed760', '1db954', '535353', 'ffffff', 'b3b3b3'];
  const colorIndex = channel.name.length % colors.length;
  const bgColor = colors[colorIndex];
  const textColor = bgColor === 'ffffff' ? '000000' : 'ffffff';
  
  return `https://ui-avatars.com/api/?name=${name}&size=256&background=${bgColor}&color=${textColor}&bold=true&format=png`;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const logoUrl = getChannelLogoUrl(channel);
  
  return (
    <Link href={`/watch/${channel.id}`} className="block group">
      <div className="spotify-card relative">
        {/* Image Container */}
        <div className="relative aspect-square mb-4 bg-[#282828] rounded-md overflow-hidden">
          <Image
            src={logoUrl}
            alt={channel.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 p-4"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            onError={(e) => {
              // Fallback to icon on error
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Fallback Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-[#535353]">
            <Tv className="w-16 h-16" strokeWidth={1.5} />
          </div>
          
          {/* Play Button Overlay - Spotify Style */}
          <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Play className="w-5 h-5 text-black fill-black ml-0.5" strokeWidth={0} />
          </div>
        </div>

        {/* Channel Info */}
        <div className="space-y-1 px-1">
          <h3 className="font-bold text-[14px] line-clamp-2 leading-tight text-white">
            {channel.name}
          </h3>
          <p className="text-[14px] text-[#b3b3b3] font-normal">
            {channel.country}
          </p>
        </div>
      </div>
    </Link>
  );
}
