import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAttribution } from '@/lib/attribution';
import { pixelLead } from '@/lib/metaPixel';

const INTAKE_URL = 'https://ejzjrvazegaxrhqizgaa.supabase.co/functions/v1/web-lead-intake';

const DESIGNATIONS = [
  'Founder / Owner / Director',
  'CXO / VP / Head of Department',
  'Operations Manager',
  'Branch / Area Manager',
  'Team Lead / Supervisor',
  'Admin / HR',
  'Other',
];

const EMPTY = { name: '', phone: '', email: '', company: '', designation: '', _hp: '' };

interface HeroLeadFormProps {
  product: string;
  accentClass?: string;
}

export function HeroLeadForm({ product, accentClass = 'bg-primary' }: HeroLeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });

  const field =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error('Please add your name, phone number and email.');
      return;
    }
    setSubmitting(true);
    try {
      const attr = getAttribution();
      const res = await fetch(INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          designation: form.designation,
          _hp: form._hp,
          gclid: attr.gclid,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
          source_url: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gtag = (window as any).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          product_key: product.toLowerCase().replace(/\s+/g, '_'),
          form_type: 'demo',
          cta_label: 'hero_inline_demo',
        });
        gtag('event', 'conversion_event_submit_lead_form');
      }
      pixelLead(product, 'hero_inline_demo');
      setDone(true);
    } catch {
      toast.error('Something went wrong. Please try again, or email us at delight@in-sync.co.in.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border bg-card/95 p-8 text-center text-foreground shadow-xl shadow-black/5 backdrop-blur">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="h-6 w-6 text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold">Thanks — we'll be in touch shortly</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team will call you to understand your needs and arrange your demo.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card/95 p-6 text-foreground shadow-xl shadow-black/5 backdrop-blur sm:p-7">
      <h3 className="text-lg font-semibold">Get a free demo</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Leave your details — we'll call to arrange a time that suits you.
      </p>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <Input placeholder="Your name *" value={form.name} onChange={field('name')} required />
        <Input
          placeholder="Phone *"
          value={form.phone}
          onChange={field('phone')}
          inputMode="tel"
          required
        />
        <Input
          type="email"
          placeholder="Work email *"
          value={form.email}
          onChange={field('email')}
          required
        />
        <Input placeholder="Company" value={form.company} onChange={field('company')} />
        <select
          value={form.designation}
          onChange={field('designation')}
          aria-label="Your role"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Your role (optional)</option>
          {DESIGNATIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <input
          type="text"
          name="company_website"
          value={form._hp}
          onChange={field('_hp')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />
        <Button type="submit" className={`w-full ${accentClass}`} disabled={submitting}>
          {submitting ? 'Sending…' : <><span>Request my demo</span><ArrowRight className="ml-1 h-4 w-4" /></>}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          No spam — we'll only use this to arrange your demo.
        </p>
      </form>
    </div>
  );
}
