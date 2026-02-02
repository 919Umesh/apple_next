'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Loading, ErrorDisplay, Badge } from '@/components/ui';
import { useTradingTransactions } from '@/lib/hooks/useQueries';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { useAuthStore } from '@/lib/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TransactionsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  
  const { data, isLoading, error, refetch } = useTradingTransactions(100, 0);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/transactions');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    return <Loading message="Checking authentication..." />;
  }

  if (isLoading) {
    return <Loading message="Loading transactions..." />;
  }

  if (error) {
    return <ErrorDisplay message="Failed to load transactions" onRetry={refetch} />;
  }

  const transactions = data?.transactions ?? [];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Transaction History
        </h1>
        <p className="text-zinc-400">View your trading activity</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions ({transactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-zinc-500 border-b border-zinc-800">
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Quantity</th>
                    <th className="pb-3 font-medium text-right">Price</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-zinc-800/50">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded-lg ${
                              tx.type === 'buy'
                                ? 'bg-emerald-500/10'
                                : 'bg-red-500/10'
                            }`}
                          >
                            {tx.type === 'buy' ? (
                              <ArrowUpRight
                                className={`w-4 h-4 ${
                                  tx.type === 'buy'
                                    ? 'text-emerald-500'
                                    : 'text-red-500'
                                }`}
                              />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <span
                            className={`font-medium capitalize ${
                              tx.type === 'buy'
                                ? 'text-emerald-500'
                                : 'text-red-500'
                            }`}
                          >
                            {tx.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-zinc-400">
                        {formatDateTime(tx.created_at)}
                      </td>
                      <td className="py-4 text-right text-white">
                        {tx.quantity}
                      </td>
                      <td className="py-4 text-right text-zinc-400">
                        {formatCurrency(tx.price_per_share)}
                      </td>
                      <td className="py-4 text-right text-white font-medium">
                        {formatCurrency(tx.total_amount)}
                      </td>
                      <td className="py-4 text-right">
                        <Badge
                          variant={
                            tx.status === 'completed'
                              ? 'success'
                              : tx.status === 'pending'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {tx.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-500">No transactions yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
