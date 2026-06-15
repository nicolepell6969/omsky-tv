"use client";

import { ChannelCard } from "./ChannelCard";
import type { Channel } from "@/lib/types";

interface ChannelGridProps {
  channels: Channel[];
}

export function ChannelGrid({ channels }: ChannelGridProps) {
  return (
    <div className="spotify-grid">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  );
}
