import { useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Plus, Edit, Trash2, BookOpen, Calendar } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useGetBlogPosts, useDeleteBlogPost } from '../hooks/useQueries';
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

export default function BlogManagement() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const { data: posts, isLoading } = useGetBlogPosts();
  const deleteBlogPost = useDeleteBlogPost();

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
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
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
            <span className="font-display font-semibold text-white text-lg">Blog Management</span>
          </div>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold text-sm rounded-md transition-colors font-body"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-green-800">Blog Posts</h1>
          <p className="text-muted-foreground text-sm font-body mt-1">
            {posts?.length ?? 0} posts published
          </p>
        </div>

        {!posts || posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-cream-200 p-16 text-center">
            <BookOpen size={48} className="text-green-200 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold text-green-800 mb-2">No Blog Posts Yet</h2>
            <p className="text-muted-foreground font-body mb-6">
              Create your first blog post to share insights about the rice export industry.
            </p>
            <Link
              to="/admin/blog/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-colors font-body"
            >
              <Plus size={16} />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream-100 border-b border-cream-200">
                  <th className="text-left px-6 py-3 font-semibold text-green-800 font-body">Title</th>
                  <th className="text-left px-6 py-3 font-semibold text-green-800 font-body">Published Date</th>
                  <th className="text-right px-6 py-3 font-semibold text-green-800 font-body">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id.toString()} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-green-800 font-body">{post.title}</div>
                      <div className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-1">
                        {post.content.substring(0, 80)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground font-body text-sm">
                        <Calendar size={13} />
                        {post.publishedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/admin/blog/edit/$id"
                          params={{ id: post.id.toString() }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs rounded-md transition-colors font-body"
                        >
                          <Edit size={13} />
                          Edit
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-md transition-colors font-body">
                              <Trash2 size={13} />
                              Delete
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{post.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteBlogPost.mutate(post.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
