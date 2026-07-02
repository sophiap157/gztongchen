/* ==========================================================================
   GZTONGCHEN.COM - Advanced Animations
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initParallax();
    initMagneticButtons();
    initTiltEffect();
    initTextReveal();
    initCursorGlow();
    initCodeRain();
  }

  // Parallax scrolling for hero elements
  function initParallax() {
    const elements = document.querySelectorAll('[data-parallax]');
    if (!elements.length) return;

    let ticking = false;
    const update = () => {
      const scrollY = window.pageYOffset;
      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
        const yPos = -(scrollY * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  // Magnetic button effect
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .magnetic');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // 3D tilt effect on cards
  function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Text reveal animation
  function initTextReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.text-reveal').forEach(el => {
      const inner = el.querySelector('.text-reveal-inner');
      if (inner) {
        observer.observe(el);
      }
    });
  }

  // Cursor glow effect
  function initCursorGlow() {
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });

    // Expand on interactive elements
    document.querySelectorAll('a, button, .feature-card, .product-card, .news-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
    });

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animate);
    };
    animate();
  }

  // Code rain effect for hero section
  function initCodeRain() {
    const container = document.querySelector('.code-rain');
    if (!container) return;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]().,;:=*+-/<>!';
    const columnWidth = 14;
    const columns = Math.floor(window.innerWidth / columnWidth);

    container.style.position = 'absolute';
    container.style.inset = '0';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0.06';

    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.style.position = 'absolute';
      column.style.top = '-100%';
      column.style.left = (i * columnWidth) + 'px';
      column.style.color = '#00d4ff';
      column.style.fontFamily = 'monospace';
      column.style.fontSize = '14px';
      column.style.lineHeight = '1.2';
      column.style.whiteSpace = 'pre';
      column.style.animation = `codeRain ${8 + Math.random() * 12}s linear ${Math.random() * 5}s infinite`;

      let text = '';
      const length = 30 + Math.floor(Math.random() * 30);
      for (let j = 0; j < length; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '\n';
      }
      column.textContent = text;
      container.appendChild(column);
    }

    // Add CSS animation
    if (!document.getElementById('code-rain-style')) {
      const style = document.createElement('style');
      style.id = 'code-rain-style';
      style.textContent = `
        @keyframes codeRain {
          0% { transform: translateY(0); }
          100% { transform: translateY(2000px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

})();
