"use client";

import { useQuery } from "@tanstack/react-query";
import { ChannelGrid } from "@/components/ChannelGrid";
import { FilterBar } from "@/components/FilterBar";
import { Loader2, Tv, TrendingUp, Sparkles, Radio } from "lucide-react";
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
    staleTime: 1000 * 60 * 60,
  });

  const countries = useMemo(() => {
    if (!channels) return [];
    const countrySet = new Set(channels.map((c) => c.country));
    return Array.from(countrySet).sort();
  }, [channels]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1ed760] to-[#1db954] rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <Loader2 className="relative w-16 h-16 text-[#1ed760] animate-spin mx-auto" strokeWidth={2} />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-white">Loading Channels</p>
            <p className="text-sm text-white/50">Preparing your streaming experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl"></div>
            <Tv className="relative w-16 h-16 text-red-400 mx-auto" strokeWidth={2} />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Connection Error</h2>
            <p className="text-white/60">Unable to load channels. Please check your connection and try again.</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1ed760]/10 via-transparent to-[#1db954]/10 animate-float"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1ed760]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1db954]/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2">
              <Radio className="w-4 h-4 text-[#1ed760] animate-pulse" />
              <span className="text-sm font-semibold text-white/90">Live Streaming</span>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                <span className="gradient-text">Watch Live TV</span>
                <br />
                <span className="text-white">From Across Asia</span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-medium max-w-2xl">
                Stream 5,000+ channels from {countries.length} countries. Free, fast, and always online.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1ed760] to-[#1db954] flex items-center justify-center animate-glow">
                  <TrendingUp className="w-6 h-6 text-black" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{channels?.length.toLocaleString()}</div>
                  <div className="text-sm text-white/50 font-medium">Active Channels</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Tv className="w-6 h-6 text-[#1ed760]" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{countries.length}</div>
                  <div className="text-sm text-white/50 font-medium">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Filters */}
        <FilterBar countries={countries} />

        {/* Channel Grid */}
        <div>
          {channels && channels.length > 0 ? (
            <ChannelGrid channels={channels} />
          ) : (
            <div className="text-center py-20">
              <div className="glass-card max-w-md mx-auto p-12 space-y-4">
                <Tv className="w-16 h-16 text-white/30 mx-auto" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">No Channels Found</h3>
                  <p className="text-white/60">Try adjusting your filters or search query</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
