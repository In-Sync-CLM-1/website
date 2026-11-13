import { Link } from "react-router-dom";
import JourneyHero from "./JourneyHero";
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

const heroStats = [
  { value: "37", label: "Capability blocks" },
  { value: "14", label: "Live applications" },
  { value: "8+", label: "Industries" },
  { value: "60+", label: "Cities" },
];

const HeroSection = () => {
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
      {/* ── Hero: the In-Sync build journey ───────── */}
      <JourneyHero />

      {/* ── Products and numbers ──────────────────── */}
      <section className="relative overflow-hidden text-white" style={{ background: "#0a1430" }}>
        <div className="container mx-auto px-4 py-12 lg:py-14">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto mb-10">
              {ALL_PRODUCTS.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.href}
                    to={p.href}
                    className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4 text-teal-200 group-hover:text-white transition-colors" />
                    {p.name}
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-white/15 pt-8">
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
