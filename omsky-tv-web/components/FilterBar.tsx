"use client";

import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { getCountryFlag } from "@/lib/utils";

interface FilterBarProps {
  categories: string[];
  countries: Array<{ code: string; name: string }>;
}

export function FilterBar({ categories, countries }: FilterBarProps) {
  const {
    currentCategory,
    currentCountry,
    setCategory,
    setCountry,
    clearFilters,
  } = useAppStore();

  const hasFilters = currentCategory || currentCountry;

  return (
    <div className="space-y-4">
      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {currentCategory && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCategory(null)}
              className="gap-2"
            >
              {currentCategory}
              <X className="h-3 w-3" />
            </Button>
          )}
          {currentCountry && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCountry(null)}
              className="gap-2"
            >
              {getCountryFlag(currentCountry)}{" "}
              {countries.find((c) => c.code === currentCountry)?.name}
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Category Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 12).map((category) => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setCategory(currentCategory === category ? null : category)
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Country Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Popular Countries</h3>
        <div className="flex flex-wrap gap-2">
          {countries.slice(0, 12).map((country) => (
            <Button
              key={country.code}
              variant={currentCountry === country.code ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setCountry(currentCountry === country.code ? null : country.code)
              }
              className="gap-2"
            >
              {getCountryFlag(country.code)}
              {country.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
