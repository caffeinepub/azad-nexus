import { Link } from '@tanstack/react-router';
import { ArrowRight, Package, Truck, FlaskConical, Leaf, Globe, HeadphonesIcon } from 'lucide-react';
import { useGetServices } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const defaultServices = [
  {
    icon: Package,
    name: 'Premium Basmati Rice',
    description: 'World-renowned aromatic long-grain rice from the foothills of the Himalayas.',
    details: 'Available varieties: 1121 Basmati, Pusa Basmati, Steam Basmati, Traditional Basmati. Grain length: 7.5mm+. Moisture: ≤12.5%. Broken: ≤1%.',
  },
  {
    icon: Leaf,
    name: 'Non-Basmati Rice',
    description: 'High-quality non-basmati varieties for diverse culinary applications worldwide.',
    details: 'Available varieties: IR-64, Sona Masoori, Long Grain White, Swarna. Suitable for retail, food service, and industrial use.',
  },
  {
    icon: FlaskConical,
    name: 'Quality Assurance',
    description: 'Rigorous multi-stage quality testing ensuring every shipment meets international standards.',
    details: 'Lab testing for moisture, broken grains, foreign matter, pesticide residues. Certificates: FSSAI, Phytosanitary, Certificate of Origin.',
  },
  {
    icon: Package,
    name: 'Custom Packaging',
    description: 'Flexible packaging solutions tailored to your market requirements and branding needs.',
    details: 'Available in 1kg, 2kg, 5kg, 10kg, 25kg, 50kg bags. PP woven, jute, or vacuum packaging. Private label and custom branding available.',
  },
  {
    icon: Truck,
    name: 'Export Logistics',
    description: 'End-to-end logistics management from our warehouses to your destination port.',
    details: 'FCL and LCL shipments. Ports: JNPT Mumbai, Mundra, Chennai. Documentation: Bill of Lading, COO, Phytosanitary, Quality Certificate.',
  },
  {
    icon: HeadphonesIcon,
    name: 'Trade Consultation',
    description: 'Expert guidance on import regulations, documentation, and market entry strategies.',
    details: 'Assistance with import permits, tariff classification, and compliance with destination country regulations. Available in English, Hindi, and Arabic.',
  },
];

export default function Services() {
  const { data: backendServices, isLoading } = useGetServices();

  const services = backendServices && backendServices.length > 0
    ? backendServices.map((s, i) => ({
        icon: defaultServices[i % defaultServices.length].icon,
        name: s.name,
        description: s.description,
        details: s.details,
      }))
    : defaultServices;

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative py-24 bg-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/generated/rice-varieties.dim_800x500.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-300 font-semibold text-sm uppercase tracking-widest font-body">What We Offer</span>
          <h1 className="font-display text-5xl font-bold text-white mt-3 mb-6">
            Our Services & Products
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto font-body">
            From premium rice varieties to complete export solutions — we provide everything 
            you need to source the finest Indian rice for your market.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-cream-200">
                  <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white rounded-xl p-6 border border-cream-200 hover:border-gold-300 hover:shadow-gold transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                    <service.icon size={22} className="text-green-700 group-hover:text-gold-600 transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-green-800 text-xl mb-3">{service.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">{service.description}</p>
                  <div className="pt-4 border-t border-cream-200">
                    <p className="text-xs text-green-700 font-body leading-relaxed">{service.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-600 font-semibold text-sm uppercase tracking-widest font-body">Quality Promise</span>
              <h2 className="font-display text-4xl font-bold text-green-800 mt-2 mb-6">
                Uncompromising Quality at Every Step
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  Our quality assurance process begins at the farm and continues through processing, 
                  packaging, and delivery. Every batch is tested in accredited laboratories before shipment.
                </p>
                <p>
                  We maintain strict quality parameters including moisture content, grain length, 
                  broken percentage, and foreign matter — all within international standards.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold rounded-md transition-colors font-body"
              >
                Request Quality Certificates
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-green-lg">
              <img
                src="/assets/generated/quality-assurance.dim_800x500.png"
                alt="Quality Assurance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-widest font-body">How It Works</span>
            <h2 className="font-display text-4xl font-bold text-green-800 mt-2 mb-4">
              Our Export Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Inquiry', desc: 'Submit your requirements via our contact form or WhatsApp' },
              { step: '02', title: 'Quotation', desc: 'Receive competitive pricing within 24 hours' },
              { step: '03', title: 'Sampling', desc: 'We send product samples for your approval' },
              { step: '04', title: 'Production', desc: 'Rice is processed, tested, and packaged to your specs' },
              { step: '05', title: 'Delivery', desc: 'Shipment dispatched with full documentation' },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-green-700 text-gold-400 font-display font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-green-800 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
