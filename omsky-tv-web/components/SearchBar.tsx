"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1ed760]/20 to-[#1db954]/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center">
        <Search className="absolute left-5 w-5 h-5 text-white/40 group-focus-within:text-[#1ed760] transition-colors duration-300" />
        <input
          type="text"
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input w-full pl-14 pr-12"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <X className="w-4 h-4 text-white/60 hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
