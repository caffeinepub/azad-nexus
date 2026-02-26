import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import { useGetBlogPost } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPost() {
  const { id } = useParams({ strict: false });
  const postId = id ? BigInt(id) : null;
  const { data: post, isLoading } = useGetBlogPost(postId);

  if (isLoading) {
    return (
      <div className="bg-cream-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-8" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="text-green-200 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-green-800 mb-4">Post Not Found</h1>
          <p className="text-muted-foreground font-body mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-colors font-body"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Header */}
      <div className="bg-green-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors font-body text-sm mb-6"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 text-gold-300 text-sm font-body mb-4">
            <Calendar size={14} />
            <span>{post.publishedDate}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
          {post.imageDescription && (
            <p className="text-cream-300 mt-4 font-body italic">{post.imageDescription}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-cream-200">
          <div className="prose prose-lg max-w-none font-body text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold rounded-md transition-all duration-200 font-body"
          >
            <ArrowLeft size={16} />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
