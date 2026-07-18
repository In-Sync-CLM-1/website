// Meta Pixel helpers — the base snippet in index.html defines window.fbq.
// Guarded so an ad blocker (which removes fbq) never breaks the page.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fbq = (): ((...args: any[]) => void) | null => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const f = (window as any).fbq;
  return typeof f === 'function' ? f : null;
};

export function pixelPageView() {
  fbq()?.('track', 'PageView');
}

export function pixelLead(product: string, formType: string) {
  fbq()?.('track', 'Lead', { content_name: product, content_category: formType });
}
