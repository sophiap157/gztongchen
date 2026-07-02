/* ==========================================================================
   GZTONGCHEN.COM - Interactions & Page Logic
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initBackToTop();
    initReadingProgress();
    initFormValidation();
    initLazyLoad();
    initSearchFilter();
    initAnimations();
  }

  // Back to top button
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reading progress bar
  function initReadingProgress() {
    const progress = document.querySelector('.reading-progress');
    if (!progress) return;

    const update = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = percent + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // Form validation helper
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    if (!forms.length) return;

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        let valid = true;
        form.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('error');
            valid = false;
          } else {
            field.classList.remove('error');
          }
        });

        // Email validation
        form.querySelectorAll('[type="email"]').forEach(field => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (field.value && !emailRegex.test(field.value)) {
            field.classList.add('error');
            valid = false;
          }
        });

        if (!valid) {
          e.preventDefault();
          if (window.showToast) {
            window.showToast('Validation Error', 'Please fill in all required fields correctly.');
          }
        }
      });
    });
  }

  // Lazy load images
  function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;

    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Search/filter for news and products
  function initSearchFilter() {
    const searchInput = document.querySelector('[data-search]');
    if (!searchInput) return;

    const target = document.querySelector(searchInput.getAttribute('data-search'));
    if (!target) return;

    const items = target.querySelectorAll('[data-searchable]');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Page-specific animations
  function initAnimations() {
    // Stagger animation for grid items
    document.querySelectorAll('[data-stagger]').forEach(container => {
      const children = container.children;
      Array.from(children).forEach((child, i) => {
        child.style.setProperty('--stagger-delay', `${i * 0.1}s`);
        child.classList.add('stagger-item');
      });
    });

    // Auto-add hover-lift to cards
    document.querySelectorAll('.feature-card, .product-card, .news-card, .team-card, .pricing-card').forEach(card => {
      card.classList.add('hover-lift');
    });
  }

})();
