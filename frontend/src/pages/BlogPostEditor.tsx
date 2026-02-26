import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useGetBlogPost, useCreateBlogPost, useEditBlogPost } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostEditor() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const params = useParams({ strict: false });
  const editId = params.id ? BigInt(params.id) : null;
  const isEditing = editId !== null;

  const { data: existingPost, isLoading: postLoading } = useGetBlogPost(editId);
  const createBlogPost = useCreateBlogPost();
  const editBlogPost = useEditBlogPost();

  const [form, setForm] = useState({
    title: '',
    content: '',
    imageDescription: '',
    publishedDate: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate({ to: '/admin' });
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (existingPost) {
      setForm({
        title: existingPost.title,
        content: existingPost.content,
        imageDescription: existingPost.imageDescription,
        publishedDate: existingPost.publishedDate,
      });
    }
  }, [existingPost]);

  if (authLoading || (isEditing && postLoading)) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (!form.content.trim()) { setError('Content is required.'); return; }
    if (!form.publishedDate) { setError('Published date is required.'); return; }

    try {
      if (isEditing && editId !== null) {
        await editBlogPost.mutateAsync({
          id: editId,
          title: form.title.trim(),
          content: form.content.trim(),
          imageDescription: form.imageDescription.trim(),
          publishedDate: form.publishedDate,
        });
      } else {
        await createBlogPost.mutateAsync({
          title: form.title.trim(),
          content: form.content.trim(),
          imageDescription: form.imageDescription.trim(),
          publishedDate: form.publishedDate,
        });
      }
      navigate({ to: '/admin/blog' });
    } catch (err: any) {
      setError(err?.message || 'Failed to save blog post. Please try again.');
    }
  };

  const isPending = createBlogPost.isPending || editBlogPost.isPending;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-green-800 shadow-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/blog" className="text-cream-300 hover:text-gold-400 transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display font-semibold text-white text-lg">
              {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-cream-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Post Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter post title"
                className="border-cream-300 focus:border-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="publishedDate" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Published Date *
              </Label>
              <Input
                id="publishedDate"
                name="publishedDate"
                type="date"
                value={form.publishedDate}
                onChange={handleChange}
                className="border-cream-300 focus:border-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="imageDescription" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Image Description (optional)
              </Label>
              <Input
                id="imageDescription"
                name="imageDescription"
                value={form.imageDescription}
                onChange={handleChange}
                placeholder="Brief description of the featured image"
                className="border-cream-300 focus:border-green-500"
              />
            </div>

            <div>
              <Label htmlFor="content" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                Content *
              </Label>
              <Textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your blog post content here..."
                rows={16}
                className="border-cream-300 focus:border-green-500 resize-y font-body"
                required
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
                disabled={isPending}
                className="bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold font-body px-6"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={16} />
                    {isEditing ? 'Save Changes' : 'Publish Post'}
                  </span>
                )}
              </Button>
              <Link
                to="/admin/blog"
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
