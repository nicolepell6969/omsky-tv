"use client";

import { useQuery } from "@tanstack/react-query";
import { ChannelGrid } from "@/components/ChannelGrid";
import { SearchBar } from "@/components/SearchBar";
import { Loader2, Tv } from "lucide-react";
import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import type { Channel } from "@/lib/types";

const fetchChannels = async (): Promise<Channel[]> => {
  const res = await fetch("/api/channels");
  if (!res.ok) throw new Error("Failed to fetch channels");
  return res.json();
};

export default function HomePage() {
  const { searchQuery, selectedCountry } = useAppStore();

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

  const filteredChannels = useMemo(() => {
    if (!channels) return [];
    
    let result = channels;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by country
    if (selectedCountry && selectedCountry !== "all") {
      result = result.filter((c) => c.country === selectedCountry);
    }
    
    return result;
  }, [channels, searchQuery, selectedCountry]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#1ed760] animate-spin mx-auto" strokeWidth={2.5} />
          <p className="text-sm text-[#b3b3b3]">Loading channels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <Tv className="w-16 h-16 text-[#f3727f] mx-auto" strokeWidth={2} />
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Connection Error</h2>
            <p className="text-sm text-[#b3b3b3]">Unable to load channels. Please try again.</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="spotify-btn-green"
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
      <div className="bg-gradient-to-b from-[#1f1f1f] via-[#181818] to-[#121212] pt-20 pb-12 lg:pt-20 pt-24">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="space-y-4 mb-8">
            <h1 className="text-[48px] md:text-[72px] font-black tracking-tight leading-none">
              Omsky TV
            </h1>
            <p className="text-[16px] text-[#b3b3b3] max-w-2xl">
              {channels?.length.toLocaleString() || '5,000+'} live channels • {countries.length} countries
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar countries={countries} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Results Header */}
        {(searchQuery || selectedCountry !== "all") && (
          <div className="mb-6">
            <p className="text-[14px] text-[#b3b3b3]">
              {filteredChannels.length.toLocaleString()} channels
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCountry && selectedCountry !== "all" && ` from ${selectedCountry}`}
            </p>
          </div>
        )}

        {/* Channel Grid */}
        <ChannelGrid channels={filteredChannels} />

        {/* Empty State */}
        {filteredChannels.length === 0 && (
          <div className="text-center py-20">
            <Tv className="w-16 h-16 text-[#535353] mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-[16px] font-bold mb-2">No channels found</h3>
            <p className="text-[14px] text-[#b3b3b3]">Try a different search or filter</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#282828] py-12 mt-20">
        <div className="max-w-[1800px] mx-auto px-6 text-center space-y-4">
          <p className="text-[12px] text-[#b3b3b3]">
            © 2026 Omsky TV • Powered by{" "}
            <a 
              href="https://github.com/iptv-org/iptv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#1ed760] transition-colors underline"
            >
              iptv-org
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
