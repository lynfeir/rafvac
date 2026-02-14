"use client";

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'tax', label: 'Tax Credits' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' }
];

const FIELD_STAMPS = [
  { src: '/images/local/imgi_23_595404525_122154048200897686_7151091918610385901_n.jpg', caption: 'Residential Visit' },
  { src: '/images/local/imgi_24_596608446_122154048188897686_3471748259318091153_n.jpg', caption: 'On-Site Check-In' },
  { src: '/images/local/imgi_28_565205968_122144084012897686_5697827625839607022_n.jpg', caption: 'Service Vehicle' },
  { src: '/images/local/imgi_29_558201079_122140511198897686_2331855388453425549_n.jpg', caption: 'Field Technician' },
  { src: '/images/local/imgi_30_557730900_122140511234897686_8514009451106420401_n.jpg', caption: 'Community Call' },
  { src: '/images/local/imgi_32_558904393_122140510952897686_8388217689267748547_n.jpg', caption: 'Install Team' },
  { src: '/images/local/imgi_38_523926711_122124731270897686_8345075471203538065_n.jpg', caption: 'Roofline Routing' },
  { src: '/images/local/imgi_40_524178895_122124728768897686_1246714580019802187_n.jpg', caption: 'Condenser Detail' },
  { src: '/images/local/imgi_41_524710684_122124728726897686_483163237522396746_n.jpg', caption: 'Commissioning' },
  { src: '/images/local/imgi_43_524768753_122124724820897686_6771551512095464926_n.jpg', caption: 'Ductless Setup' },
  { src: '/images/local/imgi_45_513863427_122115246242897686_2395711174011811111_n.jpg', caption: 'Copper Detail' },
  { src: '/images/local/imgi_46_510376369_122115246230897686_2642132012650383091_n.jpg', caption: 'Repair Work' },
  { src: '/images/local/imgi_48_509555752_122112849236897686_4334518986854806436_n.jpg', caption: 'Diagnostics' },
  { src: '/images/local/imgi_51_502411681_122095468268897686_8973171054261206247_n.jpg', caption: 'RAFVAC Mark', logo: true }
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const value = maxScroll > 0 ? Math.min((window.scrollY / maxScroll) * 100, 100) : 0;
      setProgress(value);
      setScrolled(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal-up'));
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -36px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 920) setMobileOpen(false);
    };
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-shell">
          <a href="#home" className="brand" onClick={closeMenu}>
            <img
              src="/images/local/ravac_solutions_4k_transparent_trimmed_tight.png"
              alt="RAFVAC Solutions logo"
              className="brand-logo"
            />
            <span className="brand-word">RAFVAC Solutions</span>
          </a>

          <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="tel:8145406634" className="nav-cta" onClick={closeMenu}>
                Call (814) 540-6634
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-cut hero-cut-a" />
            <div className="hero-cut hero-cut-b" />
            <div className="hero-grid" />
            <div className="hero-glow hero-glow-warm" />
            <div className="hero-glow hero-glow-cool" />
          </div>

          <div className="container hero-layout">
            <div className="hero-copy reveal-up">
              <span className="eyebrow">Central PA HVAC Repair + Installation</span>
              <h1>
                Thermal Cutline
                <span> Engineered Comfort for Real Buildings.</span>
              </h1>
              <p>
                RAFVAC Solutions serves homeowners and commercial facilities with precision diagnostics,
                high-efficiency upgrades, and emergency response that protects uptime.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Request Free Estimate
                </a>
                <a href="tel:8145406634" className="btn btn-ghost">
                  24/7 Emergency Call
                </a>
              </div>
            </div>

            <div className="hero-media reveal-up delay-1">
              <figure className="hero-main">
                <img
                  src="/images/local/imgi_63_524945430_122124726356897686_2541893704567338578_n.jpg"
                  alt="Installed mini-split outdoor condenser at Central PA home"
                />
                <figcaption>Installed Mini-Split System</figcaption>
              </figure>
              <div className="hero-stack">
                <figure>
                  <img src="/images/online/hvac-online-1.jpg" alt="HVAC technician at exterior unit with gauges" />
                </figure>
                <figure>
                  <img src="/images/local/mis.jpg" alt="Mitsubishi outdoor condenser during final check" />
                </figure>
              </div>
            </div>
          </div>

          <div className="container metric-strip reveal-up delay-2">
            <article>
              <strong>25+</strong>
              <span>Years in Business</span>
            </article>
            <article>
              <strong>24/7</strong>
              <span>Emergency Service</span>
            </article>
            <article>
              <strong>EPA</strong>
              <span>Certified Techs</span>
            </article>
            <article>
              <strong>Central PA</strong>
              <span>Residential + Commercial</span>
            </article>
          </div>
        </section>

        <section className="value" id="value">
          <div className="container">
            <header className="section-head reveal-up">
              <span className="tag">Brand-Fit Direction</span>
              <h2>Three Design Directions, One Chosen System</h2>
              <p>
                We selected a hybrid of direction A + C for your site build: bold geometry plus real field proof.
              </p>
            </header>

            <div className="direction-grid">
              <article className="direction-card reveal-up">
                <h3>A. Thermal Cutline</h3>
                <p>Diagonal pressure cuts, warm/cool seams, and HVAC-grade panel depth tied to RAFVAC wordmark rhythm.</p>
              </article>
              <article className="direction-card reveal-up delay-1">
                <h3>B. Pressure Chamber</h3>
                <p>Stacked contour frames and technical rail lines for a more restrained, engineering-first tone.</p>
              </article>
              <article className="direction-card reveal-up delay-2 chosen">
                <h3>C. Field Stamps Grid</h3>
                <p>Small framed proof tiles from real jobs. Used heavily so the brand feels real, local, and active.</p>
              </article>
            </div>

            <div className="value-grid">
              <article className="value-card reveal-up">
                <span className="mini-tag">Target Customers</span>
                <h3>Homeowners + Small Commercial Operators</h3>
                <p>People who need dependable comfort, predictable response times, and clean install quality.</p>
              </article>
              <article className="value-card reveal-up delay-1">
                <span className="mini-tag">Core Offers</span>
                <h3>Repair, Maintenance, Install, Efficiency Upgrades</h3>
                <p>Oil and gas systems, mini-splits, water heaters, diagnostics, and preventative plans.</p>
              </article>
              <article className="value-card reveal-up delay-2">
                <span className="mini-tag">Primary Goal</span>
                <h3>Drive Phone Calls + Estimate Requests</h3>
                <p>All layouts and shape framing funnel attention toward conversion CTAs and direct contact.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <header className="section-head reveal-up">
              <span className="tag">Services</span>
              <h2>Professional HVAC Services</h2>
            </header>

            <div className="service-grid">
              <article className="service-card reveal-up">
                <figure className="service-photo">
                  <img src="/images/local/imgi_4_598677848_1162250109444765_5473879423966936008_n.jpg" alt="Commercial rooftop HVAC system maintained by RAFVAC" />
                </figure>
                <h3>Preventative Maintenance</h3>
                <p>Reduce breakdown risk and extend equipment life with scheduled inspections and performance tuning.</p>
                <ul>
                  <li>Furnaces and boilers</li>
                  <li>Heat pumps and AC systems</li>
                  <li>Mini-splits and water heaters</li>
                </ul>
              </article>

              <article className="service-card featured reveal-up delay-1">
                <figure className="service-photo">
                  <img src="/images/online/hvac-online-2.jpg" alt="HVAC technician working on outdoor unit" />
                </figure>
                <h3>Expert HVAC Repair</h3>
                <p>Fast diagnostics with transparent options and same-day emergency support for critical failures.</p>
                <ul>
                  <li>Compressor and control issues</li>
                  <li>Electrical and refrigerant diagnostics</li>
                  <li>All major brands serviced</li>
                </ul>
              </article>

              <article className="service-card reveal-up delay-2">
                <figure className="service-photo">
                  <img src="/images/local/mis.jpg" alt="Installed high-efficiency Mitsubishi outdoor condenser" />
                </figure>
                <h3>System Installations</h3>
                <p>High-efficiency installs designed for reliable comfort and long-term operating savings.</p>
                <ul>
                  <li>Ductless mini-splits</li>
                  <li>Water heater replacements</li>
                  <li>Commercial rooftop upgrades</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="cleaning" id="cleaning">
          <div className="container cleaning-layout">
            <div className="cleaning-main reveal-up">
              <span className="tag">Cleaning + Inspection</span>
              <h2>Deep Cleaning That Improves Airflow and System Life</h2>
              <p>
                We clean, flush, and inspect mechanical components with documented checks so your equipment runs safer and longer.
              </p>
              <div className="cleaning-actions">
                <a href="tel:8145406634" className="btn btn-primary">
                  Call for Cleaning Pricing
                </a>
              </div>
            </div>

            <div className="cleaning-gallery reveal-up delay-1">
              <figure>
                <img src="/images/local/imgi_6_615362884_122162266070897686_1812282351626615261_n.jpg" alt="Water heater and piping after service" />
              </figure>
              <figure>
                <img src="/images/local/imgi_7_615235164_122162266100897686_8581776199215146964_n.jpg" alt="Serviced water heater install closeup" />
              </figure>
              <figure>
                <img src="/images/local/imgi_8_616433370_122162266088897686_262373477039378653_n.jpg" alt="Expansion tank and line detail during cleaning" />
              </figure>
              <figure>
                <img src="/images/local/imgi_9_616333523_122162266076897686_358265952645241313_n.jpg" alt="Completed water heater setup in utility room" />
              </figure>
            </div>
          </div>
        </section>

        <section className="tax" id="tax">
          <div className="container tax-layout">
            <div className="tax-copy reveal-up">
              <span className="tag">Tax Credits</span>
              <h2>Federal 25C Incentives Can Offset Upgrade Costs</h2>
              <p>
                Qualifying mini-splits and high-efficiency equipment can unlock major tax credit value while lowering energy spend.
              </p>
              <div className="tax-cta-row">
                <div className="tax-pill">
                  <strong>$2,000</strong>
                  <span>Mini-Split Heat Pumps</span>
                </div>
                <div className="tax-pill">
                  <strong>$600</strong>
                  <span>Water Heaters</span>
                </div>
                <div className="tax-pill">
                  <strong>30%</strong>
                  <span>Efficiency Improvements</span>
                </div>
              </div>
            </div>

            <div className="tax-visuals reveal-up delay-1">
              <figure>
                <img src="/images/online/hvac-online-3.jpg" alt="HVAC technician servicing indoor air conditioning system" />
              </figure>
              <figure>
                <img src="/images/online/hvac-online-4.jpg" alt="Technician checking HVAC interior component with gloves" />
              </figure>
            </div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="container">
            <header className="section-head reveal-up">
              <span className="tag">Field Proof</span>
              <h2>Real Work Gallery</h2>
              <p>Small format stamps keep low-res photos sharp while still showing real RAFVAC job activity.</p>
            </header>

            <div className="stamp-grid">
              {FIELD_STAMPS.map((stamp, index) => (
                <figure
                  className={`stamp reveal-up ${stamp.logo ? 'logo' : ''} ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}
                  key={stamp.src}
                >
                  <img src={stamp.src} alt={stamp.caption} loading="lazy" decoding="async" />
                  <figcaption>{stamp.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="container">
            <header className="section-head reveal-up">
              <span className="tag">Process</span>
              <h2>Precision Workflow From Call to Completion</h2>
            </header>

            <div className="process-grid">
              <article className="process-step reveal-up">
                <span>01</span>
                <h3>Inspect &amp; Diagnose</h3>
                <p>Performance checks, airflow review, and full issue mapping before recommendations.</p>
              </article>
              <article className="process-step reveal-up delay-1">
                <span>02</span>
                <h3>Scope &amp; Plan</h3>
                <p>Clear options, price transparency, and proper equipment sizing for your building profile.</p>
              </article>
              <article className="process-step reveal-up delay-2">
                <span>03</span>
                <h3>Execute &amp; Validate</h3>
                <p>Repair/install to code followed by operational verification and controls confirmation.</p>
              </article>
              <article className="process-step reveal-up">
                <span>04</span>
                <h3>Document &amp; Support</h3>
                <p>Maintenance guidance, warranty context, and tax-credit documentation where applicable.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-wrap reveal-up">
            <div>
              <span className="tag">Get In Touch</span>
              <h2>Need Fast HVAC Help in Central PA?</h2>
              <p>Call now for emergency service or request an estimate for maintenance, repair, or new equipment.</p>
            </div>
            <div className="contact-actions">
              <a href="tel:8145406634" className="btn btn-primary">
                Call (814) 540-6634
              </a>
              <a href="mailto:rafvacsolutions@gmail.com" className="btn btn-ghost">
                rafvacsolutions@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a href="#home" className="brand footer-brand">
              <img
                src="/images/local/ravac_solutions_4k_transparent_trimmed_tight.png"
                alt="RAFVAC Solutions logo"
                className="brand-logo"
              />
            </a>
            <p>Professional HVAC service for homes and commercial properties across Greater Central Pennsylvania.</p>
          </div>

          <div className="footer-links">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-meta">
            <span>Licensed &amp; Insured</span>
            <span>EPA Certified Technicians</span>
            <span>24/7 Emergency Response</span>
            <small>Online photos: Pexels (licensed for commercial use)</small>
          </div>
        </div>
      </footer>
    </>
  );
}
