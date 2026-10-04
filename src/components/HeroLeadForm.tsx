import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAttribution } from '@/lib/attribution';
import { pixelLead } from '@/lib/metaPixel';
import { adsLeadConversion } from '@/lib/googleAds';
import { getTurnstileToken } from '@/lib/turnstile';

const INTAKE_URL = 'https://ejzjrvazegaxrhqizgaa.supabase.co/functions/v1/web-lead-intake';

// Visitors paste or autofill "+91 98765 43210" / "098765 43210". Strip a leading
// country code or trunk 0 so those become the 10-digit number they meant,
// instead of being cut to the first 10 digits (a wrong number) or rejected.
const normalizePhone = (v: string) => {
  let d = v.replace(/\D/g, '');
  while (d.length > 10) {
    if (d.startsWith('0')) d = d.slice(1);
    else if (d.startsWith('91')) d = d.slice(2);
    else break;
  }
  return d;
};
const isValidPhone = (v: string) => /^[6-9]\d{9}$/.test(normalizePhone(v));
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const DESIGNATIONS = [
  'Founder / Owner / Director',
  'CXO / VP / Head of Department',
  'Operations Manager',
  'Branch / Area Manager',
  'Team Lead / Supervisor',
  'Admin / HR',
  'Other',
];

const TURNSTILE_WAIT_MS = 4000;
const REQUEST_TIMEOUT_MS = 15000;

// The browser tells the server when it refuses to send (validation, network):
// those never reach the server otherwise, which is how a form can fail for
// many visitors with nothing on record. Event names only, never values.
function reportClientError(product: string, event: string) {
  try {
    void fetch(INTAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _client_event: event, product, source_url: window.location.href }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* logging must never get in the way of the form */
  }
}

const EMPTY = { name: '', phone: '', email: '', company: '', designation: '', _hp: '' };

interface HeroLeadFormProps {
  product: string;
  accentClass?: string;
}

export function HeroLeadForm({ product, accentClass = 'bg-primary' }: HeroLeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });

  const field =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setError(null);
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.company.trim()) {
      setError('Please add your name, phone number, email and company name.');
      reportClientError(product, 'missing_fields');
      return;
    }
    if (!isValidPhone(form.phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      reportClientError(product, 'phone_invalid');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address.');
      reportClientError(product, 'email_invalid');
      return;
    }
    setSubmitting(true);
    try {
      const attr = getAttribution();
      // Invisible — no challenge, no friction. Resolves to null if Turnstile
      // isn't configured yet or fails to load; the backend only logs the
      // result and never rejects a lead over it. Capped so a stalled check on
      // a slow phone can't hold the lead back.
      const turnstileToken = await Promise.race([
        getTurnstileToken(),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), TURNSTILE_WAIT_MS)),
      ]);
      const res = await fetch(INTAKE_URL, {
        method: 'POST',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          name: form.name,
          phone: normalizePhone(form.phone),
          email: form.email,
          company: form.company,
          designation: form.designation,
          _hp: form._hp,
          turnstile_token: turnstileToken,
          gclid: attr.gclid,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
          source_url: window.location.href,
        }),
      });
      if (!res.ok) {
        // A 4xx carries a specific reason from the server (e.g. a bad number): show it.
        let reason: string | null = null;
        if (res.status >= 400 && res.status < 500) {
          try {
            reason = ((await res.json()) as { error?: string }).error ?? null;
          } catch {
            /* no readable body */
          }
        }
        reportClientError(product, 'server_error');
        setError(reason ?? 'Something went wrong, please try again.');
        return;
      }
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
      adsLeadConversion();
      pixelLead(product, 'hero_inline_demo');
      setDone(true);
    } catch {
      reportClientError(product, 'network_error');
      setError('Something went wrong, please try again. If it keeps failing, email us at delight@in-sync.co.in.');
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
          placeholder="10-digit mobile *"
          value={form.phone}
          onChange={(e) => {
            setError(null);
            // Up to 13 digits so a pasted "+91 …" or "0 …" number isn't cut short;
            // it is normalised to 10 digits on submit.
            setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 13) }));
          }}
          inputMode="tel"
          autoComplete="tel-national"
          required
        />
        <Input
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={field('email')}
          required
        />
        <Input placeholder="Company *" value={form.company} onChange={field('company')} required />
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
        {/* Honeypot: real visitors never see or fill it. The name is deliberately
            meaningless so browser/password-manager autofill has nothing to match. */}
        <input
          type="text"
          name="hp_field_x7"
          value={form._hp}
          onChange={field('_hp')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
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
