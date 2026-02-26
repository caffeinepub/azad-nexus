import { Link } from '@tanstack/react-router';
import { Truck, DollarSign, Sprout, ArrowRight, Leaf, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeaturedProductsSlider from '../components/FeaturedProductsSlider';
import WhyChooseUsCard from '../components/WhyChooseUsCard';

export default function Home() {
  return (
    <div className="bg-cream">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/hero-split.dim_1920x1080.png)' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.16 0.07 255 / 0.85) 0%, oklch(0.16 0.07 255 / 0.6) 50%, oklch(0.16 0.07 255 / 0.75) 100%)' }} />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-sm border border-white/20 bg-white/10 backdrop-blur-sm">
            <Leaf size={14} style={{ color: 'oklch(0.75 0.12 75)' }} />
            <span className="font-body text-xs font-medium text-white/80 uppercase tracking-widest">
              India's Premier Rice Exporter
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Connecting India's{' '}
            <span style={{ color: 'oklch(0.75 0.12 75)' }}>Finest Harvest</span>
            {' '}to the World
          </h1>

          <p className="font-body text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium Basmati & Non-Basmati Rice — Sourced Direct, Delivered Global.
            Trusted by importers across 30+ countries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="font-body font-semibold px-8 py-3 rounded-sm text-base shadow-gold"
                style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}
              >
                Request a Quote
              </Button>
            </Link>
            <Link to="/products">
              <Button
                size="lg"
                variant="outline"
                className="font-body font-semibold px-8 py-3 rounded-sm text-base border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                Explore Products <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '30+', label: 'Countries' },
              { value: '6', label: 'Rice Varieties' },
              { value: '15+', label: 'Years Export' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold" style={{ color: 'oklch(0.75 0.12 75)' }}>
                  {stat.value}
                </div>
                <div className="font-body text-xs text-white/60 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-12 bg-white/40" />
          <span className="font-body text-xs text-white/60 uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
                <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                  About AZAD NEXUS
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold text-royal mb-6 leading-tight">
                A Trusted Name in Global Rice Trade
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                AZAD NEXUS is an India-based export company with deep roots in the agricultural heartlands of the subcontinent. We specialize in the global export of Premium Basmati and Non-Basmati rice, bridging the gap between India's finest farms and international buyers.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                Our supply chain is built on transparency, quality control, and long-term partnerships. From APEDA-registered sourcing to export-grade packaging, every grain we ship meets the highest international standards.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                We serve supermarket chains, wholesale distributors, and institutional buyers across the Middle East, Europe, Southeast Asia, and Africa — delivering not just rice, but a reliable supply chain you can count on.
              </p>
              <div className="mt-8">
                <Link to="/products">
                  <Button
                    className="font-body font-semibold rounded-sm"
                    style={{ backgroundColor: 'oklch(0.22 0.09 255)', color: 'white' }}
                  >
                    View Our Products <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-sm overflow-hidden shadow-royal-lg">
                <img
                  src="/assets/generated/rice-texture.dim_1200x800.png"
                  alt="Premium Basmati Rice"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-sm shadow-royal p-5 border border-border"
              >
                <div className="flex items-center gap-3">
                  <Award size={28} style={{ color: 'oklch(0.75 0.12 75)' }} />
                  <div>
                    <div className="font-display text-sm font-bold text-royal">APEDA Registered</div>
                    <div className="font-body text-xs text-muted-foreground">Export Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products Slider ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
              <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                Our Products
              </span>
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
            </div>
            <h2 className="font-display text-4xl font-bold text-royal">Featured Rice Varieties</h2>
            <p className="font-body text-base text-muted-foreground mt-3 max-w-xl mx-auto">
              From the world's longest Basmati grain to high-yield Non-Basmati varieties — explore our export-grade portfolio.
            </p>
          </div>
          <FeaturedProductsSlider />
          <div className="text-center mt-10">
            <Link to="/products">
              <Button
                variant="outline"
                className="font-body font-semibold rounded-sm border-royal text-royal hover:bg-royal hover:text-white transition-colors"
              >
                View Full Catalog <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
              <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                Why AZAD NEXUS
              </span>
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
            </div>
            <h2 className="font-display text-4xl font-bold text-royal">Built for Global Trade</h2>
            <p className="font-body text-base text-muted-foreground mt-3 max-w-xl mx-auto">
              We aren't just selling rice — we're delivering a reliable supply chain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyChooseUsCard
              icon={Truck}
              title="Timely Delivery"
              description="We maintain strict shipment schedules with real-time cargo tracking. Our logistics network ensures your order arrives on time, every time — from Indian ports to your destination."
            />
            <WhyChooseUsCard
              icon={DollarSign}
              title="Competitive Pricing"
              description="Direct sourcing from farmers eliminates middlemen, allowing us to offer the most competitive market rates without compromising on quality or grade specifications."
            />
            <WhyChooseUsCard
              icon={Globe}
              title="Direct Sourcing"
              description="We work directly with verified farming communities across Punjab, Haryana, and UP — ensuring traceability, freshness, and authentic grain quality from field to freight."
            />
          </div>
        </div>
      </section>

      {/* ── Direct from Farmers ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/rice-texture.dim_1200x800.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
                <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                  Farm to Export
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight">
                Direct from India's Farming Communities
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                Every grain of rice we export begins its journey in the fertile fields of Punjab, Haryana, and Uttar Pradesh — India's rice belt. We partner directly with farming families who have cultivated Basmati for generations.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                This direct relationship means better prices for farmers, full traceability for buyers, and an authentic product that carries the genuine character of Indian terroir. When you source from AZAD NEXUS, you're investing in a transparent, ethical supply chain.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {['Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal'].map((region) => (
                  <span
                    key={region}
                    className="font-body text-sm font-medium px-4 py-2 rounded-sm border border-white/20 text-white/80"
                    style={{ backgroundColor: 'oklch(1 0 0 / 0.08)' }}
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Sprout, label: 'Direct Farm Sourcing', value: '100%' },
                { icon: Award, label: 'Quality Certified', value: 'APEDA' },
                { icon: Globe, label: 'Export Markets', value: '30+' },
                { icon: Leaf, label: 'Varieties Available', value: '6+' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-sm p-5 border border-white/10"
                  style={{ backgroundColor: 'oklch(1 0 0 / 0.06)' }}
                >
                  <item.icon size={24} style={{ color: 'oklch(0.75 0.12 75)' }} className="mb-3" />
                  <div className="font-display text-2xl font-bold text-white mb-1">{item.value}</div>
                  <div className="font-body text-xs text-white/60">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-royal mb-4">
            Ready to Source Premium Indian Rice?
          </h2>
          <p className="font-body text-base text-muted-foreground mb-8">
            Get current market pricing and availability for your required variety and quantity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="font-body font-semibold px-8 rounded-sm shadow-gold"
                style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}
              >
                Get Current Market Pricing
              </Button>
            </Link>
            <Link to="/products">
              <Button
                size="lg"
                variant="outline"
                className="font-body font-semibold px-8 rounded-sm border-royal text-royal hover:bg-royal hover:text-white transition-colors"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
