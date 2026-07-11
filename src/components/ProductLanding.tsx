import { useRef, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Star, AlertTriangle, Sparkles, LucideIcon } from 'lucide-react';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { LogoMarquee } from '@/components/LogoMarquee';
import { captureAttribution } from '@/lib/attribution';

/* ── Types ─────────────────────────────────── */

export interface PainPoint {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
  gradient: string;
}

export interface ProductReview {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface HeroBadge {
  icon: LucideIcon;
  label: string;
  color: string;
}

export interface ProductTheme {
  gradientFrom: string;
  gradientTo: string;
  textAccent: string;
  bgLight: string;
  badgeBg: string;
  badgeText: string;
  problemBg: string;
  problemBorder: string;
  problemIconBg: string;
  problemIconText: string;
}

export interface ProductPageData {
  productKey: string;
  productName: string;
  signInUrl: string;
  navLinks: { href: string; label: string }[];
  headline1: string;
  headline2: string;
  description: string;
  heroBadges: HeroBadge[];
  theme: ProductTheme;
  painPoints: PainPoint[];
  problemHeadline1: string;
  problemHeadline2: string;
  problemIntro: string;
  howItWorks: HowItWorksStep[];
  howItWorksHeadline: string;
  howItWorksFlow: string;
  features: ProductFeature[];
  featuresHeadline1: string;
  featuresHeadline2: string;
  featuresSubtext: string;
  stats: { target: number; suffix?: string; label: string }[];
  verticals: string[];
  testimonial: { quote: string; author: string; role: string };
  reviews: ProductReview[];
  ctaHeadline: string;
  ctaSubtext: string;
}

/* ── Animation helpers ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function Animated({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated Counter ───────────────────────── */

function Counter({ target, suffix = '+', label, accentClass = '' }: { target: number; suffix?: string; label: string; accentClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setDisplay(target);
        clearInterval(id);
      } else {
        setDisplay(current);
      }
    }, 30);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className={`text-3xl sm:text-4xl font-bold ${accentClass}`}>{display.toLocaleString('en-IN')}{suffix}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

/* ── Main Component ─────────────────────────── */

