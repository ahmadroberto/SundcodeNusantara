/* ========================================
   FASHION BRAND - Animations JavaScript
   ======================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initParallax();
    initCounters();
    initSmoothScrollAnimations();
    initStaggerAnimation();
    initMagneticButtons();
  });

  /**
   * Scroll Reveal Animation - Enhanced
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, ' +
      '.reveal-fade, .reveal-blur, .reveal-rotate, .reveal-slide-up, ' +
      '.reveal-bounce, .reveal-zoom, .reveal-flip'
    );

    if (revealElements.length === 0) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
      });

      revealElements.forEach(function(element) {
        observer.observe(element);
      });
    } else {
      // Fallback: show all elements
      revealElements.forEach(function(element) {
        element.classList.add('active');
      });
    }
  }

  /**
   * Smooth Scroll-triggered Animations
   */
  function initSmoothScrollAnimations() {
    const animatedSections = document.querySelectorAll('.section');
    
    if (animatedSections.length === 0) return;

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
      });

      animatedSections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
      });
    }
  }

  /**
   * Parallax Effect - Enhanced
   */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(function(element) {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = 'translateY(' + yPos + 'px)';
      });

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Magnetic Button Effect
   */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    if (buttons.length === 0) return;

    buttons.forEach(function(button) {
      button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
      });

      button.addEventListener('mouseleave', function() {
        button.style.transform = 'translate(0, 0)';
        button.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      button.addEventListener('mouseenter', function() {
        button.style.transition = 'transform 0.1s ease';
      });
    });
  }

  /**
   * Counter Animation
   */
  function initCounters() {
    const counters = document.querySelectorAll('.counter');

    if (counters.length === 0) return;

    function animateCounter(counter) {
      const target = parseInt(counter.dataset.target);
      const duration = parseInt(counter.dataset.duration) || 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(function() {
        current += increment;
        
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });

      counters.forEach(function(counter) {
        observer.observe(counter);
      });
    } else {
      counters.forEach(function(counter) {
        animateCounter(counter);
      });
    }
  }

  /**
   * Stagger Animation for Lists - Enhanced
   */
  function initStaggerAnimation() {
    const staggerContainers = document.querySelectorAll('.featured-grid, .products-grid, .gallery-grid, .blog-grid, .team-grid, .highlights-grid, .why-grid, .process-steps, .related-grid, .footer-grid');

    if (staggerContainers.length === 0) return;

    if ('IntersectionObserver' in window) {
      staggerContainers.forEach(function(container) {
        const items = container.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-fade, .reveal-blur');
        
        const containerObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              // Add stagger delay to each child
              items.forEach(function(item, index) {
                const baseDelay = parseFloat(getComputedStyle(item).transitionDelay) || 0;
                item.style.transitionDelay = (baseDelay + (index * 0.1)) + 's';
              });
              containerObserver.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1
        });

        containerObserver.observe(container);
      });
    }
  }

})();
