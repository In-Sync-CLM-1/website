import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { WhatsAppScene, WhatsAppFloats } from '@/components/heroScenes';
import { MessageSquare, BarChart3, CheckCircle, Bell, Shield, Layers, Users, Flag, Phone, Zap } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'WhatsAppCampaigns',
  productName: 'WhatsApp Campaigns',
  signInUrl: 'https://wa-sync.pages.dev',
  demoUrl: 'https://wa-sync.pages.dev/demo',
  heroBackdrop: <WhatsAppScene />,
  heroFloats: <WhatsAppFloats />,
  navLinks: [
    { href: '#problem', label: 'Why WhatsApp Campaigns' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Messages sent.',
  headline2: 'Do you know who replied?',
  description:
    'WhatsApp campaign management via Exotel\'s official Business API. Send approved templates at scale, track delivery and replies, and stay compliant — without using personal WhatsApp accounts.',
  heroBadges: [
    { icon: Phone, label: 'Exotel Business API', color: 'text-emerald-500' },
    { icon: CheckCircle, label: 'Approved templates', color: 'text-green-500' },
    { icon: BarChart3, label: 'Delivery analytics', color: 'text-teal-500' },
  ],
  theme: {
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-green-700',
    hero: {
      base: 'linear-gradient(118deg, #047857 0%, #10b981 40%, #25d366 80%, #a3e635 130%)',
      glow1: 'rgba(37,211,102,0.5)',
      glow2: 'rgba(163,230,53,0.4)',
    },
    headlineAccent: 'from-lime-200 via-green-100 to-emerald-200',
    textAccent: 'text-emerald-600',
    bgLight: 'bg-emerald-500/10',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-600',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: Phone, title: 'Personal WhatsApp abuse', desc: 'Agents send bulk messages from personal numbers. Meta bans the number. All contact history is lost.' },
    { icon: Flag, title: 'No delivery visibility', desc: 'You send a broadcast and never know who received it, who read it, and who replied.' },
    { icon: Shield, title: 'Compliance risk', desc: 'Unapproved message templates, missing opt-outs, and grey routes. One complaint and your account is blocked.' },
    { icon: Users, title: 'No opt-out management', desc: 'Recipients who opt out keep getting messages because there\'s no suppression list. Spam complaints mount.' },
  ],
  problemHeadline1: 'Messages delivered.',
  problemHeadline2: 'Results unknown.',
  problemIntro:
    'Most businesses run WhatsApp campaigns from personal phones with no analytics and no compliance. WhatsApp Campaigns runs on Exotel\'s official API — so your messages are delivered, tracked, and legal.',
  howItWorks: [
    { step: 1, title: 'Template', desc: 'Submit message templates for Meta approval. Manage your approved library inside the platform.', icon: Layers },
    { step: 2, title: 'Segment', desc: 'Upload contact lists or pull segments from your CRM. Apply filters for targeted campaigns.', icon: Users },
    { step: 3, title: 'Send', desc: 'Exotel Business API delivers at scale. Opt-outs handled automatically. No number bans.', icon: Zap },
    { step: 4, title: 'Track', desc: 'Live delivery rates, read receipts, and reply tracking. Know who engaged and who didn\'t.', icon: BarChart3 },
  ],
  howItWorksHeadline: 'Template → Segment → Send →',
  howItWorksFlow: 'Track',
  features: [
    { icon: Layers, title: 'Template Management', desc: 'Submit, version, and manage your Meta-approved message templates. Never send a non-compliant message again.', gradient: 'from-emerald-500/10 to-green-500/10' },
    { icon: Users, title: 'Contact Segmentation', desc: 'Upload CSV lists or pull from your CRM. Filter by field, tag, or custom attribute before sending.', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: Phone, title: 'Exotel Business API', desc: 'Official WhatsApp Business API via Exotel — high deliverability, no grey routes, no account bans.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Shield, title: 'Opt-Out Compliance', desc: 'STOP messages auto-suppressed from all future campaigns. Opt-out lists maintained per organisation.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: BarChart3, title: 'Campaign Analytics', desc: 'Sent, delivered, read, and replied — tracked per campaign and per contact. Identify who engaged and follow up.', gradient: 'from-teal-500/10 to-emerald-500/10' },
    { icon: Bell, title: 'Scheduled Campaigns', desc: 'Schedule campaigns for optimal delivery times. Staggered sending to avoid throttling and improve read rates.', gradient: 'from-rose-500/10 to-pink-500/10' },
  ],
  featuresHeadline1: 'WhatsApp campaigns',
  featuresHeadline2: 'that don\'t get banned.',
  featuresSubtext: 'Official API, approved templates, opt-out management, and live analytics — the compliant way to reach customers on WhatsApp.',
  stats: [
    { target: 5000000, label: 'Messages Delivered' },
    { target: 85, suffix: '%', label: 'Avg Read Rate' },
    { target: 10000, label: 'Campaigns Sent' },
    { target: 300, label: 'Organisations' },
  ],
  verticals: ['NBFCs', 'DSA Networks', 'Real Estate', 'Insurance', 'EdTech', 'E-commerce', 'Healthcare', 'Professional Services'],
  testimonial: {
    quote: 'We used to lose a personal WhatsApp number every 2 months to Meta bans. Since switching to official API through WhatsApp Campaigns, we\'ve sent 2 million messages with zero bans.',
    author: 'Marketing Head',
    role: 'NBFC with 50,000-customer base, Gurgaon',
  },
  reviews: [
    { name: 'Arjun S.', role: 'Marketing Manager, NBFC', rating: 5, text: 'The official API delivery rate is incomparable. Our read rate went from 45% on personal WhatsApp blasts to 83% on compliant campaigns.' },
    { name: 'Rekha M.', role: 'Campaign Manager, Real Estate', rating: 5, text: 'Template management made compliance easy. Our legal team approved the templates once — now we just pick from the library.' },
    { name: 'Suresh K.', role: 'Growth Head, EdTech', rating: 5, text: 'Opt-out compliance was always a headache. Now it\'s automatic. Recipients who say STOP are removed from every future campaign without any manual action.' },
    { name: 'Pooja T.', role: 'Operations Director, DSA', rating: 4, text: 'The analytics per campaign finally gave us data to optimise. We shifted to morning sends and saw a 20% improvement in response rates.' },
    { name: 'Nikhil R.', role: 'CEO, Insurance Agency', rating: 5, text: 'We ran renewal reminders to 8,000 customers and had 400 callbacks in 48 hours. That campaign paid for the platform 10 times over.' },
    { name: 'Ananya P.', role: 'CRM Head, E-commerce', rating: 5, text: 'The CRM integration means I don\'t export contacts anymore. I filter in CRM, the segment syncs to WhatsApp Campaigns, and I send.' },
  ],
  ctaHeadline: 'Stop running campaigns from personal phones.',
  ctaSubtext: 'Book a free demo and see how WhatsApp Campaigns delivers at scale, tracks every message, and keeps you compliant.',
};

export default function WhatsAppCampaignsPage() {
  return <ProductLanding data={data} />;
}
