'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, Users, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Loading, ErrorDisplay, Badge, Button } from '@/components/ui';
import { StockChart } from '@/components/charts';
import { TradeForm } from '@/components/stocks';
import { useCompany, useStockPrice, usePriceHistory, useStockEvents, usePortfolio } from '@/lib/hooks/useQueries';
import { formatCurrency, formatNumber, formatPercent, formatDate, getChangeColor } from '@/lib/utils';
import type { Timeframe } from '@/lib/types';
import { useAuthStore } from '@/lib/stores/authStore';

const TIMEFRAMES: { label: string; value: Timeframe; days: number }[] = [
  { label: '1W', value: '1d', days: 7 },
  { label: '1M', value: '1d', days: 30 },
  { label: '3M', value: '1d', days: 90 },
  { label: '1Y', value: '1d', days: 365 },
];

export default function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params);
  const [selectedTimeframe, setSelectedTimeframe] = useState(TIMEFRAMES[1]);
  const { isAuthenticated } = useAuthStore();

  const { data: companyData, isLoading: companyLoading, error: companyError } = useCompany(symbol);
  const { data: priceData, isLoading: priceLoading } = useStockPrice(symbol);
  const { data: historyData, isLoading: historyLoading } = usePriceHistory(
    symbol,
    selectedTimeframe.value,
    selectedTimeframe.days
  );
  const { data: eventsData } = useStockEvents(symbol);
  const { data: portfolioData } = usePortfolio();

  const company = companyData?.company;
  const price = priceData?.price;
  const priceHistory = historyData?.prices ?? [];
  const events = eventsData?.events ?? [];

  // Calculate owned quantity from portfolio
  const holding = portfolioData?.holdings?.find((h) => h.company_symbol === symbol);
  const ownedQuantity = holding?.quantity ?? 0;

  // Calculate price change
  const priceChange = price ? price.close_price - price.open_price : 0;
  const priceChangePercent = price && price.open_price > 0 
    ? (priceChange / price.open_price) * 100 
    : 0;
  const isPositive = priceChange >= 0;

  if (companyLoading || priceLoading) {
    return <Loading message="Loading stock details..." />;
  }

  if (companyError || !company) {
    return <ErrorDisplay message={`Stock ${symbol} not found`} />;
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/stocks"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Stocks
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{company.symbol}</h1>
            <Badge variant={company.is_active ? 'success' : 'default'}>
              {company.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <p className="text-lg text-zinc-400 mb-4">{company.name}</p>
          
          {/* Company meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{company.sector}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{formatNumber(company.employees)} employees</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Founded {company.founded_year}</span>
            </div>
          </div>
        </div>

        {/* Price display */}
        {price && (
          <div className="text-right">
            <p className="text-3xl font-bold text-white mb-1">
              {formatCurrency(price.close_price)}
            </p>
            <div className={`flex items-center gap-2 justify-end ${getChangeColor(priceChange)}`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="font-medium">
                {formatCurrency(Math.abs(priceChange))} ({formatPercent(priceChangePercent)})
              </span>
            </div>
            <p className="text-sm text-zinc-500 mt-1">Today&apos;s Change</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Chart and details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Price History</CardTitle>
              <div className="flex gap-2">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf.label}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedTimeframe.label === tf.label
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <Loading size="sm" message="Loading chart..." />
              ) : priceHistory.length > 0 ? (
                <StockChart data={priceHistory} height={350} />
              ) : (
                <p className="text-center text-zinc-500 py-12">No price data available</p>
              )}
            </CardContent>
          </Card>

          {/* Price stats */}
          {price && (
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <p className="text-sm text-zinc-500 mb-1">Open</p>
                    <p className="text-lg font-semibold text-white">
                      {formatCurrency(price.open_price)}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <p className="text-sm text-zinc-500 mb-1">High</p>
                    <p className="text-lg font-semibold text-emerald-500">
                      {formatCurrency(price.high_price)}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <p className="text-sm text-zinc-500 mb-1">Low</p>
                    <p className="text-lg font-semibold text-red-500">
                      {formatCurrency(price.low_price)}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <p className="text-sm text-zinc-500 mb-1">Volume</p>
                    <p className="text-lg font-semibold text-white">
                      {formatNumber(price.volume)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400 leading-relaxed">{company.description}</p>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  Market Cap: <span className="text-white font-medium">{formatCurrency(company.market_cap)}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Events */}
          {events.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-zinc-800/50 rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-white">{event.title}</p>
                        <p className="text-sm text-zinc-500">{event.description}</p>
                      </div>
                      <Badge variant={event.impact_percentage >= 0 ? 'success' : 'danger'}>
                        {formatPercent(event.impact_percentage)}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {formatDate(event.event_date)} • {event.event_type}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column - Trade form */}
        <div className="space-y-6">
          {isAuthenticated && price ? (
            <TradeForm
              symbol={symbol}
              currentPrice={price.close_price}
              ownedQuantity={ownedQuantity}
            />
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-zinc-400 mb-4">
                  Log in to start trading {symbol}
                </p>
                <Link href="/login">
                  <Button>Login to Trade</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Owned shares info */}
          {isAuthenticated && holding && (
            <Card>
              <CardHeader>
                <CardTitle>Your Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Shares Owned</span>
                  <span className="text-white font-medium">{holding.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Avg. Buy Price</span>
                  <span className="text-white font-medium">
                    {formatCurrency(holding.avg_buy_price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Invested</span>
                  <span className="text-white font-medium">
                    {formatCurrency(holding.total_invested)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Current Value</span>
                  <span className="text-white font-medium">
                    {formatCurrency(holding.current_value)}
                  </span>
                </div>
                <div className="pt-3 border-t border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Profit/Loss</span>
                  <span className={`font-bold ${getChangeColor(holding.profit_loss)}`}>
                    {formatCurrency(holding.profit_loss)} ({formatPercent(holding.profit_loss_percent)})
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
