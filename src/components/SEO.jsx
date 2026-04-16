import { useEffect } from 'react';

/**
 * SEO Component
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {Object} [props.schema] - JSON-LD Schema object
 * @param {string} [props.path] - Current path for canonical URL
 */
export default function SEO({ title, description, schema, path = '' }) {
  const siteName = "Reflection Beauty Clinic";
  const fullTitle = `${title} | ${siteName}`;
  const canonicalBase = "https://reflectionbeautyclinic.com"; // Replace with actual domain if different
  const url = `${canonicalBase}${path}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Handle Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', url);

    // 4. Handle JSON-LD Schema
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

    // Cleanup on unmount
    return () => {
      // Optional: Reset title if needed, but usually redundant in SPAs
    };
  }, [fullTitle, description, schema, url]);

  return null;
}
