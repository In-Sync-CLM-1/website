import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { EmailScene, EmailFloats } from '@/components/heroScenes';
import { Mail, BarChart3, Users, Zap, Shield, CheckCircle, Bell, Layers, Flag, Clock } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'EmailBroadcast',
  productName: 'Email Broadcast',
  signInUrl: 'https://email-sync.pages.dev',
  demoUrl: 'https://email-sync.pages.dev/demo',
  heroBackdrop: <EmailScene />,
  heroFloats: <EmailFloats />,
  navLinks: [
    { href: '#problem', label: 'Why Email Broadcast' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Campaign sent.',
  headline2: 'Do you know who opened it?',
  description:
    'Multi-tenant email broadcast platform for CRM-integrated campaigns. Send to thousands, track every open and click, and tie results back to your pipeline — all without leaving In-Sync.',
  heroBadges: [
    { icon: Mail, label: 'Resend-powered delivery', color: 'text-blue-500' },
    { icon: BarChart3, label: 'Open & click tracking', color: 'text-indigo-500' },
    { icon: Users, label: 'Multi-org support', color: 'text-sky-500' },
  ],
  theme: {
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-indigo-700',
    hero: {
      base: 'linear-gradient(118deg, #1d4ed8 0%, #3b82f6 40%, #06b6d4 80%, #22d3ee 120%)',
      glow1: 'rgba(34,211,238,0.55)',
      glow2: 'rgba(129,140,248,0.45)',
    },
    headlineAccent: 'from-cyan-200 via-sky-100 to-blue-200',
    textAccent: 'text-blue-600',
    bgLight: 'bg-blue-500/10',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-600',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: Users, title: 'Generic bulk mailers', desc: "Mailchimp doesn't know your CRM. You send the same email to hot leads and dead prospects." },
    { icon: Clock, title: 'No delivery visibility', desc: 'You hit send and hope for the best. Bounces, spam flags, and low open rates go unnoticed.' },
    { icon: Flag, title: 'Zero CRM integration', desc: "Campaign results don't feed back into your pipeline. You can't tell which email converted a deal." },
    { icon: Shield, title: 'Compliance blind spots', desc: 'No unsubscribe management, no suppression lists. One complaint and your domain is blacklisted.' },
  ],
  problemHeadline1: 'Emails sent.',
  problemHeadline2: 'Results invisible.',
  problemIntro:
    'Most broadcast tools treat email as a one-way loudspeaker. Email Broadcast connects your campaigns to your CRM so every send drives measurable pipeline.',
  howItWorks: [
    { step: 1, title: 'Segment', desc: 'Pull contact lists directly from your CRM. Filter by stage, tag, or custom field.', icon: Users },
    { step: 2, title: 'Compose', desc: 'Build HTML or plain-text emails with personalization tokens. Preview before sending.', icon: Layers },
    { step: 3, title: 'Send', desc: 'Resend API handles delivery at scale. Bounce and complaint handling is automatic.', icon: Zap },
    { step: 4, title: 'Analyse', desc: 'Track opens, clicks, and unsubscribes per campaign. Results sync back to CRM contacts.', icon: BarChart3 },
  ],
  howItWorksHeadline: 'Segment → Compose → Send →',
  howItWorksFlow: 'Analyse',
  features: [
    { icon: Mail, title: 'CRM-Integrated Lists', desc: 'Pull segments directly from your In-Sync CRM. Send to a stage, a tag, or a custom saved filter — no CSV exports.', gradient: 'from-blue-500/10 to-indigo-500/10' },
    { icon: BarChart3, title: 'Open & Click Tracking', desc: 'Real-time analytics for every campaign. See individual-level opens and clicks, not just totals.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Shield, title: 'Bounce & Suppression Management', desc: 'Hard bounces and spam complaints auto-suppressed. Your domain reputation stays clean.', gradient: 'from-emerald-500/10 to-green-500/10' },
    { icon: Zap, title: 'Drip & Sequence Campaigns', desc: 'Set up multi-step email sequences with time delays. Nurture leads without manual follow-ups.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: CheckCircle, title: 'HTML + Plain Text Templates', desc: 'Rich template library with your brand colours. Personalisation tokens for name, company, deal stage.', gradient: 'from-teal-500/10 to-cyan-500/10' },
    { icon: Bell, title: 'Event-Based Triggers', desc: 'Send automatically when a CRM event fires — deal won, lead stage changed, form submitted.', gradient: 'from-rose-500/10 to-pink-500/10' },
  ],
  featuresHeadline1: 'Email campaigns that',
  featuresHeadline2: 'close deals.',
  featuresSubtext: 'Not just a broadcast tool — a sales enablement layer built on top of your CRM.',
  stats: [
    { target: 5000000, label: 'Emails Delivered' },
    { target: 42, suffix: '%', label: 'Avg Open Rate' },
    { target: 2000, label: 'Campaigns Run' },
    { target: 150, label: 'Organisations' },
  ],
  verticals: ['NBFCs', 'DSA Networks', 'Insurance', 'Real Estate', 'EdTech', 'Professional Services', 'Trading Companies'],
  testimonial: {
    quote: "We sent a single re-engagement campaign to 4,000 dormant leads and booked 38 demos in 48 hours. Our old tool couldn't even tell us the open rate.",
    author: 'Sales Head',
    role: 'NBFC, Delhi NCR',
  },
  reviews: [
    { name: 'Amit S.', role: 'Marketing Manager, NBFC', rating: 5, text: "The CRM integration means I don't export CSVs anymore. I click a segment, review the list, and send. Done in 5 minutes." },
    { name: 'Kavita R.', role: 'Growth Lead, EdTech', rating: 5, text: "Open rates jumped from 12% to 39% after we switched. Resend's deliverability is genuinely better than what we were using." },
    { name: 'Suresh M.', role: 'Regional Head, Insurance', rating: 4, text: 'The event-triggered emails changed our lead nurturing completely. Prospects get the right email at the right moment, automatically.' },
    { name: 'Pooja K.', role: 'Operations Manager, DSA', rating: 5, text: 'Bounce handling alone saved us. Our domain had been flagged by a previous tool. Email Broadcast cleaned it up in two weeks.' },
    { name: 'Rohit T.', role: 'CEO, Professional Services', rating: 5, text: "The drip sequences for new leads run on autopilot. We didn't hire a marketing exec — Email Broadcast does the job." },
    { name: 'Anjali P.', role: 'Sales Director, Real Estate', rating: 5, text: 'Campaign analytics finally talk to my pipeline. I know exactly which email touched which deal before it closed.' },
  ],
  ctaHeadline: 'Stop sending emails into the void.',
  ctaSubtext: 'Book a free demo and see how Email Broadcast connects every campaign to real pipeline results.',
};

export default function EmailBroadcastPage() {
  return <ProductLanding data={data} />;
}
