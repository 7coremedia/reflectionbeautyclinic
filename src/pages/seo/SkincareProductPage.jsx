import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useReveal } from '../../hooks/useReveal';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, ArrowLeft, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import './SkincareProductPage.css';

// Minimal mock data for SEO products (Normally fetched from backend)
const seoProductsData = {
  'vitamin-c-serum': {
    title: 'Vitamin C Face Serum Lagos | SkincareByReflection™',
    h1: 'Vitamin C Face Serum — SkincareByReflection™',
    price: 45000,
    priceStr: '₦45,000',
    description: '15% Vitamin C + 5% Niacinamide formula. Specifically developed for melanated skin to brighten uneven tone, fade post-inflammatory hyperpigmentation, and provide powerful antioxidant protection against Lagos sun damage.',
    howItWorks: 'L-Ascorbic acid works in tandem with Niacinamide to inhibit melanin production at the cellular level while preventing transepidermal water loss.',
    whoItsFor: 'Ideal for those struggling with dark spots, dullness, and early signs of environmental skin damage.',
    howToUse: 'Apply 3-4 drops to clean, dry skin every morning. Follow with moisturizer and SPF 50. Do not mix with strong chemical exfoliants.',
    image: '/reflectio webp/bottles in water.webp',
    relatedTreatment: { title: 'Hyperpigmentation Treatment', path: '/skin-clinic/hyperpigmentation-treatment-lagos' },
    keywords: 'vitamin c serum lagos, skin brightening serum alimosho'
  },
  'flawless-face-cream': {
    title: 'Flawless Face Cream | SkincareByReflection™ Lagos',
    h1: 'Reflection Flawless Face Cream',
    price: 38000,
    priceStr: '₦38,000',
    description: 'A deeply nourishing, barrier-repairing cream designed to lock in active serums while providing a breathable shield against environmental stressors.',
    howItWorks: 'Ceramides and peptides rebuild the lipid barrier, preventing moisture escape and reducing inflammation caused by active treatments.',
    whoItsFor: 'Suitable for all skin types, particularly those with compromised barriers or undergoing intensive clinical treatments.',
    howToUse: 'Massage a dime-sized amount into face and neck morning and night as the final step before sunscreen.',
    image: '/reflectio webp/3 sets on stand.webp',
    relatedTreatment: { title: 'Hydrating Facial', path: '/facials/hydrating-facial-lagos' },
    keywords: 'flawless face cream lagos, barrier repair cream'
  },
  'flawless-toning-milk': {
    title: 'Flawless Toning Milk | SkincareByReflection™',
    h1: 'Flawless Toning Milk',
    price: 32000,
    priceStr: '₦32,000',
    description: 'A gentle, full-body restorative milk that lightly exfoliates while deeply moisturizing, promoting an even, radiant complexion neck-down.',
    howItWorks: 'Lactic acid gently dissolves dead skin cells while rich botanical oils restore suppleness to dry, ashy skin areas.',
    whoItsFor: 'Anyone looking to even out body skin tone, particularly on knees, elbows, and sun-exposed areas.',
    howToUse: 'Apply generously to the body immediately after showering while skin is still slightly damp.',
    image: '/reflectio webp/4 set open.webp',
    relatedTreatment: { title: 'Chemical Peel', path: '/skin-clinic/chemical-peel-lagos' },
    keywords: 'flawless toning milk lagos, body brightening cream'
  },
  'midnight-retinol-oil': {
    title: 'Midnight Retinol Oil Lagos | SkincareByReflection™',
    h1: 'Midnight Retinol Oil — Overnight Renewal',
    price: 52000,
    priceStr: '₦52,000',
    description: 'A potent yet gentle squalane-based retinol treatment that accelerates cell turnover while you sleep, without the typical redness or flaking.',
    howItWorks: 'Encapsulated retinol delivers active Vitamin A slowly throughout the night, reducing fine lines and hormonal breakouts.',
    whoItsFor: 'Acne-prone skin, aging skin, and those looking to refine skin texture and pore size.',
    howToUse: 'Apply 2-3 drops at night to cleansed skin. Start 2 nights a week and build tolerance. Must use SPF daily.',
    image: '/reflectio webp/two drops.webp',
    relatedTreatment: { title: 'Acne Treatment', path: '/skin-clinic/acne-treatment-alimosho-lagos' },
    keywords: 'midnight retinol oil lagos, retinol serum alimosho'
  }
};

export default function SkincareProductPage() {
  const { product: productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useReveal([loading, productSlug]);

  useEffect(() => {
    const data = seoProductsData[productSlug];
    setProduct(data || null);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [productSlug]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: productSlug,
      name: product.h1,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return null;

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '150px', minHeight: '50vh' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">Visit Main Shop</Link>
      </div>
    );
  }

  return (
    <div className="skincare-product-page page-enter">
      <SEO 
        title={product.title}
        description={product.description}
        keywords={product.keywords}
      />

      <div className="container breadcrumb-nav">
        <Link to="/shop" className="breadcrumb-link">
          <ArrowLeft size={16} /> Back to Collection
        </Link>
      </div>

      <section className="product-showcase container">
        <div className="product-grid">
          
          <div className="product-image-container reveal-on-scroll stagger-1">
            <img src={product.image} alt={product.h1} className="product-img" />
          </div>

          <div className="product-details reveal-on-scroll stagger-2">
            <span className="label" style={{ marginBottom: '1rem', display: 'block' }}>SkincareByReflection™</span>
            <h1 className="display-sm">{product.h1}</h1>
            <p className="product-price">{product.priceStr}</p>
            
            <p className="body-md product-description">{product.description}</p>
            
            <button 
              className={`btn ${added ? 'btn-outline' : 'btn-primary'} add-to-cart-btn`}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={20} />
              {added ? 'Added to Cart' : 'Add to Cart — ' + product.priceStr}
            </button>

            <div className="product-values">
               <div className="value-item"><ShieldCheck size={20} /> Clinically Formulated</div>
               <div className="value-item"><Leaf size={20} /> Cruelty Free</div>
            </div>

            <div className="product-accordion">
               <div className="accordion-item">
                 <h4>How it Works</h4>
                 <p>{product.howItWorks}</p>
               </div>
               <div className="accordion-item">
                 <h4>Who it's For</h4>
                 <p>{product.whoItsFor}</p>
               </div>
               <div className="accordion-item">
                 <h4>How to Use</h4>
                 <p>{product.howToUse}</p>
               </div>
            </div>

            {product.relatedTreatment && (
              <div className="related-treatment glass-effect">
                <h4>Enhance your results</h4>
                <p>Pair this product with our clinical <strong>{product.relatedTreatment.title}</strong> for accelerated results.</p>
                <Link to={product.relatedTreatment.path} className="text-btn">View Treatment <ArrowRight size={16} /></Link>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

// ArrowRight needs to be imported, let's fix the imports
