import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DemoRequestModal from "./DemoRequestModal";
import { ALL_PRODUCTS } from "@/lib/products";
import growthvineLogo from "@/assets/growthvine-logo-3.jpeg";
import audiLogo from "@/assets/audi-logo-transparent-2.png";
import capitalIndiaLogo from "@/assets/capital-india-logo-3.webp";
import carTrendsLogo from "@/assets/car-trends-logo-2.webp";
import ezeepayLogo from "@/assets/ezeepay-logo-2.png";
import hiranandaniLogo from "@/assets/hiranandani-logo-2.png";
import incredLogo from "@/assets/incred-logo-new-2.png";
import rupeeBossLogo from "@/assets/rupee-boss-logo-3.jpg";
import aliceblueLogo from "@/assets/aliceblue-logo-vector-2.png";
import bseEbixLogo from "@/assets/bse-ebix-logo-3.png";
import legitquestLogo from "@/assets/legitquest-logo-3.svg";
import ecofyLogo from "@/assets/ecofy-logo-4.svg";
import quessLogo from "@/assets/quess-logo-3.png";
import redefineLogo from "@/assets/redefine-logo-3.png";
import seedsLogo from "@/assets/seeds-logo-3.png";
import uhcLogo from "@/assets/uhc-logo-4.png";
import zopperLogo from "@/assets/zopper-logo-2.png";
import zolveLogo from "@/assets/zolve-logo-transparent.webp";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const heroStats = [
  { value: "10", label: "Products" },
  { value: "8+", label: "Industries" },
  { value: "60+", label: "Cities" },
  { value: "1", label: "Platform" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const customerLogos = [
    { src: zolveLogo, alt: "Zolve" },
    { src: incredLogo, alt: "InCred" },
    { src: aliceblueLogo, alt: "AliceBlue" },
    { src: audiLogo, alt: "Audi" },
    { src: capitalIndiaLogo, alt: "Capital India" },
    { src: carTrendsLogo, alt: "Car Trends" },
    { src: ezeepayLogo, alt: "Ezeepay" },
    { src: rupeeBossLogo, alt: "Rupee Boss" },
    { src: growthvineLogo, alt: "GrowthVine" },
    { src: hiranandaniLogo, alt: "Hiranandani" },
    { src: bseEbixLogo, alt: "BSE EBIX" },
    { src: legitquestLogo, alt: "Legitquest" },
    { src: ecofyLogo, alt: "Ecofy" },
    { src: quessLogo, alt: "Quess" },
    { src: redefineLogo, alt: "Redefine" },
    { src: seedsLogo, alt: "Seeds" },
    { src: uhcLogo, alt: "United Health Care" },
    { src: zopperLogo, alt: "Zopper" }
  ];

  return (
    <>
      {/* ── Platform Hero ─────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(118deg, #0f172a 0%, #134e4a 42%, #0d9488 78%, #7c3aed 130%)" }}
      >
        {/* Glows + texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-48 right-[8%] w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(45,212,191,0.5), transparent 70%)", filter: "blur(90px)" }}
          />
          <div
            className="absolute -bottom-40 left-[2%] w-[560px] h-[560px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 70%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 20%, transparent 75%, rgba(0,0,0,0.25) 100%)" }}
          />
          <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4 text-teal-300" />
              One platform · Ten products · Built for India
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-6">
              Run your entire business
              <br />
              <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-violet-200 bg-clip-text text-transparent">
                on one platform.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Spreadsheets, WhatsApp groups, and ten disconnected tools — replaced by
              focused apps that share one backbone: your contacts, your channels, your data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <DemoRequestModal trigger={
                <Button size="lg" className="text-lg px-8 py-6 bg-white text-slate-900 hover:bg-white/90 rounded-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              } />
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl font-semibold border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/solutions')}
              >
                Explore the Products
              </Button>
            </div>

            {/* Product chips */}
            <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto mb-14">
              {ALL_PRODUCTS.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.href}
                    to={p.href}
                    className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4 text-teal-200 group-hover:text-white transition-colors" />
                    {p.name}
                  </Link>
                );
              })}
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-white/15 pt-8">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-heading font-bold">{s.value}</div>
                  <div className="text-sm text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer Logos ────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-subsection mb-12 text-foreground font-heading">
            Some pretty cool companies already love us <span className="text-rose-500">❤️</span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center max-w-5xl mx-auto">
            {customerLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center p-4 rounded-xl bg-card border border-border/50 hover:shadow-md transition-shadow h-20"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-10 max-w-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
