import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetInquiries } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import InquiriesTable from '../components/InquiriesTable';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, ShieldAlert, Loader2, RefreshCw, Lock } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Admin() {
  const { identity, login, clear, isLoggingIn, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: inquiries, isLoading: inquiriesLoading, refetch } = useGetInquiries(!!isAdmin);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const isLoading = isInitializing || adminLoading;

  // Not authenticated
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-sm border border-border shadow-royal p-10 max-w-md w-full text-center">
          <div
            className="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
          >
            <Lock size={28} style={{ color: 'oklch(0.75 0.12 75)' }} />
          </div>
          <h1 className="font-display text-2xl font-bold text-royal mb-3">Admin Access</h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Sign in with your administrator credentials to access the inquiry management panel.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full font-body font-semibold rounded-sm"
            style={{ backgroundColor: 'oklch(0.22 0.09 255)', color: 'white' }}
          >
            {isLoggingIn ? (
              <><Loader2 size={16} className="mr-2 animate-spin" /> Signing in...</>
            ) : (
              'Sign In'
            )}
          </Button>
          <div className="mt-6">
            <Link to="/" className="font-body text-sm text-muted-foreground hover:text-royal transition-colors">
              ← Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin mx-auto mb-4" style={{ color: 'oklch(0.22 0.09 255)' }} />
          <p className="font-body text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not admin
  if (isAuthenticated && !adminLoading && !isAdmin) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-sm border border-border shadow-royal p-10 max-w-md w-full text-center">
          <div
            className="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'oklch(0.96 0.02 255)' }}
          >
            <ShieldAlert size={28} style={{ color: 'oklch(0.22 0.09 255)' }} />
          </div>
          <h1 className="font-display text-2xl font-bold text-royal mb-3">Access Denied</h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Your account does not have administrator privileges. Please contact the system administrator.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full font-body font-semibold rounded-sm border-royal text-royal hover:bg-royal hover:text-white transition-colors"
            >
              <LogOut size={16} className="mr-2" /> Sign Out
            </Button>
            <Link to="/">
              <Button
                variant="ghost"
                className="w-full font-body text-sm text-muted-foreground"
              >
                Return to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div style={{ backgroundColor: 'oklch(0.22 0.09 255)' }} className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
            <p className="font-body text-sm text-white/60 mt-1">AZAD NEXUS — Inquiry Management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => refetch()}
              variant="ghost"
              size="sm"
              className="font-body text-white/70 hover:text-white hover:bg-white/10 rounded-sm"
            >
              <RefreshCw size={14} className="mr-1.5" /> Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="font-body text-white/70 hover:text-white hover:bg-white/10 rounded-sm"
            >
              <LogOut size={14} className="mr-1.5" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Inquiries', value: inquiries?.length ?? '—' },
            { label: 'This Month', value: inquiries?.filter(i => {
              const ms = Number(i.timestamp) / 1_000_000;
              const d = new Date(ms);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length ?? '—' },
            { label: 'Unique Countries', value: inquiries ? new Set(inquiries.map(i => i.country)).size : '—' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-sm border border-border p-6 shadow-xs">
              <div className="font-display text-3xl font-bold text-royal">{stat.value}</div>
              <div className="font-body text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-sm border border-border shadow-xs p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-royal">All Inquiries</h2>
            <span className="font-body text-xs text-muted-foreground">
              Click column headers to sort
            </span>
          </div>
          {inquiriesLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-sm" />
              ))}
            </div>
          ) : (
            <InquiriesTable inquiries={inquiries ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}
