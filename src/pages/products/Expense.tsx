import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { ExpenseScene, ExpenseFloats } from '@/components/heroScenes';
import { Receipt, CheckCircle, Bell, BarChart3, Shield, Layers, Clock, Users, Flag, CreditCard } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'ExpenseClaims',
  productName: 'Expense Claims',
  heroBackdrop: <ExpenseScene />,
  heroFloats: <ExpenseFloats />,
  navLinks: [
    { href: '#problem', label: 'Why Expense Claims' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Your team spent.',
  headline2: 'Do you know what was approved vs what wasn\'t?',
  description:
    'Employee expense claim management with multi-level approvals, receipt capture, and auto-notifications. Multi-tenant, OTP-based onboarding, and PWA so your field teams can submit claims from the road.',
  heroBadges: [
    { icon: Receipt, label: 'Receipt capture', color: 'text-rose-500' },
    { icon: CheckCircle, label: 'Multi-level approvals', color: 'text-pink-500' },
    { icon: Bell, label: 'Auto-notifications', color: 'text-red-500' },
  ],
  theme: {
    gradientFrom: 'from-rose-600',
    gradientTo: 'to-pink-700',
    hero: {
      base: 'linear-gradient(118deg, #e11d48 0%, #ec4899 45%, #d946ef 90%, #8b5cf6 130%)',
      glow1: 'rgba(253,164,175,0.45)',
      glow2: 'rgba(240,171,252,0.45)',
    },
    headlineAccent: 'from-rose-200 via-pink-100 to-fuchsia-200',
    textAccent: 'text-rose-600',
    bgLight: 'bg-rose-500/10',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-600',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: Receipt, title: 'Paper receipt chaos', desc: 'Field agents collect paper receipts all week then submit a crumpled pile on Friday. Half are unreadable.' },
    { icon: Clock, title: 'Email approval chains', desc: 'Claims sit in someone\'s inbox for days. No reminders. Employees chase approvals over WhatsApp.' },
    { icon: Flag, title: 'No audit trail', desc: 'Finance can\'t tell who approved what, when, and why. Month-end reconciliation takes days.' },
    { icon: Users, title: 'Delayed reimbursements', desc: 'Employees wait 3–4 weeks for money they spent on company work. Resentment builds fast.' },
  ],
  problemHeadline1: 'Claims submitted.',
  problemHeadline2: 'Approvals stuck.',
  problemIntro:
    'Most companies run expense management over WhatsApp and Excel. Expense Claims gives every rupee a workflow — submitted, reviewed, approved, and reimbursed with a full audit trail.',
  howItWorks: [
    { step: 1, title: 'Submit', desc: 'Employee opens the PWA on their phone, fills the claim, and attaches a photo of the receipt. Done in 2 minutes.', icon: Receipt },
    { step: 2, title: 'Review', desc: 'Approver gets an email notification instantly. Approve, reject, or query from their phone without logging in.', icon: CheckCircle },
    { step: 3, title: 'Approve', desc: 'Multi-level approval chains route the claim to the right person at each stage automatically.', icon: Layers },
    { step: 4, title: 'Reimburse', desc: 'Finance marks claims as paid. Employees notified. Full audit log retained for every transaction.', icon: CreditCard },
  ],
  howItWorksHeadline: 'Submit → Review → Approve →',
  howItWorksFlow: 'Reimburse',
  features: [
    { icon: Receipt, title: 'Mobile Receipt Capture', desc: 'PWA camera integration — photograph the receipt, fill amount and category, submit. Works offline, syncs on signal.', gradient: 'from-rose-500/10 to-pink-500/10' },
    { icon: Layers, title: 'Multi-Level Approval Workflows', desc: 'Configurable approval chains by department, amount, or category. No more email chains — structured routing.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Bell, title: 'Transactional Email Notifications', desc: 'Approvers notified on submission. Employees notified on approval or rejection. All powered by Resend.', gradient: 'from-blue-500/10 to-indigo-500/10' },
    { icon: Shield, title: 'Policy Enforcement', desc: 'Per-category limits, max claim amounts, and mandatory fields enforced at submission — not discovered at audit.', gradient: 'from-emerald-500/10 to-green-500/10' },
    { icon: Users, title: 'Multi-Tenant Orgs', desc: 'One platform for multiple organisations or branches. Each has its own policies, approvers, and reporting.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: BarChart3, title: 'Spend Analytics', desc: 'Expense by category, team, and period. Top spenders, policy breaches, and reimbursement TAT on one dashboard.', gradient: 'from-teal-500/10 to-cyan-500/10' },
  ],
  featuresHeadline1: 'Every expense claim,',
  featuresHeadline2: 'tracked and approved.',
  featuresSubtext: 'Mobile-first, offline-capable, and multi-level — built for field teams that can\'t wait until they\'re back at a desk.',
  stats: [
    { target: 100000, label: 'Claims Processed' },
    { target: 5, suffix: ' days', label: 'Avg Reimbursement TAT' },
    { target: 95, suffix: '%', label: 'Policy Compliance Rate' },
    { target: 200, label: 'Teams Active' },
  ],
  verticals: ['NBFCs', 'DSA Networks', 'Field-Heavy Organisations', 'Staffing Companies', 'Insurance', 'Real Estate', 'Professional Services', 'EdTech'],
  testimonial: {
    quote: 'We went from a 3-week reimbursement cycle to 5 days. Our field agents stopped dreading expense submission — they just use their phone the same way they take photos.',
    author: 'Finance Manager',
    role: 'NBFC with 300+ field employees, Pune',
  },
  reviews: [
    { name: 'Ritu M.', role: 'Finance Head, NBFC', rating: 5, text: 'Month-end reconciliation used to take my team 3 days. Now it\'s 2 hours. The audit trail is complete — every claim has a receipt, an approver, and a timestamp.' },
    { name: 'Sanjay K.', role: 'Operations Director, DSA Network', rating: 5, text: 'Our field agents were submitting paper claims 2 weeks late. Since the PWA went live, same-day submissions are the norm.' },
    { name: 'Anjali P.', role: 'HR Manager, Insurance', rating: 4, text: 'Multi-level approval routing was the piece we were missing. Claims no longer get lost when the first approver is on leave.' },
    { name: 'Deepak S.', role: 'CFO, Professional Services', rating: 5, text: 'Policy limits enforced at submission mean our approvers never see out-of-policy claims anymore. It\'s filtered before it reaches them.' },
    { name: 'Naina T.', role: 'Admin Head, EdTech', rating: 5, text: 'OTP onboarding for new employees is brilliant. They\'re up and submitting claims on day one without any IT setup.' },
    { name: 'Vivek R.', role: 'Branch Manager, Real Estate', rating: 5, text: 'The spend analytics dashboard showed us that 30% of our travel claims were in one category. We renegotiated a vendor deal and saved ₹8 lakh quarterly.' },
  ],
  ctaHeadline: 'Stop chasing expense approvals on WhatsApp.',
  ctaSubtext: 'Book a free demo and see how Expense Claims processes every rupee with a proper workflow and audit trail.',
};

export default function ExpensePage() {
  return <ProductLanding data={data} />;
}
