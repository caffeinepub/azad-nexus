import { useGetInquiries, useIsCallerAdmin } from '../hooks/useQueries';
import InquiriesTable from '../components/InquiriesTable';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Lock, Loader2, ShieldAlert, ShieldCheck, LogOut } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Admin() {
  const { data: isAdmin, isLoading: adminCheckLoading } = useIsCallerAdmin();

  const {
    data: inquiries,
    isLoading: inquiriesLoading,
    error: inquiriesError,
    refetch,
  } = useGetInquiries();

  // ── Checking admin role ──────────────────────────────────────────────────────
  if (adminCheckLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="animate-spin text-green-700" />
          <p className="font-body text-sm text-muted-foreground">Verifying access…</p>
        </div>
      </div>
    );
  }

  // ── Not an admin ─────────────────────────────────────────────────────────────
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-cream-200 shadow-card p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <ShieldAlert size={28} className="text-destructive" />
          </div>
          <h1 className="font-display text-2xl font-bold text-green-800 mb-2">Access Denied</h1>
          <p className="font-body text-sm text-muted-foreground mb-6">
            You must be logged in as an administrator to access this page.
          </p>
          <Link to="/admin">
            <Button className="w-full bg-green-700 hover:bg-green-600 text-white font-body font-semibold rounded-md">
              <Lock size={14} className="mr-2" /> Go to Admin Login
            </Button>
          </Link>
          <div className="mt-4">
            <Link to="/" className="font-body text-sm text-muted-foreground hover:text-green-700 transition-colors">
              ← Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-green-800 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-gold-400" />
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
              <p className="font-body text-sm text-cream-300 mt-0.5">AZAD NEXUS — Inquiry Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => refetch()}
              variant="ghost"
              size="sm"
              className="font-body text-cream-300 hover:text-white hover:bg-green-700 rounded-md"
              disabled={inquiriesLoading}
            >
              <RefreshCw size={14} className={`mr-1.5 ${inquiriesLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="font-body text-cream-300 hover:text-white hover:bg-green-700 rounded-md"
              >
                <LogOut size={14} className="mr-1.5" /> Exit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Inquiries', value: inquiries?.length ?? '—' },
            {
              label: 'This Month',
              value: inquiries?.filter((i) => {
                const ms = Number(i.timestamp) / 1_000_000;
                const d = new Date(ms);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length ?? '—',
            },
            {
              label: 'Unique Countries',
              value: inquiries ? new Set(inquiries.map((i) => i.country)).size : '—',
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-cream-200 p-6 shadow-card">
              <div className="font-display text-3xl font-bold text-green-800">{stat.value}</div>
              <div className="font-body text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-cream-200 shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-green-800">All Inquiries</h2>
            <span className="font-body text-xs text-muted-foreground">
              Click column headers to sort
            </span>
          </div>

          {inquiriesLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : inquiriesError ? (
            <div className="text-center py-16">
              <p className="font-body text-sm text-destructive mb-4">
                Failed to load inquiries. You may not have admin access.
              </p>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="font-body rounded-md"
              >
                <RefreshCw size={14} className="mr-1.5" /> Try Again
              </Button>
            </div>
          ) : (
            <InquiriesTable inquiries={inquiries ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}
