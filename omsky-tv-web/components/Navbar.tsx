"use client";

import Link from "next/link";
import { Search, Menu, X, Tv, Home, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#121212] border-b border-[#1f1f1f]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-[#1ed760] rounded-full flex items-center justify-center">
              <Tv className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold hidden sm:inline">Omsky TV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#1f1f1f]"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-[#1f1f1f] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#121212] p-4 space-y-4">
          <SearchBar />
          <div className="flex flex-col gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#1f1f1f] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
