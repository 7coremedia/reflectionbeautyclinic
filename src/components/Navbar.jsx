import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CartDrawer from './CartDrawer';
import './Navbar.css';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Clinic & Services', href: '#', hasMegaMenu: true },
  { label: 'Discover', href: '/rituals' },
  { label: 'Journal', href: '/journal' },
  { label: 'Our Story', href: '/about' },
];

const megaMenuCategories = [
  {
    title: 'Skin Clinic',
    path: '/skin-clinic',
    image: '/reflectio webp/face skin.webp',
    links: [
      { label: 'Hyperpigmentation', href: '/skin-clinic/hyperpigmentation-treatment-lagos' },
      { label: 'Acne Treatment', href: '/skin-clinic/acne-treatment-alimosho-lagos' },
      { label: 'Chemical Peel', href: '/skin-clinic/chemical-peel-lagos' },
      { label: 'Skin Consultation', href: '/skin-clinic/skin-consultation-lagos' }
    ]
  },
  {
    title: 'Facials',
    path: '/facials',
    image: '/reflectio webp/water on skin.webp',
    links: [
      { label: 'Brightening Facial', href: '/facials/brightening-facial-lagos' },
      { label: 'Anti-Ageing Facial', href: '/facials/anti-ageing-facial-alimosho-lagos' },
      { label: 'Deep Cleansing', href: '/facials/deep-cleansing-facial-lagos' },
      { label: 'Acne Facial', href: '/facials/acne-facial-alimosho-lagos' }
    ]
  },
  {
    title: 'Medical Spa',
    path: '/medical-spa',
    image: '/reflectio webp/back.webp',
    links: [
      { label: 'Skin Tag Removal', href: '/medical-spa/skin-tag-removal-lagos' },
      { label: 'Mole Removal', href: '/medical-spa/mole-removal-alimosho-lagos' },
      { label: 'Body Massage', href: '/medical-spa/body-massage-alimosho-lagos' },
      { label: 'Sauna', href: '/medical-spa/sauna-alimosho-lagos' }
    ]
  },
  {
    title: 'Teeth Whitening',
    path: '/teeth-whitening',
    image: '/reflectio webp/smile.webp', // Add a smile/teeth placeholder if needed, fallback to Hand
    links: [
      { label: 'Professional Whitening', href: '/teeth-whitening/professional-teeth-whitening-lagos' },
      { label: 'Scaling & Polishing', href: '/teeth-whitening/scaling-polishing-alimosho-lagos' },
      { label: 'Dental Beauty', href: '/teeth-whitening/dental-beauty-treatment-lagos' }
    ]
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
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
              <li 
                key={link.label}
                className={link.hasMegaMenu ? 'has-mega-menu' : ''}
                onMouseEnter={() => link.hasMegaMenu && setActiveMegaMenu(true)}
                onMouseLeave={() => link.hasMegaMenu && setActiveMegaMenu(false)}
              >
                {link.hasMegaMenu ? (
                  <button className={`navbar__link ${activeMegaMenu ? 'navbar__link--active' : ''}`}>
                    {link.label}
                    <span className="navbar__link-dot" />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`navbar__link ${location.pathname.startsWith(link.href) && link.href !== '/' ? 'navbar__link--active' : ''}`}
                  >
                    {link.label}
                    <span className="navbar__link-dot" />
                  </Link>
                )}

                {/* MEGA MENU DROPDOWN */}
                {link.hasMegaMenu && (
                  <AnimatePresence>
                    {activeMegaMenu && (
                      <motion.div 
                        className="mega-menu-dropdown"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="mega-menu-inner container">
                           {megaMenuCategories.map(cat => (
                             <div key={cat.title} className="mega-menu-column">
                               <Link to={cat.path} className="mega-menu-image-link" onClick={() => setActiveMegaMenu(false)}>
                                 <div className="mega-menu-image">
                                   <img src={cat.image} alt={cat.title} onError={(e) => { e.target.src = '/reflectio webp/Hand.webp'; }} />
                                   <div className="mega-menu-image-overlay">
                                     <span className="mega-menu-cat-title">{cat.title} <ArrowRight size={16} /></span>
                                   </div>
                                 </div>
                               </Link>
                               <ul className="mega-menu-list">
                                 {cat.links.map(sublink => (
                                   <li key={sublink.href}>
                                     <Link to={sublink.href} onClick={() => setActiveMegaMenu(false)}>{sublink.label}</Link>
                                   </li>
                                 ))}
                                 <li>
                                   <Link to={cat.path} className="view-all-link" onClick={() => setActiveMegaMenu(false)}>View all {cat.title.toLowerCase()}</Link>
                                 </li>
                               </ul>
                             </div>
                           ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
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
                      <Link to={link.href === '#' ? '/clinic' : link.href} className="mobile-overlay__link" onClick={() => setMenuOpen(false)}>
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
