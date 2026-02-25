import type { LucideIcon } from 'lucide-react';

interface CertificationBadgeProps {
  icon: LucideIcon;
  name: string;
  subtitle: string;
  description: string;
  note?: string;
}

export default function CertificationBadge({ icon: Icon, name, subtitle, description, note }: CertificationBadgeProps) {
  return (
    <div className="bg-white rounded-sm border-2 border-border hover:border-gold transition-colors duration-300 p-8 shadow-xs hover:shadow-gold group">
      <div className="flex items-start gap-5">
        <div
          className="w-16 h-16 rounded-sm flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'oklch(0.96 0.02 255)' }}
        >
          <Icon size={28} style={{ color: 'oklch(0.22 0.09 255)' }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-xl font-bold text-royal">{name}</h3>
            <span
              className="text-xs font-body font-semibold px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: 'oklch(0.96 0.02 255)', color: 'oklch(0.22 0.09 255)' }}
            >
              {subtitle}
            </span>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
          {note && (
            <p className="mt-3 text-xs font-body italic text-muted-foreground border-l-2 pl-3"
              style={{ borderColor: 'oklch(0.75 0.12 75)' }}>
              {note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
