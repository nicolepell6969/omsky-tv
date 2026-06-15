"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Channel } from "@/lib/types";

interface ChannelCardProps {
  channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <Link href={`/watch/${channel.id}`} className="block group">
      <div className="spotify-card relative">
        {/* Image Container */}
        <div className="relative aspect-square mb-4 bg-[#282828] rounded-md overflow-hidden">
          {channel.logo ? (
            <Image
              src={channel.logo}
              alt={channel.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#535353]">
              <Play className="w-12 h-12" strokeWidth={1.5} />
            </div>
          )}
          
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
