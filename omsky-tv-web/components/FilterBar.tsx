"use client";

import { useAppStore } from "@/lib/store";
import { X, MapPin } from "lucide-react";

interface FilterBarProps {
  countries: string[];
}

const ASIA_COUNTRIES = [
  'ID', 'MY', 'SG', 'TH', 'PH', 'VN', 'KH', 'LA', 'MM', 'BN',
  'JP', 'KR', 'CN', 'TW', 'HK', 'MO',
  'IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV',
  'AE', 'SA', 'QA', 'KW', 'OM', 'BH', 'JO', 'LB', 'TR', 'IL',
];

export function FilterBar({ countries }: FilterBarProps) {
  const { selectedCountry, setSelectedCountry } = useAppStore();
  const asiaCountries = countries.filter(c => ASIA_COUNTRIES.includes(c));

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#1ed760]" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Filter by Country
          </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setSelectedCountry(null)}
          className={`filter-chip ${
            !selectedCountry ? 'filter-chip-active' : ''
          }`}
        >
          <span>All Countries</span>
        </button>
        {asiaCountries.map((country) => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`filter-chip ${
              selectedCountry === country ? 'filter-chip-active' : ''
            }`}
          >
            <span>{country}</span>
            {selectedCountry === country && (
              <X className="w-3.5 h-3.5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
