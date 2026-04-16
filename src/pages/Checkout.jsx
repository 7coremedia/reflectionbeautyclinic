import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/api';
import './Checkout.css';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'United Kingdom',
    postcode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      setOrderError(null);
      try {
        await createOrder({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          postcode: formData.postcode,
          total_amount: total,
          status: 'pending',
          items: items // Automatically converted to JSONB
        });
        clearCart();
        setStep(3);
      } catch (err) {
        console.error('Checkout failed', err);
        setOrderError('There was a problem processing your order. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (step === 3) {
    return (
      <div className="checkout-page page-enter flex-center" style={{ minHeight: '80vh' }}>
        <div className="checkout-success">
          <div className="checkout-success__icon">✓</div>
          <h2>Thank you for your order.</h2>
          <p>Your Reflection ritual will be with you shortly. An email confirmation has been sent.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Return Home</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page page-enter flex-center flex-column" style={{ minHeight: '60vh' }}>
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/shop')}>Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="checkout-page page-enter">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="checkout-layout">
          {/* Form Side */}
          <div className="checkout-main">
            <h1 className="heading-lg mb-4">Checkout</h1>
            
            <div className="checkout-steps">
              <div className={`checkout-step ${step >= 1 ? 'is-active' : ''}`}>Shipping</div>
              <div className={`checkout-step ${step >= 2 ? 'is-active' : ''}`}>Payment</div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              {step === 1 && (
                <div className="checkout-section">
                  <h2 className="heading-md mb-3">Contact Information</h2>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input mb-4" placeholder="Email address" required />
                  
                  <h2 className="heading-md mb-3 mt-4">Shipping Address</h2>
                  <div className="grid-2 mb-3">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-input" placeholder="First name" required />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-input" placeholder="Last name" required />
                  </div>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-input mb-3" placeholder="Address" required />
                  <input type="text" className="form-input mb-3" placeholder="Apartment, suite, etc. (optional)" />
                  <div className="grid-3 mb-4">
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" placeholder="City" required />
                    <select name="country" value={formData.country} onChange={handleInputChange} className="form-input"><option>United Kingdom</option></select>
                    <input type="text" name="postcode" value={formData.postcode} onChange={handleInputChange} className="form-input" placeholder="Postcode" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Continue to Payment</button>
                </div>
              )}

              {step === 2 && (
                <div className="checkout-section">
                  <h2 className="heading-md mb-3">Payment Details</h2>
                  {orderError && <div style={{ color: 'red', marginBottom: '1rem' }}>{orderError}</div>}
                  <div className="payment-box">
                    <input type="text" className="form-input mb-3" placeholder="Card number" required />
                    <div className="grid-2 mb-3">
                      <input type="text" className="form-input" placeholder="MM / YY" required />
                      <input type="text" className="form-input" placeholder="CVC" required />
                    </div>
                    <input type="text" className="form-input" placeholder="Name on card" required />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)} disabled={loading}>Back</button>
                    <button type="submit" className="btn btn-primary flex-1" style={{ justifyContent: 'center' }} disabled={loading}>
                      {loading ? 'Processing...' : `Place Order — £${total.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Summary Side */}
          <div className="checkout-sidebar">
            <h3 className="heading-md mb-4">Order Summary</h3>
            <div className="checkout-items">
              {items.map(item => (
                <div key={item.id} className="checkout-item">
                  <div className="checkout-item__img" style={{ background: `linear-gradient(135deg, ${item.shade}88, ${item.shade})` }}>
                    <span className="checkout-item__qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-item__info">
                    <span className="checkout-item__name">{item.name}</span>
                    <span className="checkout-item__size">{item.size}</span>
                  </div>
                  <span className="checkout-item__price">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <div className="checkout-total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="checkout-total-row final">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
