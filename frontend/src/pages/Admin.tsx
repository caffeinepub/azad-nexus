import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  useGetInquiries,
  useMarkResolved,
  useDeleteInquiry,
} from '../hooks/useQueries';
import { useAuth } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { Inquiry, InquiryStatus } from '../backend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import {
  RefreshCw,
  LogOut,
  ShieldAlert,
  Loader2,
  Eye,
  CheckCircle2,
  Trash2,
  Inbox,
} from 'lucide-react';

function formatDateTime(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  if (isNaN(ms) || ms <= 0) return '—';
  return new Date(ms).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  if (status === InquiryStatus.resolved) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
        Resolved
      </Badge>
    );
  }
  return (
    <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
      Pending
    </Badge>
  );
}

interface InquiryDetailDialogProps {
  inquiry: Inquiry | null;
  open: boolean;
  onClose: () => void;
}

function InquiryDetailDialog({ inquiry, open, onClose }: InquiryDetailDialogProps) {
  if (!inquiry) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Inquiry #{String(inquiry.id)}</DialogTitle>
          <DialogDescription>
            Submitted on {formatDateTime(inquiry.submittedAt)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Name</p>
              <p className="font-medium">{inquiry.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Company</p>
              <p className="font-medium">{inquiry.company}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Country</p>
              <p className="font-medium">{inquiry.country}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Rice Category</p>
              <p className="font-medium">{inquiry.riceCategory}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Quantity (MT)</p>
              <p className="font-medium">{inquiry.quantityMT}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Status</p>
              <StatusBadge status={inquiry.status} />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Email</p>
              <p className="font-medium break-all">{inquiry.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Phone</p>
              <p className="font-medium">{inquiry.phone}</p>
            </div>
          </div>
          {inquiry.message && (
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">Message</p>
              <p className="bg-muted rounded-md p-3 text-sm whitespace-pre-wrap">{inquiry.message}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Admin() {
  const navigate = useNavigate();
  const { isAdminAuthenticated, logout } = useAuth();
  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);
  const [viewInquiry, setViewInquiry] = useState<Inquiry | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate({ to: '/admin/login' });
    }
  }, []);

  const {
    data: inquiries = [],
    isLoading: inquiriesLoading,
    error: inquiriesError,
    refetch: refetchInquiries,
  } = useGetInquiries();

  const markResolved = useMarkResolved();
  const deleteInquiry = useDeleteInquiry();

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate({ to: '/admin/login' });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    await refetchInquiries();
    setRefreshing(false);
  };

  const toggleMessage = (id: string) => {
    setExpandedMessages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Don't render dashboard content if not authenticated (redirect in progress)
  if (!isAdminAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const totalInquiries = inquiries.length;
  const pendingCount = inquiries.filter((inq) => inq.status === InquiryStatus.pending).length;
  const resolvedCount = inquiries.filter((inq) => inq.status === InquiryStatus.resolved).length;

  const isAuthError =
    inquiriesError &&
    (String(inquiriesError).includes('Unauthorized') ||
      String(inquiriesError).includes('unauthorized'));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-white/60 mt-0.5">AZAD NEXUS — Inquiry Management</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm text-muted-foreground">Total Inquiries</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {inquiriesLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : totalInquiries}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">
              {inquiriesLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : pendingCount}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm text-muted-foreground">Resolved</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {inquiriesLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : resolvedCount}
            </p>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              Submitted Inquiries{' '}
              <span className="text-sm font-normal text-muted-foreground">(newest first)</span>
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing || inquiriesLoading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {isAuthError ? (
            <div className="p-8 text-center text-destructive">
              <ShieldAlert className="h-8 w-8 mx-auto mb-2 opacity-60" />
              <p className="font-medium">Access Denied</p>
              <p className="text-sm mt-1 text-muted-foreground">
                Your identity does not have admin permissions to view inquiries.
              </p>
            </div>
          ) : inquiriesError ? (
            <div className="p-8 text-center text-destructive">
              <ShieldAlert className="h-8 w-8 mx-auto mb-2 opacity-60" />
              <p>Failed to load inquiries. Please try refreshing.</p>
            </div>
          ) : inquiriesLoading ? (
            <div className="p-8 flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm">Loading inquiries…</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10 opacity-40" />
              <p className="text-sm">No inquiries submitted yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">ID</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Company</TableHead>
                    <TableHead className="whitespace-nowrap">Country</TableHead>
                    <TableHead className="whitespace-nowrap">Rice Category</TableHead>
                    <TableHead className="whitespace-nowrap">Qty (MT)</TableHead>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">Phone</TableHead>
                    <TableHead className="min-w-[180px]">Message</TableHead>
                    <TableHead className="whitespace-nowrap">Date &amp; Time</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inq) => {
                    const idStr = String(inq.id);
                    const isExpanded = expandedMessages.has(idStr);
                    const isResolving =
                      markResolved.isPending && markResolved.variables === inq.id;
                    const isDeleting =
                      deleteInquiry.isPending && deleteInquiry.variables === inq.id;

                    return (
                      <TableRow key={idStr}>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          #{idStr}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">{inq.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{inq.company}</TableCell>
                        <TableCell className="whitespace-nowrap">{inq.country}</TableCell>
                        <TableCell className="whitespace-nowrap">{inq.riceCategory}</TableCell>
                        <TableCell className="whitespace-nowrap">{inq.quantityMT}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm">{inq.email}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm">{inq.phone}</TableCell>
                        <TableCell className="max-w-[200px]">
                          {inq.message ? (
                            <div>
                              <p
                                className={`text-sm text-muted-foreground ${isExpanded ? '' : 'truncate'}`}
                                title={inq.message}
                              >
                                {inq.message}
                              </p>
                              {inq.message.length > 60 && (
                                <button
                                  onClick={() => toggleMessage(idStr)}
                                  className="text-xs text-primary hover:underline mt-0.5"
                                >
                                  {isExpanded ? 'Show less' : 'Show more'}
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs italic">—</span>
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {formatDateTime(inq.submittedAt)}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={inq.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {/* View */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="View details"
                              onClick={() => setViewInquiry(inq)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            {/* Mark Resolved */}
                            {inq.status === InquiryStatus.pending && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                title="Mark as resolved"
                                disabled={isResolving}
                                onClick={() => markResolved.mutate(inq.id)}
                              >
                                {isResolving ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4" />
                                )}
                              </Button>
                            )}

                            {/* Delete */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  title="Delete inquiry"
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Inquiry #{idStr}?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. The inquiry from{' '}
                                    <strong>{inq.name}</strong> will be permanently deleted.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={() => deleteInquiry.mutate(inq.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <InquiryDetailDialog
        inquiry={viewInquiry}
        open={!!viewInquiry}
        onClose={() => setViewInquiry(null)}
      />
    </div>
  );
}
