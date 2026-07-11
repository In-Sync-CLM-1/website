import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { FieldSyncScene, FieldSyncFloats } from '@/components/heroScenes';
import { MapPin, Wifi, FileText, Clock, BarChart3, Shield, CheckCircle, Bell, Users, Flag } from 'lucide-react';

const data: ProductPageData = {
  productKey: 'FieldSync',
  productName: 'Field-Sync',
  signInUrl: 'https://field-sync.pages.dev',
  heroBackdrop: <FieldSyncScene />,
  heroFloats: <FieldSyncFloats />,
  navLinks: [
    { href: '#problem', label: 'Why Field-Sync' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'Your agents are in the field.',
  headline2: 'Are they where they say they are?',
  description:
    'Field force management with GPS tracking, offline-first forms, and live visit logs. Know exactly where your agents are, what they did, and what they reported — in real time.',
  heroBadges: [
    { icon: MapPin, label: 'GPS tracking', color: 'text-green-500' },
    { icon: Wifi, label: 'Offline-first', color: 'text-emerald-500' },
    { icon: FileText, label: 'Dynamic forms', color: 'text-teal-500' },
  ],
  theme: {
    gradientFrom: 'from-green-600',
    gradientTo: 'to-emerald-700',
    hero: {
      base: 'linear-gradient(118deg, #047857 0%, #10b981 35%, #06b6d4 75%, #3b82f6 120%)',
      glow1: 'rgba(163,230,53,0.5)',
      glow2: 'rgba(34,211,238,0.5)',
    },
    headlineAccent: 'from-lime-200 via-emerald-100 to-cyan-200',
    textAccent: 'text-green-600',
    bgLight: 'bg-green-500/10',
    badgeBg: 'bg-green-500/10',
    badgeText: 'text-green-600',
    problemBg: 'bg-red-50/30',
    problemBorder: 'border-red-200/50',
    problemIconBg: 'bg-red-100',
    problemIconText: 'text-red-500',
  },
  painPoints: [
    { icon: MapPin, title: 'No location visibility', desc: 'Agents say they visited a client. You have only their word. No GPS, no timestamp, no proof.' },
    { icon: FileText, title: 'Paper-based reporting', desc: 'Field reports come back on paper or WhatsApp photos. Data entry takes days. Accuracy is zero.' },
    { icon: Wifi, title: 'Data lost offline', desc: "Poor connectivity in the field means forms don't submit. You lose visits entirely." },
    { icon: Flag, title: 'No performance visibility', desc: "You don't know which agent visited the most, covered the most ground, or converted the most." },
  ],
  problemHeadline1: 'Agents deployed.',
  problemHeadline2: 'No visibility.',
  problemIntro:
    'Most field force tools rely on connectivity. Field-Sync works offline, syncs when signal returns, and gives managers a live map — not a daily WhatsApp summary.',
  howItWorks: [
    { step: 1, title: 'Assign', desc: 'Create daily visit plans and assign clients to agents. Plans land on their phone before the day starts.', icon: Users },
    { step: 2, title: 'Track', desc: 'GPS pings log location at check-in and check-out. No signal? Stores locally and syncs automatically.', icon: MapPin },
    { step: 3, title: 'Report', desc: 'Agents fill dynamic forms on their phone — with photos, signatures, and custom fields — at the visit site.', icon: FileText },
    { step: 4, title: 'Analyse', desc: 'Managers see live maps, visit logs, attendance, and performance rankings from the dashboard.', icon: BarChart3 },
  ],
  howItWorksHeadline: 'Assign → Track → Report →',
  howItWorksFlow: 'Analyse',
  features: [
    { icon: MapPin, title: 'Live GPS Tracking', desc: 'Real-time map of all field agents with location history, check-in timestamps, and distance covered per day.', gradient: 'from-green-500/10 to-emerald-500/10' },
    { icon: Wifi, title: 'Offline-First Architecture', desc: 'Forms, client data, and visit logs work with zero signal. Everything syncs automatically when connectivity returns.', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: FileText, title: 'Dynamic Forms', desc: 'Build custom visit forms with dropdowns, photo capture, signatures, and conditional fields. No coding required.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Clock, title: 'Time & Attendance', desc: 'Geo-fenced punch-in and punch-out. Attendance records auto-generated — no HR manual entry needed.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: CheckCircle, title: 'Visit Verification', desc: 'GPS coordinates + timestamp on every visit. Managers can verify any visit on the map with one click.', gradient: 'from-teal-500/10 to-green-500/10' },
    { icon: BarChart3, title: 'Performance Analytics', desc: 'Visits per day, distance covered, form completion rates, and conversion ratios by agent and region.', gradient: 'from-rose-500/10 to-pink-500/10' },
  ],
  featuresHeadline1: 'Field operations',
  featuresHeadline2: 'you can actually see.',
  featuresSubtext: 'GPS-verified visits, offline-proof forms, and live dashboards built for India\'s connectivity realities.',
  stats: [
    { target: 10000, label: 'Field Agents Tracked' },
    { target: 500000, label: 'Visits Logged' },
    { target: 99, suffix: '%', label: 'GPS Accuracy' },
    { target: 50, label: 'Cities' },
  ],
  verticals: ['NBFCs', 'Insurance', 'FMCG', 'Pharma', 'Real Estate', 'DSA Networks', 'Microfinance', 'Logistics'],
  testimonial: {
    quote: 'We reduced false visit reports by 90% in the first month. The GPS verification changed our entire accountability structure for field agents.',
    author: 'Operations Director',
    role: 'NBFC with 200+ field agents across Maharashtra',
  },
  reviews: [
    { name: 'Manish T.', role: 'Field Operations Head, NBFC', rating: 5, text: 'The offline mode was the deciding factor. Our agents work in areas with patchy 4G. Field-Sync never loses a form submission.' },
    { name: 'Anita S.', role: 'Regional Manager, Insurance', rating: 5, text: 'We went from daily WhatsApp photo reports to a live dashboard. My 80-agent team is now fully visible without a single call.' },
    { name: 'Rahul D.', role: 'CEO, DSA Network', rating: 5, text: 'Agent accountability improved immediately. Once they knew GPS was logging their location, visit quality went up without any instruction from management.' },
    { name: 'Sonia K.', role: 'HR Manager, Pharma', rating: 4, text: 'Geo-fenced attendance removed all the disputes about late arrivals and early exits. The data is there, timestamped, on a map.' },
    { name: 'Vikram P.', role: 'Operations Head, Microfinance', rating: 5, text: 'The dynamic forms replaced 4 different paper forms we were using. Now all visit data is searchable and exportable from one place.' },
    { name: 'Priyanka M.', role: 'Area Manager, FMCG', rating: 5, text: "The performance ranking per agent was a game-changer. My top performers want to stay at the top. My low performers know they're visible." },
  ],
  ctaHeadline: 'Stop managing field agents on WhatsApp.',
  ctaSubtext: 'Book a free demo and see how Field-Sync gives you a live view of every agent, every visit, every day.',
};

export default function FieldSyncPage() {
  return <ProductLanding data={data} />;
}
