import { ProductLanding, type ProductPageData } from '@/components/ProductLanding';
import { EventSyncScene, EventSyncFloats } from '@/components/heroScenes';
import {
  Calendar, QrCode, Users, BarChart3, MessageSquare, Layers,
  MapPin, Bell, CheckCircle, Flag,
} from 'lucide-react';

const data: ProductPageData = {
  productKey: 'EventSync',
  productName: 'EventSync',
  demoUrl: 'https://event-sync.pages.dev/demo',
  heroBackdrop: <EventSyncScene />,
  heroFloats: <EventSyncFloats />,
  navLinks: [
    { href: '#problem', label: 'Why EventSync' },
    { href: '#features', label: 'Features' },
  ],
  headline1: 'You planned the event.',
  headline2: "Do you know who's actually coming?",
  description:
    'Professional event management — online registration, QR check-in, agenda builder, attendee engagement, and meeting scheduler. All in one PWA your team can use on the floor.',
  heroBadges: [
    { icon: QrCode, label: 'QR check-in', color: 'text-teal-500' },
    { icon: Calendar, label: 'Agenda builder', color: 'text-blue-500' },
    { icon: Users, label: 'Attendee engagement', color: 'text-emerald-500' },
  ],
  theme: {
    gradientFrom: 'from-teal-600',
    gradientTo: 'to-emerald-700',
    hero: {
      base: 'linear-gradient(118deg, #0d9488 0%, #06b6d4 40%, #8b5cf6 85%, #ec4899 125%)',
      glow1: 'rgba(232,121,249,0.45)',
      glow2: 'rgba(45,212,191,0.55)',
    },
    headlineAccent: 'from-amber-200 via-pink-200 to-fuchsia-200',
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
    { icon: Users, title: 'Registration chaos', desc: "Google Forms don't know capacity. You oversell and scramble the morning of." },
    { icon: MapPin, title: 'No-show surprises', desc: "40% of registrants vanish on the day. You can't plan food, seating, or sessions." },
    { icon: Flag, title: 'Paper check-in queues', desc: 'Entry bottlenecks kill first impressions. Guests stand in line while your team flips through Excel.' },
    { icon: MessageSquare, title: 'WhatsApp coordination chaos', desc: 'Agenda changes, session updates, and logistics buried in group chats nobody monitors.' },
  ],
  problemHeadline1: 'Events planned.',
  problemHeadline2: 'Execution falls apart.',
  problemIntro:
    'Most event tools handle registration but go dark the moment the door opens. EventSync runs the full lifecycle — before, during, and after — without the duct tape.',
  howItWorks: [
    { step: 1, title: 'Publish', desc: 'Build your event page with capacity, sessions, and payment (Razorpay) in minutes.', icon: Layers },
    { step: 2, title: 'Register', desc: 'Attendees register and pay online. Confirmation tickets land in their inbox automatically.', icon: CheckCircle },
    { step: 3, title: 'Check In', desc: 'Scan QR codes at the door. Real-time count. No queues, no spreadsheets.', icon: QrCode },
    { step: 4, title: 'Engage', desc: 'Push agenda updates, session polls, and meeting requests from the dashboard.', icon: Bell },
  ],
  howItWorksHeadline: 'Publish → Register → Check In →',
  howItWorksFlow: 'Engage',
  features: [
    { icon: Calendar, title: 'Event Landing Page Builder', desc: 'Branded registration pages with capacity limits, session tracks, and Razorpay payment collection built in.', gradient: 'from-teal-500/10 to-emerald-500/10' },
    { icon: QrCode, title: 'QR Check-In', desc: 'Scan tickets at the door from any phone. Live attendance counter updates instantly across all devices.', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: Layers, title: 'Agenda Management', desc: 'Build multi-track agendas, assign speakers, and push real-time updates to attendees via WhatsApp and email.', gradient: 'from-violet-500/10 to-purple-500/10' },
    { icon: Users, title: 'Attendee Engagement', desc: 'Session polls, Q&A, networking requests, and post-event surveys — all accessible from the attendee PWA.', gradient: 'from-emerald-500/10 to-green-500/10' },
    { icon: MessageSquare, title: 'Meeting Scheduler', desc: 'Let attendees book 1:1 meetings with speakers and exhibitors. Conflicts auto-blocked.', gradient: 'from-amber-500/10 to-orange-500/10' },
    { icon: BarChart3, title: 'Event Analytics', desc: 'Registration funnel, attendance rate, session popularity, and engagement metrics in one dashboard.', gradient: 'from-rose-500/10 to-pink-500/10' },
  ],
  featuresHeadline1: 'Everything your event',
  featuresHeadline2: 'actually needs.',
  featuresSubtext: 'From the first registration to the post-event survey — one platform, zero WhatsApp coordination.',
  stats: [
    { target: 500, label: 'Events Managed' },
    { target: 50000, label: 'Attendees Registered' },
    { target: 98, suffix: '%', label: 'Check-in Accuracy' },
    { target: 30, label: 'Cities' },
  ],
  verticals: ['Corporate Events', 'Conferences & Summits', 'NBFCs & DSAs', 'EdTech', 'Healthcare', 'Real Estate Expos', 'Trade Shows'],
  testimonial: {
    quote: 'We ran a 600-person conference with one person on the door. QR check-in cleared the entire queue in 12 minutes. Nothing like that had ever happened before.',
    author: 'Head of Marketing',
    role: 'Financial Services Firm, Mumbai',
  },
  reviews: [
    { name: 'Aarti M.', role: 'Events Manager, NBFC', rating: 5, text: "Our no-show rate dropped from 35% to 12% after we started sending WhatsApp reminders through EventSync. The check-in was the smoothest we've ever had." },
    { name: 'Ravi K.', role: 'VP Business Development, DSA Network', rating: 5, text: 'The meeting scheduler alone justified the switch. My agents booked 80+ B2B meetings in 3 hours during the event.' },
    { name: 'Sneha P.', role: 'Operations Head, EdTech Co.', rating: 5, text: 'We used to spend 2 days after every event cleaning up Excel sheets. Now everything is in one place the moment the last person walks out.' },
    { name: 'Deepak R.', role: 'CEO, Professional Services', rating: 4, text: 'Razorpay integration meant zero manual collection. Funds hit the account before the event even started.' },
    { name: 'Priya N.', role: 'Conference Director, Healthcare', rating: 5, text: 'The agenda builder is exactly what we needed. We had 4 parallel tracks and 22 speakers — all managed without a single WhatsApp group.' },
    { name: 'Vikram S.', role: 'Regional Manager, Real Estate', rating: 5, text: 'Our property expo had 1200 visitors. The live attendance counter helped us open a second entry gate at exactly the right time.' },
  ],
  ctaHeadline: 'Stop managing events on WhatsApp.',
  ctaSubtext: 'Book a free demo and see how EventSync runs your next event from registration to debrief.',
};

export default function EventSyncPage() {
  return <ProductLanding data={data} />;
}
