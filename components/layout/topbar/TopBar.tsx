"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side: Breadcrumb */}
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Product Management
          </h2>
        </div>

        {/* Right side: Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg">
            <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Umesh Sharma
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Admin
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </div>
        </div>
      </div>
    </header>
  );
}