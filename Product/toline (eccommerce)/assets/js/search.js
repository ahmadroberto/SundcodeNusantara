/**
 * TOLINE E-COMMERCE - Search Functionality
 * Live search suggestions, search results filtering
 */

(function() {
  'use strict';

  // Sample product data for search demo
  const sampleProducts = [
    { id: '1', name: 'Premium Leather Jacket', category: 'Fashion', price: 899000, image: 'assets/img/product-1.jpg' },
    { id: '2', name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 459000, image: 'assets/img/product-2.jpg' },
    { id: '3', name: 'Minimalist Watch Silver', category: 'Accessories', price: 1299000, image: 'assets/img/product-3.jpg' },
    { id: '4', name: 'Organic Cotton T-Shirt', category: 'Fashion', price: 189000, image: 'assets/img/product-4.jpg' },
    { id: '5', name: 'Smart Fitness Tracker', category: 'Electronics', price: 599000, image: 'assets/img/product-5.jpg' },
    { id: '6', name: 'Designer Sunglasses', category: 'Accessories', price: 759000, image: 'assets/img/product-6.jpg' },
    { id: '7', name: 'Running Shoes Pro', category: 'Footwear', price: 1099000, image: 'assets/img/product-7.jpg' },
    { id: '8', name: 'Canvas Backpack Vintage', category: 'Bags', price: 349000, image: 'assets/img/product-8.jpg' }
  ];

  const sampleArticles = [
    { id: '1', title: 'How to Style Your Summer Outfit', type: 'article' },
    { id: '2', title: 'Top 10 Fashion Trends 2024', type: 'article' },
    { id: '3', title: 'Complete Guide to Minimalist Wardrobe', type: 'article' }
  ];

  document.addEventListener('DOMContentLoaded', function() {
    initLiveSearch();
    initSearchResultsPage();
    initSearchFilters();
  });

  // === LIVE SEARCH ===
  function initLiveSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (!searchInput) return;

    let searchTimeout;
    let recentSearches = getRecentSearches();

    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.trim();

      if (query.length < 2) {
        // Show recent searches or popular tags
        if (searchResults) {
          searchResults.innerHTML = '';
        }
        if (searchSuggestions) {
          searchSuggestions.style.display = 'block';
          updateRecentSearches(recentSearches);
        }
        return;
      }

      if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
      }

      // Debounce search
      searchTimeout = setTimeout(() => {
        performSearch(query, searchResults);
      }, 300);
    });

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        if (query.length >= 2) {
          saveRecentSearch(query);
          window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  function performSearch(query, resultsContainer) {
    if (!resultsContainer) return;

    // Search products
    const productResults = sampleProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    // Search articles
    const articleResults = sampleArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );

    // Render results
    let html = '';

    if (productResults.length > 0) {
      html += '<div class="search-section-title">Products</div>';
      html += productResults.map(product => `
        <a href="product.html?id=${product.id}" class="search-result-item">
          <img src="${product.image}" alt="${product.name}" class="search-result-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2256%22 height=%2256%22%3E%3Crect fill=%22%23e2e8f0%22 width=%2256%22 height=%2256%22/%3E%3C/svg%3E'">
          <div class="search-result-info">
            <h4>${highlightText(product.name, query)}</h4>
            <span>${TolineUtils.formatPrice(product.price)}</span>
          </div>
        </a>
      `).join('');
    }

    if (articleResults.length > 0) {
      html += '<div class="search-section-title">Articles</div>';
      html += articleResults.map(article => `
        <a href="article.html?id=${article.id}" class="search-result-item">
          <div class="search-result-info">
            <h4>${highlightText(article.title, query)}</h4>
            <span>Article</span>
          </div>
        </a>
      `).join('');
    }

    if (!html) {
      html = `
        <div class="search-no-results">
          <p>No results found for "${query}"</p>
          <p style="font-size: 0.875rem; color: var(--text-lighter);">Try different keywords or browse our categories</p>
        </div>
      `;
    }

    resultsContainer.innerHTML = html;
  }

  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--accent-light); color: var(--accent); padding: 0 2px; border-radius: 2px;">$1</mark>');
  }

  function updateRecentSearches(recentSearches) {
    const container = document.querySelector('.search-tags');
    if (!container) return;

    const tags = recentSearches.map(search => 
      `<span class="search-tag" data-search="${search}">${search}</span>`
    ).join('');

    container.innerHTML = tags;

    // Add click handlers
    container.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', function() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
          searchInput.value = this.dataset.search;
          searchInput.focus();
          searchInput.dispatchEvent(new Event('input'));
        }
      });
    });
  }

  function getRecentSearches() {
    try {
      return JSON.parse(localStorage.getItem('toline_recent_searches') || '[]');
    } catch {
      return [];
    }
  }

  function saveRecentSearch(query) {
    let recentSearches = getRecentSearches();
    
    // Remove if already exists
    recentSearches = recentSearches.filter(s => s !== query);
    
    // Add to beginning
    recentSearches.unshift(query);
    
    // Keep only last 5
    recentSearches = recentSearches.slice(0, 5);
    
    localStorage.setItem('toline_recent_searches', JSON.stringify(recentSearches));
  }

  // === SEARCH RESULTS PAGE ===
  function initSearchResultsPage() {
    const searchQuery = getQueryParam('q');
    if (!searchQuery) return;

    // Update page title and search input
    const pageTitle = document.querySelector('.page-header h1');
    const searchInput = document.querySelector('.search-input');
    
    if (pageTitle) {
      pageTitle.textContent = `Search results for "${searchQuery}"`;
    }
    
    if (searchInput) {
      searchInput.value = searchQuery;
    }

    // Perform search
    performSearchResults(searchQuery);
  }

  function performSearchResults(query) {
    const resultsContainer = document.getElementById('search-results-grid');
    if (!resultsContainer) return;

    const productResults = sampleProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    if (productResults.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-3xl);">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--spacing-lg); color: var(--text-lighter);">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>No products found</h3>
          <p>Try different keywords or browse our categories</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = productResults.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23e2e8f0%22 width=%22400%22 height=%22400%22/%3E%3C/svg%3E'">
          <div class="product-card-badges">
            <span class="product-badge new">New</span>
          </div>
          <div class="product-card-actions">
            <button class="product-action-btn" data-wishlist-btn="${product.id}" aria-label="Add to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="product-card-content">
          <p class="product-card-category">${product.category}</p>
          <h3 class="product-card-title">${product.name}</h3>
          <div class="product-card-rating">
            <div class="stars">★★★★★</div>
            <span class="rating-count">(48)</span>
          </div>
          <div class="product-card-price">
            <span class="price-current">${TolineUtils.formatPrice(product.price)}</span>
          </div>
        </div>
        <div class="product-card-footer">
          <button class="add-to-cart-btn" data-add-to-cart="${product.id}" 
                  data-product-name="${product.name}" 
                  data-product-price="${product.price}"
                  data-product-image="${product.image}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    `).join('');
  }

  // === SEARCH FILTERS ===
  function initSearchFilters() {
    const filterBtn = document.querySelector('[data-filter-submit]');
    const clearBtn = document.querySelector('[data-filter-clear]');
    
    if (!filterBtn) return;

    filterBtn.addEventListener('click', function() {
      const form = this.closest('form') || this.closest('.filter-sidebar');
      if (!form) return;

      const filters = {
        category: form.querySelector('[name="category"]')?.value,
        minPrice: form.querySelector('[name="min-price"]')?.value,
        maxPrice: form.querySelector('[name="max-price"]')?.value,
        sort: form.querySelector('[name="sort"]')?.value
      };

      applyFilters(filters);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        const form = this.closest('form') || this.closest('.filter-sidebar');
        if (!form) return;

        form.querySelectorAll('input, select').forEach(field => {
          if (field.type === 'checkbox' || field.type === 'radio') {
            field.checked = false;
          } else {
            field.value = '';
          }
        });
      });
    }
  }

  function applyFilters(filters) {
    console.log('Applying filters:', filters);
    // Implementation would filter products based on selected criteria
    showToast('Filters Applied', 'Results updated', 'success');
  }

  // === UTILITY ===
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

})();
