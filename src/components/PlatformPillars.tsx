import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PILLARS } from "@/lib/products";

const PlatformPillars = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">The Platform</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Start with what hurts most.
            <br />
            <span className="text-primary">Add the rest as you grow.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every product works on its own. Together they share contacts, communication
            channels, and reporting — so nothing lives in a silo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`bg-gradient-to-r ${pillar.gradient} px-6 py-5 text-white`}>
                <h3 className="text-xl font-heading font-bold">{pillar.title}</h3>
                <p className="text-sm text-white/85 mt-1">{pillar.subtitle}</p>
              </div>
              <div className="p-3">
                {pillar.products.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.href}
                      to={p.href}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3.5 hover:bg-muted/60 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg ${p.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${p.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.tagline}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            See all ten products in detail <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlatformPillars;
