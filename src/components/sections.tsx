import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  FileSpreadsheet,
  FileText,
  ListChecks,
  Mail,
  MessageCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { PillarsCarousel } from "@/components/ui/pillars-carousel";
import { BOOKING_URL } from "@/components/ui/scroll-expand-hero";
import logoBianco from "@/assets/logo-bianco.png";

// Sezione Dati: numeri scroll-driven uno alla volta (componente dedicato)
export { ScrollStepMetrics as Dati } from "@/components/ui/scroll-step-metrics";
// Sezione USP/posizionamento: obiezione → risposta in card porcellana (componente dedicato)
export { UspQuote as Usp } from "@/components/ui/usp-quote";

// parole accese nei TextReveal su fondo nero
const LIT = "var(--foreground)";
const LIT_ACCENT = "var(--azzurro)";
// parole "spente" su fondo nero: porcellana molto attenuata
const DIM = "color-mix(in oklab, var(--porcellana) 24%, transparent)";

/* ===================== POSIZIONAMENTO (dopo la card USP) ===================== */
export function Posizionamento() {
  return (
    <section className="w-full border-t border-border bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-balance font-title text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl">
            Non un software.
            <br />
            Uno{" "}
            <span className="script-accent" style={{ color: "var(--rosa)" }}>
              studio.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Non ti chiediamo di imparare una nuova piattaforma. Non cambiamo gli strumenti che usi
            già. Non formiamo il tuo team su nuovi metodi. Entriamo nella tua azienda, capiamo
            esattamente come lavori: le eccezioni, le abitudini, le cose che sembrano strane ma
            che hanno sempre un motivo. E costruiamo un'automazione che funziona dentro quella
            realtà.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Il risultato lo senti, non lo vedi. Il lavoro che qualcuno faceva a mano smette di
            essere fatto a mano. I dati si aggiornano da soli. Le email partono al momento giusto.
            I clienti ricevono risposta anche quando sei fuori ufficio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ MANIFESTO (frase che si accende parola per parola) ============ */
export function Manifesto() {
  return (
    <section className="w-full bg-background">
      <TextReveal
        heightVh={170}
        heightVhMobile={150}
        stickyVh={100}
        dimColor={DIM}
        segments={[
          { text: "Il problema non è la tecnologia.", litColor: LIT },
          { text: "È che nessuno ha ancora costruito", litColor: LIT },
          { text: "la soluzione giusta per il tuo processo.", litColor: LIT_ACCENT },
        ]}
        className="mx-auto max-w-4xl justify-center text-center font-title font-semibold"
      />
    </section>
  );
}

/* ===================== COSA AUTOMATIZZIAMO (carosello) ===================== */
const PROCESSI = [
  {
    n: "01",
    title: "Richieste e contatti in entrata",
    text: "Email, WhatsApp, form sul sito: ogni richiesta viene classificata, registrata e smistata in automatico, e la prima risposta parte da sola, personalizzata, nel giro di secondi.",
  },
  {
    n: "02",
    title: "Fogli, report e dashboard",
    text: "Il report del lunedì compilato da tre fonti diverse, il foglio condiviso che nessuno tiene in ordine: quasi sempre automatizzabili al 100%, senza che nessuno faccia niente di diverso.",
  },
  {
    n: "03",
    title: "Follow-up e comunicazioni ricorrenti",
    text: "Promemoria sui preventivi, conferme d'ordine, avvisi di spedizione, messaggi di benvenuto: partono al momento giusto, con il tono giusto, senza che nessuno debba ricordarsene.",
  },
  {
    n: "04",
    title: "Sincronizzazione tra strumenti",
    text: "Ogni volta che le informazioni vivono in posti diversi (CRM, Notion, Google Sheets) e qualcuno le tiene allineate a mano, c'è un'automazione possibile.",
  },
];

export function Automatizziamo() {
  return (
    <>
      <section
        id="automatizziamo"
        className="w-full border-t border-border bg-background px-6 pt-28 md:pt-36"
      >
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p
              className="mb-4 font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--azzurro)" }}
            >
              cosa automatizziamo
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-balance font-title text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl">
              Cosa possiamo automatizzare nella tua azienda
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Non esiste una lista fissa. Ogni azienda è diversa, e la prima cosa che facciamo è
              capire dove si perde davvero tempo nella tua realtà specifica. Detto questo, ci sono
              processi che troviamo quasi ovunque, e probabilmente ne riconosci almeno uno.
            </p>
          </Reveal>
        </div>
      </section>

      <PillarsCarousel
        pillars={PROCESSI}
        watermark="processi"
        eyebrow="cosa automatizziamo"
        staticTitle="I processi che troviamo quasi ovunque."
      />

      <section className="w-full bg-background px-6 pb-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-base italic leading-relaxed text-muted-foreground">
            Questi sono solo esempi. Il processo che ti costa più tempo potrebbe essere
            completamente diverso. E probabilmente è quello di cui non hai mai parlato con
            nessuno, perché «si è sempre fatto così».
          </p>
        </Reveal>
      </section>
    </>
  );
}

