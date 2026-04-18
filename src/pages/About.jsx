import { useReveal } from '../hooks/useReveal';
import { Leaf, Award, Recycle } from 'lucide-react'; // Changed icons to standard lucide if used

export default function About() {
  useReveal();

  return (
    <div className="about-page page-enter">
      {/* ── PAGE HEADER ── */}
      <section className="page-title-bar">
        <div className="container">
          <span className="label">Our Story</span>
          <h1 className="page-title-bar__heading">Born in the clinic.<br/><em>Refined by science.</em></h1>
          <p className="page-title-bar__sub">
            Reflection began with a simple pursuit: to bring the transformative results of clinical treatments into the daily ritual of home skincare.
          </p>
        </div>
      </section>

      {/* ── CONTENT: SPLIT 1 ── */}
      <section className="premium-split-section container">
        <div className="premium-split-text reveal-on-scroll">
          <p className="section-eyebrow">The Origin</p>
          <h2 className="display-md">The gap we <em>saw.</em></h2>
          <p className="body-lg" style={{ marginBottom: '1.5rem', color: 'var(--gray-dark)' }}>
            For years in our clinic, we noticed a pattern. Clients were forced to choose between highly effective, clinical-grade products that lacked sensory appeal, or beautifully packaged "luxury" items that did little to change the skin structurally.
          </p>
          <p className="body-lg" style={{ color: 'var(--gray-dark)' }}>
            We wanted both. Formulations with the active percentages necessary to create real change, housed in a delivery system that feels like a daily indulgence. That's the essence of Reflection.
          </p>
        </div>
        
        <div className="premium-split-grid reveal-on-scroll stagger-2">
           <div className="premium-grid-img img-corner-1" style={{ backgroundImage: "url('/reflectio webp/face skin.webp')" }} />
           <div className="premium-grid-img img-corner-2 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/water on skin.webp')" }} />
           <div className="premium-grid-img img-corner-3 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/back.webp')" }} />
           <div className="premium-grid-img img-corner-4" style={{ backgroundImage: "url('/reflectio webp/inside water and hand.webp')" }} />
        </div>
      </section>

      {/* ── CONTENT: SPLIT 2 (REVERSED) ── */}
      <section className="premium-split-section container" style={{ paddingBottom: '10rem' }}>
        <div className="premium-split-grid reveal-on-scroll stagger-1">
           <div className="premium-grid-img img-corner-4" style={{ backgroundImage: "url('/reflectio webp/water on skin.webp')" }} />
           <div className="premium-grid-img img-corner-3 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/back.webp')" }} />
           <div className="premium-grid-img img-corner-2 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/Hand.webp')" }} />
           <div className="premium-grid-img img-corner-1" style={{ backgroundImage: "url('/reflectio webp/face skin.webp')" }} />
        </div>

        <div className="premium-split-text reveal-on-scroll stagger-2">
          <p className="section-eyebrow">The Process</p>
          <h2 className="display-md">Tested on <em>real skin</em>,<br/>not focus groups.</h2>
          <p className="body-lg" style={{ marginBottom: '1.5rem', color: 'var(--gray-dark)' }}>
            Every Reflection product goes through a rigorous development process that spans years, not months. We don't rely on trends. Instead, we look at the common issues we treat in the clinic every day.
          </p>
          <p className="body-lg" style={{ color: 'var(--gray-dark)' }}>
            Our active ingredients are selected based on peer-reviewed clinical data, and final formulas are tested on clinic clients before they reach our shelves. If it doesn't deliver in the treatment room, it doesn't get made.
          </p>
        </div>
      </section>

      {/* ── VALUES STRIP ── */}
      <section className="validation-strip" style={{ background: 'var(--black-soft)', color: 'var(--white)', border: 'none', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <span className="label" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'block' }}>Our Standards</span>
            <h2 className="section-h2" style={{ color: 'var(--white)' }}>No compromises.</h2>
          </div>
          
          <div className="validation-strip__grid" style={{ marginTop: '4rem' }}>
            <div className="validation-item reveal-on-scroll stagger-1">
              <Award size={32} className="val-icon" />
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                <strong style={{ color: 'var(--white)' }}>Transparent Efficacy</strong>
                We state the exact percentage of key actives. No fairy-dusting. Just proven science.
              </span>
            </div>
            <div className="validation-item reveal-on-scroll stagger-2">
              <Leaf size={32} className="val-icon" />
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                <strong style={{ color: 'var(--white)' }}>Barrier First</strong>
                Even our most powerful exfoliants are formulated with barrier-supporting lipids to prevent inflammation.
              </span>
            </div>
            <div className="validation-item reveal-on-scroll stagger-3">
              <Recycle size={32} className="val-icon" />
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                <strong style={{ color: 'var(--white)' }}>Conscious Creation</strong>
                Cruelty-free forever. Refillable packaging where possible. Carbon-neutral shipping.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
