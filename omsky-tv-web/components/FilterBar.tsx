"use client";

import { useAppStore } from "@/lib/store";
import { X } from "lucide-react";

interface FilterBarProps {
  categories: string[];
  countries: string[];
}

export function FilterBar({ categories, countries }: FilterBarProps) {
  const { selectedCategory, selectedCountry, setSelectedCategory, setSelectedCountry } = useAppStore();

  return (
    <div className="space-y-4 mb-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#b3b3b3] uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`spotify-pill ${
              !selectedCategory ? 'bg-[#1ed760] text-black' : ''
            }`}
          >
            All
          </button>
          {categories.slice(0, 10).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`spotify-pill relative ${
                selectedCategory === category ? 'bg-[#1ed760] text-black' : ''
              }`}
            >
              {category}
              {selectedCategory === category && (
                <X className="w-3 h-3 ml-1 inline" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Country Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#b3b3b3] uppercase tracking-wider mb-3">
          Countries
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCountry(null)}
            className={`spotify-pill ${
              !selectedCountry ? 'bg-[#1ed760] text-black' : ''
            }`}
          >
            All
          </button>
          {countries.slice(0, 15).map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`spotify-pill relative ${
                selectedCountry === country ? 'bg-[#1ed760] text-black' : ''
              }`}
            >
              {country}
              {selectedCountry === country && (
                <X className="w-3 h-3 ml-1 inline" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
