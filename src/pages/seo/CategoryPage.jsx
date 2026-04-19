import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById } from '../../data/seo-services';
import SEO from '../../components/SEO';
import { useReveal } from '../../hooks/useReveal';
import { ArrowRight } from 'lucide-react';
import './CategoryPage.css';

export default function CategoryPage({ slug }) {
  // Use slug from props or fallback to useParams (if dynamic)
  const categoryId = slug || useParams().id;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useReveal([loading]);

  useEffect(() => {
    const data = getCategoryById(categoryId);
    setCategory(data);
    setLoading(false);
  }, [categoryId]);

  if (loading) return null;

  if (!category) {
    return (
      <div className="container" style={{ paddingTop: '150px', minHeight: '50vh' }}>
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="category-page page-enter">
      <SEO 
        title={category.title}
        description={category.metaDescription || category.copy.substring(0, 160) + '...'}
        keywords={category.keywords}
      />

      {/* ── PAGE HEADER ── */}
      <section className="page-title-bar">
        <div className="container">
          <span className="label">Reflection Beauty Clinic</span>
          <h1 className="page-title-bar__heading reveal-on-scroll stagger-1">{category.h1}</h1>
          <p className="page-title-bar__sub reveal-on-scroll stagger-2">{category.copy}</p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="category-services container" style={{ paddingBottom: '6rem' }}>
        <p className="section-eyebrow reveal-on-scroll">Our Services</p>
        <div className="services-grid">
          {category.services.map((service, index) => (
            <Link 
              to={service.path} 
              key={service.id} 
              className={`service-card reveal-on-scroll stagger-${(index % 4) + 1}`}
            >
              <div className="service-card__content">
                <h2 className="service-card__title">{service.h1}</h2>
                {service.priceRange && (
                  <span className="service-card__price">{service.priceRange}</span>
                )}
              </div>
              <div className="service-card__arrow">
                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA & ADDRESS ── */}
      <section className="validation-strip" style={{ background: 'var(--black-soft)', color: 'var(--white)', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <h2 className="section-h2" style={{ color: 'var(--white)' }}>Ready to transform your skin?</h2>
            <p style={{ color: 'var(--gray-md)', marginBottom: '3rem', maxWidth: '600px', fontSize: '1.1rem' }}>
              Book your session today. Visit us at 10 Idimu Rd, Egbeda, Lagos 102213.
            </p>
            <Link to="/book" className="btn btn-primary">Book Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
