// reCAPTCHA v3 — invisible, no challenge, no user friction. Loads Google's
// script lazily (once) and resolves an action-scoped token per submission.
// Site key is public by design (it's sent to the browser either way), so it
// lives in VITE_RECAPTCHA_SITE_KEY same as any other publishable key.

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

let loadPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('reCAPTCHA script failed to load'));
    document.head.appendChild(s);
  });
  return loadPromise;
}

/** Returns a fresh token for this action, or null if reCAPTCHA isn't
 * configured or fails to load — callers should treat null as "couldn't
 * score this one" and submit anyway, not as a block. */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!SITE_KEY) return null;
  try {
    await loadScript();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const grecaptcha = (window as any).grecaptcha;
    return await new Promise<string>((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(SITE_KEY, { action }).then(resolve).catch(reject);
      });
    });
  } catch {
    return null;
  }
}
