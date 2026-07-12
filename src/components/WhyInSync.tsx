import { Layers, IndianRupee, Brain, Rocket } from "lucide-react";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const reasons = [
  {
    icon: Layers,
    title: "One platform, not ten subscriptions",
    desc: "Contacts, communication, and reporting are shared across every app. Start with the product that hurts most — the others plug straight in.",
    accent: "text-teal-300",
    ring: "bg-teal-400/15",
  },
  {
    icon: IndianRupee,
    title: "Built for India from day one",
    desc: "WhatsApp Business API, Aadhaar / PAN verification, Razorpay payments, and Indian telephony are built in — not bolted on.",
    accent: "text-amber-300",
    ring: "bg-amber-400/15",
  },
  {
    icon: Brain,
    title: "AI where it earns its keep",
    desc: "AI calling agents, lead scoring, and document analysis — woven into the workflows, not sold as a separate add-on.",
    accent: "text-violet-300",
    ring: "bg-violet-400/15",
  },
  {
    icon: Rocket,
    title: "Live in days, not months",
    desc: "CSV imports, guided setup, and per-user pricing that makes sense for growing teams. No six-month implementation projects.",
    accent: "text-rose-300",
    ring: "bg-rose-400/15",
  },
];

const WhyInSync = () => {
  return (
    <section
      className="relative overflow-hidden text-white py-24"
      style={{ background: "linear-gradient(125deg, #0f172a 0%, #1e1b4b 45%, #4c1d95 90%, #0d9488 140%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-[10%] w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute -bottom-40 right-[5%] w-[560px] h-[560px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.35), transparent 70%)", filter: "blur(85px)" }}
        />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300 mb-3">Why In-Sync</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Why growing businesses
            <br />
            <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-violet-200 bg-clip-text text-transparent">
              stay on the platform.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-sm p-7 hover:bg-white/[0.11] hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${r.ring} flex items-center justify-center mb-5`}>
                  <Icon className={`h-6 w-6 ${r.accent}`} />
                </div>
                <h3 className="text-lg font-heading font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyInSync;
