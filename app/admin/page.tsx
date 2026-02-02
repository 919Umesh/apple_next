'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Database, 
  Users, 
  Check, 
  X, 
  Clock,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Loading, ErrorDisplay, Badge } from '@/components/ui';
import { useAuthStore } from '@/lib/stores/authStore';
import { 
  usePendingKyc, 
  useApproveKyc, 
  useRejectKyc, 
  useSeedData 
} from '@/lib/hooks/useQueries';
import { User } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'kyc' | 'database'>('kyc');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/admin');
    } else if (!authLoading && user?.role !== 'admin') {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-zinc-400">You don&apos;t have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-zinc-400">Manage users and system settings</p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'kyc' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('kyc')}
        >
          <Users className="w-4 h-4" />
          KYC Management
        </Button>
        <Button
          variant={activeTab === 'database' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('database')}
        >
          <Database className="w-4 h-4" />
          Database
        </Button>
      </div>

      {/* Tab content */}
      {activeTab === 'kyc' ? <KycManagement /> : <DatabaseManagement />}
    </div>
  );
}

function KycManagement() {
  const { data, isLoading, error, refetch } = usePendingKyc();
  const approveMutation = useApproveKyc();
  const rejectMutation = useRejectKyc();

  if (isLoading) {
    return <Loading message="Loading pending KYC requests..." />;
  }

  if (error) {
    return <ErrorDisplay message="Failed to load KYC requests" onRetry={refetch} />;
  }

  const pendingUsers = data?.pending_users || [];

  const handleApprove = async (userId: number) => {
    try {
      await approveMutation.mutateAsync(userId);
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await rejectMutation.mutateAsync(userId);
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Pending KYC Requests
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => refetch()}>
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {pendingUsers.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No pending KYC requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingUsers.map((pendingUser: User) => (
              <div
                key={pendingUser.id}
                className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold">
                    {pendingUser.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">{pendingUser.full_name}</p>
                    <p className="text-sm text-zinc-500">{pendingUser.email}</p>
                    {pendingUser.phone && (
                      <p className="text-sm text-zinc-500">{pendingUser.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Pending</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReject(pendingUser.id)}
                    isLoading={rejectMutation.isPending}
                    className="text-red-400 hover:bg-red-500/10"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(pendingUser.id)}
                    isLoading={approveMutation.isPending}
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DatabaseManagement() {
  const seedMutation = useSeedData();
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const handleSeed = async () => {
    try {
      const result = await seedMutation.mutateAsync();
      setSeedResult(result.message);
    } catch (err) {
      console.error('Seed failed:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-zinc-800/50 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">Seed Database</h3>
          <p className="text-zinc-400 mb-4">
            Populate the database with sample companies and stock data for testing purposes.
            This will add sample companies with historical price data.
          </p>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSeed}
              isLoading={seedMutation.isPending}
            >
              <Database className="w-4 h-4" />
              Seed Database
            </Button>
            
            {seedResult && (
              <Badge variant="success">{seedResult}</Badge>
            )}
          </div>
          
          {seedMutation.isError && (
            <p className="mt-4 text-red-400 text-sm">
              Failed to seed database. Please try again.
            </p>
          )}
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-500 mb-1">Warning</h4>
              <p className="text-sm text-zinc-400">
                Database seeding operations may affect existing data. Use with caution in production environments.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
