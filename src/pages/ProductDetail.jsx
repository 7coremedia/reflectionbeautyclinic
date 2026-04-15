import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');

  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container section flex-center flex-column" style={{ minHeight: '60vh' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="product-page page-enter">
      <div className="container">
        <div className="product-detail">
          {/* Left: Images */}
          <div className="product-detail__visuals">
            <div 
              className="product-detail__main-img"
              style={{ background: `linear-gradient(145deg, ${product.shade}55 0%, ${product.shade} 100%)` }}
            >
              <div className="product-detail__img-content">
                <span className="product-detail__img-name">{product.name}</span>
                <span className="product-detail__img-size">{product.size}</span>
              </div>
            </div>
            <div className="product-detail__thumbnails">
              {[1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className="product-detail__thumb"
                  style={{ background: `linear-gradient(145deg, ${product.shade}33 0%, ${product.shade}88 100%)` }}
                />
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
              {product.badge && <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>{product.badge}</span>}
              <h1 className="product-detail__title">{product.name}</h1>
              <p className="product-detail__subtitle">{product.subtitle}</p>
              <div className="product-detail__rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span>{product.rating} ({product.reviews} reviews)</span>
              </div>
              <div className="product-detail__price">
                <span className="current">£{product.price}</span>
                {product.originalPrice && <span className="original">£{product.originalPrice}</span>}
              </div>
            </div>

            <p className="product-detail__desc body-lg">{product.description}</p>
            
            <div className="product-detail__actions">
              <div className="product-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button 
                className="btn btn-primary product-add-btn"
                onClick={() => addItem(product, qty)}
              >
                Add to Cart — £{(product.price * qty).toFixed(2)}
              </button>
            </div>

            {/* Tabs */}
            <div className="product-tabs">
              <div className="product-tabs__nav">
                <button 
                  className={`product-tabs__btn ${activeTab === 'benefits' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('benefits')}
                >Benefits</button>
                <button 
                  className={`product-tabs__btn ${activeTab === 'ingredients' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('ingredients')}
                >Ingredients</button>
                <button 
                  className={`product-tabs__btn ${activeTab === 'how-to' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('how-to')}
                >How to Use</button>
              </div>
              <div className="product-tabs__content">
                {activeTab === 'benefits' && (
                  <ul className="product-benefits-list">
                    {product.benefits.map((b, i) => (
                      <li key={i}><span className="check">✓</span> {b}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'ingredients' && (
                  <div>
                    <p className="body-md"><strong>Key Ingredients:</strong></p>
                    <p className="body-md" style={{ marginTop: '0.5rem' }}>{product.ingredients}</p>
                    <p className="body-md" style={{ marginTop: '1rem', color: 'var(--stone)' }}>Formulated without parabens, phthalates, synthetic fragrances, or mineral oil.</p>
                  </div>
                )}
                {activeTab === 'how-to' && (
                  <p className="body-md">Apply 2-3 drops to clean, dry skin. Gently press into face and neck. Allow to absorb fully before applying your moisturiser. Can be used daily, morning or night.</p>
                )}
              </div>
            </div>
            
            <div className="product-shipping-note">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span>Free standard shipping on all orders over £65.</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="product-related">
            <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>Complete Your Ritual</h2>
            <div className="grid-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
