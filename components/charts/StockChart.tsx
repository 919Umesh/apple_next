'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { StockPrice } from '@/lib/types';

interface StockChartProps {
  data: StockPrice[];
  height?: number;
}

export function StockChart({ data, height = 300 }: StockChartProps) {
  const chartData = data.map((item) => ({
    date: formatDate(item.timestamp),
    price: item.close_price,
    open: item.open_price,
    high: item.high_price,
    low: item.low_price,
  }));

  // Determine if overall trend is positive
  const isPositive =
    data.length > 1 && data[data.length - 1].close_price >= data[0].close_price;

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            domain={['dataMin - 10', 'dataMax + 10']}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 12 }}
            tickFormatter={(value) => `₨${value}`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '12px',
              padding: '12px',
            }}
            labelStyle={{ color: '#a1a1aa', marginBottom: '8px' }}
            formatter={(value) => [formatCurrency(Number(value)), 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: isPositive ? '#10b981' : '#ef4444' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Mini sparkline chart for cards
export function MiniChart({
  data,
  height = 60,
  positive,
}: {
  data: number[];
  height?: number;
  positive: boolean;
}) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={positive ? '#10b981' : '#ef4444'}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
