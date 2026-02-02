'use client';

import { cn } from '@/lib/utils';
import { SECTORS, type Sector } from '@/lib/types';

interface SectorFilterProps {
  selected: string | null;
  onSelect: (sector: string | null) => void;
}

export function SectorFilter({ selected, onSelect }: SectorFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-4 py-2 rounded-xl text-sm font-medium transition-all',
          !selected
            ? 'bg-emerald-600 text-white'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
        )}
      >
        All Sectors
      </button>
      {SECTORS.map((sector: Sector) => (
        <button
          key={sector}
          onClick={() => onSelect(sector)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all',
            selected === sector
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
          )}
        >
          {sector}
        </button>
      ))}
    </div>
  );
}
