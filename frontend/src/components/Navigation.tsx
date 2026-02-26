import { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-green-700 shadow-green-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/assets/generated/logo-azad-nexus.dim_400x120.png"
              alt="Azad Nexus Global"
              className="h-12 w-auto"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 8px oklch(0.72 0.14 75 / 0.6))' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium font-body transition-all duration-200 ${
                  currentPath === link.path
                    ? 'text-gold-400 bg-green-800'
                    : 'text-cream-100 hover:text-gold-300 hover:bg-green-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold text-sm rounded-md transition-all duration-200 shadow-gold hover:shadow-gold-lg font-body"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-cream-100 hover:text-gold-300 hover:bg-green-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-green-800 border-t border-green-600">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-md text-sm font-medium font-body transition-colors ${
                  currentPath === link.path
                    ? 'text-gold-400 bg-green-900'
                    : 'text-cream-100 hover:text-gold-300 hover:bg-green-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-green-600">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold text-sm rounded-md transition-colors font-body"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
