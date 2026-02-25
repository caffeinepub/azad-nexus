import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Products() {
  const basmati = products.filter(p => p.category === 'basmati');
  const nonBasmati = products.filter(p => p.category === 'non-basmati');

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url(/assets/generated/rice-texture.dim_1200x800.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
            <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
              Product Catalog
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Our Rice Portfolio</h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            Export-grade Basmati and Non-Basmati rice varieties, each meeting stringent international quality standards.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="basmati" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList
                className="rounded-sm p-1 h-auto gap-1"
                style={{ backgroundColor: 'oklch(0.22 0.09 255 / 0.08)' }}
              >
                <TabsTrigger
                  value="basmati"
                  className="font-body font-semibold px-8 py-3 rounded-sm text-sm data-[state=active]:bg-royal data-[state=active]:text-white data-[state=inactive]:text-royal transition-all"
                >
                  Premium Basmati
                </TabsTrigger>
                <TabsTrigger
                  value="non-basmati"
                  className="font-body font-semibold px-8 py-3 rounded-sm text-sm data-[state=active]:bg-royal data-[state=active]:text-white data-[state=inactive]:text-royal transition-all"
                >
                  Non-Basmati
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="basmati">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-royal mb-2">Premium Basmati Rice</h2>
                <p className="font-body text-muted-foreground">
                  Long-grain aromatic varieties prized for their fragrance, elongation, and premium quality. Ideal for Middle Eastern, European, and Asian markets.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {basmati.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="non-basmati">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-royal mb-2">Non-Basmati Rice</h2>
                <p className="font-body text-muted-foreground">
                  High-yield, consistent-quality varieties for bulk buyers, institutional procurement, and diverse culinary markets across Africa and Southeast Asia.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nonBasmati.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="mt-16 text-center bg-white rounded-sm border border-border p-10 shadow-xs">
            <h3 className="font-display text-2xl font-bold text-royal mb-3">
              Need Custom Specifications?
            </h3>
            <p className="font-body text-muted-foreground mb-6 max-w-lg mx-auto">
              We can accommodate custom moisture levels, grain sizing, and packaging requirements for bulk orders. Contact us to discuss your specific needs.
            </p>
            <Link to="/contact">
              <Button
                className="font-body font-semibold rounded-sm"
                style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}
              >
                Request a Quote <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
