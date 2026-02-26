import { Link } from '@tanstack/react-router';
import { ArrowRight, Award, Globe, Leaf, Shield, TrendingUp, Users } from 'lucide-react';

const stats = [
  { value: '30+', label: 'Countries Served' },
  { value: '50K+', label: 'Metric Tons Exported' },
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Happy Clients' },
];

const highlights = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Every grain meets international quality standards with rigorous lab testing and certifications.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Trusted by buyers across 30+ countries in Asia, Middle East, Africa, and Europe.',
  },
  {
    icon: Shield,
    title: 'Certified & Compliant',
    description: 'FSSAI, APEDA, ISO certified with full compliance to international food safety standards.',
  },
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    description: 'Partnering with responsible farmers across India\'s finest rice-growing regions.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Pricing',
    description: 'Direct sourcing from farmers ensures the best prices without compromising quality.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'End-to-end support from order placement to delivery at your destination port.',
  },
];

const featuredRice = [
  {
    name: 'Basmati 1121',
    origin: 'Punjab, India',
    grain: 'Extra Long Grain',
    aroma: 'Intense',
    image: '/assets/generated/rice-1121-basmati.dim_800x600.png',
  },
  {
    name: 'Pusa Basmati',
    origin: 'Haryana, India',
    grain: 'Long Grain',
    aroma: 'Rich',
    image: '/assets/generated/rice-pusa-basmati.dim_800x600.png',
  },
  {
    name: 'IR-64 Parboiled',
    origin: 'West Bengal, India',
    grain: 'Medium Grain',
    aroma: 'Mild',
    image: '/assets/generated/rice-parboiled.dim_800x600.png',
  },
  {
    name: 'Steam Basmati',
    origin: 'Uttar Pradesh, India',
    grain: 'Long Grain',
    aroma: 'Delicate',
    image: '/assets/generated/rice-steam-basmati.dim_800x600.png',
  },
];

export default function Home() {
  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-rice-banner.dim_1920x800.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/75 to-green-700/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-300 text-sm font-medium font-body">India's Premier Rice Exporter</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Premium Indian Rice{' '}
              <span className="text-gold-400">to the World</span>
            </h1>
            <p className="text-lg text-cream-200 leading-relaxed mb-10 font-body max-w-xl">
              Azad Nexus Global connects India's finest rice producers with buyers across 30+ countries. 
              From aromatic Basmati to nutritious parboiled varieties — quality you can trust.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold rounded-md transition-all duration-200 shadow-gold hover:shadow-gold-lg font-body"
              >
                Request a Quote
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold rounded-md transition-all duration-200 backdrop-blur-sm font-body"
              >
                View Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-green-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl font-bold text-gold-400 mb-1">{stat.value}</div>
                <div className="text-sm text-cream-300 font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-widest font-body">Our Products</span>
            <h2 className="font-display text-4xl font-bold text-green-800 mt-2 mb-4">
              Premium Rice Varieties
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Sourced from India's finest growing regions, each variety is carefully selected and processed 
              to meet the highest international standards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRice.map((rice) => (
              <div
                key={rice.name}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-cream-200"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={rice.image}
                    alt={rice.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-green-800 text-lg mb-3">{rice.name}</h3>
                  <div className="space-y-1.5 text-sm font-body">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Origin</span>
                      <span className="text-green-700 font-medium">{rice.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grain</span>
                      <span className="text-green-700 font-medium">{rice.grain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aroma</span>
                      <span className="text-green-700 font-medium">{rice.aroma}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold rounded-md transition-all duration-200 font-body"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-widest font-body">Why Us</span>
            <h2 className="font-display text-4xl font-bold text-green-800 mt-2 mb-4">
              Why Choose Azad Nexus Global
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              We combine decades of expertise with modern logistics to deliver premium Indian rice 
              reliably to your doorstep, anywhere in the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-cream-50 border border-cream-200 hover:border-gold-300 hover:shadow-gold transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                  <item.icon size={22} className="text-green-700 group-hover:text-gold-600 transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-green-800 text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/assets/generated/rice-texture.dim_1200x800.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Source Premium Indian Rice?
          </h2>
          <p className="text-cream-200 text-lg mb-10 font-body">
            Get in touch with our export team today. We'll provide competitive pricing, 
            quality certificates, and seamless logistics for your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold rounded-md transition-all duration-200 shadow-gold font-body"
            >
              Get a Free Quote
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold rounded-md transition-all duration-200 font-body"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
