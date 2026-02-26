import { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Quality', to: '/quality' },
  { label: 'Global Footprint', to: '/global-footprint' },
  { label: 'Contact', to: '/contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-royal shadow-royal-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" onClick={() => setMobileOpen(false)}>
            <img
              src="/assets/generated/azad-nexus-logo-real.dim_960x960.png"
              alt="AZAD NEXUS"
              className="h-14 w-auto object-contain"
              style={{
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 8px rgba(201, 168, 76, 0.55)) brightness(1.08)',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-sm font-body text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? 'text-gold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link to="/contact">
              <Button
                className="bg-gold text-royal font-body font-semibold text-sm px-6 py-2 rounded-sm hover:bg-gold-light transition-colors shadow-gold"
                style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}
              >
                Request a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-royal-dark border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-sm font-body text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? 'text-gold bg-white/5'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button
                  className="w-full font-body font-semibold text-sm rounded-sm"
                  style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}
                >
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
