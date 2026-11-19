import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { getTurnstileToken } from '@/lib/turnstile';
import { buildChatContext } from '@/lib/chatContext';
import { PILLARS } from '@/lib/products';

// The chat service lives in the In-Sync CRM. Its address is set per
// environment; with no address the chat button is simply not shown.
const CHAT_URL = import.meta.env.VITE_CHAT_API_URL as string | undefined;

const REQUEST_TIMEOUT_MS = 30000;
const TURNSTILE_WAIT_MS = 4000;

type Lang = 'en' | 'hi';
interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const LABELS: Record<Lang, Record<string, string>> = {
  en: {
    title: 'Chat with In-Sync',
    open: 'Open chat',
    close: 'Close chat',
    hello: 'Hi! Ask me about our products, pricing or features. You can write in any language.',
    placeholder: 'Type your question',
    send: 'Send',
    order: 'Get a demo or price',
    orderTitle: 'Tell us about your team',
    name: 'Your name',
    contact: 'Mobile number or email',
    company: 'Company',
    product: 'Product of interest',
    team: 'Team size',
    submit: 'Send request',
    cancel: 'Back to chat',
    thanks: 'Thank you! Our team will contact you shortly.',
    callback: 'Request a call-back',
    errName: 'Please enter your name.',
    errContact: 'Please enter a valid 10-digit mobile number or an email address.',
    errCompany: 'Please enter your company name.',
    errProduct: 'Please choose a product.',
    errTeam: 'Please enter your team size as a number.',
    errSend: 'Sorry, we could not send that. Please try again, or email delight@in-sync.co.in.',
    errChat: 'Sorry, I could not answer just now. Please try again, or email delight@in-sync.co.in.',
  },
  hi: {
    title: 'In-Sync से चैट करें',
    open: 'चैट खोलें',
    close: 'चैट बंद करें',
    hello: 'नमस्ते! हमारे प्रोडक्ट, कीमत या फ़ीचर के बारे में पूछिए। आप किसी भी भाषा में लिख सकते हैं।',
    placeholder: 'अपना सवाल लिखें',
    send: 'भेजें',
    order: 'डेमो या कीमत पाएँ',
    orderTitle: 'अपनी टीम के बारे में बताएँ',
    name: 'आपका नाम',
    contact: 'मोबाइल नंबर या ईमेल',
    company: 'कंपनी',
    product: 'पसंदीदा प्रोडक्ट',
    team: 'टीम का आकार',
    submit: 'अनुरोध भेजें',
    cancel: 'चैट पर वापस',
    thanks: 'धन्यवाद! हमारी टीम जल्द ही आपसे संपर्क करेगी।',
    callback: 'कॉल-बैक का अनुरोध करें',
    errName: 'कृपया अपना नाम लिखें।',
    errContact: 'कृपया 10 अंकों का सही मोबाइल नंबर या ईमेल लिखें।',
    errCompany: 'कृपया कंपनी का नाम लिखें।',
    errProduct: 'कृपया प्रोडक्ट चुनें।',
    errTeam: 'कृपया टीम का आकार संख्या में लिखें।',
    errSend: 'माफ़ कीजिए, यह भेजा नहीं जा सका। कृपया फिर कोशिश करें, या delight@in-sync.co.in पर ईमेल करें।',
    errChat: 'माफ़ कीजिए, अभी जवाब नहीं दे सका। कृपया फिर कोशिश करें, या delight@in-sync.co.in पर ईमेल करें।',
  },
};

