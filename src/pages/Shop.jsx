import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Shop.css';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [sort, setSort] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    if (searchQuery) result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCategory, sort, searchQuery]);

  return (
    <div className="shop page-enter">
      {/* Page Header */}
      <div className="shop-hero">
        <div className="container">
          <span className="label">The Collection</span>
          <h1 className="shop-hero__title">Shop Reflection</h1>
          <p className="shop-hero__sub">Science-backed formulas for every skin concern. Discover your ritual.</p>
        </div>
      </div>

      <div className="shop-body container">
        {/* Filters */}
        <div className="shop-filters">
          <div className="shop-filters__cats">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`shop-filter-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSearchParams(cat.id === 'all' ? {} : { category: cat.id })}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="shop-filters__right">
            <div className="shop-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="shop-search__input"
                aria-label="Search products"
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="form-input shop-sort"
              aria-label="Sort products"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <p className="shop-count body-md">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="shop-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="shop-empty">
            <p className="shop-empty__title">No products found</p>
            <p className="shop-empty__sub">Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* Skin Quiz CTA */}
      <div className="shop-quiz-cta">
        <div className="container">
          <div className="shop-quiz-cta__inner">
            <div>
              <h3>Need help choosing?</h3>
              <p>Our skin quiz finds your perfect Reflection routine in 2 minutes.</p>
            </div>
            <a href="/rituals" className="btn btn-gold">Take the Quiz →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
