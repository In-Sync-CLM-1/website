import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Mail, MapPin, Users, FileText, Receipt, MessageSquare, CheckCircle, Kanban, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHelmet from "@/components/SEOHelmet";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";
import { LogoMarquee } from "@/components/LogoMarquee";

const products = [
  {
    name: "In-Sync CRM",
    href: "/products/crm",
    icon: Kanban,
    tagline: "Sales pipeline & campaigns",
    description: "Pipeline, campaigns, calling, and AI lead scoring — built for sales teams that need every lead tracked and every deal closed.",
    color: "text-teal-600",
    bg: "bg-teal-500/10",
    border: "border-teal-200/60",
    gradient: "from-slate-800 to-teal-700",
  },
  {
    name: "Vendor Verification",
    href: "/products/vendor-verification",
    icon: ShieldCheck,
    tagline: "Financial due diligence",
    description: "Credit score, bank statement, GST & PAN checks against live government APIs — know your vendor's financial health before you commit.",
    color: "text-sky-700",
    bg: "bg-sky-500/10",
    border: "border-sky-200/60",
    gradient: "from-sky-700 to-blue-900",
  },
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
          description: "Explore In-Sync's suite of products — from CRM and vendor verification to field force tracking, loan origination, and WhatsApp campaigns. One platform, ten focused tools.",
          canonical: "/solutions",
        }}
      />

      <div className="min-h-screen bg-background">
        <main>
          {/* Hero */}
          <section
            className="relative overflow-hidden py-24 lg:py-32 text-white"
            style={{ background: 'linear-gradient(135deg, hsl(222,47%,18%) 0%, hsl(218,50%,14%) 35%, hsl(200,65%,16%) 70%, hsl(190,85%,11%) 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute -top-32 right-[10%] w-[520px] h-[520px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.28), transparent 70%)', filter: 'blur(70px)' }}
              />
              <div
                className="absolute -bottom-24 left-[6%] w-[420px] h-[420px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.22), transparent 70%)', filter: 'blur(60px)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 20%, transparent 75%, rgba(0,0,0,0.2) 100%)' }}
              />
            </div>
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-semibold uppercase tracking-widest text-white/90 mb-6">
                Our Solutions
              </span>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                Ten products. One platform.<br />
                <span className="text-accent">Pick what you need.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Each In-Sync product is built to solve a specific operational problem — and all of them connect back to your CRM so nothing falls through the cracks.
              </p>
              <DemoRequestModal trigger={
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-8 py-6 text-lg shadow-lg">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              } />
            </div>
          </section>

          {/* Client logos */}
          <LogoMarquee />

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
                      className={`group relative rounded-2xl border ${p.border} bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
                    >
                      <div className={`relative bg-gradient-to-br ${p.gradient} p-5 text-white`}>
                        <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/85 mb-0.5">{p.tagline}</p>
                        <h2 className="text-lg font-heading font-bold text-white">{p.name}</h2>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                        <div className={`mt-5 flex items-center gap-1 text-sm font-semibold ${p.color} group-hover:gap-2 transition-all`}>
                          Learn more <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <div
                className="relative overflow-hidden rounded-3xl p-12 sm:p-16 text-center text-white"
                style={{ background: 'linear-gradient(135deg, hsl(222,47%,18%) 0%, hsl(218,50%,14%) 35%, hsl(200,65%,16%) 70%, hsl(190,85%,11%) 100%)' }}
              >
                <div
                  className="absolute -top-24 -right-16 w-72 h-72 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.3), transparent 70%)', filter: 'blur(50px)' }}
                />
                <div
                  className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.24), transparent 70%)', filter: 'blur(50px)' }}
                />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                />
                <div className="relative z-10">
                  <h2 className="text-3xl font-heading font-bold mb-4">
                    Not sure which product fits?
                  </h2>
                  <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
                    Our team will listen to your workflow and recommend the right combination — no sales pressure.
                  </p>
                  <DemoRequestModal trigger={
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-8 py-6 text-lg shadow-lg">
                      Talk to a solutions expert
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  } />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
