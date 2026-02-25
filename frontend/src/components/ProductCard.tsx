import { Badge } from '@/components/ui/badge';
import { Ruler, Droplets, CheckCircle } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-sm border border-border shadow-xs hover:shadow-royal transition-shadow duration-300 overflow-hidden group">
      {/* Card Header */}
      <div className="bg-royal p-6 relative">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/rice-texture.dim_1200x800.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative">
          {product.badge && (
            <span className="inline-block mb-2 text-xs font-body font-semibold px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}>
              {product.badge}
            </span>
          )}
          <h3 className="font-display text-xl font-bold text-white">{product.name}</h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Specs Table */}
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="bg-cream-dark px-4 py-2 border-b border-border">
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-royal">
              Specifications
            </span>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                <Ruler size={14} className="text-gold" />
                <span>Grain Length</span>
              </div>
              <span className="font-body text-sm font-semibold text-foreground">{product.specs.grainLength}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                <Droplets size={14} className="text-gold" />
                <span>Moisture Content</span>
              </div>
              <span className="font-body text-sm font-semibold text-foreground">{product.specs.moistureContent}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                <CheckCircle size={14} className="text-gold" />
                <span>Purity</span>
              </div>
              <span className="font-body text-sm font-semibold text-foreground">{product.specs.purity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
