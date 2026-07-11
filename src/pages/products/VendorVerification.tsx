import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { VendorScene } from '@/components/heroScenes';
import { ShieldCheck, ScanSearch, Brain, AlertTriangle, Workflow, ClipboardCheck, Send, UserCheck, BadgeCheck, FileSearch, Landmark, Clock } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'Vendor Verification',
  productName: 'Vendor Verification',
  signInUrl: 'https://vendorverification.in-sync.co.in',
  heroBackdrop: <VendorScene />,
  navLinks: [
    { href: '#problem', label: 'Why Verify' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Financial due diligence',
  headline2: 'before you commit.',
  description:
    "Credit Score, Bank Statement Analysis, GST & PAN verification — know your vendor's financial health before you sign a single purchase order. Built for CFOs and Finance leaders.",
  heroBadges: [
    { icon: Brain, label: 'AI document analysis', color: 'text-sky-500' },
    { icon: Landmark, label: 'Live government API checks', color: 'text-blue-500' },
    { icon: ShieldCheck, label: 'DPDP & UIDAI compliant', color: 'text-orange-500' },
  ],
  theme: {
    gradientFrom: 'from-sky-700',
    gradientTo: 'to-blue-900',
    hero: {
      base: 'linear-gradient(130deg, #082f49 0%, #075985 30%, #0369a1 60%, #1e40af 108%)',
      glow1: 'rgba(56,189,248,0.45)',
      glow2: 'rgba(251,146,60,0.3)',
    },
    textAccent: 'text-sky-700',
    bgLight: 'bg-sky-500/10',
    badgeBg: 'bg-sky-500/10',
    badgeText: 'text-sky-700',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: FileSearch, title: 'No financial visibility', desc: 'You commit lakhs to a vendor knowing nothing about their bank health, GST filing record, or credit standing.' },
    { icon: Clock, title: '7–10 days of manual chasing', desc: 'Document collection over email, verification by hand, spreadsheets nobody trusts — for every single vendor.' },
    { icon: AlertTriangle, title: 'Fraud found too late', desc: 'Duplicate GST numbers, tampered documents, and financially unstable vendors surface only after the purchase order is signed.' },
    { icon: ClipboardCheck, title: 'Every audit is a scramble', desc: 'Paper-based compliance trails scattered across inboxes. When auditors ask, the panic starts.' },
  ],
  problemHeadline1: 'You verify employees.',
  problemHeadline2: 'Why not vendors?',
  problemIntro:
    'Most vendor onboarding is a form and a prayer. Vendor Verification runs credit, bank, GST, PAN, and document checks against live government and financial APIs — in minutes, not weeks.',
  howItWorks: [
    { step: 1, title: 'Invite', desc: 'Share a secure link. The vendor verifies identity via OTP and submits documents with DPDP consent — all in one flow.', icon: Send },
    { step: 2, title: 'Analyse', desc: 'AI reads every document, cross-checks fields, flags tampering, and runs live API verifications on GST, PAN, and bank details.', icon: ScanSearch },
    { step: 3, title: 'Review', desc: 'Your team reviews the AI analysis and forwards to the approver — or sends back for corrections, with a full audit trail.', icon: UserCheck },
    { step: 4, title: 'Approve', desc: 'Final sign-off with a compliance-ready report. Vendor onboarded, due diligence documented, audit done.', icon: BadgeCheck },
  ],
  howItWorksHeadline: 'Invite → Analyse → Review →',
  howItWorksFlow: 'Approve',
  features: [
    { icon: Brain, title: 'AI Document Analysis', desc: 'Extracts data from GST certificates, PAN cards, bank statements — and catches tampering. No manual review needed.', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: ScanSearch, title: 'Credit & Financial Checks', desc: 'Bank Statement Analysis, GST filing history, PAN, Aadhaar — a complete financial picture of every vendor.', gradient: 'from-emerald-500/10 to-teal-500/10' },
    { icon: AlertTriangle, title: 'Fraud & Risk Detection', desc: 'Duplicate GST, PAN, or bank accounts? Fake documents? Financially unstable vendor? Caught before you commit.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: Workflow, title: 'Review & Approve Workflow', desc: 'Two-stage review process with full audit trail. Send back for corrections, track every action, stay audit-ready.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: ShieldCheck, title: 'DPDP & UIDAI Compliant', desc: 'PII encryption, automatic masking, data export & erasure rights, consent management — fully compliant from day one.', gradient: 'from-rose-500/10 to-pink-500/10' },
    { icon: ClipboardCheck, title: 'Downloadable Reports', desc: 'Export your due diligence dashboard as PDF anytime. Share with the CFO, attach to audits, prove compliance.', gradient: 'from-teal-500/10 to-green-500/10' },
  ],
  featuresHeadline1: 'Stop guessing.',
  featuresHeadline2: 'Start verifying.',
  featuresSubtext: 'Every feature is designed to give CFOs and procurement heads complete financial visibility before committing to a vendor.',
  stats: [
    { target: 5, suffix: ' min', label: 'Verification Turnaround' },
    { target: 6, suffix: '', label: 'Government API Checks' },
    { target: 80, suffix: '%', label: 'Less Manual Work' },
    { target: 100, suffix: '%', label: 'DPDP Compliant' },
  ],
  verticals: ['Manufacturing', 'Infrastructure', 'IT Services', 'Pharma', 'BFSI', 'Logistics', 'Retail Chains', 'Real Estate'],
  testimonial: {
    quote: 'We caught a financially unstable vendor before committing a ₹50L purchase order. The bank statement analysis alone saved us from a potential write-off.',
    author: 'Rajesh Mehta, CFO',
    role: 'Manufacturing Enterprise, Mumbai',
  },
  reviews: [
    { name: 'Priya S.', role: 'Head of Procurement, IT Services', rating: 5, text: 'What used to take our team 7-10 days of manual verification now happens in under 5 minutes. The GST and bank statement analysis is remarkably thorough.' },
    { name: 'Amit D.', role: 'Finance Head, Infrastructure', rating: 5, text: 'The audit trail is what sold us. Every verification, every document, every approval — all downloadable as a PDF. Our auditors were impressed.' },
    { name: 'Meenal J.', role: 'CFO, Pharma Distribution', rating: 5, text: 'The fraud flags caught a duplicate bank account across two "different" vendors in our first month. That alone justified the subscription.' },
    { name: 'Rohit B.', role: 'Procurement Lead, Retail Chain', rating: 4, text: 'Vendors complete the whole submission themselves through the link. My team stopped being data-entry operators and started being reviewers.' },
    { name: 'Sanjay T.', role: 'VP Finance, Logistics', rating: 5, text: 'DPDP compliance was becoming a board-level question. Consent capture, masking, and erasure rights came built in — we had answers ready.' },
    { name: 'Kavita N.', role: 'Internal Audit, BFSI', rating: 5, text: 'Two-stage maker-checker review with an immutable trail. It matches how we already work, except now nothing lives in email attachments.' },
  ],
  ctaHeadline: "Know your vendor's financial health — before you commit.",
  ctaSubtext: 'Book a free demo and see the full financial picture of any vendor in under 5 minutes.',
};

export default function VendorVerificationPage() {
  return <ProductLanding data={data} />;
}
