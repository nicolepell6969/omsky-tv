"use client";

import { useQuery } from "@tanstack/react-query";
import { ChannelGrid } from "@/components/ChannelGrid";
import { FilterBar } from "@/components/FilterBar";
import { Loader2, Tv, TrendingUp, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import type { Channel } from "@/lib/types";

const fetchChannels = async (): Promise<Channel[]> => {
  const res = await fetch("/api/channels");
  if (!res.ok) throw new Error("Failed to fetch channels");
  return res.json();
};

export default function HomePage() {
  const { searchQuery } = useAppStore();

  const { data: channels, isLoading, error } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const countries = useMemo(() => {
    if (!channels) return [];
    const countrySet = new Set(channels.map((c) => c.country));
    return Array.from(countrySet).sort();
  }, [channels]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#1ed760] animate-spin mx-auto" />
          <p className="text-[#b3b3b3] text-lg">Loading channels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Tv className="w-12 h-12 text-[#f3727f] mx-auto" />
          <p className="text-[#f3727f] text-lg">Failed to load channels</p>
          <button
            onClick={() => window.location.reload()}
            className="spotify-button-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1f1f1f] to-[#121212] px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Omsky TV</h1>
              <p className="text-[#b3b3b3]">Watch live TV channels from Asia</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#1ed760]" />
              <span className="text-[#b3b3b3]">{channels?.length.toLocaleString()} Channels</span>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#1ed760]" />
              <span className="text-[#b3b3b3]">{countries.length} Countries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <FilterBar countries={countries} />

        {/* Channel Grid */}
        <div className="mt-8">
          {channels && channels.length > 0 ? (
            <ChannelGrid channels={channels} />
          ) : (
            <div className="text-center py-20">
              <Tv className="w-16 h-16 text-[#b3b3b3] mx-auto mb-4" />
              <p className="text-[#b3b3b3] text-lg">No channels found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
