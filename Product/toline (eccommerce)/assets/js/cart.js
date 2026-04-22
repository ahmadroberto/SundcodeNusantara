/**
 * TOLINE E-COMMERCE - Cart System
 * LocalStorage-based shopping cart management
 */

(function() {
  'use strict';

  const CART_KEY = 'toline_cart';
  let cart = {
    items: [],
    coupon: null,
    updatedAt: null
  };

  // === INITIALIZE ===
  function init() {
    loadCart();
    updateCartUI();
    
    // Add to cart button handlers
    document.addEventListener('click', function(e) {
      const addToCartBtn = e.target.closest('[data-add-to-cart]');
      if (addToCartBtn) {
        e.preventDefault();
        handleAddToCart(addToCartBtn);
      }

      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) {
        e.preventDefault();
        handleRemoveFromCart(removeBtn);
      }

      const quantityUp = e.target.closest('[data-qty-up]');
      const quantityDown = e.target.closest('[data-qty-down]');
      
      if (quantityUp) {
        e.preventDefault();
        handleQuantityChange(quantityUp, 1);
      }
      
      if (quantityDown) {
        e.preventDefault();
        handleQuantityChange(quantityDown, -1);
      }
    });

    // Quantity input change
    document.addEventListener('change', function(e) {
      if (e.target.matches('[data-qty-input]')) {
        handleQuantityInputChange(e.target);
      }
    });
  }

  // === CART DATA MANAGEMENT ===
  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        cart = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load cart:', e);
      cart = { items: [], coupon: null, updatedAt: null };
    }
  }

  function saveCart() {
    try {
      cart.updatedAt = new Date().toISOString();
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart:', e);
    }
  }

  function getCart() {
    return cart;
  }

  function clearCart() {
    cart = { items: [], coupon: null, updatedAt: null };
    saveCart();
    updateCartUI();
  }

  // === CART OPERATIONS ===
  function addItem(item) {
    const { productId, variant, quantity = 1 } = item;
    
    const existingIndex = cart.items.findIndex(i => 
      i.productId === productId && JSON.stringify(i.variant) === JSON.stringify(variant)
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        id: generateId(),
        productId,
        variant,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    saveCart();
    updateCartUI();
    
    showToast('Added to cart', item.productName || 'Product added successfully', 'success');
    
    // Animate cart badge
    animateCartBadge();
  }

  function removeItem(itemId) {
    cart.items = cart.items.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
    showToast('Removed from cart', 'Item has been removed', 'info');
  }

  function updateQuantity(itemId, newQuantity) {
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return;

    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    item.quantity = Math.min(newQuantity, 99);
    saveCart();
    updateCartUI();
  }

  function getItemCount() {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  function getSubtotal() {
    return cart.items.reduce((total, item) => {
      const productData = getProductData(item.productId);
      return total + (productData?.price || 0) * item.quantity;
    }, 0);
  }

  // === UI UPDATES ===
  function updateCartUI() {
    updateCartCount();
    updateCartPage();
  }

  function updateCartCount() {
    const countElements = document.querySelectorAll('[data-cart-count]');
    const count = getItemCount();
    
    countElements.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function updateCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    
    if (!cartItemsContainer) return;

    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = '';
      if (cartEmpty) cartEmpty.style.display = 'block';
      updateCartSummary();
      return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';

    cartItemsContainer.innerHTML = cart.items.map(item => {
      const product = getProductData(item.productId);
      if (!product) return '';

      return `
        <div class="cart-item" data-item-id="${item.id}">
          <div class="cart-item-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="cart-item-info">
            <h3>${product.name}</h3>
            ${item.variant ? `<p class="cart-item-variant">${formatVariant(item.variant)}</p>` : ''}
            <p class="cart-item-price">${TolineUtils.formatPrice(product.price * item.quantity)}</p>
          </div>
          <div class="cart-item-actions">
            <button class="cart-item-remove" data-cart-remove data-item-id="${item.id}" aria-label="Remove item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
            <div class="quantity-selector">
              <button class="quantity-btn" data-qty-down data-item-id="${item.id}">−</button>
              <input type="number" class="quantity-input" data-qty-input data-item-id="${item.id}" value="${item.quantity}" min="1" max="99">
              <button class="quantity-btn" data-qty-up data-item-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    updateCartSummary();
  }

  function updateCartSummary() {
    const subtotal = getSubtotal();
    const shipping = subtotal > 0 ? calculateShipping() : 0;
    const discount = calculateDiscount();
    const total = subtotal + shipping - discount;

    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = TolineUtils.formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = TolineUtils.formatPrice(shipping);
    if (discountEl) {
      discountEl.textContent = discount > 0 ? `- ${TolineUtils.formatPrice(discount)}` : 'Rp 0';
      discountEl.closest('.cart-summary-row').style.display = discount > 0 ? 'flex' : 'none';
    }
    if (totalEl) totalEl.textContent = TolineUtils.formatPrice(total);
  }

  // === EVENT HANDLERS ===
  function handleAddToCart(btn) {
    const productId = btn.dataset.addToCart;
    const quantity = parseInt(btn.dataset.quantity) || 1;
    
    // Get variant from page if available
    const variant = getSelectedVariant();
    const product = getProductData(productId);
    
    if (!product) {
      showToast('Error', 'Product not found', 'error');
      return;
    }

    addItem({
      productId,
      productName: product.name,
      quantity,
      variant
    });
  }

  function handleRemoveFromCart(btn) {
    const itemId = btn.dataset.cartRemove || btn.closest('[data-item-id]')?.dataset.itemId;
    if (itemId) {
      removeItem(itemId);
    }
  }

  function handleQuantityChange(btn, delta) {
    const itemId = btn.dataset.qtyUp || btn.dataset.qtyDown || btn.closest('[data-item-id]')?.dataset.itemId;
    const item = cart.items.find(i => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + delta);
    }
  }

  function handleQuantityInputChange(input) {
    const itemId = input.dataset.qtyInput || input.closest('[data-item-id]')?.dataset.itemId;
    const newQuantity = parseInt(input.value) || 1;
    if (itemId) {
      updateQuantity(itemId, Math.max(1, Math.min(99, newQuantity)));
    }
  }

  // === HELPERS ===
  function calculateShipping() {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= 500000) return 0; // Free shipping over 500k
    return 15000; // Flat rate
  }

  function calculateDiscount() {
    if (!cart.coupon) return 0;
    const subtotal = getSubtotal();
    
    // Example coupon logic
    if (cart.coupon.code === 'SAVE10') {
      return subtotal * 0.1;
    }
    
    return 0;
  }

  function formatVariant(variant) {
    if (!variant) return '';
    const parts = [];
    if (variant.size) parts.push(`Size: ${variant.size}`);
    if (variant.color) parts.push(`Color: ${variant.color}`);
    return parts.join(' | ');
  }

  function getSelectedVariant() {
    const variant = {};
    
    const sizeEl = document.querySelector('.variant-option[data-size].active');
    const colorEl = document.querySelector('.variant-option[data-color].active');
    
    if (sizeEl) variant.size = sizeEl.dataset.size;
    if (colorEl) variant.color = colorEl.dataset.color;
    
    return Object.keys(variant).length > 0 ? variant : null;
  }

  // Product data placeholder - would come from product catalog
  function getProductData(productId) {
    // Try to get from page data
    const productEl = document.querySelector(`[data-product-id="${productId}"]`);
    if (productEl) {
      return {
        id: productEl.dataset.productId,
        name: productEl.dataset.productName,
        price: parseInt(productEl.dataset.productPrice),
        image: productEl.dataset.productImage
      };
    }

    // Try from global product data
    if (window.productData) {
      return window.productData[productId];
    }

    // Default fallback
    return null;
  }

  function generateId() {
    return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function animateCartBadge() {
    const badges = document.querySelectorAll('[data-cart-count]');
    badges.forEach(badge => {
      badge.classList.add('animate');
      setTimeout(() => badge.classList.remove('animate'), 500);
    });
  }

  function showToast(title, message, type) {
    if (window.showToast) {
      window.showToast({ title, message, type });
    }
  }

  // === PUBLIC API ===
  window.TolineCart = {
    getCart,
    clearCart,
    addItem,
    removeItem,
    updateQuantity,
    getItemCount,
    getSubtotal
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
