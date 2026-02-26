import { useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { MessageSquare, BookOpen, Settings, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useGetInquiries, useGetBlogPosts, useGetServices } from '../hooks/useQueries';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, isLoading, logout, isLoggingOut } = useAdminAuth();
  const { data: inquiries } = useGetInquiries();
  const { data: blogPosts } = useGetBlogPosts();
  const { data: services } = useGetServices();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate({ to: '/admin' });
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/' });
  };

  const sections = [
    {
      icon: MessageSquare,
      title: 'Inquiries',
      description: 'View and manage contact form submissions from potential buyers.',
      count: inquiries?.length ?? 0,
      countLabel: 'Total Inquiries',
      path: '/admin/inquiries',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      icon: BookOpen,
      title: 'Blog Posts',
      description: 'Create, edit, and manage blog posts for your website.',
      count: blogPosts?.length ?? 0,
      countLabel: 'Published Posts',
      path: '/admin/blog',
      color: 'bg-gold-50 border-gold-200 hover:border-gold-400',
      iconColor: 'text-gold-600',
      iconBg: 'bg-gold-100',
    },
    {
      icon: Settings,
      title: 'Services',
      description: 'Edit and manage the services displayed on your website.',
      count: services?.length ?? 0,
      countLabel: 'Service Listings',
      path: '/admin/services',
      color: 'bg-green-50 border-green-200 hover:border-green-400',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Admin Header */}
      <header className="bg-green-800 shadow-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} className="text-gold-400" />
            <span className="font-display font-semibold text-white text-lg">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-cream-300 hover:text-gold-400 text-sm font-body transition-colors"
            >
              View Website
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-cream-200 hover:text-white rounded-md text-sm font-body transition-colors"
            >
              <LogOut size={14} />
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-green-800 mb-2">Welcome Back</h1>
          <p className="text-muted-foreground font-body">Manage your Azad Nexus Global website content from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className={`block bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-card-hover group ${section.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${section.iconBg}`}>
                  <section.icon size={22} className={section.iconColor} />
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:text-green-700 transition-colors mt-1" />
              </div>
              <h2 className="font-display font-semibold text-green-800 text-xl mb-2">{section.title}</h2>
              <p className="text-muted-foreground text-sm font-body mb-4">{section.description}</p>
              <div className="pt-4 border-t border-cream-200">
                <span className="font-display font-bold text-2xl text-green-700">{section.count}</span>
                <span className="text-muted-foreground text-sm font-body ml-2">{section.countLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
