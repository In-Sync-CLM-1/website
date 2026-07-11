import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { CRMScene, CRMFloats } from '@/components/heroScenes';
import { Users, Kanban, Mail, MessageSquare, Phone, Brain, UserPlus, Upload, Send, Target, FileSpreadsheet, Bell, EyeOff } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'In-Sync CRM',
  productName: 'In-Sync CRM',
  signInUrl: 'https://crm.in-sync.co.in/login',
  demoUrl: 'https://crm.in-sync.co.in/demo',
  heroBackdrop: <CRMScene />,
  heroFloats: <CRMFloats />,
  navLinks: [
    { href: '#problem', label: 'Why In-Sync CRM' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Stop losing deals.',
  headline2: 'Start closing them.',
  description:
    'Pipeline, campaigns, calling, and AI lead scoring — built for sales teams that need every lead tracked and every deal closed.',
  heroBadges: [
    { icon: Kanban, label: 'Drag-and-drop pipeline', color: 'text-teal-500' },
    { icon: Phone, label: 'Built-in calling', color: 'text-cyan-500' },
    { icon: Brain, label: 'AI lead scoring', color: 'text-violet-500' },
  ],
  theme: {
    gradientFrom: 'from-teal-600',
    gradientTo: 'to-cyan-700',
    hero: {
      base: 'linear-gradient(118deg, #0f172a 0%, #134e4a 45%, #0d9488 80%, #7c3aed 135%)',
      glow1: 'rgba(45,212,191,0.55)',
      glow2: 'rgba(139,92,246,0.45)',
    },
    headlineAccent: 'from-teal-200 via-cyan-100 to-violet-200',
    textAccent: 'text-teal-600',
    bgLight: 'bg-teal-500/10',
    badgeBg: 'bg-teal-500/10',
    badgeText: 'text-teal-600',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: FileSpreadsheet, title: 'Leads live in spreadsheets', desc: 'Enquiries arrive on calls, WhatsApp, and web forms — then vanish into Excel sheets nobody updates.' },
    { icon: Bell, title: 'Follow-ups fall through', desc: 'Reps forget to call back. By the time someone follows up, the lead has bought from a competitor.' },
    { icon: EyeOff, title: 'Zero pipeline visibility', desc: "You don't know how many deals are open, which stage they're stuck in, or what revenue is actually coming." },
    { icon: Phone, title: 'Reps juggle five apps', desc: 'Dialer here, email tool there, WhatsApp on a personal phone. Selling time is lost to app-switching.' },
  ],
  problemHeadline1: 'Leads everywhere.',
  problemHeadline2: 'Revenue nowhere.',
  problemIntro:
    'Most CRMs are databases your team hates updating. In-Sync CRM runs the selling itself — campaigns, calls, follow-ups, and AI prioritisation in one place.',
  howItWorks: [
    { step: 1, title: 'Sign Up', desc: 'Create your workspace and invite your team. Takes 30 seconds, not 30 days.', icon: UserPlus },
    { step: 2, title: 'Import Contacts', desc: 'Drop a CSV or connect your existing tools. We handle the rest automatically.', icon: Upload },
    { step: 3, title: 'Launch Campaigns', desc: 'Hit send on email, WhatsApp, and call campaigns to thousands at once.', icon: Send },
    { step: 4, title: 'Close Deals', desc: 'Watch your pipeline fill up, track every deal, and grow revenue on autopilot.', icon: Target },
  ],
  howItWorksHeadline: 'Sign up → Import → Campaign →',
  howItWorksFlow: 'Close',
  features: [
    { icon: Users, title: 'Contact Management', desc: 'Never lose track of a lead. Organize thousands of contacts with smart filters, tags, and one-click bulk actions.', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: Kanban, title: 'Sales Pipeline', desc: 'See every deal at a glance. Drag-and-drop Kanban boards that show you exactly where your revenue stands.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Mail, title: 'Email Campaigns', desc: 'Send 10,000 emails in minutes. Beautiful templates, A/B testing, and real-time open tracking.', gradient: 'from-green-500/10 to-emerald-500/10' },
    { icon: MessageSquare, title: 'WhatsApp Campaigns', desc: 'Reach customers where they actually read messages. 90%+ open rates via the official Business API.', gradient: 'from-emerald-500/10 to-teal-500/10' },
    { icon: Phone, title: 'Calling System', desc: 'Auto-dial, record, and log every call. Your reps spend time selling, not switching between apps.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: Brain, title: 'AI Insights', desc: 'AI tells you which leads to call first, which campaigns to pause, and where your pipeline is stuck.', gradient: 'from-rose-500/10 to-pink-500/10' },
  ],
  featuresHeadline1: 'Everything a sales team needs.',
  featuresHeadline2: 'Nothing it doesn’t.',
  featuresSubtext: 'Contacts, pipeline, campaigns, calling, and AI — one login, one screen, one source of truth.',
  stats: [
    { target: 25, label: 'Organizations Live' },
    { target: 50000, label: 'Contacts Managed' },
    { target: 99, suffix: '.9%', label: 'Uptime' },
    { target: 8, label: 'Industries Served' },
  ],
  verticals: ['Real Estate', 'Education', 'Financial Services', 'Healthcare', 'IT & SaaS', 'Manufacturing', 'Professional Services', 'Retail'],
  testimonial: {
    quote: 'We moved 60,000 contacts out of spreadsheets and into one pipeline. Every rep knows exactly who to call today — the AI ranks the list before they sit down.',
    author: 'Sales Director',
    role: 'Education services company, 40+ member sales team',
  },
  reviews: [
    { name: 'Karan S.', role: 'Founder, Real Estate Advisory', rating: 5, text: 'The built-in dialer changed everything. Calls, recordings, and notes land on the contact automatically — no more "who spoke to this lead last?"' },
    { name: 'Deepa R.', role: 'VP Sales, EdTech', rating: 5, text: 'WhatsApp and email campaigns from inside the CRM means our nurture actually ties back to pipeline stages. Attribution stopped being guesswork.' },
    { name: 'Nikhil M.', role: 'Sales Head, Financial Services', rating: 5, text: 'AI lead scoring quietly reordered our calling lists. Connect rates went up in the first week because reps called the right people first.' },
    { name: 'Shruti V.', role: 'Operations Manager, Healthcare', rating: 4, text: 'The Kanban pipeline gave management the visibility we never had. Weekly reviews now take 15 minutes instead of an hour of screenshot-hunting.' },
    { name: 'Arvind P.', role: 'Director, Manufacturing SME', rating: 5, text: 'We are not a tech company. The team was live in a day, importing contacts was a CSV drop, and adoption was never a fight.' },
    { name: 'Farah K.', role: 'Inside Sales Lead, IT Services', rating: 5, text: 'Follow-up reminders plus auto-logged activities means nothing slips. Our stale-lead count dropped visibly within a month.' },
  ],
  ctaHeadline: 'Your pipeline. Finally under control.',
  ctaSubtext: 'Book a free demo and see how In-Sync CRM tracks every lead and closes more of them.',
};

export default function GlobalCRMPage() {
  return <ProductLanding data={data} />;
}
