'use client';

import Link from 'next/link';
import { TrendingUp, TrendingDown, Activity, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Loading, ErrorDisplay } from '@/components/ui';
import { StockCard } from '@/components/stocks';
import { useMarketOverview, useTopGainers, useTopLosers } from '@/lib/hooks/useQueries';
import { formatNumber } from '@/lib/utils';

export default function HomePage() {
  const { data: overview, isLoading, error, refetch } = useMarketOverview();
  const { data: gainersData } = useTopGainers(5);
  const { data: losersData } = useTopLosers(5);

  if (isLoading) {
    return <Loading message="Loading market data..." />;
  }

  if (error) {
    return <ErrorDisplay message="Failed to load market data" onRetry={refetch} />;
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Market Overview</h1>
        <p className="text-zinc-400">
          Track real-time stock prices and market trends
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Total Companies</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatNumber(overview?.total_companies ?? 0)}
                </p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Activity className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Top Gainers</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {overview?.top_gainers?.length ?? 0}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Top Losers</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {overview?.top_losers?.length ?? 0}
                </p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-xl">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Most Active</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {overview?.most_active?.length ?? 0}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Activity className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Gainers and Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <CardTitle>Top Gainers</CardTitle>
            </div>
            <Link
              href="/stocks?filter=gainers"
              className="text-sm text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {gainersData?.gainers?.slice(0, 5).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
            {!gainersData?.gainers?.length && (
              <p className="text-zinc-500 text-center py-4">No data available</p>
            )}
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <CardTitle>Top Losers</CardTitle>
            </div>
            <Link
              href="/stocks?filter=losers"
              className="text-sm text-red-500 hover:text-red-400 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {losersData?.losers?.slice(0, 5).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
            {!losersData?.losers?.length && (
              <p className="text-zinc-500 text-center py-4">No data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Most Active */}
      {overview?.most_active && overview.most_active.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <CardTitle>Most Active</CardTitle>
            </div>
            <Link
              href="/stocks"
              className="text-sm text-blue-500 hover:text-blue-400 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {overview.most_active.slice(0, 6).map((company) => (
                <Link
                  key={company.id}
                  href={`/stocks/${company.symbol}`}
                  className="p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">{company.symbol}</span>
                    <span className="text-xs text-zinc-500">{company.sector}</span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-1">{company.name}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
