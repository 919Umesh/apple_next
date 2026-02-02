'use client';

import { Search, Bell } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isMarketOpen } from '@/lib/utils';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const marketOpen = isMarketOpen();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/stocks?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stocks..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-4">
          {/* Market status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
            <span
              className={`w-2 h-2 rounded-full ${
                marketOpen ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'
              }`}
            />
            <span className="text-sm text-zinc-400">
              Market {marketOpen ? 'Open' : 'Closed'}
            </span>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
