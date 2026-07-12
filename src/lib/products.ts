import {
  Calendar, Mail, MapPin, Users, FileText, Receipt, MessageSquare,
  CheckCircle, Kanban, ShieldCheck, type LucideIcon,
} from "lucide-react";

export interface Product {
  name: string;
  href: string;
  icon: LucideIcon;
  tagline: string;
  color: string;
  bg: string;
}

export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  products: Product[];
}

export const PILLARS: Pillar[] = [
  {
    id: "grow",
    title: "Grow Revenue",
    subtitle: "Fill the pipeline, reach every customer, close more deals.",
    gradient: "from-teal-600 to-cyan-700",
    products: [
      { name: "In-Sync CRM", href: "/products/crm", icon: Kanban, tagline: "Pipeline, campaigns, calling & AI lead scoring", color: "text-teal-600", bg: "bg-teal-500/10" },
      { name: "WhatsApp Campaigns", href: "/products/whatsapp-campaigns", icon: MessageSquare, tagline: "Bulk messaging on the official Business API", color: "text-emerald-600", bg: "bg-emerald-500/10" },
      { name: "Email Broadcast", href: "/products/email-broadcast", icon: Mail, tagline: "Campaigns tied back to your pipeline", color: "text-blue-600", bg: "bg-blue-500/10" },
      { name: "EventSync", href: "/products/eventsync", icon: Calendar, tagline: "Events from registration to debrief", color: "text-cyan-600", bg: "bg-cyan-500/10" },
    ],
  },
  {
    id: "operate",
    title: "Run Operations",
    subtitle: "Know what your team did, where, and what it cost.",
    gradient: "from-indigo-600 to-violet-700",
    products: [
      { name: "Field-Sync", href: "/products/field-sync", icon: MapPin, tagline: "GPS field force tracking & visit logs", color: "text-green-600", bg: "bg-green-500/10" },
      { name: "Work-Sync", href: "/products/worksync", icon: CheckCircle, tagline: "Task accountability for teams", color: "text-purple-600", bg: "bg-purple-500/10" },
      { name: "Expense Claims", href: "/products/expense", icon: Receipt, tagline: "Claims & approval workflows", color: "text-rose-600", bg: "bg-rose-500/10" },
      { name: "Vendor Verification", href: "/products/vendor-verification", icon: ShieldCheck, tagline: "Financial due diligence & KYC", color: "text-sky-700", bg: "bg-sky-500/10" },
    ],
  },
  {
    id: "industry",
    title: "Industry Solutions",
    subtitle: "Purpose-built for recruitment and lending.",
    gradient: "from-amber-500 to-orange-600",
    products: [
      { name: "In-Sync ATS", href: "/products/ats", icon: Users, tagline: "Healthcare recruitment pipeline with KYC", color: "text-violet-600", bg: "bg-violet-500/10" },
      { name: "Paisaa Saarthi", href: "/products/paisaa-saarthi", icon: FileText, tagline: "Loan origination for NBFCs & DSAs", color: "text-amber-600", bg: "bg-amber-500/10" },
    ],
  },
];

export const ALL_PRODUCTS: Product[] = PILLARS.flatMap((p) => p.products);
