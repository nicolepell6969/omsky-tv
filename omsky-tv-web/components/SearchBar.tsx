"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
      if (localQuery) {
        router.push('/');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery, router]);

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search channels..."
        className="pl-10 bg-secondary/50 border-none"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
    </div>
  );
}
