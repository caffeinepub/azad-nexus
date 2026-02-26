import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useSubmitInquiry } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const riceVarieties = [
  'Basmati 1121',
  'Pusa Basmati',
  'Steam Basmati',
  'Traditional Basmati',
  'IR-64 Parboiled',
  'Long Grain White',
  'Sona Masoori',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    country: '',
    riceVariety: '',
    quantityMT: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submitInquiry = useSubmitInquiry();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.company || !form.country || !form.riceVariety || !form.quantityMT || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }

    const qty = parseFloat(form.quantityMT);
    if (isNaN(qty) || qty <= 0) {
      setError('Please enter a valid quantity greater than 0.');
      return;
    }

    try {
      await submitInquiry.mutateAsync({
        name: form.name,
        company: form.company,
        country: form.country,
        riceVariety: form.riceVariety,
        quantityMT: qty,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="py-20 bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-300 font-semibold text-sm uppercase tracking-widest font-body">Get In Touch</span>
          <h1 className="font-display text-5xl font-bold text-white mt-3 mb-6">
            Request a Quote
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto font-body">
            Ready to source premium Indian rice? Fill out the form below and our export team 
            will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Banner */}
      <div className="bg-gold-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8">
          <a href="tel:+917058779219" className="flex items-center gap-2 text-green-900 font-semibold font-body hover:text-green-700 transition-colors">
            <Phone size={16} />
            +91 70587 79219
          </a>
          <a href="mailto:azadnexus.global@gmail.com" className="flex items-center gap-2 text-green-900 font-semibold font-body hover:text-green-700 transition-colors">
            <Mail size={16} />
            azadnexus.global@gmail.com
          </a>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-green-800 mb-6">Contact Information</h2>
              </div>
              <div className="bg-white rounded-xl p-6 border border-cream-200 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 font-body text-sm mb-1">Location</p>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">
                      Akurdi near Khandoba Mandir,<br />
                      Pimpri Chinchwad, Pune 411035,<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 font-body text-sm mb-1">Email</p>
                    <a href="mailto:azadnexus.global@gmail.com" className="text-green-700 hover:text-gold-600 text-sm font-body transition-colors">
                      azadnexus.global@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 font-body text-sm mb-1">Phone / WhatsApp</p>
                    <a href="tel:+917058779219" className="text-green-700 hover:text-gold-600 text-sm font-body transition-colors">
                      +91 70587 79219
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 font-body text-sm mb-1">Business Hours</p>
                    <p className="text-muted-foreground text-sm font-body">
                      Mon–Sat: 9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl p-12 border border-cream-200 text-center">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                  <h2 className="font-display text-3xl font-bold text-green-800 mb-4">
                    Inquiry Submitted!
                  </h2>
                  <p className="text-muted-foreground font-body text-lg mb-8">
                    Thank you for your inquiry. Our export team will review your requirements 
                    and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', country: '', riceVariety: '', quantityMT: '', message: '' }); }}
                    className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-colors font-body"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-cream-200">
                  <h2 className="font-display text-2xl font-bold text-green-800 mb-6">
                    Send Us Your Requirements
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="name" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="border-cream-300 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                          Company Name *
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="border-cream-300 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="country" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                          Country *
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="Your country"
                          className="border-cream-300 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="riceVariety" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                          Rice Variety *
                        </Label>
                        <select
                          id="riceVariety"
                          name="riceVariety"
                          value={form.riceVariety}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-cream-300 bg-white text-sm font-body focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <option value="">Select a variety</option>
                          {riceVarieties.map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="quantityMT" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                        Quantity (Metric Tons) *
                      </Label>
                      <Input
                        id="quantityMT"
                        name="quantityMT"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={form.quantityMT}
                        onChange={handleChange}
                        placeholder="e.g. 25"
                        className="border-cream-300 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-green-800 font-body font-medium text-sm mb-1.5 block">
                        Message / Requirements *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please describe your requirements, packaging preferences, delivery port, etc."
                        rows={5}
                        className="border-cream-300 focus:border-green-500 focus:ring-green-500 resize-none"
                        required
                      />
                    </div>
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm font-body">
                        {error}
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={submitInquiry.isPending}
                      className="w-full bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold py-3 rounded-md transition-colors font-body"
                    >
                      {submitInquiry.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-green-900/30 border-t-green-900 rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        'Submit Inquiry'
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
