import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, AudioLines, BarChart3, CheckCircle, Download, FileText, FolderOpen, Gift,
  Laptop, MessageSquareQuote, Mic, Sparkles, Video, type LucideIcon,
} from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';
import { defaultSEOConfig } from '@/utils/seo';
import { captureAttribution } from '@/lib/attribution';
import { useEffect } from 'react';

/* ── Animation helpers ─────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Content ───────────────────────────────── */

const PAIN: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: MessageSquareQuote, title: 'You only get a few real shots', desc: 'Every campus drive and walk-in is a one-time chance. Your first mock interview should not be the real one.' },
  { icon: Mic, title: 'Practising in the mirror is not practice', desc: 'Nobody asks a follow-up. Nobody tells you that you said "basically" nineteen times.' },
  { icon: Video, title: 'You never see yourself answer', desc: 'Most freshers have never watched their own answer back — the pauses, the rambling, the eye contact.' },
  { icon: BarChart3, title: 'Feedback is vague or missing', desc: 'Friends say "it was fine". You need to know exactly which answer was weak, and why.' },
];

const STEPS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: FileText, title: 'Add your questions', desc: 'Type in the questions you expect for the role — HR, technical, or "tell me about yourself".' },
  { icon: AudioLines, title: 'Get asked out loud', desc: 'A natural voice asks each question, one at a time, like a real interviewer would.' },
  { icon: Video, title: 'Answer on camera', desc: 'Your webcam and voice are recorded while you answer. Say "I\'m done" when you finish.' },
  { icon: BarChart3, title: 'See your scorecard', desc: 'Every answer is transcribed and scored on content, structure, clarity and confidence.' },
];

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: AudioLines, title: 'Questions spoken aloud', desc: 'Hear each question in a natural voice instead of reading it off a screen — closer to a real interview room.' },
  { icon: Sparkles, title: 'AI follow-up questions', desc: 'Switch on improvised follow-ups, so a vague answer gets probed the way a real interviewer would probe it.' },
  { icon: Video, title: 'Webcam + voice recording', desc: 'Watch yourself back after the session and catch the habits you cannot notice while you are speaking.' },
  { icon: FileText, title: 'Timestamped transcript', desc: 'Every answer is written out with timestamps, so you can jump straight to the moment you lost the thread.' },
  { icon: BarChart3, title: 'Scores that explain themselves', desc: 'Content, structure, clarity and confidence, each out of 10 — plus a count of your filler words.' },
  { icon: FolderOpen, title: 'Question sets + past sessions', desc: 'Keep a separate set for each kind of interview and compare today\'s session with last week\'s.' },
];

const SCORECARD: { label: string; value: number }[] = [
  { label: 'Content', value: 7 },
  { label: 'Structure', value: 6 },
  { label: 'Clarity', value: 8 },
  { label: 'Confidence', value: 5 },
];

/* ── Download card ─────────────────────────── */

const DOWNLOAD_URL = 'https://ai-interviewer-api.echocommunicator.workers.dev/download';

function DownloadCard({ id }: { id?: string }) {
  const onClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') gtag('event', 'file_download', { file_name: 'AI-Interviewer-Setup.exe', product_key: 'ai_interviewer' });
  };
  return (
    <div id={id} className="rounded-2xl border bg-card p-6 text-foreground shadow-xl sm:p-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00b8a8]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00897d]">
        <Gift className="h-3.5 w-3.5" /> Free for freshers
      </span>
      <h3 className="mt-3 text-xl font-semibold">Download AI Interviewer</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Free. No sign-up, no card. Install it, add your questions and start practising.
      </p>
      <a
        href={DOWNLOAD_URL}
        onClick={onClick}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b8a8] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#00b8a8]/30 transition-all hover:scale-[1.02] hover:bg-[#00a395]"
      >
        <Download className="h-5 w-5" /> Download for Windows — Free
      </a>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Windows 10 or 11 · 80 MB · Includes 5 free interviews a day
      </p>
      <div className="mt-5 rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">If Windows shows a blue "protected your PC" screen:</strong> click{' '}
        <em>More info</em>, then <em>Run anyway</em>. This appears for every new app that is not yet widely downloaded.
      </div>
    </div>
  );
}

/* ── Scorecard mock (illustrative) ─────────── */

