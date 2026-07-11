import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { PaisaaScene } from '@/components/heroScenes';
import { FileText, Shield, CheckCircle, BarChart3, Bell, Layers, Clock, Users, Flag, CreditCard } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'PaisaaSaarthi',
  productName: 'Paisaa Saarthi',
  signInUrl: 'https://paisaasaarthi.pages.dev',
  heroBackdrop: <PaisaaScene />,
  navLinks: [
    { href: '#problem', label: 'Why Paisaa Saarthi' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Loan applied.',
  headline2: 'Do you know if it will disburse on time?',
  description:
    'Loan origination system covering the full application-to-disbursement flow — lead intake, Aadhaar KYC, eligibility, sanction, document collection, disbursement, and collections. Built for NBFCs, DSAs, and fintech lenders.',
  heroBadges: [
    { icon: Shield, label: 'Aadhaar KYC', color: 'text-amber-500' },
    { icon: FileText, label: 'End-to-end LOS', color: 'text-orange-500' },
    { icon: CreditCard, label: 'Disbursement tracking', color: 'text-yellow-600' },
  ],
  theme: {
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-orange-700',
    hero: {
      base: 'linear-gradient(130deg, #92400e 0%, #d97706 35%, #ea580c 70%, #b91c1c 120%)',
      glow1: 'rgba(253,224,71,0.42)',
      glow2: 'rgba(251,146,60,0.4)',
    },
    textAccent: 'text-amber-600',
    bgLight: 'bg-amber-500/10',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-600',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: FileText, title: 'Manual KYC bottlenecks', desc: 'Paper Aadhaar copies, manual data entry, and physical document verification slow every application by days.' },
    { icon: Clock, title: 'Approval delays', desc: 'Applications sit in someone\'s inbox. Nobody knows the current status without a call. Borrowers go to competitors.' },
    { icon: Flag, title: 'Document gaps at sanction', desc: 'Missing documents discovered at disbursement — not during intake. The entire pipeline stalls.' },
    { icon: Shield, title: 'Compliance exposure', desc: 'No audit trail for KYC, credit decisions, or fee structures. One inspection and you\'re scrambling.' },
  ],
  problemHeadline1: 'Applications in.',
  problemHeadline2: 'Disbursals delayed.',
  problemIntro:
    'Most NBFCs manage loan applications across WhatsApp, email, and spreadsheets. Paisaa Saarthi gives every application a live status, every stage a workflow, and every disbursement a paper trail.',
  howItWorks: [
    { step: 1, title: 'Intake', desc: 'Borrower submits lead via DSA partner or direct channel. Application created instantly with all fields.', icon: Layers },
    { step: 2, title: 'KYC', desc: 'Aadhaar OTP verification + PAN check triggered in-app. Documents collected and attached to the application.', icon: Shield },
    { step: 3, title: 'Sanction', desc: 'Credit team reviews, runs eligibility, and issues sanction letter — all tracked inside the system.', icon: CheckCircle },
    { step: 4, title: 'Disburse', desc: 'Disbursement triggered, tracked, and recorded. Collections schedule auto-generated post-disbursement.', icon: CreditCard },
  ],
  howItWorksHeadline: 'Intake → KYC → Sanction →',
  howItWorksFlow: 'Disburse',
  features: [
    { icon: Layers, title: 'Lead Intake & DSA Portal', desc: 'Structured application forms for direct and DSA-originated leads. No WhatsApp applications.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: Shield, title: 'Aadhaar + PAN KYC', desc: 'OTP-based Aadhaar verification and PAN lookup built in. KYC status flagged against every application.', gradient: 'from-emerald-500/10 to-green-500/10' },
    { icon: FileText, title: 'Document Checklist', desc: 'Configurable per product. Missing documents blocked at each stage — not discovered at disbursement.', gradient: 'from-blue-500/10 to-indigo-500/10' },
    { icon: CheckCircle, title: 'Eligibility & Credit Workflow', desc: 'Automated eligibility calculator + credit bureau API integration. Decision recorded and auditable.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: CreditCard, title: 'Disbursement & Collections', desc: 'Nupay-powered disbursements with EMI schedule generation and collections tracking built in.', gradient: 'from-teal-500/10 to-cyan-500/10' },
    { icon: BarChart3, title: 'Pipeline & TAT Analytics', desc: 'Live funnel from lead to disbursal. Stage-wise TAT, drop-off analysis, and DSA performance tracking.', gradient: 'from-rose-500/10 to-pink-500/10' },
  ],
  featuresHeadline1: 'Loan origination,',
  featuresHeadline2: 'end to end.',
  featuresSubtext: 'From the first lead to post-disbursement collections — every stage tracked, every document verified, every decision recorded.',
  stats: [
    { target: 10000, label: 'Applications Processed' },
    { target: 65, suffix: '%', label: 'Faster TAT' },
    { target: 25000, label: 'KYC Verifications' },
    { target: 40, label: 'Lenders & DSAs' },
  ],
  verticals: ['NBFCs', 'Microfinance Institutions', 'DSA Networks', 'Fintech Lenders', 'Small Finance Banks', 'Business Loan Providers', 'Personal Loan Companies'],
  testimonial: {
    quote: 'Our average disbursal time dropped from 11 days to 4 days. The document checklist caught every gap during intake instead of at sanction.',
    author: 'Chief Credit Officer',
    role: 'NBFC with ₹500Cr+ AUM, Mumbai',
  },
  reviews: [
    { name: 'Rajesh P.', role: 'Operations Head, NBFC', rating: 5, text: 'The Aadhaar verification inside the application form eliminated our entire manual KYC team\'s intake work. It just runs automatically.' },
    { name: 'Sunita M.', role: 'Credit Manager, Microfinance', rating: 5, text: 'Pipeline visibility finally exists. My credit analysts no longer need to call each other to ask where an application is sitting.' },
    { name: 'Anil K.', role: 'DSA Network Head', rating: 5, text: 'Paisaa Saarthi gave our partner DSAs a proper submission portal. No more WhatsApp applications with missing fields and wrong formats.' },
    { name: 'Meera S.', role: 'Compliance Officer, NBFC', rating: 5, text: 'Every credit decision is recorded with rationale, timestamp, and the credit officer\'s name. Our last audit was the cleanest in 6 years.' },
    { name: 'Vikram T.', role: 'CEO, Fintech Lender', rating: 4, text: 'The TAT analytics showed us exactly where applications were getting stuck. We fixed one process and our average TAT dropped by 3 days.' },
    { name: 'Priya R.', role: 'Collections Head, NBFC', rating: 5, text: 'Auto-generated EMI schedules post-disbursement saved my collections team 2 days of manual work every month.' },
  ],
  ctaHeadline: 'Stop losing loan applications to process gaps.',
  ctaSubtext: 'Book a free demo and see how Paisaa Saarthi takes every application from intake to disbursement without paper or WhatsApp.',
};

export default function PaisaaSaarthiPage() {
  return <ProductLanding data={data} />;
}
