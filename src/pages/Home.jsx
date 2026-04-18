import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { getProducts } from '../lib/api';
import { Star, ArrowRight, ShieldCheck, CheckCircle2, Leaf, FlaskConical, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import './Home.css';

const heroImages = [
  '/reflectio webp/face skin.webp',
  '/reflectio webp/inside water and hand.webp'
];



const services = [
  { num: '01', name: 'Skin Care Clinic', desc: 'Clinical treatment for hyperpigmentation, acne, sunburn, and dermatological concerns. Combined with our proprietary SkincareByReflection™ product line for lasting results.', cta: 'Explore →', href: '/clinic' },
  { num: '02', name: 'Facials & Skin Treatments', desc: 'From brightening and anti-ageing to deep cleansing and acne facials — every treatment is personalised to your skin type and concern at the time of your visit.', cta: 'Explore →', href: '/clinic' },
  { num: '03', name: 'Medical Spa', desc: 'Advanced procedures including electrocautery for skin tag, mole, and wart removal, alongside full-body massages and sauna. Clinical precision, spa atmosphere.', cta: 'Explore →', href: '/clinic' },
  { num: '04', name: 'Teeth Whitening', desc: 'Professional scaling, polishing, and teeth whitening by trained practitioners. Painless, immediate, and built around your overall facial confidence — not just your smile.', cta: 'Explore →', href: '/clinic' },
  { num: '05', name: 'SkincareByReflection™', desc: 'Our proprietary skincare line — formulated in partnership with our clinic team. Real actives, honest ingredients, developed and tested on real clients with real results.', cta: 'Shop →', href: '/shop' },
  { num: '06', name: 'Skin Consultation', desc: "Not sure where to start? Book a consultation with our therapists. We assess your skin, map your concerns, and build a treatment plan — clinical, clear, and honest.", cta: 'Book Now →', href: '/clinic#consult' },
];

const treatments = [
  { name: 'Hyperpigmentation Facial', cat: 'Skin Clinic', duration: '60 min' },
  { name: 'Acne & Breakout Treatment', cat: 'Skin Clinic', duration: '75 min' },
  { name: 'Brightening Facial', cat: 'Facials', duration: '60 min' },
  { name: 'Anti-Ageing Facial', cat: 'Facials', duration: '75 min' },
  { name: 'Skin Tag & Mole Removal (Electrocautery)', cat: 'Medical Spa', duration: '30 min' },
  { name: 'Full Body Massage', cat: 'Medical Spa', duration: '60 min' },
  { name: 'Professional Teeth Whitening', cat: 'Dental Beauty', duration: '45 min' },
  { name: 'Scaling & Polishing', cat: 'Dental Beauty', duration: '45 min' },
  { name: 'Deep Cleansing Facial', cat: 'Facials', duration: '60 min' },
  { name: 'Chemical Peel', cat: 'Advanced Treatments', duration: '45 min' },
];

export default function Home() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const fetchedP = await getProducts();
      setProducts(fetchedP || []);
    }
    loadData();
  }, []);

  // Hero Slider
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const sliderInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(sliderInterval);
  }, []);

  // Scroll Animation Observer (Fade In Up)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const heroProduct = products[0];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Reflection Beauty Clinic",
    "image": "https://reflectionbeautyclinic.com/og-image.jpg",
    "url": "https://reflectionbeautyclinic.com",
    "telephone": "+2348026021946",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10 Idimu Rd, Egbeda",
      "addressLocality": "Alimosho",
      "addressRegion": "Lagos",
      "postalCode": "102213",
      "addressCountry": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.5989892,
      "longitude": 3.2910781
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "priceRange": "₦₦₦",
    "sameAs": [
      "https://www.google.com/maps/place/Reflection+Beauty+Clinic"
    ]
  };


  return (
    <div className="home-ag1 page-enter">
      <SEO 
        title="Beauty Clinic Alimosho Lagos | Reflection Beauty Clinic" 
        description="Reflection Beauty Clinic — skin treatments, facials, medical spa, teeth whitening and skincare products in Alimosho, Lagos. Science-backed. Clinically led."
        schema={localBusinessSchema}
        path="/"
      />


      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-product-image">
          {heroImages.map((src, index) => (
             <div 
               key={index} 
               className={`hero-bg-slide ${index === currentImageIndex ? 'active' : ''}`}
               style={{ backgroundImage: `url('${encodeURI(src)}')` }}
             />
          ))}
          <div className="hero-bg-overlay" />
        </div>
          
        <div className="hero-content-wrapper container reveal-on-scroll">
          {/* Temporarily hidden per request
          <div className="hero-visual">
            <div className="hero-badge-doc glass-effect">
              <span className="hero-badge-title">#1</span>
              <span className="hero-badge-sub">BEAUTY CLINIC <br className="badge-br" /> IN LAGOS</span>
            </div>
          </div>
          */}
          
          <div className="hero-content">
            <div className="reviews-label">
              <div className="stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="var(--star-color)" color="var(--star-color)" />)}
              </div>
              <span>Based on Google Reviews for Reflection Clinic</span>
            </div>
            
            <h1 className="hero-headline display-lg reveal-on-scroll stagger-1">
              Skin that <em>reflects</em> who you are.
            </h1>
            <p className="hero-subhead body-lg reveal-on-scroll stagger-2">
              A clinical skin clinic, medical spa, and skincare brand in the heart of Alimosho. We treat real skin concerns with professional-grade treatments and science-led products.
            </p>
            
            <div className="hero-actions reveal-on-scroll stagger-3">
              <Link to="/clinic#consult" className="btn btn-primary hero-btn">
                Book a Consultation <ArrowRight size={20} />
              </Link>
              <Link to="/clinic" className="btn btn-outline hero-btn-ghost">
                View Treatments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE BANNER (Dark Gradient) ── */}
      <section className="lifestyle-banner container reveal-on-scroll">
        <div className="lifestyle-banner__inner">
          <div className="lifestyle-banner__bg premium-gradient-2" />
          <div className="lifestyle-banner__content">
            <h2 className="display-md banner-title reveal-on-scroll stagger-1">Where the <em>science</em> was built.</h2>
            <p className="body-lg banner-sub reveal-on-scroll stagger-2">
              Our professional treatment rooms are where our formulas were born — established, tested, and refined on real clients. What reaches your hands has been through the hands of experts first.
            </p>
            <div className="banner-actions reveal-on-scroll stagger-3">
              <Link to="/clinic" className="btn btn-primary">
                Explore the Clinic <ArrowRight size={20} />
              </Link>
              <Link to="/shop" className="btn btn-dark-outline">
                Shop Our Science
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALIDATION STRIP ── */}
      <div className="validation-strip reveal-on-scroll">
        <div className="container validation-strip__grid">
           <div className="validation-item reveal-on-scroll stagger-1">
             <ShieldCheck size={28} className="val-icon" />
             <span><strong>Dermatologist Tested:</strong> Every formula verified before reaching your skin.</span>
           </div>
           <div className="validation-item reveal-on-scroll stagger-2">
             <FlaskConical size={28} className="val-icon" />
             <span><strong>Clinically Backed:</strong> Professional-grade results for complex concerns.</span>
           </div>
           <div className="validation-item reveal-on-scroll stagger-3">
             <Leaf size={28} className="val-icon" />
             <span><strong>Clean Formulation:</strong> No parabens, sulphates, or synthetic fragrances.</span>
           </div>
        </div>
      </div>

      {/* ── PRESS / TRUST LOGOS ── */}
      <section className="press-section container reveal-on-scroll">
         <div className="press-grid">
           <span className="press-logo" style={{fontSize: '2.5rem', fontWeight: 800, fontFamily: 'serif'}}>Forbes</span>
           <span className="press-logo" style={{fontSize: '2.2rem', fontFamily: 'serif', letterSpacing: '-0.02em'}}>VOGUE</span>
           <span className="press-logo" style={{fontSize: '2rem', fontFamily: 'serif', letterSpacing: '-0.05em'}}>bon appétit</span>
         </div>
      </section>

      {/* ── OUR EXPERTISE (SERVICES) ── */}
      <section className="services-section reveal-on-scroll">
        <div className="services-header container">
          <p className="section-eyebrow">Our Expertise</p>
          <h2 className="section-h2">
            Treatments built for <em>your skin.</em>
          </h2>
          <p className="section-intro">
            We specialise in complex skin concerns. Every treatment is designed, assessed, and delivered by trained aestheticians working alongside clinical protocols — not guesswork.
          </p>
        </div>
        <div className="services-grid container">
          {services.map((svc, idx) => (
            <Link to={svc.href} className={`service-card reveal-on-scroll stagger-${(idx % 3) + 1}`} key={svc.num} data-num={svc.num}>
              <span className="service-num">{svc.num}</span>
              <div className="service-name">{svc.name}</div>
              <div className="service-desc">{svc.desc}</div>
              <div className="service-link">{svc.cta}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHAT WE TREAT ── */}
      <section className="treatments-section reveal-on-scroll">
        <div className="container">
          <p className="section-eyebrow">What We Treat</p>
          <h2 className="section-h2">
            Targeted treatments <em>for every concern.</em>
          </h2>
          <div className="treatments-table-wrapper">
            <div className="treatments-list">
              {treatments.map((t, i) => (
                <div className={`treat-row reveal-on-scroll stagger-${(i % 3) + 1}`} key={i}>
                  <div className="treat-info">
                    <span className="treat-name">{t.name}</span>
                    <span className="treat-cat">{t.cat}</span>
                    <span className="treat-duration">{t.duration}</span>
                  </div>
                  <Link to="/clinic#consult" className="treat-book-btn">Book <ArrowRight size={16} /></Link>
                </div>
              ))}
            </div>
          </div>
          <div className="treatments-footer reveal-on-scroll stagger-1">
            <Link to="/clinic" className="treatments-all-link">View All Treatments</Link>
          </div>
        </div>
      </section>

      {/* ── SKINCARE PRODUCTS ── */}
      <section className="products-section reveal-on-scroll">
        <div className="container">
          <p className="section-eyebrow">SkincareByReflection™</p>
          <h2 className="section-h2">
            The clinic, <em>bottled.</em>
          </h2>
          <p className="section-intro">
            Every product in our collection was developed in-house, tested on our clinic clients, and refined until it worked. No fillers, no mystery. Just high-performance actives built for African skin.
          </p>
          <div className="products-grid">
            {products.slice(0, 4).map((product, idx) => (
              <Link to={`/shop/${product.id}`} className={`home-product-card reveal-on-scroll stagger-${(idx % 4) + 1}`} key={product.id}>
                <div className="home-product-img">
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} />
                  )}
                </div>
                <div className="home-product-info">
                  <div className="home-product-name">{product.name}</div>
                  <div className="home-product-desc">{product.description}</div>
                  <div className="home-product-price">
                    {product.price
                      ? `₦${Number(product.price).toLocaleString('en-NG')}`
                      : '—'}
                  </div>
                </div>
              </Link>
            ))}
            {/* Fallback if no products yet */}
            {products.length === 0 && [
              { name: 'Vitamin C Face Serum', desc: '15% Vitamin C + 5% Niacinamide. Brightening, dark spot.', price: '₦45,000' },
              { name: 'Reflection Flawless Face Cream', desc: 'Intensive moisturisation for all skin types. Clinic-born.', price: '₦38,000' },
              { name: 'Flawless Toning Milk', desc: 'Lightweight daily toner that balances and refines.', price: '₦32,000' },
              { name: 'Niacinamide Face Serum', desc: '10% Niacinamide brightening complex. Reduces pores.', price: '₦40,000' },
            ].map((p, idx) => (
              <Link to="/shop" className={`home-product-card reveal-on-scroll stagger-${(idx % 4) + 1}`} key={idx}>
                <div className="home-product-img">
                </div>
                <div className="home-product-info">
                  <div className="home-product-name">{p.name}</div>
                  <div className="home-product-desc">{p.desc}</div>
                  <div className="home-product-price">{p.price}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="products-footer reveal-on-scroll stagger-1">
            <Link to="/shop" className="btn btn-primary">Shop All Products</Link>
            <Link to="/skin-quiz" className="treatments-all-link">Take the Skin Quiz</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="testimonials-section reveal-on-scroll">
        <div className="container">
          <div className="reviews-label" style={{marginBottom: '1.5rem'}}>
             <div className="stars">
               {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="var(--star-color)" color="var(--star-color)" />)}
             </div>
             <span>Trusted by over 50,000 real clients treated</span>
          </div>
          <div className="testimonials-header">
             <h2 className="display-lg">What our clients <em>say.</em></h2>
             <div className="carousel-nav">
               <button className="carousel-nav-btn glass-effect-btn" onClick={scrollPrev} aria-label="Previous review">
                 <ChevronLeft size={24} />
               </button>
               <button className="carousel-nav-btn glass-effect-btn" onClick={scrollNext} aria-label="Next review">
                 <ChevronRight size={24} />
               </button>
             </div>
          </div>

          <div className="embla reveal-on-scroll stagger-1" ref={emblaRef}>
            <div className="embla__container">
               {[
                 { title: 'Hyperpigmentation', quote: "Reflection beauty clinic is the best place to be. Results I'd been chasing for years.", author: 'GOOGLE REVIEW · ALIMOSHO', img: 'premium-gradient-1' },
                 { title: 'Vitamin C Serum', quote: "My skin literally glowed after 2 weeks. I've never had this many compliments.", author: 'PRIYA K. · COMBINATION SKIN', img: 'premium-gradient-2' },
                 { title: 'Reflection Facial', quote: "After my Reflection Facial, I booked a second appointment before I even left.", author: 'MARCUS T. · OILY / ACNE', img: 'premium-gradient-3' },
                 { title: 'Flawless Toning Milk', quote: "The first product that hasn't broken me out. Rich, and it actually works perfectly.", author: 'SOPHIE L. · SENSITIVE SKIN', img: 'premium-gradient-1' },
               ].map((t, i) => (
                 <div className="embla__slide" key={i}>
                   <div className={`testimonial-card ${t.img}`}>
                     <div className="play-btn-overlay glass-effect">
                       <Play fill="currentColor" size={28} />
                     </div>
                   </div>
                   <div className="testimonial-text">
                     <p className="desc">{t.title}</p>
                     <div className="divider-line" />
                     <h3>"{t.quote}"</h3>
                     <p className="author">{t.author}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE SPLIT SECTION ── */}
      <section className="lifestyle-split-section container">
        <div className="lifestyle-split-text reveal-on-scroll">
          <h2 className="display-md">Luxury skincare shouldn't be a <em>mystery.</em></h2>
          <p className="body-lg" style={{ color: 'var(--gray-dark)' }}>
            Every Reflection product is built on peer-reviewed science, honest lists, and a deep respect for your skin's intelligence.
          </p>
          <ul className="features-list">
            <li className="reveal-on-scroll stagger-1">
              <CheckCircle2 color="var(--primary)" size={24} className="feature-icon" />
              <span><strong>Formulated for African skin:</strong> Developed strictly for the Lagos climate and the exact skin types that visit our clinic.</span>
            </li>
            <li className="reveal-on-scroll stagger-2">
              <CheckCircle2 color="var(--primary)" size={24} className="feature-icon" />
              <span><strong>No proprietary blends.</strong> Full transparency. We list every active and exact concentration.</span>
            </li>
            <li className="reveal-on-scroll stagger-3">
              <CheckCircle2 color="var(--primary)" size={24} className="feature-icon" />
              <span><strong>Clinic-to-consumer pipeline:</strong> If a formula doesn't work perfectly in our treatment room, it doesn't reach the shelf.</span>
            </li>
          </ul>
          <div className="lifestyle-cta-wrapper reveal-on-scroll stagger-4">
            <Link to="/about" className="btn btn-primary">
              Read Our Philosophy
            </Link>
          </div>
        </div>

        <div className="lifestyle-split-grid reveal-on-scroll stagger-2">
           <div className="lifestyle-grid-img img-top-left" style={{ backgroundImage: "url('/reflectio webp/Hand.webp')" }} />
           <div className="lifestyle-grid-img img-top-right glass-overlay" style={{ backgroundImage: "url('/reflectio webp/back.webp')" }} />
           <div className="lifestyle-grid-img img-bot-left glass-overlay" style={{ backgroundImage: "url('/reflectio webp/water on skin.webp')" }} />
           <div className="lifestyle-grid-img img-bot-right" style={{ backgroundImage: "url('/reflectio webp/inside water and hand.webp')" }} />
        </div>
      </section>

      {/* ── VISIT US (LOCATION) ── */}
      <section className="location-section container reveal-on-scroll">
        <div className="location-left">
          <p className="section-eyebrow">Visit Us</p>
          <h2 className="section-h2">
            Find us in <em>Alimosho,</em><br />Lagos.
          </h2>
          <p className="location-body">
            We're located on Idimu Road at Egbeda bus stop — easily accessible from Ikotun, Iyana Ipaja, Gowon Estate, Shasha, and across Alimosho LGA. Walk-ins welcome. Consultations by appointment.
          </p>
          <a
            href="https://g.page/reflection-beauty-clinic"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions <ArrowRight size={20} />
          </a>
        </div>
        <div className="location-right reveal-on-scroll stagger-2">
          <div className="location-map glass-overlay">
            <iframe
              title="Reflection Beauty Clinic Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.668!2d3.2910!3d6.5989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzUnNTYuNCJOIDPCsDE3JzI4LjAiRQ!5e0!3m2!1sen!2sng!4v1680000000000"
              width="100%"
              height="340"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="location-details glass-effect">
            <strong>Reflection Beauty Clinic</strong><br />
            10 Idimu Road, Egbeda bus stop<br />
            Alimosho, Lagos 102213<br /><br />
            <strong>Hours</strong><br />
            Monday – Saturday · 9:00 am – 6:00 pm<br />
            Sunday · Closed
          </div>
        </div>
      </section>
    </div>
  );
}
