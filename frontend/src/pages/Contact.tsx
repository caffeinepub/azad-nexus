import { useState } from 'react';
import { useSubmitInquiry } from '../hooks/useQueries';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const RICE_CATEGORIES = [
  '1121 Basmati Rice',
  'Pusa Basmati Rice',
  'IR64 Parboiled Rice',
  'Long Grain White Rice',
  'Steam Basmati Rice',
  'Other',
];

interface FormData {
  name: string;
  company: string;
  country: string;
  riceCategory: string;
  quantityMT: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  company: '',
  country: '',
  riceCategory: '',
  quantityMT: '',
  email: '',
  phone: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useSubmitInquiry();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = 'Name must be at least 2 characters.';
    if (!form.company.trim() || form.company.trim().length < 2)
      newErrors.company = 'Company name must be at least 2 characters.';
    if (!form.country.trim() || form.country.trim().length < 2)
      newErrors.country = 'Country must be at least 2 characters.';
    if (!form.riceCategory) newErrors.riceCategory = 'Please select a rice category.';
    if (!form.quantityMT.trim() || isNaN(parseFloat(form.quantityMT)) || parseFloat(form.quantityMT) <= 0)
      newErrors.quantityMT = 'Quantity must be a positive number.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = 'Please enter a valid email address.';
    if (!form.phone.trim() || form.phone.trim().length < 7)
      newErrors.phone = 'Please enter a valid phone number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitInquiry.mutateAsync({
        name: form.name.trim(),
        company: form.company.trim(),
        country: form.country.trim(),
        quantityMT: form.quantityMT.trim(),
        riceCategory: form.riceCategory,
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      setSubmitted(true);
    } catch {
      // Error is handled via submitInquiry.error
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
    submitInquiry.reset();
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Inquiry Submitted!</h2>
            <p className="text-muted-foreground mt-2">
              Thank you for reaching out. Our team will contact you within 24 hours with a tailored
              quote.
            </p>
          </div>
          <Button onClick={handleReset} variant="outline">
            Submit Another Inquiry
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="bg-navy py-14 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Contact Us</h1>
        <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
          Ready to source premium rice? Fill out the form below and our team will respond within 24
          hours with a tailored quote.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-5">
            <h2 className="text-lg font-semibold text-foreground">Get in Touch</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>+91 70587 79219</span>
              </div>
              <div className="flex gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>info@azadnexus.com</span>
              </div>
              <div className="flex gap-3">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Mon–Sat, 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 text-sm text-foreground space-y-2">
            <p className="font-semibold text-gold">Why Choose AZAD NEXUS?</p>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Premium quality rice varieties</li>
              <li>Competitive export pricing</li>
              <li>Reliable global shipping</li>
              <li>Dedicated account managers</li>
            </ul>
          </div>
        </aside>

        {/* Form */}
        <section className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Request a Quote</h2>

            {submitInquiry.isError && (
              <div className="mb-5 p-4 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                {submitInquiry.error instanceof Error
                  ? submitInquiry.error.message
                  : 'Something went wrong. Please try again.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="John Smith"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    placeholder="Acme Trading Co."
                    className={errors.company ? 'border-destructive' : ''}
                  />
                  {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    placeholder="United Arab Emirates"
                    className={errors.country ? 'border-destructive' : ''}
                  />
                  {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
                </div>

                {/* Rice Category */}
                <div className="space-y-1.5">
                  <Label htmlFor="riceCategory">Category of Rice *</Label>
                  <Select
                    value={form.riceCategory}
                    onValueChange={(v) => setForm((f) => ({ ...f, riceCategory: v }))}
                  >
                    <SelectTrigger
                      id="riceCategory"
                      className={errors.riceCategory ? 'border-destructive' : ''}
                    >
                      <SelectValue placeholder="Select category…" />
                    </SelectTrigger>
                    <SelectContent>
                      {RICE_CATEGORIES.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.riceCategory && (
                    <p className="text-xs text-destructive">{errors.riceCategory}</p>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-1.5">
                  <Label htmlFor="quantityMT">Quantity (Metric Tons) *</Label>
                  <Input
                    id="quantityMT"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={form.quantityMT}
                    onChange={(e) => setForm((f) => ({ ...f, quantityMT: e.target.value }))}
                    placeholder="e.g. 25"
                    className={errors.quantityMT ? 'border-destructive' : ''}
                  />
                  {errors.quantityMT && (
                    <p className="text-xs text-destructive">{errors.quantityMT}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="john@company.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+971 50 123 4567"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your requirements, preferred packaging, delivery timeline, etc."
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto px-10"
                disabled={submitInquiry.isPending}
              >
                {submitInquiry.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
