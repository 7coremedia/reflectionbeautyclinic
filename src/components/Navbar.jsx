import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
import './Navbar.css';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Clinic', href: '/clinic' },
  { label: 'Rituals', href: '/rituals' },
  { label: 'Journal', href: '/journal' },
  { label: 'Our Story', href: '/about' },
];

const tickerItems = [
  'Skin Clinic · Alimosho, Lagos',
  'Facials & Advanced Treatments',
  'Medical Spa & Wellness',
  'Professional Teeth Whitening',
  'SkincareByReflection™ Products',
];
const tickerContent = [...tickerItems, ...tickerItems];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    menuOpen ? 'navbar--open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        
        {/* ── TICKER GLOBALLY ATTACHED TO NAVBAR ── */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-inner">
            {tickerContent.map((item, i) => (
              <span key={i} className="ticker-item">
                {item}
                <span className="ticker-dot">·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="navbar__inner container">
          {/* Logo Area */}
          <div className="navbar__logo-wrapper">
            <Link to="/" className="navbar__logo" aria-label="Reflection Home">
              <span className="navbar__logo-main">REFLECTION</span>
              <span className="navbar__logo-sub">BEAUTY CLINIC</span>
            </Link>
          </div>

          {/* Desktop Nav Center */}
          <ul className="navbar__links" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`navbar__link ${location.pathname.startsWith(link.href) ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                  <span className="navbar__link-dot" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Tools */}
          <div className="navbar__actions">
            <Link to="/account" className="navbar__action-btn" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            
            <button
              className="navbar__action-btn navbar__cart-btn"
              onClick={() => setIsOpen(true)}
              aria-label={`Cart, ${count} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {count > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="navbar__cart-count"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <button
              className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <div className="hamburger-line top" />
              <div className="hamburger-line mid" />
              <div className="hamburger-line bot" />
            </button>
          </div>
        </div>

        {/* 10x BETTER MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100dvh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="navbar__mobile-overlay"
            >
              <div className="mobile-overlay__content container">
                <ul className="mobile-overlay__links">
                  {navLinks.map((link, i) => (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link to={link.href} className="mobile-overlay__link">
                        <span className="link-num">0{i + 1}</span>
                        <span className="link-label">{link.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                   className="mobile-overlay__footer"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.4 }}
                >
                  <Link to="/account" className="btn btn-primary">Member Account</Link>
                  <div className="mobile-overlay__socials">
                    <a href="#">Instagram</a>
                    <a href="#">TikTok</a>
                    <a href="#">Twitter</a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer />
    </>
  );
}
