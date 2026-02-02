// ============================================================
// Utility Functions
// ============================================================

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency (NPR)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format number with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-NP').format(num);
}

// Format percentage
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

// Format datetime
export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
}

// Get color class based on value (positive/negative)
export function getChangeColor(value: number): string {
  if (value > 0) return 'text-emerald-500';
  if (value < 0) return 'text-red-500';
  return 'text-zinc-500';
}

// Get background color class based on value
export function getChangeBgColor(value: number): string {
  if (value > 0) return 'bg-emerald-500/10';
  if (value < 0) return 'bg-red-500/10';
  return 'bg-zinc-500/10';
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Check if market is open (Nepal Stock Exchange hours)
export function isMarketOpen(): boolean {
  const now = new Date();
  const nepalOffset = 5.75 * 60 * 60 * 1000; // Nepal is UTC+5:45
  const nepalTime = new Date(now.getTime() + nepalOffset);
  
  const day = nepalTime.getUTCDay();
  const hours = nepalTime.getUTCHours();
  const minutes = nepalTime.getUTCMinutes();
  
  // Market closed on Friday (5) and Saturday (6)
  if (day === 5 || day === 6) return false;
  
  // Market hours: 11:00 AM - 3:00 PM
  const timeInMinutes = hours * 60 + minutes;
  const openTime = 11 * 60; // 11:00 AM
  const closeTime = 15 * 60; // 3:00 PM
  
  return timeInMinutes >= openTime && timeInMinutes < closeTime;
}
