/**
 * TOLINE E-COMMERCE - Main JavaScript
 * Core functionality, navigation, animations, UI interactions
 */

(function() {
  'use strict';

  // === DOM READY ===
  document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initMobileMenu();
    initSearchOverlay();
    initScrollAnimations();
    initButtonRipple();
    initTabs();
    initFAQ();
    initToast();
    initLazyLoading();
  });

  // === HEADER SCROLL EFFECT ===
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // === MOBILE MENU ===
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    const links = mobileNav.querySelectorAll('.mobile-nav-link');
    links.forEach(link => {
      link.addEventListener('click', function() {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === SEARCH OVERLAY ===
  function initSearchOverlay() {
    const triggers = document.querySelectorAll('[data-search-trigger]');
    const overlay = document.querySelector('.search-overlay');
    const closeBtn = document.querySelector('[data-search-close]');
    const input = overlay?.querySelector('.search-input');

    if (!overlay) return;

    triggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        overlay.classList.add('active');
        if (input) setTimeout(() => input.focus(), 300);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        overlay.classList.remove('active');
      });
    }

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
      }
    });

    // Keyboard shortcut Ctrl+K
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.add('active');
        if (input) setTimeout(() => input.focus(), 300);
      }
    });
  }

  // === SCROLL ANIMATIONS (Intersection Observer) ===
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      elements.forEach(el => el.classList.add('active'));
    }
  }

  // === BUTTON RIPPLE EFFECT ===
  function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // === TABS ===
  function initTabs() {
    const tabContainers = document.querySelectorAll('.product-tabs, .tabs-container');
    
    tabContainers.forEach(container => {
      const nav = container.querySelector('.tabs-nav');
      const buttons = nav?.querySelectorAll('.tab-btn');
      const contents = container.querySelectorAll('.tab-content');

      if (!buttons || !contents.length) return;

      buttons.forEach(btn => {
        btn.addEventListener('click', function() {
          const target = this.dataset.tab;
          
          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          
          this.classList.add('active');
          
          if (target) {
            const targetContent = container.querySelector(`[data-tab-content="${target}"]`);
            if (targetContent) targetContent.classList.add('active');
          }
        });
      });
    });
  }

  // === FAQ ACCORDION ===
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (!question) return;

      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // === TOAST NOTIFICATIONS ===
  function initToast() {
    window.showToast = function(options = {}) {
      const {
        title = 'Notification',
        message = '',
        type = 'success', // success, error, warning, info
        duration = 3000
      } = options;

      let container = document.querySelector('.toast-container');
      
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
      };

      toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-content">
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
        <button class="toast-close" aria-label="Close notification">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;

      container.appendChild(toast);

      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', function() {
        container.removeChild(toast);
      });

      if (duration > 0) {
        setTimeout(() => {
          if (container.contains(toast)) {
            container.removeChild(toast);
          }
        }, duration);
      }
    };
  }

  // === LAZY LOADING IMAGES ===
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // === UTILITY FUNCTIONS ===
  window.TolineUtils = {
    formatPrice: function(price) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(price);
    },

    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    throttle: function(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };

})();
