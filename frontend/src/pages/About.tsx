import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle, Globe, Leaf, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'Every shipment undergoes rigorous quality checks. We never compromise on the standards that have built our reputation.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Understanding diverse market needs across continents allows us to tailor our offerings to each buyer\'s requirements.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    description: 'We partner with farmers who practice responsible agriculture, ensuring long-term sustainability for all stakeholders.',
  },
  {
    icon: Users,
    title: 'Partnership Approach',
    description: 'We build lasting relationships with both our farming partners and international buyers, creating mutual value.',
  },
];

const milestones = [
  { year: '2008', event: 'Founded in Pune, Maharashtra with a vision to export premium Indian rice globally' },
  { year: '2012', event: 'Achieved APEDA certification and expanded to Middle Eastern markets' },
  { year: '2016', event: 'Crossed 10,000 metric tons annual export milestone' },
  { year: '2019', event: 'Expanded product portfolio to include 8 premium rice varieties' },
  { year: '2022', event: 'Reached 30+ countries served with 500+ satisfied clients worldwide' },
  { year: '2024', event: 'Launched direct farmer partnership program across 5 Indian states' },
];

const certifications = [
  'APEDA Registered Exporter',
  'FSSAI Certified',
  'ISO 9001:2015',
  'Phytosanitary Certified',
  'Halal Certified',
  'Organic Certified (Select Varieties)',
];

export default function About() {
  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/generated/about-farming.dim_1200x600.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-gold-300 font-semibold text-sm uppercase tracking-widest font-body">About Us</span>
            <h1 className="font-display text-5xl font-bold text-white mt-3 mb-6">
              Rooted in India,<br />
              <span className="text-gold-400">Reaching the World</span>
            </h1>
            <p className="text-cream-200 text-lg leading-relaxed font-body">
              For over 15 years, Azad Nexus Global has been bridging the gap between India's 
              finest rice producers and international buyers who demand nothing but the best.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-600 font-semibold text-sm uppercase tracking-widest font-body">Our Story</span>
              <h2 className="font-display text-4xl font-bold text-green-800 mt-2 mb-6">
                A Legacy of Excellence in Rice Export
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  Founded in 2008 in Pune, Maharashtra, Azad Nexus Global began with a simple mission: 
                  to bring the world's finest Indian rice to international tables. What started as a 
                  small trading operation has grown into a trusted name in global rice exports.
                </p>
                <p>
                  Our deep roots in India's agricultural heartland give us unparalleled access to 
                  premium rice varieties from Punjab, Haryana, Uttar Pradesh, West Bengal, and beyond. 
                  We work directly with farmers, ensuring fair prices at the source and exceptional 
                  quality for our buyers.
                </p>
                <p>
                  Today, we serve buyers across 30+ countries in the Middle East, Southeast Asia, 
                  Africa, and Europe — delivering not just rice, but the trust and reliability that 
                  comes with every Azad Nexus shipment.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-colors font-body"
              >
                Partner With Us
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '15+', label: 'Years of Excellence' },
                { value: '30+', label: 'Countries Served' },
                { value: '500+', label: 'Happy Clients' },
                { value: '50K+', label: 'MT Exported Annually' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-cream-100 rounded-xl p-6 text-center border border-cream-200"
                >
                  <div className="font-display text-4xl font-bold text-gold-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-green-700 font-medium font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-widest font-body">Our Values</span>
            <h2 className="font-display text-4xl font-bold text-green-800 mt-2 mb-4">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 border border-cream-200 hover:border-gold-300 hover:shadow-gold transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                  <value.icon size={22} className="text-green-700 group-hover:text-gold-600 transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-green-800 text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-widest font-body">Our Journey</span>
            <h2 className="font-display text-4xl font-bold text-green-800 mt-2 mb-4">
              Milestones That Define Us
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center z-10 relative">
                      <span className="font-display font-bold text-gold-400 text-sm">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="bg-cream-50 rounded-xl p-5 flex-1 border border-cream-200 mt-2">
                    <p className="text-green-800 font-body leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-300 font-semibold text-sm uppercase tracking-widest font-body">Certifications</span>
            <h2 className="font-display text-4xl font-bold text-white mt-2 mb-4">
              Certified for Global Standards
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="bg-green-700/50 border border-green-600 rounded-xl p-4 text-center hover:border-gold-400 transition-colors"
              >
                <CheckCircle size={24} className="text-gold-400 mx-auto mb-2" />
                <p className="text-cream-200 text-xs font-body leading-tight">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
