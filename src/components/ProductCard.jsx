import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card" id={`product-${product.id}`}>
      <Link to={`/shop/${product.id}`} className="product-card__img-wrap">
        <div
          className="product-card__img img-placeholder"
          style={{
            padding: product.image_url ? '0' : undefined,
            background: product.image_url ? 'none' : `linear-gradient(145deg, ${product.shade}55 0%, ${product.shade}cc 50%, ${product.shade}88 100%)`
          }}
        >
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div className="product-card__img-content">
              <span className="product-card__img-name">{product.name}</span>
              <span className="product-card__img-size">{product.size}</span>
            </div>
          )}
        </div>
        {product.badge && (
          <span className="product-card__badge badge badge-dark">{product.badge}</span>
        )}
        <div className="product-card__hover-cta">Quick Add</div>
      </Link>

      <div className="product-card__body">
        <div className="product-card__rating">
          <span className="product-card__stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="product-card__review-count">({product.reviews})</span>
        </div>
        <Link to={`/shop/${product.id}`} className="product-card__name-link">
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <p className="product-card__subtitle">{product.subtitle}</p>
        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__price-current">£{product.price}</span>
            {product.originalPrice && (
              <span className="product-card__price-original">£{product.originalPrice}</span>
            )}
          </div>
          <button
            className="product-card__add-btn"
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            aria-label={`Add ${product.name} to cart`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
