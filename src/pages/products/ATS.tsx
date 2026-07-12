import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { ATSScene, ATSFloats } from '@/components/heroScenes';
import { Users, FileText, Phone, Shield, BarChart3, CheckCircle, Bell, Layers, Flag, Clock } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'InSyncATS',
  productName: 'In-Sync ATS',
  demoUrl: 'https://ats-6t2.pages.dev/landing-demo',
  heroBackdrop: <ATSScene />,
  heroFloats: <ATSFloats />,
  navLinks: [
    { href: '#problem', label: 'Why In-Sync ATS' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Candidates sourced.',
  headline2: 'Do you know where each one stands?',
  description:
    'Healthcare-focused Applicant Tracking System — manage clients, candidates, mandates, and the full recruitment pipeline end-to-end. Aadhaar/PAN verification, Exotel telephony, and bulk imports built in.',
  heroBadges: [
    { icon: Users, label: 'Full pipeline management', color: 'text-violet-500' },
    { icon: Shield, label: 'Aadhaar / PAN verification', color: 'text-purple-500' },
    { icon: Phone, label: 'Exotel telephony', color: 'text-indigo-500' },
  ],
  theme: {
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-purple-700',
    hero: {
      base: 'linear-gradient(118deg, #7c3aed 0%, #a855f7 45%, #d946ef 85%, #ec4899 125%)',
      glow1: 'rgba(240,171,252,0.5)',
      glow2: 'rgba(167,139,250,0.5)',
    },
    headlineAccent: 'from-fuchsia-200 via-pink-100 to-violet-200',
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
    { icon: FileText, title: 'Spreadsheet tracking', desc: 'Hundreds of candidates managed in Excel. Duplicate entries, missed follow-ups, lost resumes.' },
    { icon: Clock, title: 'Mandate chaos', desc: 'Client mandates pile up without visibility. You don\'t know which roles are urgent until the client calls.' },
    { icon: Flag, title: 'No verification workflow', desc: 'You place candidates without verifying documents. One bad hire and the client relationship is at risk.' },
    { icon: Users, title: 'Bulk import nightmare', desc: 'Resume dumps from job portals take hours to clean up and load. No standardization, no deduplication.' },
  ],
  problemHeadline1: 'Candidates tracked.',
  problemHeadline2: 'Pipeline invisible.',
  problemIntro:
    'Healthcare staffing moves fast. In-Sync ATS gives every recruiter, every mandate, and every candidate a live status — so nothing falls through the cracks.',
  howItWorks: [
    { step: 1, title: 'Source', desc: 'Bulk import from job portals or add candidates manually. Auto-deduplication keeps your database clean.', icon: Layers },
    { step: 2, title: 'Verify', desc: 'Trigger Aadhaar / PAN checks in-app. Documents collected and stored against the candidate profile.', icon: Shield },
    { step: 3, title: 'Match', desc: 'Map candidates to open client mandates. One-click shortlisting with notes and stage assignment.', icon: CheckCircle },
    { step: 4, title: 'Place', desc: 'Manage offer, acceptance, and joining. Exotel call logging ties every conversation to the pipeline.', icon: Bell },
  ],
  howItWorksHeadline: 'Source → Verify → Match →',
  howItWorksFlow: 'Place',
  features: [
    { icon: Layers, title: 'Mandate Management', desc: 'Every client mandate tracked with priority, SLA, positions, and hiring manager. Nothing gets buried.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Users, title: 'Candidate Pipeline', desc: 'Kanban-style pipeline with drag-and-drop stage management, notes, and activity logs for every candidate.', gradient: 'from-blue-500/10 to-indigo-500/10' },
    { icon: Shield, title: 'Aadhaar / PAN Verification', desc: 'In-app KYC verification with document upload. Verified candidates are flagged and audit-ready.', gradient: 'from-emerald-500/10 to-green-500/10' },
    { icon: Phone, title: 'Exotel Telephony', desc: 'Call candidates from the ATS. Recordings, duration, and notes auto-logged against the candidate profile.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: FileText, title: 'Resume Parsing', desc: 'Upload resumes in bulk. ATS extracts name, skills, experience, and contact details automatically.', gradient: 'from-teal-500/10 to-cyan-500/10' },
    { icon: BarChart3, title: 'Recruiter Analytics', desc: 'Placements per recruiter, time-to-fill, mandate closure rates, and pipeline conversion ratios.', gradient: 'from-rose-500/10 to-pink-500/10' },
  ],
  featuresHeadline1: 'Recruitment pipeline',
  featuresHeadline2: 'fully visible.',
  featuresSubtext: 'Built for healthcare staffing — Aadhaar verification, Exotel calls, and mandate tracking in one system.',
  stats: [
    { target: 50000, label: 'Candidates Managed' },
    { target: 5000, label: 'Mandates Fulfilled' },
    { target: 60, suffix: '%', label: 'Faster Time-to-Fill' },
    { target: 80, label: 'Client Organisations' },
  ],
  verticals: ['Healthcare Staffing', 'Hospital Networks', 'DSA Networks', 'Temp Staffing Agencies', 'Nursing & Allied Health', 'Pharma', 'Diagnostics'],
  testimonial: {
    quote: 'We were tracking 800 candidates in three different spreadsheets. In-Sync ATS consolidated everything in one week. We\'ve placed 300 candidates in the 3 months since.',
    author: 'Director of Recruitment',
    role: 'Healthcare Staffing Agency, Bengaluru',
  },
  reviews: [
    { name: 'Rakesh N.', role: 'Head Recruiter, Healthcare Staffing', rating: 5, text: 'The Aadhaar verification flow alone saved us from two bad placements. We would\'ve sent unverified candidates to a major hospital network.' },
    { name: 'Sunita K.', role: 'Operations Head, Nursing Agency', rating: 5, text: 'Exotel call logging changed everything. My recruiters no longer skip documentation — every call is automatically recorded against the candidate.' },
    { name: 'Mohan P.', role: 'CEO, Temp Staffing', rating: 5, text: 'We bulk-imported 2,000 resumes from Naukri in one go. The parser handled 85% of them without any manual cleanup.' },
    { name: 'Deepika S.', role: 'Talent Acquisition Manager', rating: 4, text: 'The mandate dashboard is exactly what our account managers needed. They can see which roles are at risk of missing SLA before the client has to call.' },
    { name: 'Arjun M.', role: 'Regional Head, DSA Network', rating: 5, text: 'We run 50+ open mandates at a time. In-Sync ATS is the first tool that\'s actually kept up with that volume without us losing track of anything.' },
    { name: 'Kavya R.', role: 'Compliance Manager, Hospital', rating: 5, text: 'Document compliance for contract staff is fully managed now. Audit queries that used to take days to answer are done in 10 minutes.' },
  ],
  ctaHeadline: 'Stop running recruitment from spreadsheets.',
  ctaSubtext: 'Book a free demo and see how In-Sync ATS manages your entire candidate pipeline in one place.',
};

export default function ATSPage() {
  return <ProductLanding data={data} />;
}
