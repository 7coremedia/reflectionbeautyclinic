import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../lib/api';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight } from 'lucide-react';
import './Shop.css';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [sort, setSort] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useReveal([loading]);

  useEffect(() => {
    async function loadData() {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(fetchedProducts || []);
      setCategories(fetchedCategories || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    if (searchQuery) result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return result;
  }, [activeCategory, sort, searchQuery, products]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Shop...</div>;
  }

  return (
    <div className="shop page-enter">
      {/* ── PAGE HEADER ── */}
      <section className="page-title-bar">
        <div className="container">
          <span className="label">The Collection</span>
          <h1 className="page-title-bar__heading">Shop <em>Reflection.</em></h1>
          <p className="page-title-bar__sub">Science-backed formulas for every skin concern.</p>
        </div>
      </section>

      <div className="shop-body container">
        {/* Filters */}
        <div className="shop-filters reveal-on-scroll">
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
        <p className="shop-count body-md reveal-on-scroll">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="shop-grid">
            {filtered.map((p, idx) => (
              <div key={p.id} className={`reveal-on-scroll stagger-${(idx % 4) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="shop-empty reveal-on-scroll">
            <p className="shop-empty__title">No products found</p>
            <p className="shop-empty__sub">Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* Skin Quiz CTA */}
      <section className="lifestyle-banner container reveal-on-scroll" style={{ marginTop: '0', marginBottom: '8rem' }}>
        <div className="lifestyle-banner__inner">
          <div className="lifestyle-banner__bg premium-gradient-3" />
          <div className="lifestyle-banner__content">
            <h2 className="display-md banner-title reveal-on-scroll stagger-1">Need help <em>choosing?</em></h2>
            <p className="body-lg banner-sub reveal-on-scroll stagger-2">
              Our clinical skin quiz analyzes your primary concerns, climate, and sensitivity to build a precise, results-driven Reflection routine in 2 minutes.
            </p>
            <div className="banner-actions reveal-on-scroll stagger-3">
              <a href="/rituals" className="btn btn-primary">
                Take the Quiz <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
