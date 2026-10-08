import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Download, Gift, Mic, Sparkles, Star } from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';
import { defaultSEOConfig } from '@/utils/seo';
import { captureAttribution } from '@/lib/attribution';

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

const IMG = {
  laugh: '/ai-interviewer/hero-laugh.jpg',
  library: '/ai-interviewer/library.jpg',
  friends: '/ai-interviewer/friends.jpg',
  candidate: '/ai-interviewer/candidate.jpg',
  laptop: '/ai-interviewer/laptop.jpg',
};

const PAIN = [
  { emoji: '😬', title: 'Only a few real shots', desc: 'Every campus drive and walk-in is a one-time chance. Your first mock should not be the real one.', bg: 'bg-[#fff4d6]' },
  { emoji: '🪞', title: 'Mirror practice is not practice', desc: 'The mirror never asks a follow-up. And it never tells you that you said "basically" nineteen times.', bg: 'bg-[#e0f7f4]' },
  { emoji: '🎥', title: 'You have never seen yourself answer', desc: 'The pauses, the rambling, the eye contact. Watching it back is the fastest way to fix it.', bg: 'bg-[#ffe3e0]' },
  { emoji: '🤷', title: '"It was fine" is not feedback', desc: 'You need to know which answer was weak, and why — not a pat on the back from a friend.', bg: 'bg-[#e6e9fb]' },
];

const STEPS = [
  { n: '1', emoji: '📝', title: 'Pick a ready-made set', desc: 'HR, campus drive, IT, sales, finance — or type in your own questions.', bg: 'bg-[#fff4d6]' },
  { n: '2', emoji: '🔊', title: 'Get asked out loud', desc: 'A natural voice asks one question at a time, like a real panel would.', bg: 'bg-[#e0f7f4]' },
  { n: '3', emoji: '🎬', title: 'Answer on camera', desc: 'Your webcam and voice are recorded. Say "I\'m done" when you finish.', bg: 'bg-[#ffe3e0]' },
  { n: '4', emoji: '🏆', title: 'See your scorecard', desc: 'Every answer scored on content, structure, clarity and confidence.', bg: 'bg-[#e6e9fb]' },
];

const SETS = [
  { emoji: '🙋', name: 'Common HR questions', count: 10, bg: 'bg-[#e0f7f4]' },
  { emoji: '💬', name: 'Behavioural questions', count: 8, bg: 'bg-[#fff4d6]' },
  { emoji: '🎓', name: 'Campus placement drive', count: 9, bg: 'bg-[#ffe3e0]' },
  { emoji: '🧠', name: 'Communication & situational', count: 8, bg: 'bg-[#e6e9fb]' },
  { emoji: '💻', name: 'Software & IT fresher', count: 9, bg: 'bg-[#e0f7f4]' },
  { emoji: '🤝', name: 'Sales & business fresher', count: 8, bg: 'bg-[#fff4d6]' },
  { emoji: '📊', name: 'Finance & commerce fresher', count: 8, bg: 'bg-[#ffe3e0]' },
];

const FEATURES = [
  { emoji: '🗣️', title: 'Questions spoken aloud', desc: 'Hear each question instead of reading it off a screen. Much closer to a real interview room.' },
  { emoji: '✨', title: 'AI follow-up questions', desc: 'Switch on follow-ups, so a vague answer gets probed the way a real interviewer would.' },
  { emoji: '📹', title: 'Webcam + voice recording', desc: 'Watch yourself back and catch the habits you cannot notice while you are speaking.' },
  { emoji: '📄', title: 'Timestamped transcript', desc: 'Every answer written out, so you can jump to the moment you lost the thread.' },
  { emoji: '📈', title: 'Scores that explain themselves', desc: 'Content, structure, clarity and confidence out of 10 — plus a count of filler words.' },
  { emoji: '📚', title: 'Your sets + past sessions', desc: 'Keep a set for each kind of interview and compare today\'s session with last week\'s.' },
];

const SCORECARD = [
  { label: 'Content', value: 7, color: '#00b8a8' },
  { label: 'Structure', value: 6, color: '#ffb703' },
  { label: 'Clarity', value: 8, color: '#5b6cff' },
  { label: 'Confidence', value: 5, color: '#ff6b6b' },
];

