import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useGetService, useEditService } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServiceEditor() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const params = useParams({ strict: false });
  const serviceId = params.id ? BigInt(params.id) : null;

  const { data: service, isLoading: serviceLoading } = useGetService(serviceId);
  const editService = useEditService();

  const [form, setForm] = useState({
    name: '',
    description: '',
    details: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate({ to: '/admin' });
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name,
        description: service.description,
        details: service.details,
      });
    }
  }, [service]);

  if (authLoading || serviceLoading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  if (!service && !serviceLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-green-800 mb-4">Service Not Found</h1>
          <Link to="/admin/services" className="text-green-700 hover:text-gold-600 font-body transition-colors">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) { setError('Service name is required.'); return; }
    if (!form.description.trim()) { setError('Description is required.'); return; }
    if (serviceId === null) { setError('Invalid service ID.'); return; }

    try {
      await editService.mutateAsync({
        id: serviceId,
        name: form.name.trim(),
        description: form.description.trim(),
        details: form.details.trim(),
      });
      navigate({ to: '/admin/services' });
    } catch (err: any) {
      setError(err?.message || 'Failed to save service. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-green-800 shadow-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/services" className="text-cream-300 hover:text-gold-400 transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display font-semibold text-white text-lg">Edit Service</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-cream-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Service Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter service name"
                className="border-cream-300 focus:border-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of this service"
                rows={4}
                className="border-cream-300 focus:border-green-500 resize-none font-body"
                required
              />
            </div>

            <div>
              <Label htmlFor="details" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Details
              </Label>
              <Textarea
                id="details"
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Additional details, specifications, or features"
                rows={6}
                className="border-cream-300 focus:border-green-500 resize-y font-body"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm font-body">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={editService.isPending}
                className="bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold font-body px-6"
              >
                {editService.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={16} />
                    Save Changes
                  </span>
                )}
              </Button>
              <Link
                to="/admin/services"
                className="px-6 py-2 border border-cream-300 text-muted-foreground hover:text-green-800 hover:border-green-300 rounded-md transition-colors font-body text-sm font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
