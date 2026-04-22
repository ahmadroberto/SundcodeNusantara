/* ========================================
   FASHION BRAND - Slider JavaScript
   ======================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
    initProductSlider();
    initGalleryLightbox();
  });

  /**
   * Testimonial Slider
   */
  function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    
    if (!slider) return;

    const items = slider.querySelectorAll('.testimonial-item');
    const dots = slider.querySelectorAll('.testimonial-dot');
    let currentItem = 0;
    let autoSlide;

    function showItem(index) {
      items.forEach(function(item) {
        item.classList.remove('active');
      });
      
      dots.forEach(function(dot) {
        dot.classList.remove('active');
      });

      items[index].classList.add('active');
      if (dots[index]) {
        dots[index].classList.add('active');
      }
      
      currentItem = index;
    }

    function nextItem() {
      const next = (currentItem + 1) % items.length;
      showItem(next);
    }

    // Auto slide every 5 seconds
    function startAutoSlide() {
      autoSlide = setInterval(nextItem, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    // Dot navigation
    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        showItem(index);
        stopAutoSlide();
        startAutoSlide();
      });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Start auto slide
    startAutoSlide();

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left - next
          showItem((currentItem + 1) % items.length);
        } else {
          // Swipe right - previous
          showItem((currentItem - 1 + items.length) % items.length);
        }
        stopAutoSlide();
        startAutoSlide();
      }
    }
  }

  /**
   * Product Gallery Slider
   */
  function initProductSlider() {
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.querySelector('.product-main-image img');

    if (!thumbnails.length || !mainImage) return;

    thumbnails.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        // Update active state
        thumbnails.forEach(function(t) {
          t.classList.remove('active');
        });
        this.classList.add('active');

        // Update main image
        const newSrc = this.querySelector('img').src;
        mainImage.src = newSrc;
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentIndex = Array.from(thumbnails).findIndex(function(t) {
          return t.classList.contains('active');
        });

        let newIndex;
        if (e.key === 'ArrowLeft') {
          newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        } else {
          newIndex = (currentIndex + 1) % thumbnails.length;
        }

        thumbnails[newIndex].click();
      }
    });
  }

  /**
   * Gallery Lightbox
   */
  function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item, .masonry-item');
    
    if (galleryItems.length === 0) return;

    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-close"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div><img src="" alt="Gallery Image">';
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    let currentImageIndex = 0;
    let images = [];

    // Collect all gallery images
    galleryItems.forEach(function(item, index) {
      const img = item.querySelector('img');
      if (img) {
        images.push({
          src: img.src,
          alt: img.alt || ''
        });
      }

      item.addEventListener('click', function() {
        currentImageIndex = index;
        openLightbox(index);
      });
    });

    function openLightbox(index) {
      if (index < 0 || index >= images.length) return;

      const image = images[index];
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      openLightbox(currentImageIndex);
    }

    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      openLightbox(currentImageIndex);
    }

    // Close button
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeLightbox();
    });

    // Click outside image to close
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    }
  }

  /**
   * Generic Carousel Component
   */
  function initCarousel(selector, options) {
    const carousel = document.querySelector(selector);
    
    if (!carousel) return;

    const defaults = {
      itemsToShow: 3,
      gap: 20,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      dots: true
    };

    const settings = Object.assign({}, defaults, options);

    // Implementation can be expanded based on needs
    console.log('Carousel initialized with settings:', settings);
  }

  // Export for global use
  window.FashionBrandSlider = {
    initCarousel: initCarousel
  };

})();
