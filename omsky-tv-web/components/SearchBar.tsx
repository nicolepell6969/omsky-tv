"use client";

import { Search, X } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface SearchBarProps {
  countries: string[];
}

export function SearchBar({ countries }: SearchBarProps) {
  const { searchQuery, setSearchQuery, selectedCountry, setSelectedCountry } = useAppStore();

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative max-w-[400px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b3b3b3]" strokeWidth={2.5} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search channels..."
          className="w-full bg-[#1f1f1f] text-white text-[14px] rounded-full pl-12 pr-12 py-3 outline-none transition-all focus:bg-[#2a2a2a] focus:outline-2 focus:outline-offset-0 focus:outline-white"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b3b3b3] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Country Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCountry("all")}
          className={`spotify-chip ${
            selectedCountry === "all" ? "spotify-chip-active" : ""
          }`}
        >
          All Countries
        </button>
        {countries.slice(0, 15).map((country) => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`spotify-chip ${
              selectedCountry === country ? "spotify-chip-active" : ""
            }`}
          >
            {country}
          </button>
        ))}
      </div>
    </div>
  );
}
