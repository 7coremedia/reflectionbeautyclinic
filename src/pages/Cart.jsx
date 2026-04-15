import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="cart-page page-enter">
      <div className="container container-sm">
        <h1 className="display-md" style={{ marginBottom: '2rem', textAlign: 'center' }}>Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="cart-empty" style={{ minHeight: '40vh' }}>
            <p className="cart-empty__title">Your cart is empty.</p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-full">
            <div className="cart-table">
              <div className="cart-table__header">
                <div>Product</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>
              <div className="cart-table__body">
                {items.map(item => (
                  <div key={item.id} className="cart-row">
                    <div className="cart-row__product">
                      <Link to={`/shop/${item.id}`} className="cart-row__img" style={{ background: `linear-gradient(135deg, ${item.shade}88, ${item.shade})` }} />
                      <div className="cart-row__info">
                        <Link to={`/shop/${item.id}`} className="cart-row__name">{item.name}</Link>
                        <p className="cart-row__size">{item.size}</p>
                        <p className="cart-row__price">£{item.price}</p>
                        <button className="cart-row__remove" onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    </div>
                    <div className="cart-row__qty">
                      <div className="product-qty">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="cart-row__total">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span className="cart-summary__value">£{total.toFixed(2)}</span>
              </div>
              <p className="cart-summary__note">Shipping & taxes calculated at checkout</p>
              <Link to="/checkout" className="btn btn-primary btn-block" style={{ width: '100%', justifyContent: 'center' }}>Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
