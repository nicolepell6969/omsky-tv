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
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
      <input
        type="text"
        placeholder="Search channels..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full bg-[#1f1f1f] text-white rounded-full pl-12 pr-12 py-3 outline-none transition-all ${
          isFocused ? 'ring-1 ring-white' : ''
        }`}
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[#2a2a2a] rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-[#b3b3b3]" />
        </button>
      )}
    </div>
  );
}
