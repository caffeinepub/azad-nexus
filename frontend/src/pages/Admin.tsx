import { useState, FormEvent } from 'react';
import { useAuthenticateAdmin, useGetInquiries } from '../hooks/useQueries';
import InquiriesTable from '../components/InquiriesTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, RefreshCw, Lock, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const authenticateMutation = useAuthenticateAdmin();
  const { data: inquiries, isLoading: inquiriesLoading, refetch } = useGetInquiries(isAuthenticated);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const result = await authenticateMutation.mutateAsync({ username, password });
      if (result) {
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    } catch {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginError('');
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-sm border border-border shadow-royal p-10 max-w-md w-full">
          {/* Logo / Icon */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
            >
              <Lock size={28} style={{ color: 'oklch(0.75 0.12 75)' }} />
            </div>
            <h1 className="font-display text-2xl font-bold text-royal mb-2">Admin Access</h1>
            <p className="font-body text-sm text-muted-foreground">
              Sign in with your administrator credentials to manage inquiries.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="font-body text-sm font-medium text-foreground">
                Email Address
              </Label>
              <Input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="username"
                className="font-body rounded-sm"
                disabled={authenticateMutation.isPending}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="font-body text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="font-body rounded-sm pr-10"
                  disabled={authenticateMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {loginError && (
              <div className="flex items-center gap-2 rounded-sm border border-destructive/30 bg-destructive/5 px-3 py-2.5">
                <AlertCircle size={15} className="text-destructive shrink-0" />
                <p className="font-body text-sm text-destructive">{loginError}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={authenticateMutation.isPending || !username || !password}
              className="w-full font-body font-semibold rounded-sm"
              style={{ backgroundColor: 'oklch(0.22 0.09 255)', color: 'white' }}
            >
              {authenticateMutation.isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="font-body text-sm text-muted-foreground hover:text-royal transition-colors"
            >
              ← Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
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
