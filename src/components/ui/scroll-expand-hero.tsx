import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

// TODO: sostituisci con il link Calendly/Cal.com reale
const BOOKING_URL = "https://cal.com/boru-studio";

// helper: mappa v dall'intervallo [a,b] a [c,d], con clamp
const mapClamp = (v: number, a: number, b: number, c: number, d: number) => {
  if (b === a) return c;
  const t = Math.min(Math.max((v - a) / (b - a), 0), 1);
  return c + t * (d - c);
};

// easing: parte decisa e rallenta (movimento organico, non meccanico)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* Cornice: 4 tacche a "L" agli angoli, in azzurro brand.
   Colore inline per vincere sulla regola globale `* { border-color: var(--color-border) }`. */
function CornerFrame() {
  const az = { borderColor: "var(--azzurro)" };
  return (
    <>
      <span style={az} className="absolute left-5 top-5 size-8 border-l-2 border-t-2 sm:left-8 sm:top-8 sm:size-10" />
      <span style={az} className="absolute right-5 top-5 size-8 border-r-2 border-t-2 sm:right-8 sm:top-8 sm:size-10" />
      <span style={az} className="absolute bottom-5 left-5 size-8 border-b-2 border-l-2 sm:bottom-8 sm:left-8 sm:size-10" />
      <span style={az} className="absolute bottom-5 right-5 size-8 border-b-2 border-r-2 sm:bottom-8 sm:right-8 sm:size-10" />
    </>
  );
}

/* Titolo hero: due righe Poppins + chiusa in Breathing rosa (script del logo). */
function HeroTitle() {
  return (
    <h1
      className="pointer-events-auto font-title text-4xl font-semibold uppercase leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl"
      onMouseMove={(e) => {
        const lines = e.currentTarget.querySelectorAll<HTMLElement>(".title-spotlight");
        lines.forEach((el) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
          el.style.setProperty("--spot", "1");
        });
      }}
      onMouseLeave={(e) => {
        e.currentTarget
          .querySelectorAll<HTMLElement>(".title-spotlight")
          .forEach((el) => el.style.setProperty("--spot", "0"));
      }}
    >
      <span className="title-spotlight block" data-text="Basta fare il lavoro">
        Basta fare il lavoro
      </span>
      <span className="block">
        che potresti{" "}
        <span className="script-accent" style={{ color: "var(--rosa)" }}>
          non fare.
        </span>
      </span>
    </h1>
  );
}

/* Contenuto rivelato dentro il pannello porcellana: l'apertura della sezione "problema". */
function PanelContent() {
  return (
    <>
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-panel-muted">
        il problema
      </p>
      <h2 className="max-w-2xl text-balance font-title text-2xl font-semibold tracking-tight text-panel-foreground md:text-4xl">
        Quanto ti sta costando il lavoro manuale?
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-panel-muted md:text-lg">
        Non è una questione di efficienza. È una questione di tempo e di soldi che escono dalla
        tua azienda ogni giorno, in silenzio, senza che nessuno lo quantifichi davvero. Qualcuno
        copia i dati degli ordini da un'email a un foglio Excel. Qualcuno manda i preventivi a
        mano, uno per uno. Qualcuno risponde sempre alle stesse domande su WhatsApp.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-panel-muted md:text-lg">
        Non è colpa di nessuno. È lavoro che si è accumulato nel tempo, e che nel frattempo
        occupa ore che potrebbero andare da un'altra parte.
      </p>
      <div className="mt-8 flex items-center gap-3 text-panel-foreground">
        <ArrowDown className="size-4" aria-hidden="true" style={{ color: "var(--rosa)" }} />
        <span className="font-mono text-xs uppercase tracking-[0.18em]">
          continua · i numeri parlano da soli
        </span>
      </div>
    </>
  );
}

function ScrollExpandHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  const [vp, setVp] = useState({ w: 1280, h: 800, mobile: false });
  const [progress, setProgress] = useState(0);

  // reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // viewport
  useEffect(() => {
    const measure = () =>
      setVp({
        w: window.innerWidth,
        h: window.innerHeight,
        mobile: window.innerWidth < 768,
      });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // engine di scroll: evento `scroll` (immediato) + loop rAF (fluido)
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let lastP = -1;
    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
      const p = Math.min(Math.max((window.scrollY - top) / scrollable, 0), 1);
      if (Math.abs(p - lastP) > 0.001) {
        lastP = p;
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
  }, [reduce, vp.h]);

  if (reduce) return <StaticHero />;

  // ── valori derivati ──
  // FASE 1 (0 → 0.22): titolo protagonista. FASE 2 (0.3 → 1): il pannello PORCELLANA
  // si apre "a condotto" sul nero e rivela l'inizio della sezione problema.
  const startW = vp.mobile ? 260 : 340;
  const startH = vp.mobile ? 150 : 170;

  const introY =
    mapClamp(progress, 0, 0.18, vp.h * 0.06, 0) +
    mapClamp(progress, 0.2, 0.34, 0, -vp.h * 0.18);
  const introOpacity = mapClamp(progress, 0.2, 0.34, 1, 0);

  const panelEntryOpacity = easeOutCubic(mapClamp(progress, 0.22, 0.34, 0, 1));

  const wE = mapClamp(progress, 0.3, 0.5, 0, 1);
  const hE = mapClamp(progress, 0.4, 0.62, 0, 1);
  const panelW = startW + wE * (vp.w - startW);
  const panelH = startH + hE * (vp.h - startH);
  const panelRadius = mapClamp(progress, 0.52, 0.62, 18, 0);
  const expandEased = mapClamp(progress, 0.3, 0.62, 0, 1);

  const labelOpacity = mapClamp(progress, 0.4, 0.56, 1, 0);
  const frameOpacity = mapClamp(progress, 0.2, 0.32, 1, 0);
  const cueOpacity = mapClamp(progress, 0, 0.16, 1, 0);

  const contentOpacity = mapClamp(progress, 0.52, 0.72, 0, 1);
  const contentY = mapClamp(progress, 0.52, 0.78, 24, 0);

  return (
    <section
      ref={sectionRef}
      className="relative h-[260vh] w-full bg-background"
      aria-label="Introduzione BORU studio"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* griglia di sfondo azzurra tenue — sfuma quando il pannello riempie lo schermo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 1 - contentOpacity }}
        >
          <GridPattern
            width={48}
            height={48}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:radial-gradient(680px_circle_at_center,white,transparent)]",
              "fill-accent/[0.04] stroke-accent/15",
            )}
          />
        </div>

        {/* Cornice a tacche d'angolo */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            opacity: frameOpacity,
            visibility: frameOpacity <= 0.01 ? "hidden" : "visible",
          }}
        >
          <CornerFrame />
        </div>

        {/* Intro: logo + eyebrow + titolo + sottotitolo + CTA */}
        <div
          className="pointer-events-none absolute top-[16vh] z-20 flex max-w-4xl flex-col items-center px-6 text-center"
          style={{
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            visibility: introOpacity <= 0.01 ? "hidden" : "visible",
          }}
        >
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] sm:text-xs" style={{ color: "var(--azzurro)" }}>
            automazioni su misura per PMI italiane
          </p>
          <HeroTitle />
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ogni azienda ha processi che qualcuno esegue a mano ogni giorno, e che potrebbero
            girare da soli. Nessun nuovo gestionale. Nessuna formazione. Solo ore che torni a
            usare come vuoi.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              style={{ background: "var(--azzurro)", color: "var(--nero)" }}
            >
              Parliamo del tuo processo
              <ArrowRight className="size-[18px]" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            nessun impegno · nessuna installazione a tuo carico
          </p>
        </div>

        {/* Indicatore di scroll */}
        <div
          className="pointer-events-none absolute bottom-[7vh] z-20 flex flex-col items-center gap-3"
          style={{
            opacity: cueOpacity,
            visibility: cueOpacity <= 0.01 ? "hidden" : "visible",
          }}
        >
          <span
            className="h-10 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--azzurro))",
            }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            scorri
          </span>
        </div>

        {/* Pannello PORCELLANA che si espande sul nero = il tuo processo che si apre */}
        <div
          className="relative z-10 flex items-center justify-center overflow-hidden"
          style={{
            background: "var(--porcellana)",
            width: `${panelW}px`,
            height: `${panelH}px`,
            borderRadius: `${panelRadius}px`,
            opacity: panelEntryOpacity,
            boxShadow: `0 ${20 + expandEased * 60}px ${60 + expandEased * 100}px -40px rgba(252,250,246,${0.12 + expandEased * 0.1})`,
          }}
        >
          {/* fessura: linea rosa al centro (il "condotto") che si allarga col pannello */}
          <div className="absolute" style={{ opacity: labelOpacity }}>
            <span
              className="block h-px"
              style={{
                width: `${Math.max(panelW - 192, 48)}px`,
                background: "linear-gradient(to right, transparent, var(--rosa), transparent)",
              }}
            />
          </div>

          {/* contenuto rivelato (testo scuro su porcellana) */}
          <div
            className="flex max-h-full w-full max-w-4xl flex-col justify-center overflow-y-auto px-6 py-10 md:px-12"
            style={{
              opacity: contentOpacity,
              transform: `translateY(${contentY}px)`,
              pointerEvents: contentOpacity > 0.5 ? "auto" : "none",
            }}
          >
            <PanelContent />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Variante per prefers-reduced-motion: stesso contenuto, fermo. */
function StaticHero() {
  return (
    <>
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center">
        <CornerFrame />
        <GridPattern
          width={48}
          height={48}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(640px_circle_at_center,white,transparent)]",
            "fill-accent/[0.04] stroke-accent/15",
          )}
        />
        <div className="relative z-10 flex max-w-4xl flex-col items-center">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] sm:text-xs" style={{ color: "var(--azzurro)" }}>
            automazioni su misura per PMI italiane
          </p>
          <HeroTitle />
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ogni azienda ha processi che qualcuno esegue a mano ogni giorno, e che potrebbero
            girare da soli. Nessun nuovo gestionale. Nessuna formazione. Solo ore che torni a
            usare come vuoi.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition-colors duration-200"
              style={{ background: "var(--azzurro)", color: "var(--nero)" }}
            >
              Parliamo del tuo processo
              <ArrowRight className="size-[18px]" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            nessun impegno · nessuna installazione a tuo carico
          </p>
        </div>
      </section>

      {/* Il "problema" — stesso pannello porcellana, già aperto e fermo */}
      <section className="flex w-full items-center justify-center bg-background px-6 py-20">
        <div
          className="flex w-full max-w-4xl flex-col justify-center rounded-2xl px-6 py-12 md:px-12"
          style={{ background: "var(--porcellana)" }}
        >
          <PanelContent />
        </div>
      </section>
    </>
  );
}

export { ScrollExpandHero, BOOKING_URL };
