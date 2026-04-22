/**
 * PT Manufaktur Nusantara - Main JavaScript
 * Handles all interactive features, animations, and UX enhancements
 */

'use strict';

// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initHeader();
    initMobileMenu();
    initDropdowns();
    initScrollReveal();
    initCounters();
    initTestimonialSlider();
    initBackToTop();
    initSmoothScroll();
    initParallax();
});

// ========================================
// LOADING SCREEN
// ========================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            
            // Remove from DOM after transition
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 800);
    });
    
    // Fallback: hide loader after 3 seconds max
    setTimeout(() => {
        if (loader && !loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
            setTimeout(() => loader.remove(), 500);
        }
    }, 3000);
}

// ========================================
// STICKY HEADER
// ========================================
function initHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    };
    
    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initial check
    handleScroll();
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        const isExpanded = navMenu.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            mobileToggle.focus();
        }
    });
}

// ========================================
// DROPDOWN MENUS (Mobile)
// ========================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (!link) return;
        
        link.addEventListener('click', (e) => {
            // Only handle click on mobile
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal-top, .reveal-bottom, .reveal-left, .reveal-right'
    );
    
    if (revealElements.length === 0) return;
    
    // Use Intersection Observer for better performance
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// ANIMATED COUNTERS
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const startTime = 2000; // Start after 2s (hero animation delay)
        let startTimeRecorded = null;
        
        const updateCounter = (timestamp) => {
            if (!startTimeRecorded) startTimeRecorded = timestamp;
            
            const progress = timestamp - startTimeRecorded;
            const currentProgress = Math.min(progress / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - currentProgress, 3);
            const currentValue = Math.floor(easeOut * target);
            
            element.textContent = currentValue;
            
            if (currentProgress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        setTimeout(() => {
            requestAnimationFrame(updateCounter);
        }, startTime);
    };
    
    // Use Intersection Observer to start counting when visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ========================================
// TESTIMONIAL SLIDER
// ========================================
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    
    if (!slider) return;
    
    const track = slider.querySelector('.testimonial-track');
    const cards = slider.querySelectorAll('.testimonial-card');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dotsContainer = slider.querySelector('.slider-dots');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds
    
    // Create dots
    if (dotsContainer) {
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.setAttribute('role', 'tab');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    
    const goToSlide = (index) => {
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };
    
    const nextSlide = () => {
        goToSlide(currentIndex + 1);
    };
    
    const prevSlide = () => {
        goToSlide(currentIndex - 1);
    };
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    // Auto play
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    };
    
    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };
    
    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };
    
    // Keyboard support
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
    
    // Start autoplay
    startAutoPlay();
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                toggleVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.classList.contains('parallax-slow') ? 0.3 :
                                 element.classList.contains('parallax-medium') ? 0.5 : 0.7;
                    
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function for performance
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add loading state to images
 */
function addImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
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
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Initialize image lazy loading if needed
if (document.querySelectorAll('img[data-src]').length > 0) {
    document.addEventListener('DOMContentLoaded', addImageLazyLoading);
}

// ========================================
// FORM VALIDATION (For contact and career forms)
// ========================================
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => clearError(input));
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm(form);
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (value === '') {
        isValid = false;
        errorMessage = 'Field ini wajib diisi';
    }
    
    if (input.type === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Format email tidak valid';
        }
    }
    
    if (input.type === 'tel' && value !== '') {
        const phonePattern = /^[0-9+\-\s()]+$/;
        if (!phonePattern.test(value)) {
            isValid = false;
            errorMessage = 'Format nomor telepon tidak valid';
        }
    }
    
    if (!isValid) {
        showError(input, errorMessage);
    }
    
    return isValid;
}

function showError(input, message) {
    clearError(input);
    
    input.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
}

function clearError(input) {
    input.classList.remove('error');
    
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function submitForm(form) {
    // Add your form submission logic here
    // For example, send data to server via fetch API
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Mengirim...';
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Show success message
        showNotification('Form berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
        
        // Reset form
        form.reset();
    }, 2000);
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Initialize form validation if forms exist
if (document.querySelectorAll('form[data-validate]').length > 0) {
    document.addEventListener('DOMContentLoaded', initFormValidation);
}

// ========================================
// PRODUCT FILTER (For products page)
// ========================================
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card-filterable');
    
    if (filterButtons.length === 0 || productCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const categories = card.dataset.categories || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize product filter if needed
if (document.querySelectorAll('.filter-btn').length > 0) {
    document.addEventListener('DOMContentLoaded', initProductFilter);
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Focus trap for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// Skip to main content link
function initSkipToContent() {
    const skipLink = document.querySelector('.skip-to-content');
    
    if (!skipLink) return;
    
    skipLink.addEventListener('click', () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initialize skip to content if exists
if (document.querySelector('.skip-to-content')) {
    document.addEventListener('DOMContentLoaded', initSkipToContent);
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Preload critical resources
function preloadCriticalResources() {
    // Preload fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.crossOrigin = 'anonymous';
    
    // Add more preloads as needed
}

// Defer non-critical CSS
function loadNonCriticalCSS() {
    const nonCriticalCSS = [
        // Add paths to non-critical CSS files
    ];
    
    nonCriticalCSS.forEach(path => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        link.media = 'print';
        link.onload = function() {
            this.media = 'all';
        };
        document.head.appendChild(link);
    });
}

// ========================================
// ANALYTICS & TRACKING (Optional)
// ========================================
function trackEvent(category, action, label) {
    // Add your analytics tracking here
    // Example: Google Analytics, Facebook Pixel, etc.
    
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Log for debugging
    if (window.location.hostname === 'localhost') {
        console.log('Event tracked:', { category, action, label });
    }
}

// ========================================
// EXPORT FOR TESTING (if using modules)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        isInViewport
    };
}
