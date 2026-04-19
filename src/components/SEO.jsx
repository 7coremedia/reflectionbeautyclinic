import { useEffect } from 'react';

/**
 * SEO Component — injects title, meta tags, OG/Twitter cards, canonical, and JSON-LD
 * @param {string} title - Page title (appended with site name)
 * @param {string} description - Meta description
 * @param {string} [keywords] - Meta keywords
 * @param {Object} [schema] - JSON-LD Schema object
 * @param {string} [path] - Current path for canonical URL
 * @param {string} [ogImage] - Custom OG image URL (defaults to site OG)
 * @param {string} [ogType] - OG type (default: 'website')
 */
export default function SEO({
  title,
  description,
  keywords,
  schema,
  path = '',
  ogImage = 'https://reflection.ng/og-image.jpg',
  ogType = 'website',
}) {
  const siteName = 'Reflection Beauty Clinic';
  const fullTitle = `${title} | ${siteName}`;
  const canonicalBase = 'https://reflection.ng';
  const url = `${canonicalBase}${path}`;

  useEffect(() => {
    // ── Title ──
    document.title = fullTitle;

    // ── Helper to upsert meta tags ──
    const setMeta = (selector, attr, value, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // ── Helper to upsert link tags ──
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // ── Standard meta ──
    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords) setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // ── Canonical ──
    setLink('canonical', url);

    // ── Open Graph ──
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', siteName);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_NG');

    // ── Twitter Card ──
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // ── JSON-LD Schema ──
    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId);
    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    } else if (script) {
      script.remove();
    }

    return () => {};
  }, [fullTitle, description, keywords, schema, url, ogImage, ogType]);

  return null;
}
