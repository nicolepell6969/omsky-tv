"use client";

import { Channel } from "@/lib/types";
import { ChannelCard } from "./ChannelCard";
import { useAppStore } from "@/lib/store";
import { useMemo } from "react";

interface ChannelGridProps {
  channels: Channel[];
  title?: string;
}

export function ChannelGrid({ channels, title }: ChannelGridProps) {
  const { currentCategory, currentCountry, searchQuery } = useAppStore();

  const filteredChannels = useMemo(() => {
    let filtered = channels;

    // Filter by country
    if (currentCountry) {
      filtered = filtered.filter((c) => c.country === currentCountry);
    }

    // Filter by category
    if (currentCategory) {
      filtered = filtered.filter((c) =>
        c.categories.includes(currentCategory)
      );
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.categories.some((cat) => cat.toLowerCase().includes(query)) ||
          c.country.toLowerCase().includes(query)
      );
    }

    // Filter out NSFW content
    filtered = filtered.filter((c) => !c.is_nsfw);

    // Filter out closed channels
    filtered = filtered.filter((c) => !c.closed);

    return filtered;
  }, [channels, currentCategory, currentCountry, searchQuery]);

  if (filteredChannels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-xl text-muted-foreground">No channels found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <span className="text-sm text-muted-foreground">
            {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredChannels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
}
