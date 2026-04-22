const fs = require('fs');
const path = require('path');

const BASE_DIR = String.raw`D:\My Project\Produk\Template\toline (eccommerce)`;

const writeFile = (filename, content) => {
  const filepath = path.join(BASE_DIR, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ Created: ${filename}`);
};

const HEAD = (title, desc) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${desc}"><meta name="robots" content="index, follow">
<title>${title}</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%236366F1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='18' font-weight='bold'%3ET%3C/text%3E%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css"><link rel="stylesheet" href="assets/css/animation.css"><link rel="stylesheet" href="assets/css/responsive.css">
</head><body>`;

const HEADER_FULL = `
<header class="header"><div class="container"><div class="header-inner">
<a href="index.html" class="logo"><div class="logo-icon">T</div><span>Toline</span></a>
<nav class="nav-desktop"><a href="index.html" class="nav-link">Home</a><a href="shop.html" class="nav-link">Shop</a><a href="blog.html" class="nav-link">Blog</a><a href="about.html" class="nav-link">About</a><a href="contact.html" class="nav-link">Contact</a></nav>
<div class="header-actions">
<button class="header-action-btn" data-search-trigger><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></button>
<a href="wishlist.html" class="header-action-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span class="badge" data-wishlist-count style="display:none">0</span></a>
<a href="cart.html" class="header-action-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="badge" data-cart-count style="display:none">0</span></a>
<a href="login.html" class="header-action-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>
<button class="mobile-toggle"><span></span><span></span><span></span></button>
</div></div></div></header>
<nav class="mobile-nav"><div class="mobile-nav-section"><a href="index.html" class="mobile-nav-link">Home</a><a href="shop.html" class="mobile-nav-link">Shop</a><a href="blog.html" class="mobile-nav-link">Blog</a><a href="about.html" class="mobile-nav-link">About</a><a href="contact.html" class="mobile-nav-link">Contact</a></div></nav>
<div class="search-overlay"><div class="search-container"><div class="search-input-wrapper"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" class="search-input" placeholder="Search..." aria-label="Search"><button class="search-close" data-search-close><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="search-results"></div></div></div>
`;

const FOOTER_FULL = `
<footer class="footer"><div class="container"><div class="footer-grid">
<div class="footer-brand"><a href="index.html" class="logo" style="color:white;margin-bottom:1rem"><div class="logo-icon">T</div><span>Toline</span></a><p>Your premium destination for quality products.</p><div class="footer-social"><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></a></div></div>
<div class="footer-column"><h4>Shop</h4><a href="shop.html">All Products</a><a href="#">Fashion</a><a href="#">Electronics</a></div>
<div class="footer-column"><h4>Company</h4><a href="about.html">About</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a></div>
<div class="footer-column"><h4>Support</h4><a href="#">Shipping</a><a href="#">Returns</a><a href="faq.html">FAQ</a></div>
</div><div class="footer-bottom"><p>© 2024 Toline. All rights reserved.</p><div class="footer-payment"><span>VISA</span><span>BCA</span><span>GoPay</span></div></div></div></footer>
<div class="chat-widget"><button class="chat-toggle-btn" data-chat-toggle><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button><div class="chat-popup"><div class="chat-header"><div class="chat-header-info"><h4>Toline Support</h4><span>🟢 Online</span></div><button class="chat-close" data-chat-close><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="chat-messages"></div><div class="chat-quick-actions"><button class="chat-quick-action">Shipping Info</button><button class="chat-quick-action">Returns</button></div><div class="chat-input"><input type="text" placeholder="Type message..."><button data-chat-send><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div></div></div>
<script src="assets/js/main.js"></script><script src="assets/js/cart.js"></script><script src="assets/js/product.js"></script><script src="assets/js/search.js"></script><script src="assets/js/chat.js"></script>
</body></html>`;

console.log('Generating Toline E-Commerce pages...\n');
console.log('✅ All pages generated!');
