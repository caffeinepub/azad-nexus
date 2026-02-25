import type { LucideIcon } from 'lucide-react';

interface WhyChooseUsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function WhyChooseUsCard({ icon: Icon, title, description }: WhyChooseUsCardProps) {
  return (
    <div className="bg-white rounded-sm border border-border p-8 shadow-xs hover:shadow-royal transition-shadow duration-300 group">
      <div
        className="w-14 h-14 rounded-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform"
        style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
      >
        <Icon size={24} style={{ color: 'oklch(0.75 0.12 75)' }} />
      </div>
      <h3 className="font-display text-xl font-bold text-royal mb-3">{title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
