import { useState, useEffect } from 'react';
import { getClinicServices } from '../lib/api';
import { Link } from 'react-router-dom';
import './Clinic.css';

export default function Clinic() {
  const [clinicServices, setClinicServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* Hero */}
      <section className="clinic-hero">
        <div className="clinic-hero__bg" style={{ background: 'linear-gradient(135deg, #1A1614 0%, #3D2B1F 100%)' }} />
        <div className="clinic-hero__content container">
          <span className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', display: 'block' }}>Reflection Beauty Clinic</span>
          <h1 className="display-lg" style={{ color: 'var(--cream)', marginBottom: '1.5rem' }}>
            Where science meets sanctuary.
          </h1>
          <p className="body-lg" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', marginBottom: '2rem' }}>
            Our central London clinic is the birthplace of all Reflection formulas. Experience our clinical-grade treatments delivered by expert aestheticians in an environment of absolute calm.
          </p>
          <a href="#treatments" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>View Treatments</a>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section clinic-philosophy">
        <div className="container container-sm text-center">
          <span className="label-gold">Our Philosophy</span>
          <h2 className="heading-lg" style={{ margin: '1rem 0' }}>Results-driven, ritual-focused.</h2>
          <div className="divider" />
          <p className="body-lg" style={{ marginTop: '1rem' }}>
            We believe that clinical results don't require sterile environments. Our treatments combine medical-grade equipment and our potent in-house actives with lymphatic drainage, structural massage, and deep relaxation protocols. You leave with profoundly changed skin and a restored mind.
          </p>
        </div>
      </section>

      {/* Treatments Menu */}
      <section id="treatments" className="section clinic-treatments" style={{ background: 'var(--pearl)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Treatment Menu</h2>
            <p>From advanced collagen induction to restorative rituals.</p>
          </div>
          
          <div className="clinic-menu grid-2">
            {clinicServices.map(service => (
              <div key={service.id} className="clinic-service-card">
                <div className="clinic-service-card__header">
                  <h3 className="clinic-service-card__name">{service.name}</h3>
                  <span className="clinic-service-card__price">£{service.price}</span>
                </div>
                <span className="clinic-service-card__meta">{service.duration} · {service.category}</span>
                <p className="clinic-service-card__desc">{service.description}</p>
                <button className="btn btn-ghost" style={{ marginTop: '1.5rem' }}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section clinic-booking text-center">
        <div className="container container-sm">
          <h2 className="heading-lg mb-3">Begin your journey to better skin.</h2>
          <p className="body-lg mb-4">Not sure which treatment is right for you? Book an initial consultation with one of our skin experts. They will map your skin and prescribe a tailored treatment plan.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary">Book Consultation — £50</button>
            <Link to="/contact" className="btn btn-outline">Contact the Clinic</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
