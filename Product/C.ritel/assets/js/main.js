/* ========================================
   FASHION BRAND - Main JavaScript
   ======================================== */

(function() {
  'use strict';

  // Initialize all modules when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initScrollToTop();
    initNewsletterForm();
    initSmoothScroll();
    initLazyLoading();
  });

  /**
   * Loading Screen
   */
  function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loadingScreen.classList.add('hidden');
        }, 500);
      });
    }
  }

  /**
   * Scroll to Top Button
   */
  function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top');
    
    if (!scrollBtn) return;

    function toggleScrollButton() {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleScrollButton, { passive: true });
    toggleScrollButton();

    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Newsletter Form Validation
   */
  function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (!form) return;

    const input = form.querySelector('.newsletter-input');
    const button = form.querySelector('.btn');

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function showMessage(message, type) {
      let alert = form.querySelector('.alert');
      
      if (!alert) {
        alert = document.createElement('div');
        alert.className = 'alert';
        form.parentNode.insertBefore(alert, form.nextSibling);
      }

      alert.textContent = message;
      alert.className = 'alert alert-' + type;

      setTimeout(function() {
        alert.textContent = '';
        alert.className = 'alert';
      }, 3000);
    }

    button.addEventListener('click', function(e) {
      e.preventDefault();

      const email = input.value.trim();

      if (!email) {
        showMessage('Please enter your email address.', 'warning');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate submission
      showMessage('Thank you for subscribing!', 'success');
      input.value = '';
    });
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Lazy Loading Images
   */
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      images.forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      images.forEach(function(img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  /**
   * Debounce Utility
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  /**
   * Throttle Utility
   */
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // Export utilities for use in other modules
  window.FashionBrand = {
    debounce: debounce,
    throttle: throttle
  };

})();
