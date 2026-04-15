import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`cart-drawer ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="cart-drawer__header">
          <div>
            <h2 className="cart-drawer__title">Your Cart</h2>
            {items.length > 0 && (
              <span className="cart-drawer__count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
            )}
          </div>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="cart-empty__title">Your cart is empty</p>
              <p className="cart-empty__sub">Add something beautiful to begin.</p>
              <Link to="/shop" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{marginTop:'1.5rem'}}>
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div
                    className="cart-item__img"
                    style={{ background: `linear-gradient(135deg, ${item.shade}88, ${item.shade})` }}
                  >
                    <span className="cart-item__img-label">{item.name.split(' ')[0]}</span>
                  </div>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__sub">{item.size}</p>
                    <div className="cart-item__row">
                      <div className="cart-item__qty">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <span className="cart-item__price">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <p className="cart-note">Shipping & taxes calculated at checkout</p>
            <Link to="/checkout" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} onClick={() => setIsOpen(false)}>
              Checkout
            </Link>
            <Link to="/cart" className="btn btn-ghost" style={{width:'100%', justifyContent:'center', marginTop:'0.75rem'}} onClick={() => setIsOpen(false)}>
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
