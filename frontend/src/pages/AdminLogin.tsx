import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ username, password });
      navigate({ to: '/admin/dashboard' });
    } catch (err: any) {
      setError('Invalid credentials. Please check your username and password.');
    }
  };

  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/assets/generated/logo-azad-nexus.dim_400x120.png"
            alt="Azad Nexus Global"
            className="h-14 w-auto mx-auto mb-4"
            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 8px oklch(0.72 0.14 75 / 0.6))' }}
          />
          <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-cream-300 text-sm font-body mt-1">Sign in to manage your website</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 shadow-green-lg">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mx-auto mb-6">
            <Lock size={24} className="text-green-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="username" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-9 border-cream-300 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Password
              </Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 pr-10 border-cream-300 focus:border-green-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-green-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm font-body">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-md font-body"
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors text-sm font-body"
          >
            <ArrowLeft size={14} />
            Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
