"use client";

import { Tv, Menu, X } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Tv className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Omsky TV
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4">
          <SearchBar />
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
