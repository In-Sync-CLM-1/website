// Google Ads conversion helpers — the base tag in index.html defines window.gtag.
// Guarded so an ad blocker (which removes gtag) never breaks the page.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gtag = (): ((...args: any[]) => void) | null => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = (window as any).gtag;
  return typeof g === 'function' ? g : null;
};

// "Submit lead form" conversion action (AW-18110503768/g1U5CMqg3uMcENi24btD)
export function adsLeadConversion() {
  gtag()?.('event', 'conversion', { send_to: 'AW-18110503768/g1U5CMqg3uMcENi24btD' });
}
