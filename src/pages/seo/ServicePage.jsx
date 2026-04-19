import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceByPath } from '../../data/seo-services';
import SEO from '../../components/SEO';
import { useReveal } from '../../hooks/useReveal';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './ServicePage.css';

export default function ServicePage() {
  // Use current pathname to find the service data
  const fullPath = window.location.pathname;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useReveal([loading, fullPath]);

  useEffect(() => {
    // Find service dynamically by route since it could be under any category
    const data = getServiceByPath(fullPath);
    setService(data);
    setLoading(false);
  }, [fullPath]);

  if (loading) return null;

  if (!service) {
    return (
      <div className="container" style={{ paddingTop: '150px', minHeight: '50vh' }}>
        <h2>Service not found</h2>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://reflection.ng/#localbusiness",
        "name": "Reflection Beauty Clinic",
        "image": "https://reflection.ng/reflectio%20webp/face%20skin.webp",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "10 Idimu Rd, Egbeda",
          "addressLocality": "Lagos",
          "postalCode": "102213",
          "addressCountry": "NG"
        },
        "telephone": "+2348000000000",
        "url": "https://reflection.ng"
      },
      {
        "@type": "Service",
        "serviceType": service.h1,
        "provider": {
          "@id": "https://reflection.ng/#localbusiness"
        },
        "description": service.metaDescription || `Professional ${service.h1}.`,
        "areaServed": [
          {
            "@type": "State",
            "name": "Lagos"
          },
          {
            "@type": "City",
            "name": "Alimosho"
          }
        ]
      }
    ]
  };

  return (
    <div className="service-page page-enter">
      <SEO 
        title={service.title}
        description={service.metaDescription || `Book your ${service.h1}. Professional treatments by Reflection Beauty Clinic.`}
        keywords={service.keywords}
        schema={schema}
        path={fullPath}
      />

      {/* ── BREADCRUMBS ── */}
      <div className="container breadcrumb-nav">
        <Link to={service.parentCategory.path} className="breadcrumb-link">
          <ArrowLeft size={16} /> Back to {service.parentCategory.title.split(' |')[0]}
        </Link>
      </div>

      {/* ── TITLE BAR ── */}
      <section className="page-title-bar" style={{ paddingTop: 'min(5vh, 40px)', paddingBottom: '3rem', borderBottom: 'none' }}>
        <div className="container">
          <h1 className="page-title-bar__heading reveal-on-scroll">{service.h1}</h1>
          {service.priceRange && (
            <p className="service-price reveal-on-scroll stagger-1">{service.priceRange}</p>
          )}
        </div>
      </section>

      {/* ── MAIN CONTENT SPLIT ── */}
      <section className="service-content-section container">
        <div className="service-main-copy reveal-on-scroll stagger-2">
          {service.body ? (
            <div className="body-lg" dangerouslySetInnerHTML={{ __html: service.body }} />
          ) : (
            <div className="body-lg">
              <p className="lead" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                At Reflection Beauty Clinic in Alimosho, Lagos, we specialize in delivering clinical-grade {service.h1.toLowerCase()} tailored to the unique needs of melanated skin. Unlike standard spas, our protocols are grounded in science and designed to effect structural change.
              </p>
              
              <h3>The Reflection Approach to {service.title.split('|')[0].trim()}</h3>
              <p>
                Living in Lagos exposes our skin to intense UV radiation, pollution, and high humidity. This unique environment requires a targeted approach. Our {service.title.split('|')[0].trim()} protocol begins with a comprehensive dermal analysis to understand your barrier health and specific concerns. We do not believe in off-the-shelf solutions; every treatment is calibrated by our expert aestheticians on the day of your appointment.
              </p>

              <h3>What to Expect</h3>
              <p>
                Your session takes place in our clinically sterile yet deeply relaxing treatment rooms in Egbeda. We utilize medical-grade actives and advanced modalities to target the root cause of your concern. Following the procedure, we incorporate elements of our proprietary <a href="/shop" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>SkincareByReflection™</a> line—such as our barrier-repairing Flawless Face Cream—to soothe the skin and accelerate healing.
              </p>
              <ul>
                <li><strong>Precision Assessment:</strong> Detailed analysis before we begin.</li>
                <li><strong>Customized Protocol:</strong> Formulations adjusted for your skin tolerance.</li>
                <li><strong>Clinical Efficacy:</strong> Focus on results over temporary sensory experiences.</li>
                <li><strong>Aftercare Support:</strong> Guided routine to protect your investment.</li>
              </ul>

              <h3>Why Choose a Clinic over a Salon?</h3>
              <p>
                When treating complex conditions, the depth of anatomical knowledge matters. Our practitioners are trained to understand the nuances of the skin barrier, inflammatory cascades, and post-inflammatory hyperpigmentation. We follow strict safety guidelines as recommended by leading <a href="https://www.aad.org/" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>dermatological boards</a>, ensuring your treatment is not just effective, but incredibly safe.
              </p>

              <div className="results-timeline" style={{ background: 'var(--cream)', padding: '2rem', borderRadius: '8px', marginTop: '3rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1rem' }}>Timeline to Results</h4>
                <p style={{ margin: 0 }}>While many clients notice an immediate glow or textural improvement post-treatment, definitive structural changes typically manifest within 3 to 6 weeks as cellular turnover occurs. For maximum efficacy, a course of treatments combined with homecare is recommended.</p>
              </div>
            </div>
          )}
        </div>

        <aside className="service-sidebar reveal-on-scroll stagger-3">
          <div className="booking-card glass-effect">
            <h3>Ready to book this treatment?</h3>
            <p>Secure your spot at our Alimosho clinic today.</p>
            <Link to="/book" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Appointment</Link>
          </div>
          
          <div className="location-card">
            <h4>Location</h4>
            <address>
              10 Idimu Rd, Egbeda<br/>
              Lagos 102213
            </address>
          </div>
        </aside>
      </section>

    </div>
  );
}
