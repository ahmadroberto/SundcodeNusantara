/**
 * TOLINE E-COMMERCE - Product Functionality
 * Product gallery, variants, quick view, wishlist
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initProductGallery();
    initVariantSelector();
    initWishlist();
    initQuantitySelector();
    initRelatedProducts();
  });

  // === PRODUCT GALLERY ===
  function initProductGallery() {
    const mainImage = document.querySelector('.product-gallery-main img');
    const thumbs = document.querySelectorAll('.product-gallery-thumb');
    
    if (!mainImage || !thumbs.length) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const newSrc = this.querySelector('img')?.src;
        if (!newSrc) return;

        // Update main image
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 200);

        // Update active state
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Add transition to main image
    mainImage.style.transition = 'opacity 0.3s ease';
  }

  // === VARIANT SELECTOR ===
  function initVariantSelector() {
    const variantGroups = document.querySelectorAll('.variant-options');
    
    variantGroups.forEach(group => {
      const options = group.querySelectorAll('.variant-option');
      
      options.forEach(option => {
        option.addEventListener('click', function() {
          // Remove active from siblings
          options.forEach(o => o.classList.remove('active'));
          // Add active to clicked
          this.classList.add('active');
          
          // Update product price if needed
          updatePrice();
        });
      });
    });
  }

  function updatePrice() {
    const priceElement = document.querySelector('.product-info-price .current');
    const basePrice = parseInt(priceElement?.dataset.basePrice);
    
    if (!basePrice) return;

    // Check if selected variants affect price
    const activeVariants = document.querySelectorAll('.variant-option.active');
    let priceModifier = 0;

    activeVariants.forEach(variant => {
      const modifier = parseInt(variant.dataset.priceModifier) || 0;
      priceModifier += modifier;
    });

    const newPrice = basePrice + priceModifier;
    if (priceElement) {
      priceElement.textContent = TolineUtils.formatPrice(newPrice);
    }
  }

  // === WISHLIST ===
  function initWishlist() {
    const wishlistBtns = document.querySelectorAll('[data-wishlist-btn]');
    
    wishlistBtns.forEach(btn => {
      // Check if already wishlisted
      if (isWishlisted(btn.dataset.wishlistBtn)) {
        btn.classList.add('active');
      }

      btn.addEventListener('click', function() {
        const productId = this.dataset.wishlistBtn;
        toggleWishlist(productId, this);
      });
    });
  }

  function toggleWishlist(productId, btn) {
    let wishlist = getWishlist();
    const isCurrentlyWishlisted = wishlist.includes(productId);

    if (isCurrentlyWishlisted) {
      wishlist = wishlist.filter(id => id !== productId);
      btn?.classList.remove('active');
      showToast('Removed from wishlist', 'Product removed from your wishlist', 'info');
    } else {
      wishlist.push(productId);
      btn?.classList.add('active');
      if (btn) btn.classList.add('animate');
      showToast('Added to wishlist', 'Product saved to your wishlist', 'success');
    }

    localStorage.setItem('toline_wishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount();
  }

  function isWishlisted(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
  }

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('toline_wishlist') || '[]');
    } catch {
      return [];
    }
  }

  function updateWishlistCount() {
    const count = getWishlist().length;
    const countElements = document.querySelectorAll('[data-wishlist-count]');
    
    countElements.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // === QUANTITY SELECTOR ===
  function initQuantitySelector() {
    const containers = document.querySelectorAll('.quantity-selector');
    
    containers.forEach(container => {
      const input = container.querySelector('.quantity-input');
      const minusBtn = container.querySelector('[data-qty-down]');
      const plusBtn = container.querySelector('[data-qty-up]');
      
      if (!input || !minusBtn || !plusBtn) return;

      const min = parseInt(input.min) || 1;
      const max = parseInt(input.max) || 99;

      minusBtn.addEventListener('click', function() {
        const currentValue = parseInt(input.value) || min;
        if (currentValue > min) {
          input.value = currentValue - 1;
          input.dispatchEvent(new Event('change'));
        }
      });

      plusBtn.addEventListener('click', function() {
        const currentValue = parseInt(input.value) || min;
        if (currentValue < max) {
          input.value = currentValue + 1;
          input.dispatchEvent(new Event('change'));
        }
      });

      input.addEventListener('change', function() {
        let value = parseInt(this.value) || min;
        value = Math.max(min, Math.min(max, value));
        this.value = value;
      });
    });
  }

  // === RELATED PRODUCTS ===
  function initRelatedProducts() {
    // Could implement dynamic loading here
    const relatedProducts = document.querySelectorAll('.related-products .product-card');
    
    // Add stagger animation
    relatedProducts.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
    });
  }

  // === QUICK VIEW MODAL ===
  window.showQuickView = function(productId) {
    // Implementation for quick view modal
    console.log('Quick view for product:', productId);
  };

  // Initialize wishlist count on load
  document.addEventListener('DOMContentLoaded', updateWishlistCount);

})();
