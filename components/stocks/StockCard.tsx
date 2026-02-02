import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercent, getChangeColor } from '@/lib/utils';
import type { PriceChange } from '@/lib/types';

interface StockCardProps {
  stock: PriceChange;
}

export function StockCard({ stock }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Link
      href={`/stocks/${stock.symbol}`}
      className="block p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{stock.symbol}</h3>
          <p className="text-sm text-zinc-500 truncate max-w-[150px]">
            {stock.name}
          </p>
        </div>
        <div
          className={`p-1.5 rounded-lg ${
            isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'
          }`}
        >
          <TrendIcon
            className={`w-4 h-4 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
          />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-lg font-bold text-white">
          {formatCurrency(stock.current_price)}
        </p>
        <p className={`text-sm font-medium ${getChangeColor(stock.change)}`}>
          {formatPercent(stock.change_percent)}
        </p>
      </div>
    </Link>
  );
}
