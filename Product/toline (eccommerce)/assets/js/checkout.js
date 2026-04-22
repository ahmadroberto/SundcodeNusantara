/**
 * TOLINE E-COMMERCE - Checkout Functionality
 * Form validation, payment method selection, order processing
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initCheckoutForm();
    initPaymentMethods();
    initAddressAutocomplete();
    loadOrderSummary();
  });

  // === CHECKOUT FORM VALIDATION ===
  function initCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(form)) {
        processOrder(form);
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });

      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });
  }

  function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Validate email format
    const email = form.querySelector('#email, [name="email"]');
    if (email && email.value && !isValidEmail(email.value)) {
      showFieldError(email, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate phone number
    const phone = form.querySelector('#phone, [name="phone"]');
    if (phone && phone.value && !isValidPhone(phone.value)) {
      showFieldError(phone, 'Please enter a valid phone number');
      isValid = false;
    }

    // Validate payment method selected
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
      showToast('Payment Required', 'Please select a payment method', 'error');
      isValid = false;
    }

    return isValid;
  }

  function validateField(field) {
    if (!field) return true;

    const value = field.value.trim();
    const fieldName = field.name || field.id;

    // Required check
    if (field.hasAttribute('required') && !value) {
      showFieldError(field, 'This field is required');
      return false;
    }

    // Email check
    if (field.type === 'email' && value && !isValidEmail(value)) {
      showFieldError(field, 'Please enter a valid email');
      return false;
    }

    // Min length check
    const minLength = parseInt(field.getAttribute('minlength'));
    if (minLength && value.length < minLength) {
      showFieldError(field, `Minimum ${minLength} characters required`);
      return false;
    }

    // Clear error if valid
    clearFieldError(field);
    return true;
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = 'var(--danger)';
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();

    // Add error message
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.style.cssText = 'color: var(--danger); font-size: 0.75rem; margin-top: 0.25rem;';
    errorEl.textContent = message;
    field.parentElement.appendChild(errorEl);
  }

  function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorEl = field.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.remove();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
  }

  // === PAYMENT METHODS ===
  function initPaymentMethods() {
    const methods = document.querySelectorAll('.payment-method');
    
    methods.forEach(method => {
      method.addEventListener('click', function() {
        // Remove active from all
        methods.forEach(m => m.classList.remove('active'));
        
        // Add active to clicked
        this.classList.add('active');
        
        // Check the radio
        const radio = this.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  }

  // === ADDRESS AUTOCOMPLETE ===
  function initAddressAutocomplete() {
    // Placeholder for address autocomplete integration
    // Could integrate with Google Places API or similar
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');

    if (provinceSelect) {
      // Sample provinces - would be loaded from API
      const provinces = [
        'DKI Jakarta',
        'Jawa Barat',
        'Jawa Tengah',
        'Jawa Timur',
        'Banten',
        'DI Yogyakarta',
        'Sumatera Utara',
        'Sumatera Barat',
        'Sumatera Selatan',
        'Bali'
      ];

      provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
      });

      provinceSelect.addEventListener('change', function() {
        updateCityOptions(this.value, citySelect);
      });
    }
  }

  function updateCityOptions(province, citySelect) {
    if (!citySelect) return;

    // Sample cities - would be loaded from API based on province
    const cities = {
      'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur'],
      'Jawa Barat': ['Bandung', 'Bogor', 'Depok', 'Bekasi', 'Cimahi'],
      'Jawa Tengah': ['Semarang', 'Solo', 'Magelang', 'Salatiga', 'Pekalongan'],
      'Jawa Timur': ['Surabaya', 'Malang', 'Kediri', 'Madiun', 'Blitar'],
      'Bali': ['Denpasar', 'Badung', 'Gianyar', 'Tabanan', 'Buleleng']
    };

    citySelect.innerHTML = '<option value="">Select City</option>';
    
    const provinceCities = cities[province] || [];
    provinceCities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }

  // === ORDER SUMMARY ===
  function loadOrderSummary() {
    const cart = TolineCart?.getCart();
    if (!cart || !cart.items.length) {
      window.location.href = 'cart.html';
      return;
    }

    const orderItemsContainer = document.getElementById('order-items');
    if (!orderItemsContainer) return;

    orderItemsContainer.innerHTML = cart.items.map(item => {
      const product = getProductData(item.productId);
      if (!product) return '';

      return `
        <div class="order-item">
          <div class="order-item-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="order-item-info">
            <h4>${product.name}</h4>
            <span>Qty: ${item.quantity}</span>
          </div>
        </div>
      `;
    }).join('');

    // Update totals
    const subtotal = TolineCart.getSubtotal();
    const shipping = subtotal >= 500000 ? 0 : 15000;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('order-subtotal');
    const shippingEl = document.getElementById('order-shipping');
    const totalEl = document.getElementById('order-total');

    if (subtotalEl) subtotalEl.textContent = TolineUtils.formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = TolineUtils.formatPrice(shipping);
    if (totalEl) totalEl.textContent = TolineUtils.formatPrice(total);
  }

  // === PROCESS ORDER ===
  async function processOrder(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    if (!submitBtn) return;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner spinner-sm"></span> Processing...';

    try {
      // Gather form data
      const formData = new FormData(form);
      const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
      
      const orderData = {
        customer: {
          name: formData.get('name') || formData.get('full-name'),
          email: formData.get('email'),
          phone: formData.get('phone')
        },
        shipping: {
          address: formData.get('address'),
          city: formData.get('city'),
          province: formData.get('province'),
          postalCode: formData.get('postal-code')
        },
        payment: {
          method: paymentMethod?.value
        },
        notes: formData.get('notes'),
        cart: TolineCart.getCart()
      };

      // Simulate API call
      await simulateOrderProcessing();

      // Generate order ID
      const orderId = 'ORD-' + Date.now();

      // Store order in localStorage (for demo)
      const orders = JSON.parse(localStorage.getItem('toline_orders') || '[]');
      orders.push({
        id: orderId,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('toline_orders', JSON.stringify(orders));

      // Clear cart
      TolineCart.clearCart();

      // Redirect to success page
      window.location.href = `order-success.html?id=${orderId}`;

    } catch (error) {
      console.error('Order processing error:', error);
      showToast('Order Failed', 'Please try again later', 'error');
      
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Place Order';
    }
  }

  function simulateOrderProcessing() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }

  function getProductData(productId) {
    if (window.productData) {
      return window.productData[productId];
    }
    return {
      name: 'Product',
      price: 0,
      image: 'assets/img/placeholder.jpg'
    };
  }

})();
