import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import './Navbar.css';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Clinic', href: '/clinic' },
  { label: 'Rituals', href: '/rituals' },
  { label: 'Journal', href: '/journal' },
  { label: 'Our Story', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, isOpen, setIsOpen } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navClass = [
    'navbar',
    scrolled ? 'navbar--scrolled' : '',
    isHome && !scrolled ? 'navbar--transparent' : '',
    menuOpen ? 'navbar--open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Reflection Home">
            <span className="navbar__logo-main">Reflection</span>
            <span className="navbar__logo-sub">Beauty Clinic</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__links" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`navbar__link ${location.pathname.startsWith(link.href) ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar__actions">
            <Link to="/account" className="navbar__action-btn" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button
              className="navbar__action-btn navbar__cart-btn"
              onClick={() => setIsOpen(true)}
              aria-label={`Cart, ${count} items`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {count > 0 && <span className="navbar__cart-count">{count}</span>}
            </button>
            <button
              className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
          <ul role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link to={link.href} className="navbar__mobile-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-footer">
            <Link to="/account" className="btn btn-outline">My Account</Link>
          </div>
        </div>
      </nav>

      <CartDrawer />
    </>
  );
}