function ScorecardCard() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Sample scorecard</p>
      <p className="mt-2 text-sm text-white/80">"Tell me about yourself"</p>
      <div className="mt-4 space-y-3">
        {SCORECARD.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs text-white/80">
              <span>{s.label}</span>
              <span>{s.value}/10</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/15">
              <div className="h-1.5 rounded-full bg-[#00b8a8]" style={{ width: `${s.value * 10}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/60">Illustrative example of the scorecard layout.</p>
    </div>
  );
}

/* ── Page ──────────────────────────────────── */

export default function AIInterviewerPage() {
  useEffect(() => { captureAttribution(); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHelmet config={defaultSEOConfig.aiinterviewer} />

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <img src="/favicon.png" alt="In-Sync" className="h-7 w-auto" />
            <span>AI Interviewer</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
            <a href="#download" className="rounded-lg bg-[#00b8a8] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90">
              Download free
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(120deg, #0e182f 0%, #1b294b 55%, #506595 130%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[5%] h-[620px] w-[620px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,184,168,0.38), transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#00b8a8] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#00b8a8]/30">
                <Gift className="h-4 w-4" /> 100% free for freshers
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
                <Laptop className="h-4 w-4" /> Windows app · Part of In-Sync
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl font-extrabold leading-[1.06] tracking-tighter sm:text-5xl lg:text-6xl"
            >
              Fail your first interview{' '}
              <span className="bg-gradient-to-r from-[#7ff3e6] via-white to-[#a9b8da] bg-clip-text text-transparent">
                here, not there.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-white/80 lg:mx-0 lg:text-xl"
            >
              AI Interviewer asks you your questions out loud, records you answering, and scores every answer — so you walk into the real interview having already done it.{' '}
              <strong className="font-semibold text-white">Free. No card. No catch.</strong>
            </motion.p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm lg:justify-start">
              {[
                { icon: Mic, label: 'Asks out loud' },
                { icon: Video, label: 'Records you' },
                { icon: BarChart3, label: 'Scores every answer' },
              ].map((b) => (
                <span key={b.label} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-white/90">
                  <b.icon className="h-4 w-4" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:mx-0">
            <DownloadCard id="download" />
          </div>
        </div>
      </section>

      {/* Free band */}
      <section className="border-b border-border bg-[#00b8a8]/10 px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-[#00706a]">
          <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Free for freshers</span>
          <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> No sign-up needed</span>
          <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> No trial that expires</span>
          <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> 5 interviews every day</span>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border/50 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-5xl">
              Nobody teaches you to <span className="text-[#00b8a8]">interview.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Colleges prepare you for exams. The first time you sit across from a panel is usually the real thing.
            </motion.p>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PAIN.map((p) => (
              <motion.div key={p.title} variants={fadeUp} className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
                  <p.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border/50 bg-muted/30 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-5xl">
              Ask → Answer → Record → <span className="text-[#00b8a8]">Improve</span>
            </motion.h2>
          </Reveal>
          <Reveal className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="text-center">
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rotate-3 rounded-3xl bg-primary shadow-xl transition-transform duration-300 hover:rotate-0" />
                  <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-sm font-bold text-[#00b8a8] shadow-md">
                    {i + 1}
                  </div>
                  <s.icon className="relative h-9 w-9 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Features + scorecard */}
      <section id="features" className="border-t border-border/50 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-5xl">
              Everything a real interview <span className="text-[#00b8a8]">puts you through.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Spoken questions, follow-ups, a camera on you, and a score at the end.
            </motion.p>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00b8a8]/10">
                  <f.icon className="h-6 w-6 text-[#00b8a8]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Scorecard band */}
      <section className="relative overflow-hidden px-6 py-20 text-white sm:py-24" style={{ background: 'linear-gradient(120deg, #0e182f 0%, #1b294b 60%, #506595 140%)' }}>
        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Know exactly which answer let you down.</h2>
            <p className="mt-5 text-lg text-white/80">
              Each answer gets its own scorecard with a transcript to read back, so you fix the specific answer — not a vague feeling that you "need to be more confident".
            </p>
          </div>
          <ScorecardCard />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/50 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">Questions freshers ask</h2>
          <div className="space-y-4">
            {[
              { q: 'What do I need to use it?', a: 'A Windows 10 or 11 laptop or PC with a webcam, a microphone and an internet connection.' },
              { q: 'Is there a limit?', a: 'You can start up to 5 interviews a day, each with as many questions as you like. The count resets every day.' },
              { q: 'Can I use my own questions?', a: 'Yes. You build question sets for whatever you are preparing for, and can keep a separate set for each role or round.' },
              { q: 'Where are my recordings kept?', a: 'Your sessions are saved on your own computer. To transcribe and score an answer, the audio and text are sent to AI services.' },
              { q: 'What does it cost?', a: 'Nothing. AI Interviewer is free for freshers — no card, no trial period, no hidden charges.' },
            ].map((item) => (
              <details key={item.q} className="group rounded-xl border border-border bg-card p-5">
                <summary className="cursor-pointer list-none font-semibold">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl p-12 text-center text-white sm:p-16" style={{ background: 'linear-gradient(120deg, #0e182f 0%, #1b294b 60%, #506595 140%)' }}>
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,184,168,0.4), transparent 70%)', filter: 'blur(50px)' }} />
            <div className="relative z-10">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#00b8a8] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#00b8a8]/30"><Gift className="h-4 w-4" /> Free for freshers</span>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Your real interview should be your second one.</h2>
              <p className="mx-auto mb-10 max-w-md text-lg text-white/80">Do your first one with us. It costs nothing.</p>
              <a href="#download" className="inline-flex items-center gap-2 rounded-xl bg-[#00b8a8] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:scale-105">
                Download free <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium">
            <img src="/favicon.png" alt="In-Sync" className="h-5 w-auto" />
            <span>AI Interviewer</span>
            <span className="text-muted-foreground">· Part of In-Sync</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <a href="mailto:delight@in-sync.co.in" className="transition-colors hover:text-foreground">Contact</a>
            <span>© {new Date().getFullYear()} In-Sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
