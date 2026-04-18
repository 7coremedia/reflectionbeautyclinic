import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Serums', href: '/shop?category=serums' },
    { label: 'Moisturisers', href: '/shop?category=moisturisers' },
    { label: 'Treatments', href: '/shop?category=treatments' },
    { label: 'SPF', href: '/shop?category=spf' },
    { label: 'Gift Sets', href: '/shop?category=gifts' },
  ],
  Clinic: [
    { label: 'Reflection Beauty Clinic', href: '/clinic' },
    { label: 'Book a Treatment', href: '/clinic#book' },
    { label: 'Our Treatments', href: '/clinic#treatments' },
    { label: 'Skin Consultations', href: '/clinic#consult' },
    { label: 'Membership', href: '/clinic#membership' },
  ],
  Help: [
    { label: 'My Account', href: '/account' },
    { label: 'Track Order', href: '/account' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
  ],
  Company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Journal', href: '/journal' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Press', href: '/press' },
    { label: 'Wholesale', href: '/wholesale' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer__newsletter">
        <div className="container container-sm">
          <div className="footer__newsletter-content">
            <h2 className="display-sm">Ritual refinement, delivered.</h2>
            <p className="body-md">Subscribe for early access, skin education, and members-only offers.</p>
            
            <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
              <div className="footer__newsletter-field">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="newsletter-input"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="newsletter-submit">
                  JOIN THE RITUAL
                </button>
              </div>
              <p className="footer__newsletter-legal">
                By subscribing you agree to our <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">Reflection</Link>
              <p className="footer__tagline">
                Skincare rooted in science.<br />Luxury without compromise.
              </p>
              <div className="footer__nap" style={{ margin: '1.5rem 0', opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--gold, #C8A882)' }}>Reflection Beauty Clinic</strong><br/>
                bus stop, 10 Idimu Rd, Egbeda,<br/>
                Lagos 102213, Lagos<br/>
                Phone: <a href="tel:+2348026021946" style={{ color: 'inherit', textDecoration: 'none' }}>0802 602 1946</a>
              </div>
              <div className="footer__social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer__social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.27 6.27 0 00-6.27 6.27 6.27 6.27 0 006.27 6.27 6.27 6.27 0 006.27-6.27V8.99a8.16 8.16 0 004.77 1.52V7.04a4.86 4.86 0 01-1-.35z"/>
                  </svg>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="footer__social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.24-5.24 1.24-5.24s-.32-.63-.32-1.57c0-1.47.85-2.57 1.91-2.57.9 0 1.34.68 1.34 1.49 0 .91-.58 2.27-.88 3.53-.25 1.05.52 1.91 1.56 1.91 1.87 0 3.12-2.4 3.12-5.24 0-2.16-1.46-3.68-3.55-3.68-2.41 0-3.83 1.81-3.83 3.68 0 .73.28 1.51.63 1.93a.25.25 0 01.06.24c-.06.27-.21.85-.24.97-.04.16-.13.19-.29.12-1.08-.5-1.76-2.09-1.76-3.36 0-2.73 1.98-5.24 5.72-5.24 3 0 5.33 2.14 5.33 5 0 2.98-1.87 5.37-4.48 5.37-.87 0-1.7-.45-1.98-0.99l-.54 2.01c-.19.75-.72 1.68-1.08 2.25.81.25 1.67.39 2.55.39 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div className="footer__col" key={title}>
                <h4 className="footer__col-title">{title}</h4>
                <ul>
                  {links.map(link => (
                    <li key={link.href}>
                      <Link to={link.href} className="footer__col-link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copy">© {new Date().getFullYear()} Reflection Skincare Ltd. All rights reserved.</p>
            <div className="footer__legal-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
            <div className="footer__payments">
              {['Visa', 'MC', 'Amex', 'Pay'].map(p => (
                <span key={p} className="footer__payment-badge">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
