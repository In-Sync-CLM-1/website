// Builds the website facts sent with each chat message. The chat service may
// answer only from these facts. Nothing here is invented: it is picked from the
// FAQ list, the product list, the public pricing page and the blog posts.

import { findMatchingFAQs } from '@/data/faqKnowledgeBase';
import { ALL_PRODUCTS } from '@/lib/products';

// Words that the FAQ matcher can use to find blog posts too.
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);

// The old per-day customisation rate must never reach a visitor.
const OLD_RATE = /customi[sz]ation[^.]*(6,?000|per day)|6,?000[^.]*(per day|customi[sz])/i;
const clean = (s: string) =>
  s
    .split(/(?<=[.!?])\s+/)
    .filter((p) => !OLD_RATE.test(p))
    .join(' ')
    .replace(/vendor\s+sync/gi, 'Vendorsync');

const PRICING_FACTS = [
  'In-Sync CRM Standard plan: Rs 500 per user per month, minimum 10 users on monthly billing, quarterly billing for fewer than 10 users, 15 days free trial. Annual billing is 11 months for the price of 12.',
  'Enterprise plan: custom pricing, contact sales.',
  'One-time setup fee: Rs 15,000. Custom API integration: Rs 25,000 per integration.',
  'Changes and customisation carry no charge.',
  'Communication wallet starts at Rs 10,000. Rates: WhatsApp Rs 0.93 per message, email Rs 0.10 per message, SMS Rs 0.12 per message, calling Rs 1.00 per minute.',
  'AI calling is live.',
];

export async function buildChatContext(question: string): Promise<string[]> {
  const facts: string[] = [];

  for (const faq of findMatchingFAQs(question)) {
    facts.push(clean(`FAQ: ${faq.question} ${faq.answer}`));
  }

  facts.push(...PRICING_FACTS);
  facts.push(
    'Products: ' + ALL_PRODUCTS.map((p) => `${p.name} (${p.tagline}), page ${p.href}`).join('; '),
  );

  // Blog posts load only when a chat is used, so normal pages stay light.
  try {
    const { blogData } = await import('@/pages/BlogPost');
    const q = new Set(words(question));
    const scored = blogData
      .map((b) => ({
        b,
        score: words(`${b.title} ${b.tags.join(' ')} ${b.category}`).filter((w) => q.has(w)).length,
      }))
      .filter((x) => x.score > 0)
      .sort((a, c) => c.score - a.score)
      .slice(0, 2);
    for (const { b } of scored) {
      facts.push(clean(`Blog "${b.title}" (page /blog/${b.id}): ${b.excerpt}`));
    }
  } catch {
    /* blog facts are optional */
  }

  return facts;
}
