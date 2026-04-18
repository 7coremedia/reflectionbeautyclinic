import { useState, useEffect } from 'react';
import { getClinicServices } from '../lib/api';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight } from 'lucide-react';
import './Clinic.css';

export default function Clinic() {
  const [clinicServices, setClinicServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useReveal([loading]);

  useEffect(() => {
    async function loadData() {
      const services = await getClinicServices();
      setClinicServices(services || []);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Clinic...</div>;
  }

  return (
    <div className="clinic-page page-enter">
      {/* ── PAGE HEADER ── */}
      <section className="page-title-bar">
        <div className="container">
          <span className="label">Reflection Beauty Clinic</span>
          <h1 className="page-title-bar__heading">Where science meets <em>sanctuary.</em></h1>
          <p className="page-title-bar__sub">Clinical-grade treatments in an environment of absolute calm.</p>
          <a href="#treatments" className="btn btn-outline" style={{ marginTop: '2rem', display: 'inline-flex' }}>View Treatments</a>
        </div>
      </section>

      {/* ── PHILOSOPHY SPLIT ── */}
      <section className="premium-split-section container">
        <div className="premium-split-text reveal-on-scroll">
          <p className="section-eyebrow">Our Philosophy</p>
          <h2 className="display-md">Results-driven,<br/><em>ritual-focused.</em></h2>
          <p className="body-lg" style={{ marginBottom: '1.5rem', color: 'var(--gray-dark)' }}>
            We believe that clinical results don't require sterile environments. Our treatments combine medical-grade equipment and potent in-house actives with lymphatic drainage, structural massage, and deep relaxation protocols.
          </p>
          <p className="body-lg" style={{ color: 'var(--gray-dark)' }}>
            You leave with profoundly changed skin and a restored mind.
          </p>
        </div>
        
        <div className="premium-split-grid reveal-on-scroll stagger-2">
           <div className="premium-grid-img img-corner-1" style={{ backgroundImage: "url('/reflectio webp/water on skin.webp')" }} />
           <div className="premium-grid-img img-corner-2 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/Hand.webp')" }} />
           <div className="premium-grid-img img-corner-3 glass-overlay" style={{ backgroundImage: "url('/reflectio webp/back.webp')" }} />
           <div className="premium-grid-img img-corner-4" style={{ backgroundImage: "url('/reflectio webp/face skin.webp')" }} />
        </div>
      </section>

      {/* ── TREATMENTS MENU ── */}
      <section id="treatments" className="section clinic-treatments" style={{ background: 'var(--white)', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Treatment Menu</span>
            <h2 className="section-h2" style={{ marginBottom: '1rem' }}>From advanced collagen induction<br/>to <em>restorative rituals.</em></h2>
          </div>
          
          <div className="clinic-menu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
            {clinicServices.map((service, idx) => (
              <div key={service.id} className={`clinic-service-card reveal-on-scroll stagger-${(idx % 4) + 1}`}>
                <div className="clinic-service-card__header">
                  <h3 className="clinic-service-card__name">{service.name}</h3>
                  <span className="clinic-service-card__price">₦{Number(service.price).toLocaleString('en-NG')}</span>
                </div>
                <span className="clinic-service-card__meta">{service.duration} · {service.category}</span>
                <p className="clinic-service-card__desc">{service.description}</p>
                <button className="btn btn-outline" style={{ marginTop: '2rem', width: '100%' }}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING BANNER ── */}
      <section className="lifestyle-banner container reveal-on-scroll" style={{ marginTop: '4rem', marginBottom: '8rem' }}>
        <div className="lifestyle-banner__inner" style={{ minHeight: '500px' }}>
          <div className="lifestyle-banner__bg premium-gradient-2" />
          <div className="lifestyle-banner__content">
            <h2 className="display-md banner-title reveal-on-scroll stagger-1">Begin your journey<br/>to <em>better skin.</em></h2>
            <p className="body-lg banner-sub reveal-on-scroll stagger-2">
              Not sure which treatment is right for you? Book an initial consultation with one of our skin experts. They will map your skin and prescribe a tailored treatment plan.
            </p>
            <div className="banner-actions reveal-on-scroll stagger-3">
              <Link to="/contact" className="btn btn-primary">
                Book Consultation <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn btn-dark-outline">
                Contact the Clinic
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
