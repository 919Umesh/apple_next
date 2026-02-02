'use client';

import { useState } from 'react';
import { Minus, Plus, Loader2 } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useBuyStock, useSellStock, useWallet } from '@/lib/hooks/useQueries';
import { formatCurrency } from '@/lib/utils';

interface TradeFormProps {
  symbol: string;
  currentPrice: number;
  ownedQuantity?: number;
}

export function TradeForm({ symbol, currentPrice, ownedQuantity = 0 }: TradeFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  
  const { data: walletData } = useWallet();
  const buyMutation = useBuyStock();
  const sellMutation = useSellStock();

  const balance = walletData?.wallet?.balance ?? 0;
  const totalCost = quantity * currentPrice;
  const canBuy = balance >= totalCost && quantity > 0;
  const canSell = ownedQuantity >= quantity && quantity > 0;

  const handleTrade = async () => {
    if (activeTab === 'buy') {
      await buyMutation.mutateAsync({ symbol, quantity });
    } else {
      await sellMutation.mutateAsync({ symbol, quantity });
    }
    setQuantity(1);
  };

  const isLoading = buyMutation.isPending || sellMutation.isPending;
  const error = buyMutation.error || sellMutation.error;
  const success = buyMutation.isSuccess || sellMutation.isSuccess;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade {symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tab buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'buy'
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'sell'
                ? 'bg-red-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Sell
          </button>
        </div>

        {/* Price display */}
        <div className="mb-6 p-4 bg-zinc-800/50 rounded-xl">
          <p className="text-sm text-zinc-500 mb-1">Current Price</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(currentPrice)}</p>
        </div>

        {/* Quantity input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2.5 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-5 h-5 text-zinc-400" />
            </button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="text-center text-lg font-semibold"
              min={1}
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
            >
              <Plus className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 space-y-3 p-4 bg-zinc-800/50 rounded-xl">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Available Balance</span>
            <span className="text-white font-medium">{formatCurrency(balance)}</span>
          </div>
          {activeTab === 'sell' && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Owned Shares</span>
              <span className="text-white font-medium">{ownedQuantity}</span>
            </div>
          )}
          <div className="flex justify-between text-sm pt-2 border-t border-zinc-700">
            <span className="text-zinc-400">Total {activeTab === 'buy' ? 'Cost' : 'Value'}</span>
            <span className="text-white font-bold text-lg">{formatCurrency(totalCost)}</span>
          </div>
        </div>

        {/* Error/Success messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-sm text-red-500">{(error as Error).message}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <p className="text-sm text-emerald-500">Trade executed successfully!</p>
          </div>
        )}

        {/* Submit button */}
        <Button
          onClick={handleTrade}
          disabled={isLoading || (activeTab === 'buy' ? !canBuy : !canSell)}
          className="w-full"
          variant={activeTab === 'buy' ? 'primary' : 'danger'}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {activeTab === 'buy' ? 'Buy' : 'Sell'} {symbol}
        </Button>

        {/* Insufficient funds warning */}
        {activeTab === 'buy' && !canBuy && quantity > 0 && (
          <p className="text-xs text-red-500 mt-2 text-center">
            Insufficient balance for this purchase
          </p>
        )}
        {activeTab === 'sell' && !canSell && quantity > 0 && (
          <p className="text-xs text-red-500 mt-2 text-center">
            You don&apos;t own enough shares
          </p>
        )}
      </CardContent>
    </Card>
  );
}
