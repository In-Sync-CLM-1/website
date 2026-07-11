import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { Phone, Mail, Shield, CheckCircle, BarChart3, Bell, Flag, Users, Clock, Sparkles } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'WorkSync',
  productName: 'Work-Sync',
  signInUrl: 'https://work-sync.pages.dev',
  navLinks: [
    { href: '#problem', label: 'Why Work-Sync' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'You gave the task.',
  headline2: 'Do you know if it\'s done?',
  description:
    'Hierarchical task accountability with WhatsApp + email alerts at every step — built for how Indian teams actually work. Assign, track, and confirm task completion across your full designation hierarchy.',
  heroBadges: [
    { icon: Phone, label: 'WhatsApp alerts', color: 'text-emerald-500' },
    { icon: Mail, label: 'Email notifications', color: 'text-blue-500' },
    { icon: Shield, label: 'Designation hierarchy', color: 'text-violet-500' },
  ],
  theme: {
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-purple-700',
    hero: {
      base: 'linear-gradient(135deg, #7e22ce 0%, #9333ea 35%, #7c3aed 70%, #581c87 100%)',
      glow1: 'rgba(192,132,252,0.45)',
      glow2: 'rgba(167,139,250,0.35)',
    },
    textAccent: 'text-violet-600',
    bgLight: 'bg-violet-500/10',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-600',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: Flag, title: 'Tasks given, never tracked', desc: 'Managers assign tasks verbally or over chat. No record. No follow-up.' },
    { icon: Clock, title: 'Deadlines missed silently', desc: 'Due dates pass. Nobody knows until the client complains.' },
    { icon: Users, title: 'No accountability chain', desc: 'Who assigned it? Who was supposed to do it? Nobody remembers.' },
    { icon: Bell, title: 'Updates lost in WhatsApp', desc: 'Task status buried in chat groups. Impossible to extract or report on.' },
  ],
  problemHeadline1: 'Tasks given.',
  problemHeadline2: 'Tasks forgotten.',
  problemIntro:
    'In most Indian teams, task assignment happens over calls, WhatsApp, or verbal instructions. There\'s no system, no tracking, and no accountability. Work-Sync fixes that.',
  howItWorks: [
    { step: 1, title: 'Assign', desc: 'Create a task with deadline, priority, and assignee. Instant WhatsApp + email notification sent automatically.', icon: Flag },
    { step: 2, title: 'Notify', desc: 'Assignee gets notified on WhatsApp and email. No more "I didn\'t know about it."', icon: Bell },
    { step: 3, title: 'Update', desc: 'Status changes trigger automatic alerts up the hierarchy. Everyone stays in the loop without a single meeting.', icon: BarChart3 },
    { step: 4, title: 'Confirm', desc: 'Assigner signs off on completion quality. "Done" means actually done — not just marked done.', icon: CheckCircle },
  ],
  howItWorksHeadline: 'Assign → Notify → Update →',
  howItWorksFlow: 'Confirm',
  features: [
    { icon: Phone, title: 'WhatsApp Alerts', desc: 'Instant task notifications on WhatsApp at every lifecycle stage — the one accountability weapon Asana cannot match.', gradient: 'from-emerald-500/10 to-green-500/10' },
    { icon: CheckCircle, title: 'Satisfaction Confirmation', desc: 'The task giver signs off on completion quality. "Done" is not done until the assigner confirms. No competitor has this.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Shield, title: 'Designation Hierarchy', desc: 'MD → VP → Manager → Executive. Built for how Indian organisations are actually structured, not flat western teams.', gradient: 'from-sky-500/10 to-blue-500/10' },
    { icon: Mail, title: 'Email + WhatsApp Fallback', desc: 'WhatsApp from wallet. Wallet empty? Notifications fall back to email automatically — no disruption, no surprise charges.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: Sparkles, title: 'AI Insights', desc: 'Smart analysis of overdue rates, workload imbalance, bottlenecks, and performer rankings across your team.', gradient: 'from-rose-500/10 to-pink-500/10' },
    { icon: BarChart3, title: 'Team Analytics', desc: 'Completion rates, stacked workload charts, and performance dashboards by designation level.', gradient: 'from-cyan-500/10 to-teal-500/10' },
  ],
  featuresHeadline1: 'Built for',
  featuresHeadline2: 'Indian teams.',
  featuresSubtext: 'WhatsApp-first notifications, designation hierarchies, and the satisfaction confirmation that Asana and ClickUp don\'t have.',
  stats: [
    { target: 5000, label: 'Tasks Tracked Daily' },
    { target: 200, label: 'Teams Active' },
    { target: 99, suffix: '%', label: 'Uptime' },
    { target: 50, label: 'Cities' },
  ],
  verticals: ['NBFCs', 'DSA Networks', 'Trading Companies', 'Logistics Firms', 'Professional Services', 'Insurance', 'Real Estate', 'EdTech'],
  testimonial: {
    quote: 'I finally know what my team is doing. Every task has a trail — who assigned it, when it was done, and whether the quality was accepted.',
    author: 'Operations Head',
    role: 'NBFC with 50+ field agents across 3 states',
  },
  reviews: [
    { name: 'Rajesh K.', role: 'Branch Manager, NBFC', rating: 5, text: 'I finally know what my team is doing. Every task has a trail — who assigned it, when it was done, and whether the quality was accepted.' },
    { name: 'Meera S.', role: 'Operations Head, DSA Network', rating: 5, text: 'The WhatsApp notifications changed everything. My field agents actually respond now because they see it where they already work.' },
    { name: 'Anil P.', role: 'VP Operations, Trading Co.', rating: 5, text: 'We moved from Excel tracking to Work-Sync in one day. The designation hierarchy matched our org structure perfectly.' },
    { name: 'Priya D.', role: 'Team Lead, Logistics', rating: 5, text: 'The satisfaction confirmation feature is a game-changer. Earlier, tasks were marked "done" but the quality was never verified.' },
    { name: 'Vikram M.', role: 'CEO, Professional Services', rating: 5, text: 'Tried Asana and ClickUp — both built for American startups. Work-Sync understands Indian team dynamics.' },
    { name: 'Sonal R.', role: 'Regional Manager, Insurance', rating: 4, text: 'My agents across 3 states get WhatsApp alerts the moment a task is assigned. Response time dropped from 2 days to 4 hours.' },
  ],
  ctaHeadline: 'Stop losing tasks in WhatsApp groups.',
  ctaSubtext: 'Book a free demo and see how Work-Sync gives your team the accountability structure they actually need.',
};

export default function WorkSyncPage() {
  return <ProductLanding data={data} />;
}
