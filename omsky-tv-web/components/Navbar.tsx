"use client";

import Link from "next/link";
import { Search, Tv, Sparkles } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1ed760] to-[#1db954] rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#1ed760] to-[#1db954] rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-6">
                <Tv className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold gradient-text">Omsky TV</span>
              <div className="text-xs text-white/50 font-medium">Free IPTV Asia</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Stats Badge */}
          <div className="hidden lg:flex items-center gap-2 glass-card px-4 py-2">
            <Sparkles className="w-4 h-4 text-[#1ed760]" />
            <span className="text-sm font-medium text-white/80">5,000+ Channels</span>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
