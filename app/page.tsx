import {
  ArrowRight,
  CalendarClock,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  Mic2,
  Radio,
  Users,
  X,
} from "lucide-react";

const services = [
  {
    icon: Mic2,
    title: "Host & presentator",
    text: "Professioneel, energiek en scherp. Rens presenteert jouw event met stijl en impact.",
    price: "€ 1.250",
  },
  {
    icon: Radio,
    title: "Dagvoorzitter",
    text: "Richting, overzicht en verbinding. Rens leidt het programma en brengt het samen.",
    price: "€ 1.750",
  },
  {
    icon: Users,
    title: "Activatie & entertainment",
    text: "Interactief, verrassend en op maat. Rens activeert jouw publiek en zet de energie in beweging.",
    price: "€ 750",
  },
  {
    icon: Lightbulb,
    title: "Keynote / inspiratiesessie",
    text: "Inhoud met energie en verhalen die bijblijven. Inspirerend en met een duidelijke boodschap.",
    price: "€ 1.250",
  },
];

const navItems = [
  ["Over Rens", "#over-rens"],
  ["Aanbod", "#aanbod"],
  ["Showreel", "#showreel"],
  ["Referenties", "#referenties"],
  ["Inspiratie", "#inspiratie"],
  ["Contact", "#contact"],
];

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a className={`logo ${inverted ? "logo--inverted" : ""}`} href="#top" aria-label="Renergy Movement, naar boven">
      <span>RENERGY</span>
      <small>MOVEMENT</small>
    </a>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="shell header-inner">
          <Logo />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-name">Rens van Zoelen</span>

          <nav className="desktop-nav" aria-label="Hoofdnavigatie">
            {navItems.map(([label, href]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </nav>

          <a className="button button--solid header-cta" href="#contact">Boek Rens</a>

          <details className="mobile-nav">
            <summary aria-label="Menu openen"><Menu size={24} /></summary>
            <div className="mobile-nav-panel">
              <div className="mobile-nav-top"><Logo /><X size={22} /></div>
              {navItems.map(([label, href]) => (
                <a href={href} key={href}>{label}<ArrowRight size={17} /></a>
              ))}
              <a className="button button--solid" href="#contact">Boek Rens</a>
            </div>
          </details>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-mark" aria-hidden="true">R</div>
        <div className="shell hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Rens brengt<br />mensen in beweging<span>.</span></h1>
            <p className="hero-role">Host <i>•</i> Presentator <i>•</i> Dagvoorzitter <i>•</i> Spreker</p>
            <p className="hero-intro">
              Rens maakt contact. Laat energie stromen.<br />
              Zorgt voor interactie en richting.<br />
              En brengt jouw programma tot leven.
            </p>
            <div className="hero-actions">
              <a className="button button--solid" href="#contact">Boek Rens</a>
              <a className="button button--outline" href="#showreel">Bekijk showreel <ArrowRight size={17} /></a>
            </div>
          </div>

          <div className="hero-photo" aria-label="Rens van Zoelen presenteert op het podium">
            <img src="/rens-cutout.png" alt="Rens van Zoelen tijdens een presentatie" />
            <div className="hero-photo-fade" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="promise" id="over-rens">
        <div className="shell promise-inner">
          <div className="round-icon"><Users aria-hidden="true" /></div>
          <div className="promise-line" aria-hidden="true" />
          <div>
            <h2>Van publiek naar deelnemers.</h2>
            <p>Geen monologen, maar momenten die raken. Rens creëert de verbinding tussen podium en zaal, zodat iedereen meedoet, meedenkt en in beweging komt.</p>
          </div>
        </div>
      </section>

      <section className="services section" id="aanbod" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Waar Rens het verschil maakt</p>
            <h2 id="services-title">Hiervoor boek je Rens</h2>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, text, price }) => (
              <article className="service-card" key={title}>
                <div className="service-icon"><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="service-price"><small>vanaf</small><strong>{price}</strong></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto" id="referenties">
        <span className="anchor-target" id="inspiratie" aria-hidden="true" />
        <div className="shell manifesto-grid">
          <article>
            <div className="round-icon"><Mic2 aria-hidden="true" /></div>
            <div><h2>Een microfoon is maar een instrument.</h2><p>Het gaat niet om zenden, maar om verbinden. Om luisteren, aanvoelen en schakelen.</p></div>
          </article>
          <div className="monogram" aria-hidden="true">R</div>
          <article>
            <div><h2>Mensen bewegen niet omdat je harder praat.</h2><p>Maar omdat je ze raakt, uitdaagt en meeneemt. Dat is waar Renergy Movement voor staat.</p></div>
            <div className="round-icon"><Radio aria-hidden="true" /></div>
          </article>
        </div>
      </section>

      <section className="event-band" id="showreel">
        <div className="event-band-photo" aria-hidden="true">
          <img src="/rens-stage-banner.png" alt="" />
        </div>
        <div className="event-band-copy">
          <h2>Wat moet er in jouw zaal gebeuren?</h2>
          <p>Vertel Rens over je event, doelen en doelgroep.<br />Dan denkt hij met je mee over de impact die jullie samen kunnen maken.</p>
          <a className="text-link" href="#contact">Laten we kennismaken <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-band">
          <div className="shell contact-grid">
            <div className="contact-details">
              <div className="round-icon round-icon--light"><MessageCircle aria-hidden="true" /></div>
              <h3>Laten we kennismaken.</h3>
              <p>Een goed gesprek is de eerste stap naar een event dat blijft hangen.</p>
              <a href="mailto:rens@renergymovement.nl"><Mail size={17} /> rens@renergymovement.nl</a>
            </div>

            <form className="contact-form" action="mailto:rens@renergymovement.nl" method="post" encType="text/plain">
              <label><span>Naam *</span><input required name="naam" placeholder="Naam *" /></label>
              <label><span>E-mailadres *</span><input required type="email" name="email" placeholder="E-mailadres *" /></label>
              <label><span>Bedrijf / organisatie</span><input name="organisatie" placeholder="Bedrijf / organisatie" /></label>
              <label><span>Telefoonnummer</span><input type="tel" name="telefoon" placeholder="Telefoonnummer" /></label>
              <label className="form-wide"><span>Vertel kort over jouw event en doelen *</span><textarea required name="vraag" placeholder="Vertel kort over jouw event en doelen *" /></label>
              <button className="button button--solid" type="submit">Verstuur aanvraag <ArrowRight size={17} /></button>
            </form>

            <aside className="appointment-card">
              <div className="service-icon"><CalendarClock aria-hidden="true" /></div>
              <h3>Snel schakelen?</h3>
              <p>Plan direct een afspraak in via mijn agenda.</p>
              <a className="button button--outline" href="mailto:rens@renergymovement.nl?subject=Afspraak%20inplannen">Plan afspraak</a>
            </aside>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <Logo inverted />
          <p>Contact maakt energie. Energie brengt beweging. Beweging maakt impact.</p>
          <div className="socials">
            <a href="#contact" aria-label="LinkedIn">in</a>
            <a href="#contact" aria-label="Instagram">ig</a>
            <a href="#contact" aria-label="YouTube">▶</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
