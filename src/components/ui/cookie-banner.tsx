import { useEffect, useState } from "react";
import {
  OPEN_PREFERENCES_EVENT,
  getConsent,
  initConsent,
  setConsent,
  type Consent,
} from "@/lib/consent";

/**
 * Banner cookie con consenso preventivo per i cookie di marketing (Meta Pixel).
 * Accetta e Rifiuta hanno pari evidenza; la scelta si può cambiare dal link
 * "Gestisci cookie" nel footer.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initConsent();
    if (getConsent() === null) setVisible(true);
    const open = () => setVisible(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  function choose(value: Consent) {
    const previous = getConsent();
    setConsent(value);
    setVisible(false);
    // Se si revoca un consenso già dato, ricarica per fermare il pixel già in esecuzione.
    if (value === "denied" && previous === "granted") window.location.reload();
  }

  if (!visible) return null;

  const btn =
    "shrink-0 cursor-pointer rounded-full border border-border px-5 py-2 text-sm font-medium transition-opacity hover:opacity-85";

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-border bg-background/95 p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Usiamo cookie tecnici e, solo con il tuo consenso, il Meta Pixel per misurare l'efficacia
          delle nostre campagne pubblicitarie. Puoi accettare o rifiutare, e cambiare idea quando
          vuoi.{" "}
          <a href="/cookie.html" className="underline decoration-dotted underline-offset-4 hover:text-accent">
            Cookie policy
          </a>
          {" · "}
          <a href="/privacy.html" className="underline decoration-dotted underline-offset-4 hover:text-accent">
            Privacy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => choose("denied")} className={`${btn} text-foreground`}>
            Rifiuta
          </button>
          <button
            onClick={() => choose("granted")}
            className={btn}
            style={{ background: "var(--azzurro)", color: "var(--nero)" }}
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
