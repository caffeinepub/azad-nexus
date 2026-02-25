import type { LucideIcon } from 'lucide-react';

interface RegionCardProps {
  icon: LucideIcon;
  region: string;
  countries: string;
  description: string;
  highlight: string;
}

export default function RegionCard({ icon: Icon, region, countries, description, highlight }: RegionCardProps) {
  return (
    <div className="bg-white rounded-sm border border-border shadow-xs hover:shadow-royal transition-all duration-300 overflow-hidden group">
      <div className="bg-royal p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-6 translate-x-6"
          style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
        <div className="relative flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'oklch(0.75 0.12 75 / 0.2)' }}
          >
            <Icon size={22} style={{ color: 'oklch(0.75 0.12 75)' }} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">{region}</h3>
            <p className="font-body text-xs text-white/60 mt-0.5">{countries}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
        <div
          className="inline-flex items-center gap-1 text-xs font-body font-semibold px-3 py-1.5 rounded-sm"
          style={{ backgroundColor: 'oklch(0.96 0.02 255)', color: 'oklch(0.22 0.09 255)' }}
        >
          {highlight}
        </div>
      </div>
    </div>
  );
}
