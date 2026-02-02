'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Shield, Calendar, Edit2, Save, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Loading, ErrorDisplay, Badge } from '@/components/ui';
import { useProfile, useUpdateProfile } from '@/lib/hooks/useQueries';
import { useAuthStore } from '@/lib/stores/authStore';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, setUser } = useAuthStore();
  
  const { data, isLoading, error, refetch } = useProfile();
  const updateMutation = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/profile');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (data?.user) {
      setFormData({
        full_name: data.user.full_name,
        phone: data.user.phone || '',
      });
    }
  }, [data]);

  if (authLoading || !isAuthenticated) {
    return <Loading message="Checking authentication..." />;
  }

  if (isLoading) {
    return <Loading message="Loading profile..." />;
  }

  if (error) {
    return <ErrorDisplay message="Failed to load profile" onRetry={refetch} />;
  }

  const user = data?.user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const result = await updateMutation.mutateAsync(formData);
      setUser(result.user);
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: user?.full_name || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const getKycBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-zinc-400">Manage your account information</p>
      </div>

      {/* Profile card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                isLoading={updateMutation.isPending}
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar section */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-bold text-white">
              {user?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{user?.full_name}</h3>
              <p className="text-zinc-500">{user?.email}</p>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {isEditing ? (
              <>
                <Input
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl">
                  <User className="w-5 h-5 text-zinc-500" />
                  <div>
                    <p className="text-sm text-zinc-500">Full Name</p>
                    <p className="text-white">{user?.full_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl">
                  <Mail className="w-5 h-5 text-zinc-500" />
                  <div>
                    <p className="text-sm text-zinc-500">Email</p>
                    <p className="text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl">
                  <Phone className="w-5 h-5 text-zinc-500" />
                  <div>
                    <p className="text-sm text-zinc-500">Phone</p>
                    <p className="text-white">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-zinc-500" />
              <div>
                <p className="text-sm text-zinc-500">KYC Status</p>
                <p className="text-white capitalize">{user?.kyc_status}</p>
              </div>
            </div>
            <Badge variant={getKycBadgeVariant(user?.kyc_status || 'pending')}>
              {user?.kyc_status}
            </Badge>
          </div>

          <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl">
            <User className="w-5 h-5 text-zinc-500" />
            <div>
              <p className="text-sm text-zinc-500">Role</p>
              <p className="text-white capitalize">{user?.role}</p>
            </div>
          </div>

          {user?.created_at && (
            <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl">
              <Calendar className="w-5 h-5 text-zinc-500" />
              <div>
                <p className="text-sm text-zinc-500">Member Since</p>
                <p className="text-white">{formatDate(user.created_at)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