// Same rules as the home page lead form.
const normalizePhone = (v: string) => {
  let d = v.replace(/\D/g, '');
  while (d.length > 10) {
    if (d.startsWith('0')) d = d.slice(1);
    else if (d.startsWith('91')) d = d.slice(2);
    else break;
  }
  return d;
};
const isValidPhone = (v: string) => /^[6-9]\d{9}$/.test(normalizePhone(v));
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function sessionId(): string {
  try {
    let id = sessionStorage.getItem('insync_chat_session');
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem('insync_chat_session', id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function startPage(): string {
  try {
    let p = sessionStorage.getItem('insync_chat_start');
    if (!p) {
      p = window.location.href;
      sessionStorage.setItem('insync_chat_start', p);
    }
    return p;
  } catch {
    return window.location.href;
  }
}

async function post(body: Record<string, unknown>) {
  const token = await Promise.race([
    getTurnstileToken(),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), TURNSTILE_WAIT_MS)),
  ]);
  const res = await fetch(CHAT_URL!, {
    method: 'POST',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId(),
      start_page: startPage(),
      current_page: window.location.href,
      turnstile_token: token,
      ...body,
    }),
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

const EMPTY_ORDER = { name: '', contact: '', company: '', product: '', team: '' };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [order, setOrder] = useState({ ...EMPTY_ORDER });
  const [errors, setErrors] = useState<string[]>([]);
  const [placed, setPlaced] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const t = LABELS[lang];

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, busy, showOrder, open]);

  if (!CHAT_URL) return null;

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: text }];
    setMsgs(next);
    setInput('');
    setBusy(true);
    try {
      const context = await buildChatContext(text);
      const data = (await post({ action: 'chat', messages: next.slice(-20), context, ui_language: lang })) as {
        reply?: string;
        show_order_form?: boolean;
      };
      setMsgs([...next, { role: 'assistant', content: data.reply || t.errChat }]);
      if (data.show_order_form) setShowOrder(true);
    } catch {
      setMsgs([...next, { role: 'assistant', content: t.errChat }]);
    } finally {
      setBusy(false);
    }
  }

  async function submitOrder(e: FormEvent) {
    e.preventDefault();
    const found: string[] = [];
    const contact = order.contact.trim();
    const team = Number(order.team);
    if (!order.name.trim()) found.push(t.errName);
    if (!contact || !(isValidPhone(contact) || isValidEmail(contact))) found.push(t.errContact);
    if (!order.company.trim()) found.push(t.errCompany);
    if (!order.product) found.push(t.errProduct);
    if (!Number.isInteger(team) || team < 1 || team > 100000) found.push(t.errTeam);
    setErrors(found);
    if (found.length) return;
    setBusy(true);
    try {
      await post({
        action: 'order',
        messages: msgs.slice(-20),
        ui_language: lang,
        order: {
          name: order.name.trim(),
          phone: isValidPhone(contact) ? normalizePhone(contact) : null,
          email: isValidEmail(contact) ? contact : null,
          company: order.company.trim(),
          product: order.product,
          team_size: team,
        },
      });
      setPlaced(true);
      setShowOrder(false);
      setOrder({ ...EMPTY_ORDER });
      setMsgs((m) => [...m, { role: 'assistant', content: t.thanks }]);
    } catch {
      setErrors([t.errSend]);
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      {open ? (
        <div
          role="dialog"
          aria-label={t.title}
          className="flex h-[min(34rem,calc(100dvh-2rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-2xl"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <span className="font-semibold">{t.title}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="rounded border border-primary-foreground/40 px-2 py-0.5 text-xs"
                aria-label="Language"
              >
                {lang === 'en' ? 'हिन्दी' : 'English'}
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
            <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2">{t.hello}</div>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[85%] whitespace-pre-wrap rounded-lg bg-primary px-3 py-2 text-primary-foreground'
                    : 'max-w-[85%] whitespace-pre-wrap rounded-lg bg-muted px-3 py-2'
                }
              >
                {m.content}
              </div>
            ))}
            {busy && <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2 text-muted-foreground">…</div>}

            {showOrder && (
              <form onSubmit={submitOrder} className="space-y-2 rounded-lg border p-3" noValidate>
                <p className="font-medium">{t.orderTitle}</p>
                <input className={inputCls} placeholder={t.name} aria-label={t.name} value={order.name}
                  onChange={(e) => setOrder({ ...order, name: e.target.value })} />
                <input className={inputCls} placeholder={t.contact} aria-label={t.contact} value={order.contact}
                  onChange={(e) => setOrder({ ...order, contact: e.target.value })} />
                <input className={inputCls} placeholder={t.company} aria-label={t.company} value={order.company}
                  onChange={(e) => setOrder({ ...order, company: e.target.value })} />
                <select className={inputCls} aria-label={t.product} value={order.product}
                  onChange={(e) => setOrder({ ...order, product: e.target.value })}>
                  <option value="">{t.product}</option>
                  {PILLARS.flatMap((p) => p.products).map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
                <input className={inputCls} inputMode="numeric" placeholder={t.team} aria-label={t.team} value={order.team}
                  onChange={(e) => setOrder({ ...order, team: e.target.value })} />
                {errors.length > 0 && (
                  <ul className="space-y-1 text-xs text-red-600" role="alert">
                    {errors.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                )}
                <div className="flex gap-2">
                  <button type="submit" disabled={busy}
                    className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
                    {t.submit}
                  </button>
                  <button type="button" onClick={() => { setShowOrder(false); setErrors([]); }}
                    className="rounded-md border px-3 py-2 text-sm">
                    {t.cancel}
                  </button>
                </div>
              </form>
            )}
            <div ref={endRef} />
          </div>

          {!showOrder && (
            <div className="border-t p-2">
              <button type="button" onClick={() => { setPlaced(false); setShowOrder(true); }}
                className="mb-2 w-full rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                {placed ? t.callback : t.order}
              </button>
              <form onSubmit={send} className="flex gap-2">
                <input className={inputCls} value={input} maxLength={1000} placeholder={t.placeholder}
                  aria-label={t.placeholder} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" disabled={busy || !input.trim()} aria-label={t.send}
                  className="rounded-md bg-primary px-3 text-primary-foreground disabled:opacity-50">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.open}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
