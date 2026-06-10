import { useEffect, useRef, useState } from "react";

// numeri grandi in azzurro brand su fondo nero
const ACCENT = "var(--azzurro)";

// helper: mappa v dall'intervallo [a,b] a [c,d], con clamp
const mapClamp = (v: number, a: number, b: number, c: number, d: number) => {
  if (b === a) return c;
  const t = Math.min(Math.max((v - a) / (b - a), 0), 1);
  return c + t * (d - c);
};

const METRICS = [
  {
    value: "40%",
    label:
      "del tempo lavorativo va in attività ripetitive: email da smistare, dati da copiare, report da compilare.",
    source: "fonte: McKinsey",
  },
  {
    value: "16 ore",
    label:
      "a settimana per persona. Due giornate intere. In un anno, oltre 800 ore che non tornano più.",
    source: "",
  },
  {
    value: "~18.000€",
    label:
      "l'anno per ogni dipendente che passa il 40% del tempo in attività che non generano valore diretto.",
    source: "fonte: JobPricing + OCSE",
  },
];

// finestre di transizione per i 3 step: [entraA, entraB, esceA, esceB]
const WINDOWS: Array<[number, number, number, number]> = [
  [-1, -1, 0.3, 0.4], // step 0: già visibile, esce verso 1/3
  [0.32, 0.42, 0.62, 0.72],
  [0.64, 0.74, 2, 2], // step 2: entra a ~2/3, resta pieno fino a fine corsa
];

function ScrollStepMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => setReduce(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  useEffect(() => {
    const u = () => setMobile(window.innerWidth < 768);
    u();
    window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = -1;
    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
      const p = Math.min(Math.max((window.scrollY - top) / scrollable, 0), 1);
      if (Math.abs(p - last) > 0.001) {
        last = p;
        setProgress(p);
      }
    };
    const onScroll = () => compute();
    const tick = () => {
      compute();
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return <StaticMetrics />;

  const Header = (
    <div className="absolute left-0 right-0 top-[12vh] px-6 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
        i numeri
      </p>
      <h2 className="mx-auto max-w-2xl text-balance font-title text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
        Tempo e soldi che escono ogni giorno. In silenzio.
      </h2>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Dati"
      className="relative w-full bg-background"
      style={{ height: mobile ? "180vh" : "260vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        {Header}

        {/* numeri sovrapposti, uno attivo alla volta */}
        <div className="relative flex h-[44vh] w-full items-center justify-center">
          {METRICS.map((m, i) => {
            const [eA, eB, xA, xB] = WINDOWS[i];
            const enter = eA < 0 ? 1 : mapClamp(progress, eA, eB, 0, 1);
            const leave = xB > 1 ? 1 : mapClamp(progress, xA, xB, 1, 0);
            const opacity = enter * leave;
            const yIn = eA < 0 ? 0 : mapClamp(progress, eA, eB + 0.02, 40, 0);
            const yOut = xB > 1 ? 0 : mapClamp(progress, xA, xB + 0.02, 0, -40);
            const y = yIn + yOut;
            return (
              <div
                key={m.value}
                className="pointer-events-none absolute flex flex-col items-center text-center"
                style={{ opacity, transform: `translateY(${y}px)`, visibility: opacity <= 0.01 ? "hidden" : "visible" }}
              >
                <span
                  className="font-title text-7xl font-semibold tracking-tight md:text-9xl"
                  style={{ color: ACCENT }}
                >
                  {m.value}
                </span>
                <span className="mt-5 max-w-[34ch] text-base text-muted-foreground md:text-lg">
                  {m.label}
                </span>
                {m.source && (
                  <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {m.source}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* chiusura: appare con l'ultimo numero */}
        <p
          className="pointer-events-none absolute bottom-[10vh] left-1/2 w-full max-w-xl -translate-x-1/2 px-6 text-center text-sm italic leading-relaxed text-muted-foreground"
          style={{ opacity: mapClamp(progress, 0.8, 0.95, 0, 1) }}
        >
          Moltiplicalo per il numero di persone in azienda. Il numero che viene fuori è quasi
          sempre una sorpresa.
        </p>
      </div>
    </section>
  );
}

/** Variante statica per prefers-reduced-motion: i 3 numeri in griglia, niente scroll. */
function StaticMetrics() {
  return (
    <section aria-label="Dati" className="w-full border-t border-border bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
          i numeri
        </p>
        <h2 className="max-w-2xl text-balance font-title text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
          Tempo e soldi che escono ogni giorno. In silenzio.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {METRICS.map((m) => (
            <div key={m.value} className="bg-background p-8">
              <span className="block font-title text-5xl font-semibold tracking-tight" style={{ color: ACCENT }}>
                {m.value}
              </span>
              <span className="mt-4 block max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
                {m.label}
              </span>
              {m.source && (
                <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {m.source}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ScrollStepMetrics };
