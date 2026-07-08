import { useEffect, useState } from "react";

/**
 * Banner cookie minimale. Il sito usa solo cookie tecnici, quindi è un semplice
 * avviso informativo: la preferenza ("ho capito") viene ricordata in localStorage.
 */
const STORAGE_KEY = "boru-cookie-ack";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage non disponibile (es. modalità privata): non mostrare
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignora */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-border bg-background/95 p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Questo sito usa solo cookie tecnici, necessari al suo funzionamento. Nessun tracciamento
          pubblicitario.{" "}
          <a href="/cookie.html" className="underline decoration-dotted underline-offset-4 hover:text-accent">
            Cookie policy
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-85"
          style={{ background: "var(--azzurro)", color: "var(--nero)" }}
        >
          Ho capito
        </button>
      </div>
    </div>
  );
}
