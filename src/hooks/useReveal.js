import { useEffect } from 'react';

export function useReveal(deps = []) {
  useEffect(() => {
    function revealAll() {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.1) {
          el.classList.add('is-revealed');
        }
      });
    }

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -5% 0px', threshold: 0.05 }
      );

      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });

      // Hard fallback: reveal everything after 1.5s regardless
      const fallback = setTimeout(() => {
        document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)')
          .forEach(el => el.classList.add('is-revealed'));
      }, 1500);

      return () => {
        observer.disconnect();
        clearTimeout(fallback);
      };
    }, 150);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
