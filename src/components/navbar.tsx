import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import logoBianco from "@/assets/logo-bianco.png";
import { BOOKING_URL } from "@/components/ui/scroll-expand-hero";

const LINKS = [
  { label: "Chi siamo", href: "#chi-siamo" },
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Cosa automatizziamo", href: "#automatizziamo" },
  { label: "Contatti", href: "#contatti" },
];

/** Navbar fissa: trasparente in cima, nero sfumato dopo il primo scroll. */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "color-mix(in oklab, var(--nero) 85%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Principale">
        <a href="#top" className="flex items-center" aria-label="BORU studio, torna su">
          <img src={logoBianco} alt="BORU studio" className="h-9 w-auto select-none" draggable={false} />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-opacity duration-200 hover:opacity-85"
          style={{ background: "var(--azzurro)", color: "var(--nero)" }}
        >
          Parliamo del tuo processo
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

export { Navbar };
