"use client";

import Link from "next/link";
import { Home, Search, Tv, Globe } from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "#search" },
    { icon: Tv, label: "Live TV", href: "/" },
    { icon: Globe, label: "Countries", href: "#countries" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-black p-6 flex flex-col gap-6 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1ed760] to-[#1db954] rounded-lg flex items-center justify-center">
          <Tv className="w-6 h-6 text-black" strokeWidth={2.5} />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">Omsky TV</span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-md transition-colors group ${
                isActive
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#b3b3b3] hover:text-white"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? "text-white" : "text-[#b3b3b3] group-hover:text-white"
                }`}
                strokeWidth={2}
              />
              <span className="font-bold text-[14px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-6 border-t border-[#282828]">
        <div className="bg-gradient-to-br from-[#1f1f1f] to-[#121212] rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#1ed760] rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-[12px] uppercase tracking-wide">Live Now</span>
          </div>
          <p className="text-[#b3b3b3] text-[12px] leading-relaxed">
            Streaming live channels from Asia & worldwide
          </p>
        </div>
      </div>
    </aside>
  );
}
