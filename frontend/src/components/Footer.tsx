import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { SiLinkedin, SiInstagram, SiWhatsapp } from 'react-icons/si';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const riceVarieties = [
  'Basmati 1121',
  'Pusa Basmati',
  'Steam Basmati',
  'IR-64 Parboiled',
  'Long Grain White',
  'Sona Masoori',
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'azad-nexus-global');

  return (
    <footer className="bg-green-900 text-cream-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src="/assets/generated/logo-azad-nexus.dim_400x120.png"
              alt="Azad Nexus Global"
              className="h-12 w-auto mb-4"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 6px oklch(0.72 0.14 75 / 0.5))' }}
            />
            <p className="text-sm text-cream-300 leading-relaxed font-body mb-6">
              Premium Indian rice exporter connecting quality producers with global markets. 
              Trusted by buyers across 30+ countries worldwide.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-800 hover:bg-gold-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin size={16} className="text-gold-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-800 hover:bg-gold-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram size={16} className="text-gold-400" />
              </a>
              <a
                href="https://wa.me/917058779219"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-800 hover:bg-gold-600 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp size={16} className="text-gold-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-gold-400 text-lg mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-300 hover:text-gold-400 transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rice Varieties */}
          <div>
            <h3 className="font-display font-semibold text-gold-400 text-lg mb-5">Our Products</h3>
            <ul className="space-y-2.5">
              {riceVarieties.map((variety) => (
                <li key={variety}>
                  <span className="text-sm text-cream-300 font-body">{variety}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-gold-400 text-lg mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-cream-300 font-body leading-relaxed">
                  Akurdi near Khandoba Mandir,<br />
                  Pimpri Chinchwad, Pune 411035,<br />
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:azadnexus.global@gmail.com"
                  className="text-sm text-cream-300 hover:text-gold-400 transition-colors font-body"
                >
                  azadnexus.global@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-400 flex-shrink-0" />
                <a
                  href="tel:+917058779219"
                  className="text-sm text-cream-300 hover:text-gold-400 transition-colors font-body"
                >
                  +91 70587 79219
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-400 font-body">
            © {year} Azad Nexus Global. All rights reserved.
          </p>
          <p className="text-xs text-cream-400 font-body flex items-center gap-1">
            Built with <Heart size={12} className="text-gold-400 fill-gold-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
