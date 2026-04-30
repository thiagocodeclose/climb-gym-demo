// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --cl-bg: #1C1C1C;
    --cl-surface: #222222;
    --cl-card: #282828;
    --cl-primary: #FF8C00;
    --cl-primary-dim: rgba(255,140,0,0.12);
    --cl-text: #F0EDE8;
    --cl-muted: #888;
    --cl-stone: #B5A88F;
    --cl-border: rgba(255,140,0,0.18);
    --font-display: var(--font-oswald), 'Oswald', sans-serif;
    --font-body: var(--font-source), 'Source Sans 3', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--cl-bg); color: var(--cl-text); overflow-x: hidden; }

  /* NAV */
  .cl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 64px;
    transition: background 0.3s;
  }
  .cl-nav.scrolled { background: rgba(28,28,28,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--cl-border); }
  .cl-logo { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; letter-spacing: 0.08em; color: var(--cl-text); text-decoration: none; text-transform: uppercase; }
  .cl-logo span { color: var(--cl-primary); }
  .cl-nav-links { display: flex; gap: 2rem; list-style: none; }
  .cl-nav-links a { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--cl-muted); text-decoration: none; transition: color 0.2s; }
  .cl-nav-links a:hover { color: var(--cl-primary); }
  .cl-nav-cta { background: var(--cl-primary); color: #000; font-family: var(--font-display); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: none; padding: 0.65rem 1.5rem; cursor: pointer; transition: opacity 0.2s; }
  .cl-nav-cta:hover { opacity: 0.85; }

  /* HERO */
  .cl-hero {
    position: relative; min-height: 100vh; display: flex; align-items: flex-end;
    overflow: hidden;
  }
  .cl-hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1600&q=80') center/cover no-repeat;
  }
  .cl-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(28,28,28,0.95) 0%, rgba(28,28,28,0.55) 50%, rgba(28,28,28,0.2) 100%);
  }
  .cl-hero-content { position: relative; z-index: 2; padding: 4rem 2rem 5rem; max-width: 800px; }
  .cl-hero-eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--cl-primary); margin-bottom: 1rem; }
  .cl-hero-title { font-family: var(--font-display); font-size: clamp(3.5rem, 11vw, 8rem); font-weight: 700; letter-spacing: 0.04em; line-height: 0.9; text-transform: uppercase; color: var(--cl-text); margin-bottom: 1.5rem; }
  .cl-hero-title span { color: var(--cl-primary); }
  .cl-hero-sub { font-size: 1.05rem; font-weight: 300; color: rgba(240,237,232,0.75); line-height: 1.65; max-width: 480px; margin-bottom: 2.5rem; }
  .cl-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .cl-btn-primary { background: var(--cl-primary); color: #000; font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: none; padding: 1rem 2.5rem; cursor: pointer; transition: opacity 0.2s; }
  .cl-btn-primary:hover { opacity: 0.85; }
  .cl-btn-ghost { background: transparent; color: var(--cl-text); font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(240,237,232,0.3); padding: 1rem 2rem; cursor: pointer; transition: border-color 0.2s; }
  .cl-btn-ghost:hover { border-color: var(--cl-primary); color: var(--cl-primary); }

  /* STATS */
  .cl-stats { display: grid; grid-template-columns: repeat(4,1fr); background: var(--cl-primary); }
  .cl-stat { padding: 1.75rem 1.5rem; text-align: center; border-right: 1px solid rgba(0,0,0,0.12); }
  .cl-stat:last-child { border-right: none; }
  .cl-stat-value { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 700; color: #000; }
  .cl-stat-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(0,0,0,0.55); margin-top: 0.2rem; }

  /* SECTION */
  .cl-section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
  .cl-section-alt { background: var(--cl-surface); padding: 5rem 0; }
  .cl-section-alt-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .cl-eyebrow { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--cl-primary); margin-bottom: 0.6rem; }
  .cl-heading { font-family: var(--font-display); font-size: clamp(2rem, 5.5vw, 3.8rem); font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--cl-text); line-height: 1; margin-bottom: 0.75rem; }
  .cl-heading span { color: var(--cl-primary); }
  .cl-body { font-size: 1rem; font-weight: 300; color: rgba(240,237,232,0.6); line-height: 1.7; max-width: 500px; }

  /* WALLS */
  .cl-walls { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5px; margin-top: 3rem; background: var(--cl-border); border: 1px solid var(--cl-border); }
  .cl-wall { background: var(--cl-card); padding: 2.5rem 2rem; transition: background 0.25s; }
  .cl-wall:hover { background: #2f2f2f; }
  .cl-wall-icon { font-size: 2rem; margin-bottom: 1rem; }
  .cl-wall-header { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem; }
  .cl-wall-name { font-family: var(--font-display); font-size: 1.35rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cl-text); }
  .cl-wall-meta { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cl-primary); }
  .cl-wall-sub { font-size: 0.72rem; color: var(--cl-muted); margin-bottom: 0.75rem; }
  .cl-wall-desc { font-size: 0.88rem; font-weight: 300; color: rgba(240,237,232,0.55); line-height: 1.65; }

  /* PROGRAMS */
  .cl-programs { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .cl-prog { background: var(--cl-card); border: 1px solid var(--cl-border); padding: 2rem 1.75rem; transition: border-color 0.25s, transform 0.25s; }
  .cl-prog:hover { border-color: var(--cl-primary); transform: translateY(-3px); }
  .cl-prog-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cl-text); margin-bottom: 0.5rem; }
  .cl-prog-price { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: var(--cl-primary); margin-bottom: 0.5rem; }
  .cl-prog-details { font-size: 0.82rem; font-weight: 300; color: var(--cl-muted); line-height: 1.55; }

  /* PRICING */
  .cl-pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .cl-plan { border: 1px solid var(--cl-border); padding: 2.5rem 2rem; position: relative; transition: border-color 0.3s; }
  .cl-plan:hover { border-color: var(--cl-primary); }
  .cl-plan.featured { border-color: var(--cl-primary); }
  .cl-plan-badge { position: absolute; top: 0; right: 0; background: var(--cl-primary); color: #000; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.8rem; }
  .cl-plan-name { font-family: var(--font-display); font-size: 1.25rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cl-text); margin-bottom: 0.5rem; margin-top: 0.5rem; }
  .cl-plan-price { font-family: var(--font-display); font-size: 3.2rem; font-weight: 700; color: var(--cl-primary); line-height: 1; }
  .cl-plan-period { font-size: 0.8rem; color: var(--cl-muted); margin-bottom: 1.5rem; }
  .cl-plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
  .cl-plan-features li { font-size: 0.88rem; font-weight: 300; color: rgba(240,237,232,0.65); display: flex; gap: 0.5rem; }
  .cl-plan-features li::before { content: '→'; color: var(--cl-primary); }
  .cl-btn-plan { width: 100%; background: var(--cl-primary); color: #000; font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; border: none; padding: 0.9rem; cursor: pointer; transition: opacity 0.2s; }
  .cl-btn-plan:hover { opacity: 0.85; }
  .cl-btn-plan.outline { background: transparent; color: var(--cl-primary); border: 1px solid var(--cl-primary); }
  .cl-btn-plan.outline:hover { background: var(--cl-primary); color: #000; }

  /* CTA */
  .cl-cta { background: var(--cl-primary); padding: 5rem 2rem; text-align: center; }
  .cl-cta-title { font-family: var(--font-display); font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #000; line-height: 1; margin-bottom: 1.25rem; }
  .cl-cta-sub { font-size: 1.05rem; color: rgba(0,0,0,0.65); margin-bottom: 2.5rem; }
  .cl-btn-dark { background: #000; color: var(--cl-primary); font-family: var(--font-display); font-size: 0.88rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: none; padding: 1.1rem 3rem; cursor: pointer; transition: opacity 0.2s; }
  .cl-btn-dark:hover { opacity: 0.8; }

  /* FOOTER */
  .cl-footer { background: #111; padding: 3rem 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; border-top: 1px solid var(--cl-border); }
  .cl-footer-logo { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .cl-footer-logo span { color: var(--cl-primary); }
  .cl-footer-info { font-size: 0.8rem; color: var(--cl-muted); line-height: 1.65; margin-top: 0.4rem; }
  .cl-footer-copy { font-size: 0.75rem; color: rgba(136,136,136,0.4); }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    .cl-nav-links { display: none; }
    .cl-stats { grid-template-columns: repeat(2,1fr); }
    .cl-footer { flex-direction: column; text-align: center; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((e) => {
      e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('visible'); io.unobserve(x.target); } });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ClimbPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  const d = siteData;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{css}</style>

      <nav className={`cl-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="cl-logo">SUMMIT<span>.</span>CLIMB</a>
        <ul className="cl-nav-links">
          <li><a href="#walls">The Walls</a></li>
          <li><a href="#programs">Programs</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <button className="cl-nav-cta">Day Pass</button>
      </nav>

      {/* HERO */}
      <section className="cl-hero">
        <div className="cl-hero-bg" />
        <div className="cl-hero-overlay" />
        <div className="cl-hero-content">
          <p className="cl-hero-eyebrow">{d.gym.location} · Indoor Climbing</p>
          <h1 className="cl-hero-title">FIND<br />YOUR<br /><span>NEXT MOVE.</span></h1>
          <p className="cl-hero-sub">{d.gym.name} is Denver's most comprehensive climbing gym — 18,000 sq ft of walls, routes for every grade, and a community that's serious about sending.</p>
          <div className="cl-hero-actions">
            <button className="cl-btn-primary">Start Climbing</button>
            <button className="cl-btn-ghost">View the Walls</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="cl-stats">
        {d.stats.map((s) => (
          <div key={s.label} className="cl-stat">
            <div className="cl-stat-value">{s.value}</div>
            <div className="cl-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* WALLS */}
      <section className="cl-section" id="walls">
        <p className="cl-eyebrow reveal">The Facility</p>
        <h2 className="cl-heading reveal" style={{ transitionDelay: '0.1s' }}>SIX<br /><span>WALLS.</span></h2>
        <p className="cl-body reveal" style={{ transitionDelay: '0.2s' }}>Every style of climbing under one roof. Whether you're working a V0 or projecting V12 — there's wall for that.</p>
        <div className="cl-walls">
          {d.walls.map((w, i) => (
            <div key={w.name} className="cl-wall reveal" style={{ transitionDelay: `${0.07 * i}s` }}>
              <div className="cl-wall-icon">{w.icon}</div>
              <div className="cl-wall-header">
                <span className="cl-wall-name">{w.name}</span>
                <span className="cl-wall-meta">{w.height}</span>
              </div>
              <div className="cl-wall-sub">{w.area}</div>
              <p className="cl-wall-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <div className="cl-section-alt" id="programs">
        <div className="cl-section-alt-inner">
          <p className="cl-eyebrow reveal">Training</p>
          <h2 className="cl-heading reveal" style={{ transitionDelay: '0.1s' }}>CLASSES &<br /><span>COACHING</span></h2>
          <p className="cl-body reveal" style={{ transitionDelay: '0.2s' }}>Structured programs to accelerate your progression — regardless of where you're starting from.</p>
          <div className="cl-programs">
            {d.programs.map((p, i) => (
              <div key={p.name} className="cl-prog reveal" style={{ transitionDelay: `${0.1 * i}s` }}>
                <div className="cl-prog-name">{p.name}</div>
                <div className="cl-prog-price">{p.price}</div>
                <div className="cl-prog-details">{p.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section className="cl-section" id="pricing">
        <p className="cl-eyebrow reveal">Membership</p>
        <h2 className="cl-heading reveal" style={{ transitionDelay: '0.1s' }}>ACCESS<br /><span>PRICING</span></h2>
        <div className="cl-pricing">
          {d.pricing.map((p, i) => (
            <div key={p.name} className={`cl-plan reveal ${p.highlight ? 'featured' : ''}`} style={{ transitionDelay: `${0.1 * i}s` }}>
              {p.highlight && <div className="cl-plan-badge">Best Value</div>}
              <div className="cl-plan-name">{p.name}</div>
              <div className="cl-plan-price">{p.price}</div>
              <div className="cl-plan-period">{p.period}</div>
              <ul className="cl-plan-features">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button className={`cl-btn-plan ${p.highlight ? '' : 'outline'}`}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cl-cta">
        <h2 className="cl-cta-title">FIRST DAY<br />IS ON US.</h2>
        <p className="cl-cta-sub">Free day pass. Shoes included. No experience needed — just show up and start climbing.</p>
        <button className="cl-btn-dark">Claim Free Day Pass →</button>
      </div>

      {/* FOOTER */}
      <footer className="cl-footer">
        <div>
          <div className="cl-footer-logo">SUMMIT<span>.</span>CLIMB</div>
          <div className="cl-footer-info">{d.gym.address}<br />{d.gym.phone} · {d.gym.email}</div>
        </div>
        <div className="cl-footer-copy">© {new Date().getFullYear()} {d.gym.name}. Powered by Koriva.</div>
      </footer>
    </>
  );
}
