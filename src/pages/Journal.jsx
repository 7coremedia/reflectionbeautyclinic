import { Link } from 'react-router-dom';
import { blogPosts } from '../data/products';
import './Journal.css';

export default function Journal() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="journal-page page-enter">
      <div className="journal-hero">
        <div className="container">
          <span className="label">The Journal</span>
          <h1 className="display-md">Skin Intelligence</h1>
          <p className="journal-hero__sub">Education, rituals, and clinical insights from our experts.</p>
        </div>
      </div>

      <div className="container">
        {/* Featured Post */}
        <article className="journal-featured">
          <Link to={`/journal/${featured.id}`} className="journal-featured__img" style={{ background: `linear-gradient(145deg, ${featured.shade}88, ${featured.shade})` }} />
          <div className="journal-featured__content">
            <span className="badge badge-cream mb-3">{featured.category}</span>
            <div className="journal-meta">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <Link to={`/journal/${featured.id}`} className="journal-featured__title-link">
              <h2 className="journal-featured__title">{featured.title}</h2>
            </Link>
            <p className="journal-featured__excerpt">{featured.excerpt}</p>
            <Link to={`/journal/${featured.id}`} className="btn btn-outline" style={{ marginTop: '2rem' }}>Read Article</Link>
          </div>
        </article>

        {/* Categories */}
        <div className="journal-cats">
          {['All', 'Skin Science', 'Routines', 'Ingredients', 'Clinic'].map((cat, i) => (
            <button key={i} className={`journal-cat-btn ${i === 0 ? 'is-active' : ''}`}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="journal-grid">
          {rest.map(post => (
            <article key={post.id} className="journal-card">
              <Link to={`/journal/${post.id}`} className="journal-card__img" style={{ background: `linear-gradient(145deg, ${post.shade}88, ${post.shade})` }} />
              <div className="journal-card__body">
                <span className="badge badge-cream mb-2" style={{ alignSelf: 'flex-start' }}>{post.category}</span>
                <Link to={`/journal/${post.id}`} className="journal-card__title-link">
                  <h3 className="journal-card__title">{post.title}</h3>
                </Link>
                <div className="journal-meta mt-auto">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
