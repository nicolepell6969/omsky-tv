"use client";

import { Channel } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { getCountryFlag } from "@/lib/utils";
import { Heart, Play } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ChannelCardProps {
  channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useAppStore();
  const favorite = isFavorite(channel.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(channel.id);
    } else {
      addFavorite(channel.id);
    }
  };

  return (
    <Link href={`/watch/${channel.id}`}>
      <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
            {channel.logo ? (
              <Image
                src={channel.logo}
                alt={channel.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <Play className="h-12 w-12 text-white/50" />
            )}
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Play className="h-16 w-16 text-white" />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleFavorite}
            >
              <Heart 
                className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
              />
            </Button>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold line-clamp-1 flex-1">{channel.name}</h3>
              <span className="text-2xl flex-shrink-0">
                {getCountryFlag(channel.country)}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {channel.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
