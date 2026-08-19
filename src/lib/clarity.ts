// Loads Microsoft Clarity session recording for a single product page (opt-in per page,
// not site-wide) — call once from that page's top-level component.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadClarity(projectId: string) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.clarity) return; // already loaded (e.g. React StrictMode double-invoke)

  w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments); };
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  document.head.appendChild(script);
}
