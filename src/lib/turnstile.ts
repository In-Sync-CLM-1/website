// Cloudflare Turnstile — invisible mode, no challenge, no checkbox, no
// user-visible friction. The site key itself is provisioned "invisible" on
// Cloudflare's side, so any render of it is silent. Same provider already
// proven live on it-helpdesk's signup form.

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

let loadPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Turnstile script failed to load'));
    document.head.appendChild(s);
  });
  return loadPromise;
}

/** Returns a fresh token for this submission, or null if Turnstile isn't
 * configured or fails to load — callers should treat null as "couldn't
 * check this one" and submit anyway, not as a block. Renders into a detached
 * (never-appended) container since invisible mode has nothing to show. */
export async function getTurnstileToken(): Promise<string | null> {
  if (!SITE_KEY) return null;
  try {
    await loadScript();
    if (!window.turnstile) return null;
    return await new Promise<string>((resolve, reject) => {
      const container = document.createElement('div');
      const widgetId = window.turnstile!.render(container, {
        sitekey: SITE_KEY,
        callback: (token) => {
          window.turnstile!.remove(widgetId);
          resolve(token);
        },
        'error-callback': () => {
          window.turnstile!.remove(widgetId);
          reject(new Error('Turnstile error'));
        },
        'expired-callback': () => {
          window.turnstile!.remove(widgetId);
          reject(new Error('Turnstile token expired before use'));
        },
      });
    });
  } catch {
    return null;
  }
}
