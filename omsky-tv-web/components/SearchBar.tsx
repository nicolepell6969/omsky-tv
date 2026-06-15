"use client";

import { Search, X, Trophy } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface SearchBarProps {
  countries: string[];
}

// Asian countries mapping for filter display
const ASIAN_COUNTRIES = {
  'ID': 'Indonesia',
  'MY': 'Malaysia',
  'SG': 'Singapore',
  'TH': 'Thailand',
  'PH': 'Philippines',
  'VN': 'Vietnam',
  'JP': 'Japan',
  'KR': 'South Korea',
  'CN': 'China',
  'IN': 'India',
  'TW': 'Taiwan',
  'HK': 'Hong Kong',
  'PK': 'Pakistan',
  'BD': 'Bangladesh',
  'AE': 'UAE',
  'SA': 'Saudi Arabia',
};

export function SearchBar({ countries }: SearchBarProps) {
  const { searchQuery, setSearchQuery, selectedCountry, setSelectedCountry, selectedCategory, setSelectedCategory } = useAppStore();

  // Filter to show only Asian countries that actually have channels
  const asianCountriesWithChannels = Object.keys(ASIAN_COUNTRIES)
    .filter(code => countries.includes(code))
    .sort((a, b) => {
      // Indonesia first, then alphabetical
      if (a === 'ID') return -1;
      if (b === 'ID') return 1;
      return ASIAN_COUNTRIES[a as keyof typeof ASIAN_COUNTRIES]
        .localeCompare(ASIAN_COUNTRIES[b as keyof typeof ASIAN_COUNTRIES]);
    });

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

      {/* Category Filter - Sports Special */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`spotify-chip ${
            selectedCategory === "all" ? "spotify-chip-active" : ""
          }`}
        >
          All Categories
        </button>
        <button
          onClick={() => setSelectedCategory("sports")}
          className={`spotify-chip ${
            selectedCategory === "sports" ? "spotify-chip-active" : ""
          } flex items-center gap-1.5`}
        >
          <Trophy className="w-3.5 h-3.5" strokeWidth={2.5} />
          Sports & World Cup
        </button>
      </div>

      {/* Country Filter - Asian Countries Only */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCountry("all")}
          className={`spotify-chip ${
            selectedCountry === "all" ? "spotify-chip-active" : ""
          }`}
        >
          All Countries
        </button>
        {asianCountriesWithChannels.map((countryCode) => (
          <button
            key={countryCode}
            onClick={() => setSelectedCountry(countryCode)}
            className={`spotify-chip ${
              selectedCountry === countryCode ? "spotify-chip-active" : ""
            }`}
          >
            {ASIAN_COUNTRIES[countryCode as keyof typeof ASIAN_COUNTRIES]}
          </button>
        ))}
      </div>
    </div>
  );
}
