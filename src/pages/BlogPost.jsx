import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogPostById } from '../lib/api';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getBlogPostById(id);
      setPost(data);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Article...</div>;
  }

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
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div>
                <p style={{ marginBottom: '1.5rem' }}>
                  The skin barrier, or stratum corneum, is the outermost layer of your epidermis. Think of it as a brick wall: your skin cells are the bricks, and the lipid matrix (ceramides, cholesterol, and fatty acids) is the mortar holding it all together. When this wall is intact, moisture stays in, and irritants stay out.
                </p>
                <div style={{ padding: '2rem', background: 'var(--cream-dark)', borderRadius: 'var(--radius-md)', margin: '2rem 0', fontStyle: 'italic', textAlign: 'center', color: 'var(--near-black)' }}>
                  "Healthy skin is resilient skin. Focus on the barrier first, and the rest will follow." — Reflection Clinic Team
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
