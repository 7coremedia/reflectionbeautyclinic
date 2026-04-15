import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products, blogPosts, clinicServices } from '../data/products';
import './Home.css';

const heroQualities = ['Science-backed', 'Clinically tested', 'Cruelty-free', 'Sustainable'];

export default function Home() {
  const { addItem } = useCart();
  const featuredProducts = products.slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div className="home page-enter">
      {/* ── HERO ── */}
      <section className="home-hero" aria-label="Hero">
        <div className="home-hero__bg">
          <div className="home-hero__gradient" />
          <div className="home-hero__texture" />
        </div>
        <div className="home-hero__content container">
          <div className="home-hero__text">
            <div className="home-hero__qualities">
              {heroQualities.map((q, i) => (
                <span key={i} className="home-hero__quality">
                  <span className="home-hero__quality-dot" />
                  {q}
                </span>
              ))}
            </div>
            <h1 className="home-hero__title">
              Skin that<br />
              <em>reflects</em> who<br />
              you are.
            </h1>
            <p className="home-hero__sub">
              Luxury skincare rooted in science. Formulated for visible results — beautiful enough to display.
            </p>
            <div className="home-hero__actions">
              <Link to="/shop" className="btn btn-primary">Shop the Collection</Link>
              <Link to="/clinic" className="btn btn-white">Our Beauty Clinic</Link>
            </div>
          </div>
          <div className="home-hero__visual">
            <div className="home-hero__product-showcase">
              <div className="home-hero__product-card home-hero__product-card--main">
                <div className="home-hero__product-img" style={{ background: 'linear-gradient(135deg, #F5E6C8 0%, #C8A882 100%)' }} />
                <div className="home-hero__product-info">
                  <span className="label-gold">Bestseller</span>
                  <p className="home-hero__product-name">Luminance Serum</p>
                  <p className="home-hero__product-price">£78</p>
                </div>
              </div>
              <div className="home-hero__product-card home-hero__product-card--accent">
                <div className="home-hero__product-img" style={{ background: 'linear-gradient(135deg, #EDD5C0 0%, #D4B8A0 100%)' }} />
                <div className="home-hero__product-info">
                  <p className="home-hero__product-name">Velvet Moisturiser</p>
                  <p className="home-hero__product-price">£64</p>
                </div>
              </div>
            </div>
            <div className="home-hero__stat-cards">
              <div className="home-hero__stat">
                <span className="home-hero__stat-num">98%</span>
                <span className="home-hero__stat-label">saw visible results in 4 weeks</span>
              </div>
              <div className="home-hero__stat">
                <span className="home-hero__stat-num">50K+</span>
                <span className="home-label">happy customers</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-hero__scroll-hint">
          <span>Scroll</span>
          <div className="home-hero__scroll-line" />
        </div>
      </section>

      {/* ── ANNOUNCEMENT STRIP ── */}
      <div className="home-strip">
        <div className="home-strip__track">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="home-strip__item">
              Free shipping over £65 &nbsp;·&nbsp; New: Midnight Retinol Oil &nbsp;·&nbsp; Book your clinic appointment &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── VALUES ── */}
      <section className="section home-values">
        <div className="container">
          <div className="home-values__grid">
            {[
              { icon: '✦', title: 'Dermatologist Tested', body: 'Every formula is independently verified by leading dermatologists before it reaches your skin.' },
              { icon: '◈', title: 'Clean Formulation', body: 'No parabens, sulphates or synthetic fragrances. Just high-performance actives that work.' },
              { icon: '◯', title: 'Sustainable Ethos', body: 'Refillable packaging, carbon-neutral shipping, and 1% of revenue invested in reforestation.' },
              { icon: '✧', title: 'Clinically Backed', body: 'Developed alongside our Reflection Beauty Clinic team for professional-grade results at home.' },
            ].map((v, i) => (
              <div className="home-value-card" key={i}>
                <span className="home-value-card__icon">{v.icon}</span>
                <h3 className="home-value-card__title">{v.title}</h3>
                <p className="home-value-card__body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section home-products">
        <div className="container">
          <div className="section-header">
            <span className="label">The Collection</span>
            <h2>Best Sellers</h2>
            <p>Science-backed formulas for visible transformation. Start with our most-loved.</p>
          </div>
          <div className="home-products__grid">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="home-products__cta">
            <Link to="/shop" className="btn btn-outline">View Full Collection →</Link>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section className="home-editorial">
        <div className="home-editorial__left">
          <div className="home-editorial__img-col">
            <div className="home-editorial__img home-editorial__img--tall" style={{ background: 'linear-gradient(160deg, #E8DDD1 0%, #C4B5A5 100%)' }}>
              <span className="home-editorial__img-text">Ritual</span>
            </div>
            <div className="home-editorial__img home-editorial__img--short" style={{ background: 'linear-gradient(160deg, #D4C8B8 0%, #9E8E80 100%)' }}>
              <span className="home-editorial__img-text">Science</span>
            </div>
          </div>
        </div>
        <div className="home-editorial__right">
          <span className="label-gold">Our Philosophy</span>
          <h2 className="home-editorial__title">
            Where science<br />
            meets <em>ritual.</em>
          </h2>
          <div className="divider divider-left" />
          <p className="body-lg home-editorial__copy">
            We believe luxury skincare shouldn't be a mystery. Every Reflection product is built on peer-reviewed science, honest ingredient lists, and a deep respect for your skin's natural intelligence.
          </p>
          <p className="body-md home-editorial__copy-2">
            Our in-house clinic team works alongside our formulators — testing on real clients, observing real results, and constantly refining. What reaches your hands has been through the hands of experts first.
          </p>
          <div className="home-editorial__actions">
            <Link to="/about" className="btn btn-primary">Our Story</Link>
            <Link to="/journal" className="btn btn-ghost">Read the Journal</Link>
          </div>
        </div>
      </section>

      {/* ── BEST SELLER HIGHLIGHT ── */}
      <section className="section home-highlight">
        <div className="container">
          <div className="home-highlight__inner">
            <div className="home-highlight__visual">
              <div
                className="home-highlight__product-img"
                style={{ background: 'linear-gradient(145deg, #F5E6C8 0%, #C9A96E 60%, #A8884A 100%)' }}
              >
                <div className="home-highlight__product-glow" />
                <span className="home-highlight__product-label">Luminance<br/>Serum</span>
              </div>
              <div className="home-highlight__badge">
                <span>★ 4.8</span>
                <span>312 Reviews</span>
              </div>
            </div>
            <div className="home-highlight__content">
              <span className="badge badge-gold">No. 1 Bestseller</span>
              <h2 className="home-highlight__title">
                The Luminance<br />Serum
              </h2>
              <p className="home-highlight__sub">Vitamin C + Niacinamide Brightening</p>
              <div className="divider divider-left" />
              <p className="body-lg">
                A potent brightening serum that visibly reduces dark spots, evens skin tone, and leaves skin with a luminous glow — formulated with 15% Vitamin C and 5% Niacinamide.
              </p>
              <ul className="home-highlight__benefits">
                {products[0].benefits.map((b, i) => (
                  <li key={i}>
                    <span className="home-highlight__check">✓</span> {b}
                  </li>
                ))}
              </ul>
              <div className="home-highlight__purchase">
                <div className="home-highlight__price">
                  <span className="home-highlight__price-curr">£78</span>
                  <span className="home-highlight__price-orig">£98</span>
                  <span className="badge badge-gold">Save £20</span>
                </div>
                <div className="home-highlight__btns">
                  <button className="btn btn-primary" onClick={() => addItem(products[0])}>Add to Cart</button>
                  <Link to="/shop/rfl-001" className="btn btn-outline">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLINIC TEASER ── */}
      <section className="home-clinic">
        <div className="home-clinic__bg">
          <div className="home-clinic__overlay" />
        </div>
        <div className="home-clinic__content container">
          <div className="home-clinic__text">
            <span className="label" style={{ color: 'rgba(255,255,255,0.6)' }}>Reflection Beauty Clinic</span>
            <h2 className="home-clinic__title">
              The clinic<br />
              behind the<br />
              skincare.
            </h2>
            <p className="home-clinic__sub">
              Our professional treatment rooms are where our formulas were born. Book a skin consultation, facial, or advanced treatment with our team of expert therapists and aestheticians.
            </p>
            <div className="home-clinic__services">
              {clinicServices.slice(0, 3).map(s => (
                <div key={s.id} className="home-clinic__service-tag">
                  <span>{s.name}</span>
                  <span className="home-clinic__service-price">from £{s.price}</span>
                </div>
              ))}
            </div>
            <Link to="/clinic" className="btn btn-white" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              Explore the Clinic →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SKIN QUIZ CTA ── */}
      <section className="home-quiz section-sm">
        <div className="container">
          <div className="home-quiz__inner">
            <div className="home-quiz__text">
              <span className="label">Personalised Skincare</span>
              <h2 className="home-quiz__title">Not sure where to start?</h2>
              <p>Our 2-minute skin quiz matches you to your perfect Reflection routine.</p>
            </div>
            <Link to="/rituals" className="btn btn-gold">Take the Skin Quiz →</Link>
          </div>
        </div>
      </section>

      {/* ── JOURNAL ── */}
      <section className="section home-journal">
        <div className="container">
          <div className="section-header">
            <span className="label">The Journal</span>
            <h2>Skin Intelligence</h2>
            <p>Expert articles, ingredient deep-dives, and ritual guides from our clinic team.</p>
          </div>
          <div className="home-journal__grid">
            {featuredPosts.map(post => (
              <article key={post.id} className="home-journal__card">
                <Link to={`/journal/${post.id}`} className="home-journal__card-img-wrap">
                  <div
                    className="home-journal__card-img"
                    style={{ background: `linear-gradient(145deg, ${post.shade}88, ${post.shade})` }}
                  >
                    <span className="home-journal__card-category badge badge-cream">{post.category}</span>
                  </div>
                </Link>
                <div className="home-journal__card-body">
                  <div className="home-journal__card-meta">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/journal/${post.id}`}>
                    <h3 className="home-journal__card-title">{post.title}</h3>
                  </Link>
                  <p className="home-journal__card-excerpt">{post.excerpt}</p>
                  <Link to={`/journal/${post.id}`} className="home-journal__card-read">
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/journal" className="btn btn-outline">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="section-sm home-trust">
        <div className="container">
          <div className="home-trust__grid">
            {[
              { quote: '"My skin literally glowed after 2 weeks on the Luminance Serum. I\'ve never had this many compliments."', name: 'Priya K.', skin: 'Combination Skin' },
              { quote: '"The Velvet Moisturiser is the first product that hasn\'t broken me out. Rich, luxurious, and it actually works."', name: 'Sophie L.', skin: 'Sensitive Skin' },
              { quote: '"After my Reflection Facial at the clinic, I booked a second one before I even left. Incredible experience."', name: 'Marcus T.', skin: 'Oily / Acne-prone' },
            ].map((r, i) => (
              <div key={i} className="home-review-card">
                <div className="home-review-card__stars">★★★★★</div>
                <p className="home-review-card__quote">{r.quote}</p>
                <div className="home-review-card__author">
                  <span className="home-review-card__name">{r.name}</span>
                  <span className="home-review-card__skin">{r.skin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS LOGOS ── */}
      <section className="home-press section-sm">
        <div className="container">
          <p className="home-press__label label">As seen in</p>
          <div className="home-press__logos">
            {['Vogue', 'Harper\'s Bazaar', 'ELLE', 'The Sunday Times', 'Refinery29'].map((p, i) => (
              <span key={i} className="home-press__logo">{p}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
