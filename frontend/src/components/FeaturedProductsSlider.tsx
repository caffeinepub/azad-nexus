import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const featured = products.slice(0, 4);

export default function FeaturedProductsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Scroll Buttons — desktop only */}
      <div className="hidden md:block">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-card items-center justify-center hover:bg-cream-200 transition-colors flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-green-700" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-card items-center justify-center hover:bg-cream-200 transition-colors flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-green-700" />
        </button>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featured.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] max-w-[280px] snap-start bg-white rounded-xl border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group flex flex-col"
          >
            <div className="bg-green-700 p-5 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity"
                style={{
                  backgroundImage: 'url(/assets/generated/rice-texture.dim_1200x800.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative">
                <span className="text-xs font-body font-medium text-white/60 uppercase tracking-wider">
                  {product.category === 'basmati' ? 'Premium Basmati' : 'Non-Basmati'}
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-1">{product.name}</h3>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                {product.description.substring(0, 100)}...
              </p>
              <Link
                to="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-body font-semibold text-gold-600 hover:text-gold-700 transition-colors"
              >
                View Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
