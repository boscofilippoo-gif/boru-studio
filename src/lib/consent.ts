/**
 * Gestione del consenso ai cookie di marketing (Meta Pixel).
 * Il pixel viene caricato solo dopo un "Accetta" esplicito; "Rifiuta" non carica nulla.
 */
const STORAGE_KEY = "boru-cookie-consent";
const PIXEL_ID = "1084985681013070";

export const OPEN_PREFERENCES_EVENT = "boru-cookie-open";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignora */
  }
  if (value === "granted") loadMetaPixel();
}

export function openPreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function loadMetaPixel() {
  if (window.fbq) return;
  const doc = document;
  const fbq = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const f = fbq as any;
    if (f.callMethod) f.callMethod(...args);
    else f.queue.push(args);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const f = fbq as any;
  f.push = fbq;
  f.loaded = true;
  f.version = "2.0";
  f.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = doc.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  doc.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

/** Da chiamare all'avvio: ricarica il pixel se il consenso era già stato dato. */
export function initConsent() {
  if (getConsent() === "granted") loadMetaPixel();
}
