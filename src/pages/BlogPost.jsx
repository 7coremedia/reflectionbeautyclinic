import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/products';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="container section flex-center flex-column" style={{ minHeight: '60vh', paddingTop: '100px' }}>
        <h2>Article not found</h2>
        <Link to="/journal" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Journal</Link>
      </div>
    );
  }

  return (
    <article className="blog-post page-enter" style={{ paddingTop: '72px', background: 'var(--cream)', minHeight: '100vh', paddingBottom: 'var(--space-3xl)' }}>
      {/* Header Visual */}
      <div 
        className="blog-post__visual"
        style={{ 
          height: '50vh', 
          minHeight: '400px',
          background: `linear-gradient(145deg, ${post.shade}88, ${post.shade})`,
          position: 'relative'
        }}
      >
        <div className="container" style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0 }}>
          <span className="badge badge-cream mb-3">{post.category}</span>
        </div>
      </div>

      <div className="container container-sm" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'var(--warm-white)', padding: '3rem 4rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="journal-meta" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="display-md" style={{ textAlign: 'center', marginBottom: '2rem' }}>{post.title}</h1>
          <p className="body-lg" style={{ textAlign: 'center', color: 'var(--stone)', marginBottom: '3rem', fontStyle: 'italic' }}>
            {post.excerpt}
          </p>
          <div className="divider" style={{ marginBottom: '3rem' }} />

          <div className="blog-post__content body-lg" style={{ color: 'var(--charcoal)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              The skin barrier, or stratum corneum, is the outermost layer of your epidermis. Think of it as a brick wall: your skin cells are the bricks, and the lipid matrix (ceramides, cholesterol, and fatty acids) is the mortar holding it all together. When this wall is intact, moisture stays in, and irritants stay out.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              However, modern skincare routines—often packed with strong exfoliants, high-strength retinoids, and alkaline cleansers—can slowly chip away at this mortar. The result is transepidermal water loss (TEWL), leading to dehydration, redness, and increased sensitivity.
            </p>
            <h3 className="heading-md" style={{ margin: '2.5rem 0 1rem' }}>Signs of a Compromised Barrier</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Chronic redness and inflammation</li>
              <li>A tight, uncomfortable feeling even after moisturising</li>
              <li>Products that never used to sting suddenly causing a burning sensation</li>
              <li>Increased breakouts and slow healing</li>
            </ul>
            <p style={{ marginBottom: '1.5rem' }}>
              If you’re experiencing these symptoms, the first and most crucial step is to pause all active ingredients. Yes, even your beloved Vitamin C. Your skin needs a break to repair itself.
            </p>
            <h3 className="heading-md" style={{ margin: '2.5rem 0 1rem' }}>The Protocol for Repair</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Switch to a gentle, ceramide-rich cleanser like the Reflection Silk Cleanser. Follow with a barrier-repairing moisturiser, such as the Velvet Moisturiser, which contains the optimal ratio of ceramides, cholesterol, and fatty acids to mimic the skin’s natural lipid structure.
            </p>
            <div style={{ padding: '2rem', background: 'var(--cream-dark)', borderRadius: 'var(--radius-md)', margin: '2rem 0', fontStyle: 'italic', textAlign: 'center', color: 'var(--near-black)' }}>
              "Healthy skin is resilient skin. Focus on the barrier first, and the rest will follow." — Reflection Clinic Team
            </div>
            <p>
              Repairing the barrier takes time—usually two to four weeks. Only once the skin feels calm and resilient should you slowly reintroduce actives, starting with once or twice a week. Listen to your skin; it always tells you what it needs.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