/* ========================= STRUMENTI E AI ========================= */
const STRUMENTI = [
  {
    icon: Mail,
    title: "Gmail e Google Workspace",
    text: "La posta è spesso il centro di tutto, e la principale fonte di lavoro manuale. Classifichiamo le email in arrivo, estraiamo le informazioni, attiviamo risposte automatiche, aggiorniamo gli altri sistemi. Tutto senza uscire da Gmail.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business",
    text: "Per molte PMI italiane è il canale principale con i clienti. Lo integriamo nei flussi: risposte immediate alle domande ricorrenti, notifiche mirate, conferme automatiche, follow-up programmati, anche quando sei fuori ufficio.",
  },
  {
    icon: FileSpreadsheet,
    title: "Google Sheets e Notion",
    text: "Fogli e database raccolgono quasi tutti i dati aziendali. Li colleghiamo agli altri strumenti perché si aggiornino da soli: un ordine arriva, il foglio si aggiorna; un cliente risponde, il database cambia stato.",
  },
  {
    icon: ListChecks,
    title: "Trello e gestione del team",
    text: "Quando i processi coinvolgono il team, li integriamo nel flusso: una richiesta in entrata crea un task, un task completato avvisa il cliente, una scadenza superata genera un alert. Senza che nessuno debba ricordarsene.",
  },
];

const AI_ESEMPI = [
  {
    icon: MessageSquare,
    title: "Capire il contenuto di un messaggio",
    text: "L'AI legge email e messaggi WhatsApp e capisce di cosa si tratta (preventivo, reclamo, domanda, conferma) per smistarli alla persona giusta o attivare la risposta corretta.",
  },
  {
    icon: Sparkles,
    title: "Scrivere risposte personalizzate",
    text: "Genera risposte su misura basate sui dati reali del cliente: nome, storico ordini, prodotto. Non un template generico, ma un messaggio che sembra scritto da una persona.",
  },
  {
    icon: FileText,
    title: "Estrarre informazioni dai documenti",
    text: "Preventivi, ordini, allegati: l'AI legge il documento, estrae importi, prodotti, date e riferimenti, e li inserisce nel tuo sistema. Nessun PDF da aprire e ricopiare a mano.",
  },
  {
    icon: Bot,
    title: "Rispondere alle domande ricorrenti",
    text: "Orari, prodotti, tempi di consegna, pagamenti: l'AI impara le risposte corrette e le fornisce 24 ore su 24, col tono della tua azienda. Le domande complesse passano a una persona reale.",
  },
];

