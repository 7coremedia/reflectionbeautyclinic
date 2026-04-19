import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import './GetStartedModal.css';

const quickActions = [
  {
    title: 'Skin Treatments',
    desc: 'Target hyperpigmentation, acne & more.',
    path: '/skin-clinic',
    image: '/reflectio webp/face skin.webp',
  },
  {
    title: 'Facials',
    desc: 'Brightening, anti-ageing & deep cleansing.',
    path: '/facials',
    image: '/reflectio webp/water on skin.webp',
  },
  {
    title: 'Medical Spa',
    desc: 'Massage, mole removal & wellness.',
    path: '/medical-spa',
    image: '/reflectio webp/back.webp',
  },
  {
    title: 'Shop Skincare',
    desc: 'Science-led products formulated in-house.',
    path: '/shop',
    image: '/reflectio webp/bottles in water.webp',
  }
];

export default function GetStartedModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="get-started-overlay">
        <motion.div 
          className="get-started-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        <motion.div 
          className="get-started-modal"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="modal-header">
            <h3>How can we help you?</h3>
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>

          <div className="modal-body">
            {quickActions.map((action, index) => (
              <motion.div 
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
              >
                <Link to={action.path} className="action-card" onClick={onClose}>
                  <div className="action-image-wrapper">
                    <img src={action.image} alt={action.title} />
                  </div>
                  <div className="action-content">
                    <h4>{action.title}</h4>
                    <p>{action.desc}</p>
                    <span className="action-link-text">Explore <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="modal-footer">
            <Link to="/book" className="btn btn-outline" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
              I just want to speak to a specialist
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
