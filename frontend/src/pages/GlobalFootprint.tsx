import { Globe, Anchor, TrendingUp, Users } from 'lucide-react';
import RegionCard from '../components/RegionCard';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

const regions = [
  {
    icon: Globe,
    region: 'Middle East',
    countries: 'UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain',
    description: 'Our largest export market. Premium 1121 and Pusa Basmati are staples in Middle Eastern households and restaurant chains. We supply directly to major distributors and supermarket chains across the Gulf.',
    highlight: 'Primary Market — 1121 & Pusa Basmati',
  },
  {
    icon: TrendingUp,
    region: 'Europe',
    countries: 'UK, Germany, France, Netherlands, Belgium, Italy',
    description: 'Growing demand for premium Basmati in European supermarkets and ethnic food retailers. We supply to wholesale distributors and private-label buyers with full EU food safety compliance.',
    highlight: 'Premium Basmati & Steam Varieties',
  },
  {
    icon: Users,
    region: 'Southeast Asia',
    countries: 'Malaysia, Indonesia, Singapore, Philippines, Vietnam',
    description: 'A key market for Non-Basmati varieties including IR64 and Long Grain. We serve institutional buyers, food processing companies, and government procurement agencies in the region.',
    highlight: 'IR64 & Long Grain — High Volume',
  },
  {
    icon: Anchor,
    region: 'Africa',
    countries: 'Nigeria, Ghana, Senegal, Ivory Coast, Tanzania, Kenya',
    description: 'West and East Africa represent our fastest-growing market for Parboiled and IR64 rice. We work with established importers and government food security programs across the continent.',
    highlight: 'Parboiled & IR64 — Bulk Export',
  },
];

const stats = [
  { value: '30+', label: 'Countries Served' },
  { value: '4', label: 'Continents' },
  { value: '500+', label: 'MT Monthly Capacity' },
  { value: '15+', label: 'Years of Export' },
];

export default function GlobalFootprint() {
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
              Global Footprint
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Our Export Markets</h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            From Indian ports to global destinations — AZAD NEXUS delivers premium rice to buyers across four continents.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ backgroundColor: 'oklch(0.75 0.12 75)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold" style={{ color: 'oklch(0.16 0.07 255)' }}>
                  {stat.value}
                </div>
                <div className="font-body text-xs font-medium uppercase tracking-wider mt-1" style={{ color: 'oklch(0.22 0.09 255)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
              <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                Export Destinations
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-royal mb-3">Where We Export</h2>
            <p className="font-body text-muted-foreground max-w-2xl">
              Our distribution network spans four continents, with established relationships with importers, distributors, and institutional buyers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region) => (
              <RegionCard key={region.region} {...region} />
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
                <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                  Logistics
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold text-royal mb-6">Shipping from India's Major Ports</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                We export through India's major ports including Mundra, JNPT (Mumbai), Kandla, and Chennai, ensuring optimal routing to all global destinations.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                We handle all export documentation including Bill of Lading, Certificate of Origin, Phytosanitary Certificate, and Letter of Credit processing. FCL and LCL shipments available.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Mundra Port', detail: 'Primary Hub' },
                  { label: 'JNPT Mumbai', detail: 'Western Markets' },
                  { label: 'Kandla Port', detail: 'Gulf Region' },
                  { label: 'Chennai Port', detail: 'Southeast Asia' },
                ].map((port) => (
                  <div key={port.label} className="p-4 rounded-sm border border-border bg-cream">
                    <div className="font-display text-sm font-bold text-royal">{port.label}</div>
                    <div className="font-body text-xs text-muted-foreground mt-0.5">{port.detail}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-cream rounded-sm border border-border p-8">
              <h3 className="font-display text-2xl font-bold text-royal mb-6">Export Documentation</h3>
              <ul className="space-y-3">
                {[
                  'Bill of Lading (B/L)',
                  'Commercial Invoice & Packing List',
                  'Certificate of Origin (COO)',
                  'Phytosanitary Certificate',
                  'APEDA Certificate',
                  'Letter of Credit (L/C) Processing',
                  'Fumigation Certificate',
                  'Quality & Weight Certificate',
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
                    {doc}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact">
                  <Button
                    className="w-full font-body font-semibold rounded-sm"
                    style={{ backgroundColor: 'oklch(0.22 0.09 255)', color: 'white' }}
                  >
                    Inquire About Shipping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
