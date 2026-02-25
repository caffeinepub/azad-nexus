import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'azad-nexus');

  return (
    <footer className="bg-royal-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img
                src="/assets/generated/azad-nexus-logo.dim_400x120.png"
                alt="AZAD NEXUS"
                className="h-12 w-auto object-contain mb-4 brightness-0 invert"
              />
            </Link>
            <p className="font-body text-sm leading-relaxed text-white/60 max-w-sm">
              Connecting India's finest harvest to global markets. Premium Basmati and Non-Basmati rice, sourced directly from farmers and delivered worldwide.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/40 font-body">
              <span>© {year} AZAD NEXUS. All rights reserved.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'Quality Assurance', to: '/quality' },
                { label: 'Global Footprint', to: '/global-footprint' },
                { label: 'Contact / Inquiry', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>India — Exporting Globally</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-gold" />
                <span>info@azadnexus.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gold" />
                <span>+91 XXXXX XXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            APEDA Registered · ISO Certified · Export-Grade Quality
          </p>
          <p className="font-body text-xs text-white/40 flex items-center gap-1">
            Built with <Heart size={12} className="text-gold fill-current" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
