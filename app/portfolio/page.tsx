'use client';

import Link from 'next/link';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Loading, ErrorDisplay, Badge } from '@/components/ui';
import { PortfolioChart } from '@/components/charts';
import { useWallet, usePortfolio } from '@/lib/hooks/useQueries';
import { formatCurrency, formatPercent, getChangeColor } from '@/lib/utils';
import { useAuthStore } from '@/lib/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PortfolioPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  
  const { data: walletData, isLoading: walletLoading, error: walletError } = useWallet();
  const { data: portfolioData, isLoading: portfolioLoading, error: portfolioError, refetch } = usePortfolio();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/portfolio');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    return <Loading message="Checking authentication..." />;
  }

  if (walletLoading || portfolioLoading) {
    return <Loading message="Loading portfolio..." />;
  }

  if (walletError || portfolioError) {
    return <ErrorDisplay message="Failed to load portfolio" onRetry={refetch} />;
  }

  const wallet = walletData?.wallet;
  const portfolio = portfolioData;
  const holdings = portfolio?.holdings ?? [];
  const isProfit = (portfolio?.total_profit_loss ?? 0) >= 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-zinc-400">Track your investments and performance</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-zinc-400">Available Balance</p>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Wallet className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(wallet?.balance ?? 0)}
            </p>
          </CardContent>
        </Card>

        {/* Total Invested */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-zinc-400">Total Invested</p>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(portfolio?.total_invested ?? 0)}
            </p>
          </CardContent>
        </Card>

        {/* Current Value */}
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-zinc-400">Current Value</p>
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(portfolio?.total_value ?? 0)}
            </p>
          </CardContent>
        </Card>

        {/* Profit/Loss */}
        <Card
          className={`bg-gradient-to-br ${
            isProfit
              ? 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20'
              : 'from-red-500/10 to-red-500/5 border-red-500/20'
          }`}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-zinc-400">Total P/L</p>
              <div className={`p-2 rounded-lg ${isProfit ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                {isProfit ? (
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
            <p className={`text-2xl font-bold ${getChangeColor(portfolio?.total_profit_loss ?? 0)}`}>
              {formatCurrency(portfolio?.total_profit_loss ?? 0)}
            </p>
            <p className={`text-sm ${getChangeColor(portfolio?.profit_loss_percent ?? 0)}`}>
              {formatPercent(portfolio?.profit_loss_percent ?? 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            {holdings.length > 0 ? (
              <PortfolioChart holdings={holdings} height={280} />
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-500 mb-4">No holdings yet</p>
                <Link
                  href="/stocks"
                  className="text-emerald-500 hover:text-emerald-400"
                >
                  Browse stocks to start trading
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Holdings list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Holdings ({holdings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {holdings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-zinc-500 border-b border-zinc-800">
                      <th className="pb-3 font-medium">Stock</th>
                      <th className="pb-3 font-medium text-right">Qty</th>
                      <th className="pb-3 font-medium text-right">Avg. Price</th>
                      <th className="pb-3 font-medium text-right">Current</th>
                      <th className="pb-3 font-medium text-right">Value</th>
                      <th className="pb-3 font-medium text-right">P/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {holdings.map((holding) => (
                      <tr key={holding.id} className="hover:bg-zinc-800/50">
                        <td className="py-4">
                          <Link
                            href={`/stocks/${holding.company_symbol}`}
                            className="hover:text-emerald-500 transition-colors"
                          >
                            <p className="font-medium text-white">
                              {holding.company_symbol}
                            </p>
                            <p className="text-sm text-zinc-500 truncate max-w-[150px]">
                              {holding.company_name}
                            </p>
                          </Link>
                        </td>
                        <td className="py-4 text-right text-white">
                          {holding.quantity}
                        </td>
                        <td className="py-4 text-right text-zinc-400">
                          {formatCurrency(holding.avg_buy_price)}
                        </td>
                        <td className="py-4 text-right text-white">
                          {formatCurrency(holding.current_price)}
                        </td>
                        <td className="py-4 text-right text-white font-medium">
                          {formatCurrency(holding.current_value)}
                        </td>
                        <td className="py-4 text-right">
                          <div className={getChangeColor(holding.profit_loss)}>
                            <p className="font-medium">
                              {formatCurrency(holding.profit_loss)}
                            </p>
                            <p className="text-sm">
                              {formatPercent(holding.profit_loss_percent)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-500 mb-4">
                  You don&apos;t have any holdings yet.
                </p>
                <Link
                  href="/stocks"
                  className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400"
                >
                  Start Trading <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
