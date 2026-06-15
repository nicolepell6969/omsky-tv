"use client";

import { useQuery } from "@tanstack/react-query";
import { ChannelGrid } from "@/components/ChannelGrid";
import { FilterBar } from "@/components/FilterBar";
import { Loader2, Tv } from "lucide-react";
import axios from "axios";
import { Channel } from "@/lib/types";
import { useMemo } from "react";

export default function HomePage() {
  const { data: channels, isLoading, error } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      const response = await axios.get<Channel[]>("/api/channels");
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  const categories = useMemo(() => {
    if (!channels) return [];
    const cats = new Set<string>();
    channels.forEach((c) => c.categories.forEach((cat) => cats.add(cat)));
    return Array.from(cats).sort();
  }, [channels]);

  const countries = useMemo(() => {
    if (!channels) return [];
    const countryMap = new Map<string, string>();
    channels.forEach((c) => {
      if (!countryMap.has(c.country)) {
        countryMap.set(c.country, c.country);
      }
    });
    return Array.from(countryMap.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [channels]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading channels...</p>
        <p className="text-sm text-muted-foreground mt-2">This may take a moment on first load</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Tv className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-xl text-muted-foreground">Failed to load channels</p>
        <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page</p>
      </div>
    );
  }

  if (!channels || channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Tv className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-xl text-muted-foreground">No channels available</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Welcome to Omsky TV
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Watch thousands of free TV channels from around the world. Live news,
          sports, movies, and more.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Tv className="h-5 w-5 text-primary" />
            <span className="font-semibold">{channels.length.toLocaleString()} Channels</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="font-semibold">{countries.length}+ Countries</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      {categories.length > 0 && countries.length > 0 && (
        <FilterBar categories={categories} countries={countries} />
      )}

      {/* Channel Grid */}
      <ChannelGrid channels={channels} />
    </div>
  );
}
