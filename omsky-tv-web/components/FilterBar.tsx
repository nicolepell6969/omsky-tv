"use client";

import { useAppStore } from "@/lib/store";
import { X } from "lucide-react";

interface FilterBarProps {
  countries: string[];
}

const ASIA_COUNTRIES = [
  'ID', 'MY', 'SG', 'TH', 'PH', 'VN', 'KH', 'LA', 'MM', 'BN', // Southeast Asia
  'JP', 'KR', 'CN', 'TW', 'HK', 'MO', // East Asia
  'IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV', // South Asia
  'AE', 'SA', 'QA', 'KW', 'OM', 'BH', 'JO', 'LB', 'TR', 'IL', // Middle East
];

export function FilterBar({ countries }: FilterBarProps) {
  const { selectedCountry, setSelectedCountry } = useAppStore();

  // Filter to only show Asia countries that exist in our data
  const asiaCountries = countries.filter(c => ASIA_COUNTRIES.includes(c));

  return (
    <div className="mb-6">
      {/* Country Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#b3b3b3] uppercase tracking-wider mb-3">
          Asian Countries
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
          {asiaCountries.map((country) => (
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
