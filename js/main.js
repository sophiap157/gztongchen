/* ==========================================================================
   GZTONGCHEN.COM - Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initActiveNav();
    initFAQ();
    initNewsFilter();
    initContactForm();
    initCookieBanner();
    initRevealAnimations();
    initCounters();
    initYear();
    initToast();
    initParticles();
  }

  // Loading screen
  function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 600);
        document.body.classList.remove('loading');
      }, 400);
    });

    // Fallback - hide after 3s
    setTimeout(() => {
      if (loader && !loader.classList.contains('hide')) {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 600);
        document.body.classList.remove('loading');
      }
    }, 3000);
  }

  // Sticky header on scroll
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const onScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile navigation
  function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target === '#' || target === '#!') return;

        const targetEl = document.querySelector(target);
        if (!targetEl) return;

        e.preventDefault();
        const headerOffset = 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      });
    });
  }

  // Active nav highlighting
  function initActiveNav() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkFile = href.substring(href.lastIndexOf('/') + 1) || 'index.html';
      if (linkFile === filename) {
        link.classList.add('active');
      }
    });
  }

  // FAQ Accordion
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
          if (activeItem !== item) {
            activeItem.classList.remove('active');
          }
        });
        item.classList.toggle('active', !isActive);
      });
    });
  }

  // News filter
  function initNewsFilter() {
    const filters = document.querySelectorAll('.news-filter');
    const newsCards = document.querySelectorAll('.news-card');

    if (!filters.length) return;

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Update active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const category = filter.getAttribute('data-filter');

        newsCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category') || 'all';
          if (category === 'all' || cardCategory === category) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Contact form
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate sending
      setTimeout(() => {
        status.className = 'form-status success';
        status.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        form.reset();

        setTimeout(() => {
          status.className = 'form-status';
        }, 5000);
      }, 1200);
    });
  }

  // Cookie banner
  function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    const accepted = localStorage.getItem('cookie-accepted');
    if (!accepted) {
      setTimeout(() => {
        banner.classList.add('show');
      }, 2000);
    }

    const acceptBtn = banner.querySelector('[data-cookie-accept]');
    const declineBtn = banner.querySelector('[data-cookie-decline]');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-accepted', 'true');
        banner.classList.remove('show');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-accepted', 'false');
        banner.classList.remove('show');
      });
    }
  }

  // Reveal animations on scroll
  function initRevealAnimations() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
        el.classList.add('active', 'in-view');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active', 'in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }

  // Animated counters
  function initCounters() {
    const counters = document.querySelectorAll('.counter[data-target]');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const duration = parseInt(el.getAttribute('data-duration')) || 2000;
      const startTime = performance.now();
      const startVal = 0;
      const isFloat = target % 1 !== 0;

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = startVal + (target - startVal) * eased;
        el.textContent = isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
        }
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      counters.forEach(c => observer.observe(c));
    } else {
      counters.forEach(animate);
    }
  }

  // Update year in footer
  function initYear() {
    const yearEl = document.querySelector('[data-current-year]');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Toast notification
  function initToast() {
    window.showToast = function(title, message, duration) {
      const toast = document.querySelector('.toast');
      if (!toast) return;

      const titleEl = toast.querySelector('.toast-title');
      const messageEl = toast.querySelector('.toast-message');
      if (titleEl) titleEl.textContent = title;
      if (messageEl) messageEl.textContent = message;

      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, duration || 3000);
    };
  }

  // Particle background
  function initParticles() {
    const containers = document.querySelectorAll('.bg-particles');
    if (!containers.length) return;

    containers.forEach(container => {
      const count = parseInt(container.getAttribute('data-particles')) || 20;
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.opacity = (0.2 + Math.random() * 0.5);
        particle.style.width = (1 + Math.random() * 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
      }
    });
  }

})();
