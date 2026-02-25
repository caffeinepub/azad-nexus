import { Award, FlaskConical, Package, CheckCircle, Shield, Microscope } from 'lucide-react';
import CertificationBadge from '../components/CertificationBadge';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

const labSteps = [
  {
    step: '01',
    title: 'Moisture Analysis',
    description: 'Every batch undergoes precise moisture content testing using calibrated digital moisture meters. Basmati varieties are maintained at ≤12.5% and Non-Basmati at ≤14% to prevent spoilage during transit.',
    icon: FlaskConical,
  },
  {
    step: '02',
    title: 'Purity & Sortex Grading',
    description: 'Advanced optical sortex machines remove broken grains, discolored kernels, and foreign matter. We achieve purity levels of 95–98% depending on the variety and buyer specification.',
    icon: Microscope,
  },
  {
    step: '03',
    title: 'Grain Length & Sizing',
    description: 'Grain dimensions are measured using standardized sizing equipment. 1121 Basmati averages 8.35mm, ensuring the premium elongation buyers expect in high-end markets.',
    icon: CheckCircle,
  },
  {
    step: '04',
    title: 'Aroma & Taste Profile',
    description: 'Basmati varieties are evaluated by trained quality assessors for their characteristic fragrance and cooking elongation — key differentiators in premium export markets.',
    icon: Award,
  },
];

const packagingFeatures = [
  {
    title: 'Moisture-Control Bags',
    description: 'All rice is packed in multi-layer BOPP/PE laminated bags with moisture barriers, preventing humidity ingress during long sea voyages.',
  },
  {
    title: 'Export-Grade Jute & PP Bags',
    description: 'Available in 25kg, 50kg, and 1MT jumbo bags. Custom branding and private labeling available for supermarket chains and distributors.',
  },
  {
    title: 'Labeling Compliance',
    description: 'All packaging meets destination country labeling requirements including country of origin, net weight, batch number, and nutritional information.',
  },
  {
    title: 'Fumigation & Phytosanitary',
    description: 'All shipments are fumigated and accompanied by phytosanitary certificates issued by the Plant Quarantine Authority of India.',
  },
];

export default function QualityAssurance() {
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
              Quality Assurance
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Our Quality Promise</h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            In international trade, trust is the currency. Every shipment from AZAD NEXUS is backed by rigorous testing, certified processes, and export-grade standards.
          </p>
        </div>
      </div>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
              <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                Certifications
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-royal mb-3">Certified for Global Export</h2>
            <p className="font-body text-muted-foreground max-w-2xl">
              Our certifications are the foundation of buyer trust. We maintain all mandatory registrations and international quality certifications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CertificationBadge
              icon={Shield}
              name="APEDA Registration"
              subtitle="Government of India"
              description="Registered with the Agricultural and Processed Food Products Export Development Authority (APEDA) under the Ministry of Commerce & Industry, Government of India. This registration is mandatory for all rice exporters from India."
              note="Registration certificate available upon request. Credential details will be updated with official registration number."
            />
            <CertificationBadge
              icon={Award}
              name="ISO 9001:2015"
              subtitle="Quality Management"
              description="Our quality management systems are aligned with ISO 9001:2015 standards, ensuring consistent processes from procurement and testing through packaging and dispatch. Certification covers all stages of our export operations."
              note="ISO certification in process. Full certification documentation will be provided upon completion."
            />
            <CertificationBadge
              icon={CheckCircle}
              name="FSSAI License"
              subtitle="Food Safety"
              description="Licensed by the Food Safety and Standards Authority of India (FSSAI), ensuring all products meet Indian food safety regulations before export. This is a mandatory requirement for all food exporters."
              note="License details will be updated with official FSSAI license number."
            />
            <CertificationBadge
              icon={FlaskConical}
              name="Phytosanitary Certificate"
              subtitle="Plant Quarantine"
              description="All shipments are accompanied by Phytosanitary Certificates issued by the Plant Quarantine Authority of India, confirming that the consignment is free from pests and diseases as required by importing countries."
            />
          </div>
        </div>
      </section>

      {/* Lab Testing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
              <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                Lab Testing
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-royal mb-3">Rigorous Testing at Every Stage</h2>
            <p className="font-body text-muted-foreground max-w-2xl">
              Our multi-stage quality testing process ensures every batch meets specification before it leaves our facility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {labSteps.map((step) => (
              <div key={step.step} className="bg-white rounded-sm border border-border p-8 shadow-xs hover:shadow-royal transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center"
                      style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
                    >
                      <step.icon size={20} style={{ color: 'oklch(0.75 0.12 75)' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-body text-xs font-bold text-muted-foreground">{step.step}</span>
                      <h3 className="font-display text-lg font-bold text-royal">{step.title}</h3>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Standards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
              <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.75 0.12 75)' }}>
                Packaging
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-royal mb-3">Export-Grade Packaging Standards</h2>
            <p className="font-body text-muted-foreground max-w-2xl">
              Packaging is the last line of defense for quality. Our export-grade packaging solutions protect grain integrity across long sea voyages.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packagingFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 p-6 rounded-sm border border-border bg-cream hover:bg-white transition-colors">
                <div
                  className="w-2 h-2 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: 'oklch(0.75 0.12 75)' }}
                />
                <div>
                  <h3 className="font-display text-lg font-bold text-royal mb-2">{feature.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact">
              <Button
                className="font-body font-semibold rounded-sm"
                style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}
              >
                Request Quality Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
