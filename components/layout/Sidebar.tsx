'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  History,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/stores/authStore';

const publicNavItems = [
  { label: 'Market', href: '/', icon: LayoutDashboard },
  { label: 'Stocks', href: '/stocks', icon: TrendingUp },
];

const authNavItems = [
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { label: 'Transactions', href: '/transactions', icon: History },
];

const adminNavItems = [
  { label: 'Admin', href: '/admin', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const NavLink = ({ href, icon: Icon, label }: { href: string; icon: typeof LayoutDashboard; label: string }) => (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
        isActive(href)
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 text-white lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">StockSim</h1>
              <p className="text-xs text-zinc-500">Virtual Trading</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Market
          </p>
          {publicNavItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}

          {isAuthenticated && (
            <>
              <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-6 mb-2">
                Trading
              </p>
              {authNavItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </>
          )}

          {isAuthenticated && user?.role === 'admin' && (
            <>
              <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-6 mb-2">
                Admin
              </p>
              {adminNavItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </>
          )}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <User size={20} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user?.full_name}</p>
                  <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                </div>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
