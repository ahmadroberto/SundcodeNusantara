/* ========================================
   FASHION BRAND - Navigation JavaScript
   ======================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
  });

  /**
   * Navbar Scroll Effect
   */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Check on load
    handleScroll();

    // Listen to scroll
    window.addEventListener('scroll', function() {
      requestAnimationFrame(handleScroll);
    }, { passive: true });
  }

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.navbar-menu');
    const links = document.querySelectorAll('.navbar-link');

    if (!hamburger || !menu) return;

    function toggleMenu() {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', function() {
      toggleMenu();
    });

    // Close on link click
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });

    // Close on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992) {
        closeMenu();
      }
    });
  }

  /**
   * Active Link Highlight
   */
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar-link');

    links.forEach(function(link) {
      const href = link.getAttribute('href');
      
      if (href === currentPath || 
          (href === '/' && (currentPath === '' || currentPath === '/index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Run on load
  window.addEventListener('load', setActiveLink);

})();
