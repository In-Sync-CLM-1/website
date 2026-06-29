import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Mail, MapPin, Users, FileText, Receipt, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHelmet from "@/components/SEOHelmet";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";

const products = [
  {
    name: "EventSync",
    href: "/products/eventsync",
    icon: Calendar,
    tagline: "End-to-end event management",
    description: "Online registration, QR check-in, agenda builder, attendee engagement, and meeting scheduler — all in one platform your team can run from their phones.",
    color: "text-teal-600",
    bg: "bg-teal-500/10",
    border: "border-teal-200/60",
    gradient: "from-teal-600 to-emerald-700",
  },
  {
    name: "Email Broadcast",
    href: "/products/email-broadcast",
    icon: Mail,
    tagline: "CRM-integrated email campaigns",
    description: "Send to thousands, track every open and click, and tie results back to your sales pipeline — without leaving In-Sync.",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-blue-200/60",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    name: "Field-Sync",
    href: "/products/field-sync",
    icon: MapPin,
    tagline: "Field force management",
    description: "GPS tracking, offline-first forms, and live visit logs. Know exactly where your agents are, what they did, and what they reported — in real time.",
    color: "text-green-600",
    bg: "bg-green-500/10",
    border: "border-green-200/60",
    gradient: "from-green-600 to-emerald-700",
  },
  {
    name: "In-Sync ATS",
    href: "/products/ats",
    icon: Users,
    tagline: "Applicant tracking system",
    description: "Manage clients, candidates, mandates, and the full recruitment pipeline end-to-end. Aadhaar/PAN verification and Exotel telephony built in.",
    color: "text-violet-600",
    bg: "bg-violet-500/10",
    border: "border-violet-200/60",
    gradient: "from-violet-600 to-purple-700",
  },
  {
    name: "Paisaa Saarthi",
    href: "/products/paisaa-saarthi",
    icon: FileText,
    tagline: "Loan origination system",
    description: "Full application-to-disbursement flow — lead intake, Aadhaar KYC, eligibility, sanction, document collection, and collections. Built for NBFCs, DSAs, and fintech lenders.",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    border: "border-amber-200/60",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    name: "Expense Claims",
    href: "/products/expense",
    icon: Receipt,
    tagline: "Employee expense management",
    description: "Multi-level approvals, receipt capture, and auto-notifications. Field teams submit claims from the road; finance signs off from the dashboard.",
    color: "text-rose-600",
    bg: "bg-rose-500/10",
    border: "border-rose-200/60",
    gradient: "from-rose-600 to-pink-700",
  },
  {
    name: "WhatsApp Campaigns",
    href: "/products/whatsapp-campaigns",
    icon: MessageSquare,
    tagline: "Bulk WhatsApp via official API",
    description: "Send approved templates at scale via Exotel's Business API, track delivery and replies, and stay compliant — no personal WhatsApp accounts needed.",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-200/60",
    gradient: "from-emerald-600 to-green-700",
  },
  {
    name: "Work-Sync",
    href: "/products/worksync",
    icon: CheckCircle,
    tagline: "Task accountability for Indian teams",
    description: "Hierarchical task assignment with WhatsApp + email alerts at every step. Assign, track, and confirm completion across your full designation hierarchy.",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    border: "border-purple-200/60",
    gradient: "from-purple-600 to-violet-700",
  },
];

export default function Solutions() {
  return (
    <>
      <SEOHelmet
        config={{
          title: "Solutions | In-Sync",
          description: "Explore In-Sync's suite of products — from event management and field force tracking to loan origination and WhatsApp campaigns. One platform, eight focused tools.",
          canonical: "/solutions",
        }}
      />

      <div className="min-h-screen bg-background">
        <main>
          {/* Hero */}
          <section className="relative overflow-hidden gradient-hero py-24 lg:py-32">
            <div className="floating-blob floating-blob-primary w-[500px] h-[500px] -top-40 -left-40" />
            <div className="floating-blob floating-blob-accent w-[350px] h-[350px] top-1/3 -right-24" />
            <div className="absolute inset-0 dot-pattern opacity-40" />
            <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Our Solutions</p>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                Eight products. One platform.<br />
                <span className="text-primary">Pick what you need.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Each In-Sync product is built to solve a specific operational problem — and all of them connect back to your CRM so nothing falls through the cracks.
              </p>
              <DemoRequestModal trigger={
                <Button size="lg" className="btn-glow btn-premium rounded-xl px-8 py-6 text-lg">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              } />
            </div>
          </section>

          {/* Product Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.href}
                      to={p.href}
                      className={`group relative rounded-2xl border ${p.border} bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${p.color}`} />
                      </div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${p.color} mb-1`}>{p.tagline}</p>
                      <h2 className="text-lg font-heading font-bold text-foreground mb-3">{p.name}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                      <div className={`mt-5 flex items-center gap-1 text-sm font-semibold ${p.color} group-hover:gap-2 transition-all`}>
                        Learn more <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 text-center max-w-2xl">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Not sure which product fits?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Our team will listen to your workflow and recommend the right combination — no sales pressure.
              </p>
              <DemoRequestModal trigger={
                <Button size="lg" className="btn-glow btn-premium rounded-xl px-8 py-6 text-lg">
                  Talk to a solutions expert
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              } />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
