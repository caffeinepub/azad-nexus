import { useState } from 'react';
import { useSubmitInquiry } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { CheckCircle, Loader2, Mail, Phone, MapPin, Clock } from 'lucide-react';

const riceVarieties = [
  '1121 Basmati',
  'Pusa Basmati',
  'Steam Basmati',
  'Long Grain',
  'IR64',
  'Parboiled (IR64)',
];

interface FormData {
  name: string;
  company: string;
  country: string;
  riceVariety: string;
  quantityMT: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  company: '',
  country: '',
  riceVariety: '',
  quantityMT: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitInquiry();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = 'Full name is required (min 2 characters)';
    if (!form.company.trim() || form.company.trim().length < 2) newErrors.company = 'Company name is required (min 2 characters)';
    if (!form.country.trim() || form.country.trim().length < 2) newErrors.country = 'Country is required';
    if (!form.riceVariety) newErrors.riceVariety = 'Please select a rice variety';
    if (!form.quantityMT || parseFloat(form.quantityMT) <= 0) newErrors.quantityMT = 'Please enter a valid quantity';
    if (!form.message.trim() || form.message.trim().length < 5) newErrors.message = 'Message is required (min 5 characters)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    submitMutation.mutate(
      {
        name: form.name.trim(),
        company: form.company.trim(),
        country: form.country.trim(),
        riceVariety: form.riceVariety,
        quantityMT: parseFloat(form.quantityMT),
        message: form.message.trim(),
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setForm(initialForm);
        },
      }
    );
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

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
              Get in Touch
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Request a Quote</h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            Tell us your requirements and we'll respond with current market pricing and availability within 24 hours.
          </p>
        </div>
      </div>

      {/* Contact Details Banner */}
      <div style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <a
            href="tel:+917058779219"
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 transition-colors"
              style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
            >
              <Phone size={16} className="text-white" />
            </div>
            <div>
              <div className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: 'oklch(0.22 0.09 255)' }}>
                Call Us
              </div>
              <div
                className="font-body text-base font-bold group-hover:underline"
                style={{ color: 'oklch(0.16 0.07 255)' }}
              >
                +91 70587 79219
              </div>
            </div>
          </a>

          <div className="hidden sm:block w-px h-10 bg-white/40" />

          <a
            href="mailto:azadnexus.global@gmail.com"
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 transition-colors"
              style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
            >
              <Mail size={16} className="text-white" />
            </div>
            <div>
              <div className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: 'oklch(0.22 0.09 255)' }}>
                Email Us
              </div>
              <div
                className="font-body text-base font-bold group-hover:underline"
                style={{ color: 'oklch(0.16 0.07 255)' }}
              >
                azadnexus.global@gmail.com
              </div>
            </div>
          </a>
        </div>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-bold text-royal mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: 'Akurdi near Khandoba Mandir, Pimpri Chinchwad, Pune 411035',
                    href: undefined,
                  },
                  { icon: Mail, label: 'Email', value: 'azadnexus.global@gmail.com', href: 'mailto:azadnexus.global@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91 70587 79219', href: 'tel:+917058779219' },
                  { icon: Clock, label: 'Response Time', value: 'Within 24 business hours', href: undefined },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'oklch(0.22 0.09 255)' }}
                    >
                      <item.icon size={16} style={{ color: 'oklch(0.75 0.12 75)' }} />
                    </div>
                    <div>
                      <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-body text-sm font-medium text-foreground mt-0.5 hover:text-royal transition-colors hover:underline block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-body text-sm font-medium text-foreground mt-0.5">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-sm border border-border bg-white">
                <h3 className="font-display text-lg font-bold text-royal mb-3">What to Expect</h3>
                <ul className="space-y-2">
                  {[
                    'Current market pricing for your variety',
                    'Availability and lead time',
                    'Minimum order quantities',
                    'Packaging and labeling options',
                    'Shipping terms (FOB/CIF)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'oklch(0.75 0.12 75)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-sm border border-border p-12 text-center shadow-xs">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'oklch(0.96 0.02 255)' }}
                  >
                    <CheckCircle size={32} style={{ color: 'oklch(0.22 0.09 255)' }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-royal mb-3">Inquiry Submitted!</h3>
                  <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you for your inquiry. Our team will review your requirements and respond with current market pricing within 24 business hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="font-body font-semibold rounded-sm border-royal text-royal hover:bg-royal hover:text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-border p-8 shadow-xs">
                  <h2 className="font-display text-2xl font-bold text-royal mb-6">Inquiry Details</h2>

                  {submitMutation.isError && (
                    <div className="mb-6 p-4 rounded-sm border border-destructive/30 bg-destructive/5">
                      <p className="font-body text-sm text-destructive">
                        {submitMutation.error instanceof Error
                          ? submitMutation.error.message
                          : 'Failed to submit inquiry. Please try again.'}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-body text-sm font-medium text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                        placeholder="John Smith"
                        className={`font-body rounded-sm ${errors.name ? 'border-destructive' : ''}`}
                      />
                      {errors.name && <p className="font-body text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <Label htmlFor="company" className="font-body text-sm font-medium text-foreground">
                        Company Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="company"
                        value={form.company}
                        onChange={e => handleChange('company', e.target.value)}
                        placeholder="Global Foods Ltd."
                        className={`font-body rounded-sm ${errors.company ? 'border-destructive' : ''}`}
                      />
                      {errors.company && <p className="font-body text-xs text-destructive">{errors.company}</p>}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <Label htmlFor="country" className="font-body text-sm font-medium text-foreground">
                        Country <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="country"
                        value={form.country}
                        onChange={e => handleChange('country', e.target.value)}
                        placeholder="United Arab Emirates"
                        className={`font-body rounded-sm ${errors.country ? 'border-destructive' : ''}`}
                      />
                      {errors.country && <p className="font-body text-xs text-destructive">{errors.country}</p>}
                    </div>

                    {/* Rice Variety */}
                    <div className="space-y-2">
                      <Label className="font-body text-sm font-medium text-foreground">
                        Rice Variety <span className="text-destructive">*</span>
                      </Label>
                      <Select value={form.riceVariety} onValueChange={v => handleChange('riceVariety', v)}>
                        <SelectTrigger className={`font-body rounded-sm ${errors.riceVariety ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="Select variety..." />
                        </SelectTrigger>
                        <SelectContent>
                          {riceVarieties.map(v => (
                            <SelectItem key={v} value={v} className="font-body">{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.riceVariety && <p className="font-body text-xs text-destructive">{errors.riceVariety}</p>}
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="quantity" className="font-body text-sm font-medium text-foreground">
                        Quantity (Metric Tons) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        step="0.5"
                        value={form.quantityMT}
                        onChange={e => handleChange('quantityMT', e.target.value)}
                        placeholder="e.g. 25"
                        className={`font-body rounded-sm ${errors.quantityMT ? 'border-destructive' : ''}`}
                      />
                      {errors.quantityMT && <p className="font-body text-xs text-destructive">{errors.quantityMT}</p>}
                    </div>

                    {/* Message */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message" className="font-body text-sm font-medium text-foreground">
                        Message / Additional Requirements <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={e => handleChange('message', e.target.value)}
                        placeholder="Please describe your requirements, preferred packaging, shipping terms, or any other details..."
                        rows={5}
                        className={`font-body rounded-sm resize-none ${errors.message ? 'border-destructive' : ''}`}
                      />
                      {errors.message && <p className="font-body text-xs text-destructive">{errors.message}</p>}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitMutation.isPending}
                      className="w-full font-body font-semibold rounded-sm text-base shadow-gold"
                      style={{ backgroundColor: 'oklch(0.75 0.12 75)', color: 'oklch(0.16 0.07 255)' }}
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Request a Quote'
                      )}
                    </Button>
                    <p className="font-body text-xs text-muted-foreground text-center mt-3">
                      We respond within 24 business hours. All inquiries are confidential.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
