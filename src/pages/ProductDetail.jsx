import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getProductById, getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { useReveal } from '../hooks/useReveal';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  useReveal([loading]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedProduct = await getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        const allProducts = await getProducts();
        const relatedProducts = allProducts.filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id).slice(0, 4);
        setRelated(relatedProducts);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Product...</div>;
  }
  
  if (!product) {
    return (
      <div className="container section flex-center flex-column" style={{ minHeight: '60vh' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image_url || "https://reflectionbeautyclinic.com/placeholder.jpg"],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Reflection"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://reflectionbeautyclinic.com/shop/${product.id}`,
      "priceCurrency": "GBP",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 5,
      "reviewCount": product.reviews || 1
    }
  };

  return (
    <div className="product-page page-enter">
      <SEO 
        title={product.name}
        description={product.subtitle + ". " + product.description.substring(0, 120) + "..."}
        path={`/shop/${product.id}`}
        schema={productSchema}
      />
      <div className="container" style={{ paddingTop: '72px' }}>
        <div className="product-detail reveal-on-scroll pt-5">
          {/* Left: Images */}
          <div className="product-detail__visuals">
            <div 
              className="product-detail__main-img style-bg-soft"
              style={{ padding: product.image_url ? '0' : '3rem', background: product.image_url ? 'transparent' : `linear-gradient(145deg, ${product.shade}55 0%, ${product.shade} 100%)` }}
            >
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              ) : (
                <div className="product-detail__img-content">
                  <span className="product-detail__img-name">{product.name}</span>
                  <span className="product-detail__img-size">{product.size}</span>
                </div>
              )}
            </div>
            <div className="product-detail__thumbnails">
              {[1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className="product-detail__thumb"
                  style={{ background: product.image_url ? '#f7f7f7' : `linear-gradient(145deg, ${product.shade}33 0%, ${product.shade}88 100%)` }}
                >
                  {product.image_url && <img src={product.image_url} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="product-detail__info">
            {/* Breadcrumbs */}
            <nav className="product-detail__breadcrumbs">
              <Link to="/shop">Shop</Link>
              <span>/</span>
              <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
              <span>/</span>
              <span className="current">{product.name}</span>
            </nav>

            <div className="product-detail__header">
              {product.badge && <span className="badge badge-gold" style={{ marginBottom: '1rem', background: 'var(--primary)', color: 'white', border: 'none' }}>{product.badge}</span>}
              <h1 className="product-detail__title display-sm">{product.name}</h1>
              <p className="product-detail__subtitle" style={{ fontSize: '1.2rem', color: 'var(--gray-dark)' }}>{product.subtitle}</p>
              <div className="reviews-label" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                <span className="stars">{'★'.repeat(Math.floor(product.rating || 5))}{'☆'.repeat(5 - Math.floor(product.rating || 5))}</span>
                <span>{product.rating} ({product.reviews || 24} reviews)</span>
              </div>
              <div className="product-detail__price">
                <span className="current" style={{ fontSize: '1.5rem', fontWeight: '500' }}>₦{Number(product.price).toLocaleString('en-NG')}</span>
                {product.originalPrice && <span className="original">₦{Number(product.originalPrice).toLocaleString('en-NG')}</span>}
              </div>
            </div>

            <p className="product-detail__desc body-lg" style={{ color: 'var(--gray-dark)' }}>{product.description}</p>
            
            <div className="product-detail__actions">
              <div className="product-qty" style={{ border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-full)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button 
                className="btn btn-primary product-add-btn"
                onClick={() => addItem(product, qty)}
                style={{ flex: 1 }}
              >
                Add to Cart — ₦{(product.price * qty).toLocaleString('en-NG')}
              </button>
            </div>

            {/* Tabs */}
            <div className="product-tabs" style={{ marginTop: '3rem', borderTop: '1px solid var(--gray-light)', paddingTop: '2rem' }}>
              <div className="product-tabs__nav" style={{ borderBottom: 'none', gap: '1rem' }}>
                <button 
                  className={`product-tabs__btn ${activeTab === 'benefits' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('benefits')}
                  style={activeTab === 'benefits' ? { borderBottom: '2px solid var(--black-soft)', color: 'var(--black-soft)' } : { borderBottom: '2px solid transparent', color: 'var(--gray-md)' }}
                >Benefits</button>
                <button 
                  className={`product-tabs__btn ${activeTab === 'ingredients' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('ingredients')}
                  style={activeTab === 'ingredients' ? { borderBottom: '2px solid var(--black-soft)', color: 'var(--black-soft)' } : { borderBottom: '2px solid transparent', color: 'var(--gray-md)' }}
                >Ingredients</button>
                <button 
                  className={`product-tabs__btn ${activeTab === 'how-to' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('how-to')}
                  style={activeTab === 'how-to' ? { borderBottom: '2px solid var(--black-soft)', color: 'var(--black-soft)' } : { borderBottom: '2px solid transparent', color: 'var(--gray-md)' }}
                >How to Use</button>
              </div>
              <div className="product-tabs__content" style={{ marginTop: '1.5rem', color: 'var(--gray-dark)' }}>
                {activeTab === 'benefits' && (
                  <ul className="product-benefits-list">
                    {product.benefits?.map((b, i) => (
                      <li key={i} style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.5rem' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>✓</span> {b}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'ingredients' && (
                  <div>
                    <p className="body-md"><strong>Key Actives:</strong></p>
                    <p className="body-md" style={{ marginTop: '0.5rem' }}>{product.ingredients}</p>
                    <p className="body-md" style={{ marginTop: '1rem', color: 'var(--gray-md)', fontStyle: 'italic' }}>Formulated without parabens, phthalates, synthetic fragrances, or mineral oil.</p>
                  </div>
                )}
                {activeTab === 'how-to' && (
                  <p className="body-md">Apply 2-3 drops to clean, dry skin. Gently press into face and neck. Allow to absorb fully before applying your moisturiser. Can be used daily, morning or night.</p>
                )}
              </div>
            </div>
            
            <div className="product-shipping-note" style={{ marginTop: '3rem', padding: '1rem', background: 'var(--base-bg)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span style={{ color: 'var(--black-soft)', fontWeight: '500', fontSize: '0.9rem' }}>Fast shipping across Lagos and Nationwide.</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="product-related reveal-on-scroll">
            <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>Complete Your Ritual</h2>
            <div className="shop-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
