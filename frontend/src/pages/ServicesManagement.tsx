import { useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Edit, Settings } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useGetServices } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServicesManagement() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const { data: services, isLoading } = useGetServices();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate({ to: '/admin' });
    }
  }, [isAdmin, authLoading, navigate]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-green-800 shadow-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="text-cream-300 hover:text-gold-400 transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display font-semibold text-white text-lg">Services Management</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-green-800">Services</h1>
          <p className="text-muted-foreground text-sm font-body mt-1">
            Edit service listings displayed on the public Services page.
          </p>
        </div>

        {!services || services.length === 0 ? (
          <div className="bg-white rounded-xl border border-cream-200 p-16 text-center">
            <Settings size={48} className="text-green-200 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold text-green-800 mb-2">No Services Found</h2>
            <p className="text-muted-foreground font-body">
              Services will appear here once they are added to the backend.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream-100 border-b border-cream-200">
                  <th className="text-left px-6 py-3 font-semibold text-green-800 font-body">Service Name</th>
                  <th className="text-left px-6 py-3 font-semibold text-green-800 font-body">Description</th>
                  <th className="text-right px-6 py-3 font-semibold text-green-800 font-body">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id.toString()} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-green-800 font-body">{service.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-muted-foreground font-body text-sm line-clamp-2 max-w-md">
                        {service.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <Link
                          to="/admin/services/edit/$id"
                          params={{ id: service.id.toString() }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs rounded-md transition-colors font-body"
                        >
                          <Edit size={13} />
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