/* ── Download button ───────────────────────── */

const DOWNLOAD_URL = 'https://ai-interviewer-api.echocommunicator.workers.dev/download';

function DownloadButton({ className = '' }: { className?: string }) {
  const onClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') gtag('event', 'file_download', { file_name: 'AI-Interviewer-Setup.exe', product_key: 'ai_interviewer' });
  };
  return (
    <a
      href={DOWNLOAD_URL}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#00b8a8] px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-[#00b8a8]/40 transition-all hover:-translate-y-0.5 hover:bg-[#00a395] ${className}`}
    >
      <Download className="h-5 w-5" /> Download for Windows — Free
    </a>
  );
}

/* ── App mockup (illustrative) ─────────────── */

function AppMockup() {
  return (
    <div className="overflow-hidden rounded-3xl border-4 border-[#1b294b] bg-white shadow-2xl">
      <div className="flex items-center gap-1.5 bg-[#1b294b] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffb703]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#00b8a8]" />
        <span className="ml-3 text-xs font-semibold text-white/70">AI Interviewer · Campus Placement Drive</span>
      </div>
      <div className="grid gap-0 sm:grid-cols-5">
        <div className="relative sm:col-span-3">
          <img src={IMG.candidate} alt="A fresher answering an interview question on camera" className="h-72 w-full object-cover object-top sm:h-[26rem]" loading="lazy" />
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#ff4d4d] px-3 py-1 text-xs font-bold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> REC 00:42
          </span>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3 shadow-lg">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#00897d]">Question 1 of 9</p>
            <p className="mt-0.5 text-sm font-semibold text-[#1b294b]">"Introduce yourself in one minute."</p>
          </div>
        </div>
        <div className="space-y-3 bg-[#f3f4f7] p-5 sm:col-span-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#506595]">Your scorecard</p>
          {SCORECARD.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-xs font-semibold text-[#1b294b]">
                <span>{s.label}</span>
                <span>{s.value}/10</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-white">
                <div className="h-2 rounded-full" style={{ width: `${s.value * 10}%`, background: s.color }} />
              </div>
            </div>
          ))}
          <p className="pt-1 text-[11px] text-[#506595]">Illustrative layout of the scorecard.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────── */

export default function AIInterviewerPage() {
  useEffect(() => { captureAttribution(); }, []);

  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#1b294b]">
      <SEOHelmet config={defaultSEOConfig.aiinterviewer} />

      <header className="sticky top-0 z-50 border-b border-[#1b294b]/10 bg-[#fffdf8]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
            <img src="/favicon.png" alt="In-Sync" className="h-7 w-auto" />
            <span>AI Interviewer</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#1b294b]/70 md:flex">
            <a href="#how-it-works" className="hover:text-[#1b294b]">How it works</a>
            <a href="#sets" className="hover:text-[#1b294b]">Question sets</a>
            <a href="#features" className="hover:text-[#1b294b]">Features</a>
            <a href="#faq" className="hover:text-[#1b294b]">FAQ</a>
          </nav>
          <a href="#download" className="rounded-full bg-[#00b8a8] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#00b8a8]/30 hover:opacity-90">
            Download free
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e0f7f4] via-[#fff4d6]/60 to-[#fffdf8]">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#ffb703]/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-[#00b8a8]/25 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div id="download" className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex -rotate-2 items-center gap-2 rounded-full bg-[#ffb703] px-5 py-2 text-sm font-extrabold uppercase tracking-wider text-[#1b294b] shadow-lg"
            >
              <Gift className="h-4 w-4" /> 100% free for freshers
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Fail your first interview{' '}
              <span className="relative inline-block text-[#00a395]">
                here, not there.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 8 Q 75 0 150 6 T 298 5" fill="none" stroke="#ffb703" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="mx-auto mt-7 max-w-xl text-lg text-[#1b294b]/75 lg:mx-0 lg:text-xl"
            >
              Practise with a mock interviewer that asks you questions out loud, records you answering and scores every answer. Free. No card. No catch.
            </motion.p>
            <div className="mt-8 flex flex-col items-center gap-4 lg:items-start">
              <DownloadButton />
              <p className="text-sm font-medium text-[#1b294b]/60">Windows 10 / 11 · 80 MB · 5 free interviews a day</p>
              <p className="max-w-md rounded-2xl bg-white/70 px-4 py-2.5 text-xs leading-relaxed text-[#1b294b]/70 ring-1 ring-[#1b294b]/10">
                <strong className="text-[#1b294b]">Blue "protected your PC" screen?</strong> Click <em>More info</em>, then <em>Run anyway</em>.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="grid grid-cols-5 gap-4">
              <img src={IMG.laugh} alt="Students laughing together over their laptops" className="col-span-3 h-72 w-full -rotate-2 rounded-[2rem] border-4 border-white object-cover shadow-2xl sm:h-80" />
              <img src={IMG.candidate} alt="A confident fresher in a blazer" className="col-span-2 mt-10 h-72 w-full rotate-2 rounded-[2rem] border-4 border-white object-cover object-top shadow-2xl sm:h-80" />
              <img src={IMG.friends} alt="Friends preparing together" className="col-span-5 -mt-2 h-36 w-full rounded-[2rem] border-4 border-white object-cover shadow-2xl" />
            </div>
            <div className="absolute -left-3 top-6 flex -rotate-6 items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold shadow-xl sm:-left-8">
              <Mic className="h-4 w-4 text-[#00b8a8]" /> "Tell me about yourself"
            </div>
            <div className="absolute -right-2 top-40 flex rotate-6 items-center gap-2 rounded-2xl bg-[#1b294b] px-4 py-2.5 text-sm font-bold text-white shadow-xl sm:-right-6">
              <Star className="h-4 w-4 fill-[#ffb703] text-[#ffb703]" /> Clarity 8/10
            </div>
            <div className="absolute -bottom-4 left-8 flex -rotate-3 items-center gap-2 rounded-2xl bg-[#00b8a8] px-4 py-2.5 text-sm font-bold text-white shadow-xl">
              <Sparkles className="h-4 w-4" /> Better every try
            </div>
          </div>
        </div>
      </section>

      {/* Free band */}
      <section className="bg-[#1b294b] px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-1 text-sm font-bold text-white">
          <span>🎁 Free for freshers</span>
          <span>🚫 No sign-up</span>
          <span>♾️ No trial that expires</span>
          <span>🔁 5 interviews every day</span>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight sm:text-5xl">
              Nobody teaches you to <span className="text-[#00a395]">interview.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-lg text-[#1b294b]/70">
              College prepares you for exams. The first time you sit across from a panel is usually the real thing.
            </motion.p>
          </Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <img src={IMG.library} alt="Friends laughing together in a college library" className="h-80 w-full rounded-[2rem] object-cover shadow-xl lg:col-span-2 lg:h-[30rem]" loading="lazy" />
            <Reveal className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
              {PAIN.map((p) => (
                <motion.div key={p.title} variants={fadeUp} className={`rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:rotate-1 ${p.bg}`}>
                  <div className="mb-3 text-4xl">{p.emoji}</div>
                  <h3 className="mb-1.5 text-lg font-extrabold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[#1b294b]/70">{p.desc}</p>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight sm:text-5xl">
              Ask → Answer → Record → <span className="text-[#00a395]">Improve</span>
            </motion.h2>
          </Reveal>
          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <motion.div key={s.title} variants={fadeUp} className={`relative rounded-3xl p-6 pt-8 ${s.bg}`}>
                <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#1b294b] text-base font-black text-white shadow-lg">{s.n}</span>
                <div className="mb-3 text-4xl">{s.emoji}</div>
                <h3 className="text-lg font-extrabold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#1b294b]/70">{s.desc}</p>
              </motion.div>
            ))}
          </Reveal>
          <div className="mx-auto mt-16 max-w-3xl">
            <AppMockup />
          </div>
        </div>
      </section>

      {/* Ready-made sets */}
      <section id="sets" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <motion.span variants={fadeUp} className="inline-block rotate-1 rounded-full bg-[#ffb703] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider">Ready on day one</motion.span>
                <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                  7 question sets, <span className="text-[#00a395]">already inside.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-4 text-lg text-[#1b294b]/70">
                  No blank screen, no wondering what to practise. Open the app and start with the questions freshers actually get asked. Add your own whenever you like.
                </motion.p>
              </Reveal>
              <img src={IMG.friends} alt="Friends practising interview questions together" className="mt-8 hidden h-56 w-full rounded-[2rem] object-cover shadow-xl lg:block" loading="lazy" />
            </div>
            <Reveal className="grid gap-3 sm:grid-cols-2">
              {SETS.map((s) => (
                <motion.div key={s.name} variants={fadeUp} className={`flex items-center gap-4 rounded-2xl p-4 ${s.bg}`}>
                  <span className="text-3xl">{s.emoji}</span>
                  <div>
                    <p className="text-sm font-extrabold leading-tight">{s.name}</p>
                    <p className="text-xs font-medium text-[#1b294b]/60">{s.count} questions</p>
                  </div>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight sm:text-5xl">
              Everything a real interview <span className="text-[#00a395]">puts you through.</span>
            </motion.h2>
          </Reveal>
          <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="rounded-3xl border-2 border-[#1b294b]/10 bg-[#fffdf8] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00b8a8] hover:shadow-xl">
                <div className="mb-3 text-4xl">{f.emoji}</div>
                <h3 className="mb-1.5 text-lg font-extrabold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#1b294b]/70">{f.desc}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Photo band */}
      <section className="relative overflow-hidden">
        <img src={IMG.laptop} alt="Two colleagues working together at a laptop" className="h-[26rem] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center bg-[#1b294b]/70 px-6 text-center">
          <div>
            <h2 className="mx-auto max-w-2xl text-3xl font-black text-white sm:text-5xl">From campus to your first job, one practice round at a time.</h2>
            <a href="#download" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ffb703] px-8 py-3.5 font-extrabold text-[#1b294b] shadow-xl transition-transform hover:scale-105">
              Start practising free <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-black tracking-tight sm:text-4xl">Questions freshers ask</h2>
          <div className="space-y-3">
            {[
              { q: 'What do I need to use it?', a: 'A Windows 10 or 11 laptop or PC with a webcam, a microphone and an internet connection.' },
              { q: 'Is there a limit?', a: 'You can start up to 5 interviews a day, each with as many questions as you like. The count resets every day.' },
              { q: 'Do I have to write my own questions?', a: 'No. 7 ready-made sets are included — HR, behavioural, campus drive, IT, sales, finance and more. You can add your own for any role or round.' },
              { q: 'Where are my recordings kept?', a: 'Your sessions are saved on your own computer. To transcribe and score an answer, the audio and text are sent to AI services.' },
              { q: 'What does it cost?', a: 'Nothing. AI Interviewer is free for freshers — no card, no trial period, no hidden charges.' },
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl border-2 border-[#1b294b]/10 bg-white p-5 open:border-[#00b8a8]">
                <summary className="cursor-pointer list-none font-bold">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-[#1b294b]/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#00b8a8] to-[#1b294b] p-12 text-center text-white sm:p-16">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#ffb703]/40 blur-2xl" />
          <div className="relative z-10">
            <span className="mb-5 inline-flex -rotate-2 items-center gap-2 rounded-full bg-[#ffb703] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider text-[#1b294b]"><Gift className="h-4 w-4" /> Free for freshers</span>
            <h2 className="mb-3 text-3xl font-black sm:text-4xl">Your real interview should be your second one.</h2>
            <p className="mx-auto mb-8 max-w-md text-lg text-white/85">Do your first one with us. It costs nothing.</p>
            <DownloadButton className="!bg-white !text-[#1b294b] !shadow-black/20 hover:!bg-[#fff4d6]" />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1b294b]/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium">
            <img src="/favicon.png" alt="In-Sync" className="h-5 w-auto" />
            <span>AI Interviewer</span>
            <span className="text-[#1b294b]/60">· Part of In-Sync</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#1b294b]/60">
            <Link to="/" className="hover:text-[#1b294b]">Home</Link>
            <Link to="/privacy" className="hover:text-[#1b294b]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#1b294b]">Terms</Link>
            <a href="mailto:delight@in-sync.co.in" className="hover:text-[#1b294b]">Contact</a>
            <span>© {new Date().getFullYear()} In-Sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