export function ProductLanding({ data }: { data: ProductPageData }) {
  useEffect(() => { captureAttribution(); }, []);

  const {
    productKey, productName, signInUrl, navLinks, headline1, headline2, description,
    heroBadges, theme, painPoints, problemHeadline1, problemHeadline2, problemIntro,
    howItWorks, howItWorksHeadline, howItWorksFlow, features, featuresHeadline1,
    featuresHeadline2, featuresSubtext, stats, verticals, testimonial, reviews,
    ctaHeadline, ctaSubtext,
  } = data;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Header ──────────────────────────── */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className={`flex items-center gap-2 font-bold text-lg ${theme.textAccent}`}>
            <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} flex items-center justify-center`}>
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-foreground">{productName}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={signInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </a>
            <a
              href="#demo-form"
              className={`text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} text-white shadow-lg hover:opacity-90 transition-opacity`}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} text-white`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 left-[15%] w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[10%] w-[420px] h-[420px] bg-white rounded-full blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div id="demo-form" className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* Left pitch */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Part of the In-Sync family
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white"
            >
              {headline1}{' '}
              <span className="bg-gradient-to-r from-white via-white/85 to-white/55 bg-clip-text text-transparent">
                {headline2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-6 text-lg lg:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm"
            >
              {heroBadges.map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-white/90 backdrop-blur-sm"
                >
                  <b.icon className="h-4 w-4 text-white" />
                  {b.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: inline demo form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="mx-auto w-full max-w-md lg:mx-0 rounded-2xl shadow-2xl ring-1 ring-white/30"
          >
            <HeroLeadForm product={productKey} />
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────── */}
      <section className="bg-card border-b border-border py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s) => (
            <Counter key={s.label} target={s.target} suffix={s.suffix} label={s.label} accentClass={theme.textAccent} />
          ))}
        </div>
      </section>

      {/* ── Client logos ────────────────────── */}
      <LogoMarquee />

      {/* ── Problem ─────────────────────────── */}
      <section id="problem" className="border-t border-border/50 py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Animated className="text-center mb-20">
            <motion.div
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-600"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              The Problem
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold tracking-tight">
              {problemHeadline1}{' '}
              <span className="text-red-500">{problemHeadline2}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              {problemIntro}
            </motion.p>
          </Animated>
          <Animated className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className={`rounded-2xl border ${theme.problemBorder} ${theme.problemBg} p-7`}
              >
                <div className={`h-12 w-12 rounded-xl ${theme.problemIconBg} flex items-center justify-center mb-5`}>
                  <p.icon className={`h-6 w-6 ${theme.problemIconText}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </Animated>
        </div>
      </section>

      {/* ── How it works ────────────────────── */}
      <section id="how-it-works" className="border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Animated className="mx-auto max-w-2xl text-center">
            <motion.div
              variants={fadeUp}
              className={`mb-4 inline-flex items-center gap-2 rounded-full ${theme.badgeBg} px-4 py-1.5 text-sm font-medium ${theme.badgeText}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              How It Works
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-5xl">
              {howItWorksHeadline}{' '}
              <span className={theme.textAccent}>{howItWorksFlow}</span>
            </motion.h2>
          </Animated>

          <Animated className="relative mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute top-14 left-[12%] right-[12%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            {howItWorks.map((s) => (
              <motion.div key={s.title} variants={fadeUp} className="relative text-center">
                <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center">
                  <div className={`absolute inset-0 rounded-full ${theme.bgLight} ring-1 ${theme.badgeBg}`} />
                  <div className={`absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} text-xs font-bold text-white shadow-lg`}>
                    {s.step}
                  </div>
                  <s.icon className={`h-10 w-10 ${theme.textAccent}`} />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </Animated>
        </div>
      </section>

      {/* ── Features ────────────────────────── */}
      <section id="features" className="border-t border-border/50 py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Animated className="text-center mb-20">
            <motion.div
              variants={fadeUp}
              className={`mb-4 inline-flex items-center gap-2 rounded-full ${theme.badgeBg} px-4 py-1.5 text-sm font-medium ${theme.badgeText}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Features
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold tracking-tight">
              {featuresHeadline1}{' '}
              <span className={theme.textAccent}>{featuresHeadline2}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              {featuresSubtext}
            </motion.p>
          </Animated>
          <Animated className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`rounded-2xl border bg-gradient-to-br ${f.gradient} p-7 h-full`}
              >
                <div className={`h-12 w-12 rounded-xl ${theme.bgLight} flex items-center justify-center mb-5`}>
                  <f.icon className={`h-6 w-6 ${theme.textAccent}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </Animated>
        </div>
      </section>

      {/* ── Target verticals ────────────────── */}
      <section className="border-t border-border/50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Animated>
            <motion.p variants={fadeUp} className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Built for teams in
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
              {verticals.map((v) => (
                <span
                  key={v}
                  className={`px-4 py-2 rounded-full border bg-background text-sm font-medium hover:${theme.badgeBg} hover:${theme.badgeText} transition-colors`}
                >
                  {v}
                </span>
              ))}
            </motion.div>
          </Animated>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────── */}
      <section className="border-t border-border/50 bg-muted/30 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Animated>
            <motion.div variants={fadeUp}>
              <div className={`text-5xl mb-6 ${theme.textAccent} font-serif`}>"</div>
              <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed">
                {testimonial.quote}
              </blockquote>
              <div className="mt-8">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          </Animated>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────── */}
      <section className="border-t border-border/50 py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Animated className="text-center mb-16">
            <motion.div
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-600"
            >
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              Reviews
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold tracking-tight">
              What our users <span className={theme.textAccent}>say</span>
            </motion.h2>
          </Animated>
          <Animated className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <motion.div key={r.name} variants={fadeUp} className="rounded-2xl border bg-card p-7">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-full ${theme.bgLight} flex items-center justify-center text-sm font-bold ${theme.textAccent}`}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Animated>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────── */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <Animated>
            <motion.div
              variants={fadeUp}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} p-12 sm:p-16 text-center text-white`}
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">{ctaHeadline}</h2>
                <p className="text-white/80 mb-10 max-w-md mx-auto text-lg">{ctaSubtext}</p>
                <a
                  href="#demo-form"
                  className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white font-semibold ${theme.textAccent} hover:bg-white/90 transition-all hover:scale-105 shadow-lg`}
                >
                  Book a Free Demo
                </a>
              </div>
            </motion.div>
          </Animated>
        </div>
      </section>

      {/* ── Footer ──────────────────────────── */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className={`h-5 w-5 rounded bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} flex items-center justify-center`}>
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span>{productName}</span>
            <span className="text-muted-foreground">· Part of In-Sync</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <a href="mailto:delight@in-sync.co.in" className="hover:text-foreground transition-colors">Contact</a>
            <span>© {new Date().getFullYear()} In-Sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
