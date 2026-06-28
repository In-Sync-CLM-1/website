const KEY = 'ws_attribution';

export interface Attribution {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_url?: string;
}

export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: Attribution = {};
    const gclid = params.get('gclid');
    if (gclid) incoming.gclid = gclid;
    (['utm_source', 'utm_medium', 'utm_campaign'] as const).forEach((k) => {
      const v = params.get(k);
      if (v) incoming[k] = v;
    });
    if (Object.keys(incoming).length === 0) return;
    incoming.landing_url = window.location.href;
    localStorage.setItem(KEY, JSON.stringify(incoming));
  } catch {
    /* localStorage blocked / private mode */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Attribution;
  } catch {
    return {};
  }
}
