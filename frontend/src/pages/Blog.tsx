import { Link } from '@tanstack/react-router';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useGetBlogPosts } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function Blog() {
  const { data: posts, isLoading } = useGetBlogPosts();

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="py-20 bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-300 font-semibold text-sm uppercase tracking-widest font-body">Insights & News</span>
          <h1 className="font-display text-5xl font-bold text-white mt-3 mb-6">
            Rice Export Blog
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto font-body">
            Stay updated with the latest news, insights, and trends in the global rice export industry.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-cream-200">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-1/3 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen size={64} className="text-green-200 mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-green-800 mb-4">No Posts Yet</h2>
              <p className="text-muted-foreground font-body max-w-md mx-auto">
                We're working on bringing you valuable insights about the rice export industry. 
                Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id.toString()}
                  className="bg-white rounded-xl overflow-hidden border border-cream-200 hover:border-gold-300 hover:shadow-card-hover transition-all duration-300 group"
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-green-100 to-cream-200 flex items-center justify-center">
                    <BookOpen size={40} className="text-green-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-3">
                      <Calendar size={12} />
                      <span>{post.publishedDate}</span>
                    </div>
                    <h2 className="font-display font-semibold text-green-800 text-xl mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-3 mb-4">
                      {post.content}
                    </p>
                    <Link
                      to="/blog/$id"
                      params={{ id: post.id.toString() }}
                      className="inline-flex items-center gap-1.5 text-green-700 hover:text-gold-600 font-semibold text-sm font-body transition-colors"
                    >
                      Read More
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
