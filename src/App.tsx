import { Navbar } from "@/components/navbar";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { ScrollExpandHero } from "@/components/ui/scroll-expand-hero";
import {
  Dati,
  Usp,
  Posizionamento,
  Manifesto,
  Automatizziamo,
  StrumentiAI,
  ComeFunziona,
  ChiSiamo,
  Contatto,
} from "@/components/sections";

function App() {
  return (
    <main id="top">
      <Navbar />
      <ScrollExpandHero />
      <Dati />
      <Usp />
      <Posizionamento />
      <Manifesto />
      <Automatizziamo />
      <StrumentiAI />
      <ComeFunziona />
      <ChiSiamo />
      <Contatto />
      <CookieBanner />
    </main>
  );
}

export default App;
