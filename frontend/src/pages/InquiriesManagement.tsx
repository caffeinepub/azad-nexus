import { useEffect, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Trash2, RefreshCw, MessageSquare, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useGetInquiries, useDeleteInquiry, useClearInquiries } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function InquiriesManagement() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const { data: inquiries, isLoading, refetch } = useGetInquiries();
  const deleteInquiry = useDeleteInquiry();
  const clearInquiries = useClearInquiries();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate({ to: '/admin' });
    }
  }, [isAdmin, authLoading, navigate]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-green-800 shadow-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="text-cream-300 hover:text-gold-400 transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display font-semibold text-white text-lg">Inquiries Management</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-3 py-2 text-cream-300 hover:text-gold-400 text-sm font-body transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            {inquiries && inquiries.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="text-xs">
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Inquiries?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all {inquiries.length} inquiries. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => clearInquiries.mutate()}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-green-800">Contact Inquiries</h1>
            <p className="text-muted-foreground text-sm font-body mt-1">
              {inquiries?.length ?? 0} total inquiries received
            </p>
          </div>
        </div>

        {!inquiries || inquiries.length === 0 ? (
          <div className="bg-white rounded-xl border border-cream-200 p-16 text-center">
            <MessageSquare size={48} className="text-green-200 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold text-green-800 mb-2">No Inquiries Yet</h2>
            <p className="text-muted-foreground font-body">
              When potential buyers submit the contact form, their inquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cream-100 border-b border-cream-200">
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Company</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Country</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Rice Variety</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Qty (MT)</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Message</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-800 font-body">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id.toString()} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-green-800 font-body">{inquiry.name}</td>
                      <td className="px-4 py-3 text-muted-foreground font-body">{inquiry.company}</td>
                      <td className="px-4 py-3 text-muted-foreground font-body">{inquiry.country}</td>
                      <td className="px-4 py-3 text-muted-foreground font-body">{inquiry.riceVariety}</td>
                      <td className="px-4 py-3 text-muted-foreground font-body">{inquiry.quantityMT}</td>
                      <td className="px-4 py-3 text-muted-foreground font-body max-w-xs">
                        <span className="line-clamp-2">{inquiry.message}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-body whitespace-nowrap text-xs">
                        {formatDate(inquiry.timestamp)}
                      </td>
                      <td className="px-4 py-3">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Inquiry?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Delete inquiry from {inquiry.name} ({inquiry.company})? This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteInquiry.mutate(inquiry.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
