import { useEffect, useRef, useState } from "react";

// accento secondario brand: rosa #ef95b4
const ACCENT_2 = "var(--rosa)";

const mapClamp = (v: number, a: number, b: number, c: number, d: number) => {
  if (b === a) return c;
  const t = Math.min(Math.max((v - a) / (b - a), 0), 1);
  return c + t * (d - c);
};

/**
 * UspQuote — card porcellana scroll-driven sul nero: un'iride ROSA si espande dal centro
 * e vira al nero; dal buio emerge la card con l'obiezione tipica del cliente (sfumata →
 * a fuoco), poi appare la risposta di BORU. Stesso engine scroll del resto del sito.
 */
function UspQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => setReduce(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
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

  const p = reduce ? 1 : progress;
  // FASE 1 — IRIDE: cerchio dal centro che si espande (0 → 0.25). Parte ROSA e vira al nero.
  const veilR = mapClamp(p, 0, 0.25, 0, 75);
  const veilMix = mapClamp(p, 0.12, 0.34, 0, 1);
  const veilColor = `color-mix(in oklab, var(--rosa) ${(1 - veilMix) * 100}%, var(--nero))`;
  // FASE 2 — la card porcellana emerge dal buio
  const sceneOp = mapClamp(p, 0.3, 0.56, 0, 1);
  const sceneY = mapClamp(p, 0.3, 0.58, 50, 0);
  const scale = mapClamp(p, 0.3, 0.58, 0.94, 1);
  const quoteBlur = mapClamp(p, 0.36, 0.62, 12, 0);
  // risposta: appare dopo che la quote è a fuoco
  const ansOp = mapClamp(p, 0.66, 0.86, 0, 1);
  const ansBlur = mapClamp(p, 0.66, 0.86, 6, 0);

  return (
    <section
      ref={sectionRef}
      id="posizionamento"
      aria-label="Perché BORU"
      // sezione trasparente; marginTop negativo per sovrapporsi alla coda della sezione Dati
      className="relative w-full"
      style={{ height: reduce ? "auto" : "230vh", marginTop: reduce ? undefined : "-100vh" }}
    >
      <div
        className={
          reduce
            ? "relative flex w-full items-center justify-center px-6 py-28"
            : "sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6"
        }
      >
        {/* iride: cerchio che si espande dal centro a coprire lo schermo */}
        {!reduce && (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: veilColor,
              clipPath: `circle(${veilR}% at 50% 50%)`,
              willChange: "clip-path",
            }}
          />
        )}

        <div
          className="relative w-full max-w-3xl px-8 py-14 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)] md:px-16 md:py-20"
          style={{
            background: "var(--porcellana)",
            borderRadius: "20px",
            opacity: sceneOp,
            transform: `translateY(${sceneY}px) scale(${scale})`,
            willChange: "transform, opacity",
          }}
        >
          {/* tacche d'angolo rosa */}
          <span className="absolute left-5 top-5 size-7 border-l-2 border-t-2 sm:size-9" style={{ borderColor: ACCENT_2 }} />
          <span className="absolute right-5 top-5 size-7 border-r-2 border-t-2 sm:size-9" style={{ borderColor: ACCENT_2 }} />
          <span className="absolute bottom-5 left-5 size-7 border-b-2 border-l-2 sm:size-9" style={{ borderColor: ACCENT_2 }} />
          <span className="absolute bottom-5 right-5 size-7 border-b-2 border-r-2 sm:size-9" style={{ borderColor: ACCENT_2 }} />

          {/* virgoletta */}
          <span
            aria-hidden="true"
            className="block select-none font-serif text-7xl leading-none md:text-8xl"
            style={{ color: "color-mix(in oklab, var(--rosa) 50%, transparent)" }}
          >
            “
          </span>

          {/* quote: l'obiezione che sentiamo sempre — sfumata → nitida */}
          <blockquote
            className="-mt-4 max-w-2xl text-balance text-2xl font-light leading-[1.25] tracking-tight text-panel-foreground md:text-4xl"
            style={{ filter: `blur(${quoteBlur}px)` }}
          >
            Abbiamo già provato uno strumento del genere. Dopo qualche settimana era mezzo
            abbandonato.
          </blockquote>

          {/* risposta: appare dopo */}
          <div style={{ opacity: ansOp, filter: `blur(${ansBlur}px)` }}>
            <span className="my-8 block h-px w-12" style={{ background: ACCENT_2 }} />
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-panel-muted">
              BORU studio
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-panel-muted">
              Non è andata male perché hai fatto qualcosa di sbagliato: quello strumento era fatto
              per un'azienda generica, non per la tua. Noi funzioniamo al contrario: entriamo nel
              tuo processo così com'è, e costruiamo il sistema intorno a lui.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { UspQuote };