export function StrumentiAI() {
  return (
    <section className="w-full border-t border-border bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--azzurro)" }}
          >
            strumenti
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-2xl text-balance font-title text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl">
            Gli strumenti che usiamo, e perché
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Un principio semplice: non introduciamo strumenti nuovi se non è necessario. Lavoriamo
            su quello che hai già, e lo facciamo parlare con se stesso.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {STRUMENTI.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={0.05 * i}>
                <div className="h-full rounded-2xl border border-border bg-foreground/[0.03] p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40">
                  <Icon className="size-6" aria-hidden="true" style={{ color: "var(--azzurro)" }} />
                  <h3 className="mt-5 font-title text-lg font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── AI ── */}
        <div className="mt-28">
          <Reveal>
            <p
              className="mb-4 font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--rosa)" }}
            >
              intelligenza artificiale
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="max-w-2xl text-balance font-title text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-4xl">
              Cosa fa davvero l'AI per la tua azienda
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              L'AI è una parola che si sente ovunque, spesso senza capire cosa significa
              concretamente. Noi la usiamo in punti precisi dei flussi, dove aggiunge valore reale:
              non come tecnologia di moda, ma come strumento che risolve problemi concreti.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {AI_ESEMPI.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={0.05 * i}>
                  <div className="h-full rounded-2xl border border-border bg-foreground/[0.03] p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent-2/40">
                    <Icon className="size-6" aria-hidden="true" style={{ color: "var(--rosa)" }} />
                    <h3 className="mt-5 font-title text-lg font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-base italic leading-relaxed text-muted-foreground">
              Una cosa importante: l'AI che integriamo non prende decisioni al posto tuo. Gestisce
              il lavoro ripetitivo e prevedibile. Per tutto il resto, sei sempre tu a decidere.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================= COME FUNZIONA ========================= */
const PASSI = [
  {
    n: "01",
    title: "Ci racconti come lavori: 30 minuti",
    text: "Una chiamata, senza presentazioni commerciali e senza pitch. Ti facciamo domande sul tuo modo di lavorare: quali strumenti usi, come arrivano le richieste, dove si crea più attrito. In 30 minuti riusciamo quasi sempre a identificare uno o più processi che potrebbero girare da soli. Se non vediamo nulla di reale da automatizzare, te lo diciamo subito.",
  },
  {
    n: "02",
    title: "Costruiamo il sistema intorno al tuo processo",
    text: "Progettiamo l'automazione sul processo specifico che abbiamo identificato insieme, usando gli strumenti che hai già. Ci occupiamo di tutto: configurazione, integrazione, test, messa in funzione. Tu non devi fare niente di diverso: il sistema si adatta al tuo modo di lavorare, non il contrario.",
  },
  {
    n: "03",
    title: "Vedi quanto tempo hai recuperato",
    text: "Quando il sistema è in funzione, iniziamo a misurare: quante ore risparmiate, quante richieste gestite in automatico, quanto valore generato. Mettiamo i numeri sul tavolo prima di qualsiasi altra conversazione. Da lì, sei tu a decidere se e come andare avanti.",
  },
];


/* Linea verticale che si "riempie" in azzurro mentre scorri i tre passi.
   Stesso spirito delle altre animazioni: scroll-driven, leggera, niente librerie. */
function StepsProgressLine({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return;
    }
    let raf = 0;
    let last = -1;
    const tick = () => {
      const el = targetRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 quando il blocco entra dal basso, 1 quando il fondo supera il centro schermo
        const v = Math.min(Math.max((vh * 0.78 - r.top) / (r.height + vh * 0.1), 0), 1);
        if (Math.abs(v - last) > 0.002) {
          last = v;
          setP(v);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetRef]);

  return (
    <span aria-hidden="true" className="absolute -left-6 top-0 hidden h-full w-px bg-border md:block lg:-left-10">
      <span
        className="block w-px"
        style={{ height: `${p * 100}%`, background: "var(--azzurro)" }}
      />
    </span>
  );
}

export function ComeFunziona() {
  const stepsRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id="come-funziona"
      className="w-full border-t border-border bg-background px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--azzurro)" }}
          >
            come funziona
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-2xl text-balance font-title text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl">
            Tre passi. Nessuna complessità{" "}
            <span className="script-accent" style={{ color: "var(--azzurro)" }}>
              a carico tuo.
            </span>
          </h2>
        </Reveal>

        <div ref={stepsRef} className="relative mt-16 border-t border-border">
          <StepsProgressLine targetRef={stepsRef} />
          {PASSI.map((p, i) => (
            <Reveal key={p.n} delay={0.06 * i}>
              <div className="grid grid-cols-1 gap-4 border-b border-border py-10 md:grid-cols-[120px_1fr] md:gap-10">
                <span
                  className="font-title text-5xl font-semibold tracking-tight md:text-6xl"
                  style={{ color: "var(--azzurro)" }}
                >
                  {p.n}
                </span>
                <div>
                  <h3 className="font-title text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base italic leading-relaxed text-muted-foreground">
            Non chiediamo impegni prima di aver capito se possiamo davvero aiutarti. E se dopo aver
            visto i numeri decidi che non fa per te, nessun problema.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================= CHI SIAMO ========================= */
const TEAM = [
  {
    name: "Carlotta",
    accent: "var(--rosa)",
    role: "Capire, prima di tutto il resto",
    text: "Entra nelle aziende, fa le domande giuste, e individua dove si nasconde il lavoro che nessuno dovrebbe fare. Si assicura che quello che costruiamo sia davvero la soluzione giusta, non una soluzione generica applicata al problema sbagliato.",
  },
  {
    name: "Filippo",
    accent: "var(--azzurro)",
    role: "Progettare e costruire",
    text: "Traduce in sistemi funzionanti quello che Carlotta ha capito. Conosce gli strumenti, sa come farli parlare tra loro, e sa quando vale la pena introdurne uno nuovo e quando è meglio usare quello che c'è già.",
  },
];

export function ChiSiamo() {
  return (
    <section
      id="chi-siamo"
      className="w-full border-t border-border bg-background px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--rosa)" }}
          >
            chi siamo
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-2xl text-balance font-title text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl">
            Siamo in due. E il metodo è sempre lo stesso.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Non siamo una software house. Non abbiamo un prodotto da vendere, né licenze o
            abbonamenti su cui guadagnare. Guadagniamo quando costruiamo qualcosa che funziona per
            te, e solo allora. Ogni azienda è diversa; quello che rimane uguale è il metodo: prima
            capiamo, poi costruiamo. Mai il contrario.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-border bg-foreground/[0.03] p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent-2/40 md:p-10">
                <span
                  className="block select-none text-5xl md:text-6xl"
                  style={{ color: m.accent, fontFamily: "var(--font-script)" }}
                >
                  {m.name}
                </span>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {m.role}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CTA FINALE + FOOTER ===================== */
export function Contatto() {
  return (
    <>
      <section
        id="contatti"
        className="w-full border-t border-border bg-background px-6 py-32 text-center md:py-44"
      >
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="text-balance font-title text-3xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl">
              Scopri quanto tempo stai lasciando{" "}
              <span className="script-accent" style={{ color: "var(--rosa)" }}>
                sul tavolo.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Raccontaci come lavora la tua azienda. In 30 minuti capiamo insieme dove si perde più
              tempo, se c'è qualcosa di reale da automatizzare, e cosa potrebbe cambiare
              concretamente. Nessuna presentazione commerciale: solo una conversazione tra
              persone.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition-opacity duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                style={{ background: "var(--azzurro)", color: "var(--nero)" }}
              >
                <CalendarClock className="size-[18px]" aria-hidden="true" />
                Parliamo del tuo processo
              </a>
              <a
                href="mailto:info@borustudio.it"
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Scrivici una mail
                <ArrowRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              prima capiamo · poi, se ha senso, costruiamo
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="w-full border-t border-border bg-background px-6 py-14">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <img
              src={logoBianco}
              alt="BORU studio"
              className="h-14 w-auto select-none md:h-16"
              draggable={false}
            />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Automazioni su misura per PMI italiane.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground md:items-end">
            <a href="mailto:info@borustudio.it" className="transition-colors hover:text-accent">
              info@borustudio.it
            </a>
            <div className="flex gap-4">
              <a href="/privacy.html" className="transition-colors hover:text-accent">
                Privacy policy
              </a>
              <a href="/cookie.html" className="transition-colors hover:text-accent">
                Cookie policy
              </a>
            </div>
            <span>© {new Date().getFullYear()} BORU studio</span>
          </div>
        </div>
      </footer>
    </>
  );
}
