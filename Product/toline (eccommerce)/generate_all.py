"""
Generate all remaining HTML pages for Toline E-Commerce
Run: python generate_all.py
"""
import os

BASE_DIR = r"D:\My Project\Produk\Template\toline (eccommerce)"

def write_file(filename, content):
    filepath = os.path.join(BASE_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Created: {filename}")

# Common components
HEAD = lambda title, desc: f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{desc}"><meta name="robots" content="index, follow">
<title>{title}</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%236366F1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='18' font-weight='bold'%3ET%3C/text%3E%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css"><link rel="stylesheet" href="assets/css/animation.css"><link rel="stylesheet" href="assets/css/responsive.css">
</head><body>"""

HEADER_FULL = """
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
"""

HEADER_SIMPLE = """
<header class="header"><div class="container"><div class="header-inner">
<a href="index.html" class="logo"><div class="logo-icon">T</div><span>Toline</span></a>
<div class="header-actions"><a href="index.html" class="btn btn-ghost">← Back to Home</a></div>
</div></div></header>
"""

FOOTER_FULL = """
<footer class="footer"><div class="container"><div class="footer-grid">
<div class="footer-brand"><a href="index.html" class="logo" style="color:white;margin-bottom:1rem"><div class="logo-icon">T</div><span>Toline</span></a><p>Your premium destination for quality products.</p><div class="footer-social"><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></a></div></div>
<div class="footer-column"><h4>Shop</h4><a href="shop.html">All Products</a><a href="#">Fashion</a><a href="#">Electronics</a></div>
<div class="footer-column"><h4>Company</h4><a href="about.html">About</a><a href="blog.html">Blog</a><a href="contact.html">Contact</a></div>
<div class="footer-column"><h4>Support</h4><a href="#">Shipping</a><a href="#">Returns</a><a href="faq.html">FAQ</a></div>
</div><div class="footer-bottom"><p>© 2024 Toline. All rights reserved.</p><div class="footer-payment"><span>VISA</span><span>BCA</span><span>GoPay</span></div></div></div></footer>
<div class="chat-widget"><button class="chat-toggle-btn" data-chat-toggle><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button><div class="chat-popup"><div class="chat-header"><div class="chat-header-info"><h4>Toline Support</h4><span>🟢 Online</span></div><button class="chat-close" data-chat-close><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="chat-messages"></div><div class="chat-quick-actions"><button class="chat-quick-action">Shipping Info</button><button class="chat-quick-action">Returns</button></div><div class="chat-input"><input type="text" placeholder="Type message..."><button data-chat-send><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div></div></div>
<script src="assets/js/main.js"></script><script src="assets/js/cart.js"></script><script src="assets/js/product.js"></script><script src="assets/js/search.js"></script><script src="assets/js/chat.js"></script>
</body></html>"""

FOOTER_SIMPLE = """
<footer class="footer"><div class="container" style="text-align:center;padding:3rem 0"><p style="color:var(--text-lighter)">© 2024 Toline. All rights reserved.</p></div></footer>
<script src="assets/js/main.js"></script><script src="assets/js/cart.js"></script><script src="assets/js/chat.js"></script>
</body></html>"""

BREADCRUMB = lambda items: f'<div class="breadcrumb"><div class="container"><ul class="breadcrumb-list">{"".join([f"<li><a href='{link}'>{text}</a></li>" if i < len(items)-1 else f"<li class='active'>{text}</li>" for i, (text, link) in enumerate(items)])}</ul></div></div>'

PAGE_HEADER = lambda title, desc: f'<div class="page-header"><div class="container"><h1>{title}</h1><p>{desc}</p></div></div>'

PRODUCT_CARD = lambda num: f'''<div class="product-card"><div class="product-card-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e2e8f0' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='18'%3EProduct {num}%3C/text%3E%3C/svg%3E" alt="Product"></div><div class="product-card-content"><p class="product-card-category">Category</p><h3 class="product-card-title"><a href="product.html">Sample Product {num}</a></h3><div class="product-card-rating"><div class="stars">★★★★★</div><span class="rating-count">({num*5})</span></div><div class="product-card-price"><span class="price-current">Rp {(num*100+99):,}.000</span></div></div><div class="product-card-footer"><button class="add-to-cart-btn" data-add-to-cart="{num}" data-product-name="Product {num}" data-product-price="{num*100+99}000">Add to Cart</button></div></div>'''

print("Generating Toline E-Commerce pages...\n")

# 1. checkout.html
write_file("checkout.html", f'''{HEAD("Checkout - Toline", "Complete your order")}
{HEADER_FULL}
<main>
{BREADCRUMB([("Home", "index.html"), ("Cart", "cart.html"), ("Checkout", "")])}
{PAGE_HEADER("Checkout", "Complete your order securely")}
<div class="container"><div class="checkout-layout">
<div class="checkout-form">
<form id="checkout-form">
<div class="checkout-section"><h3>Contact Information</h3>
<div class="form-row"><div class="form-group"><label>Full Name *</label><input type="text" name="full-name" required placeholder="John Doe"></div></div>
<div class="form-row"><div class="form-group"><label>Email *</label><input type="email" name="email" required placeholder="john@example.com"></div><div class="form-group"><label>Phone *</label><input type="tel" name="phone" required placeholder="+62 812-xxxx-xxxx"></div></div>
</div>
<div class="checkout-section"><h3>Shipping Address</h3>
<div class="form-row single"><div class="form-group"><label>Address *</label><textarea name="address" required placeholder="Street address, building, apt number"></textarea></div></div>
<div class="form-row"><div class="form-group"><label>Province *</label><select id="province" name="province" required><option value="">Select Province</option><option>DKI Jakarta</option><option>Jawa Barat</option><option>Jawa Tengah</option><option>Jawa Timur</option><option>Bali</option></select></div><div class="form-group"><label>City *</label><select id="city" name="city" required><option value="">Select City</option></select></div></div>
<div class="form-row"><div class="form-group"><label>Postal Code *</label><input type="text" name="postal-code" required placeholder="12345"></div></div>
</div>
<div class="checkout-section"><h3>Payment Method</h3>
<div class="payment-methods">
<label class="payment-method"><input type="radio" name="payment-method" value="bank" hidden><div class="payment-method-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div><div class="payment-method-info"><h4>Bank Transfer</h4><span>BCA, Mandiri, BNI, BRI</span></div></label>
<label class="payment-method"><input type="radio" name="payment-method" value="ewallet" hidden><div class="payment-method-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div><div class="payment-method-info"><h4>E-Wallet</h4><span>GoPay, OVO, Dana, ShopeePay</span></div></label>
<label class="payment-method"><input type="radio" name="payment-method" value="cod" hidden><div class="payment-method-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div class="payment-method-info"><h4>Cash on Delivery</h4><span>Pay when you receive</span></div></label>
</div></div>
<div class="checkout-section"><h3>Order Notes (Optional)</h3>
<div class="form-row single"><div class="form-group"><textarea name="notes" placeholder="Special instructions for delivery"></textarea></div></div>
</div>
<button type="submit" class="btn btn-primary btn-lg" style="width:100%">Place Order</button>
</form></div>
<div class="order-summary"><h3>Order Summary</h3>
<div class="order-items" id="order-items">
<div class="order-item"><div class="order-item-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect fill='%23e2e8f0' width='60' height='60'/%3E%3C/svg%3E" alt="Product"></div><div class="order-item-info"><h4>Premium Leather Jacket</h4><span>Qty: 1</span></div></div>
<div class="order-item"><div class="order-item-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect fill='%23cbd5e1' width='60' height='60'/%3E%3C/svg%3E" alt="Product"></div><div class="order-item-info"><h4>Wireless Headphones</h4><span>Qty: 2</span></div></div>
</div>
<div class="cart-summary-row"><span>Subtotal</span><span id="order-subtotal">Rp 1.817.000</span></div>
<div class="cart-summary-row"><span>Shipping</span><span id="order-shipping">Rp 15.000</span></div>
<div class="cart-summary-row total"><span>Total</span><span id="order-total">Rp 1.832.000</span></div>
</div></div></div>
</main>
{FOOTER_FULL}''')

# 2. order-success.html
write_file("order-success.html", f'''{HEAD("Order Success - Toline", "Your order has been placed")}
{HEADER_FULL}
<main>
<div class="order-success"><div class="container"><div class="order-success-content">
<div class="order-success-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
<h1>Order Placed Successfully!</h1>
<p>Thank you for your purchase! Your order has been confirmed and will be processed shortly.</p>
<div class="order-details-box">
<h3>Order Details</h3>
<div class="order-details-row"><span>Order ID</span><span id="order-id">ORD-XXXXX</span></div>
<div class="order-details-row"><span>Date</span><span id="order-date">-</span></div>
<div class="order-details-row"><span>Payment</span><span>Bank Transfer</span></div>
<div class="order-details-row"><span>Shipping Address</span><span>Jakarta, Indonesia</span></div>
<div class="order-details-row" style="font-weight:600;font-size:1.125rem;border-top:1px solid var(--border);padding-top:0.5rem;margin-top:0.5rem"><span>Total</span><span>Rp 1.832.000</span></div>
</div>
<div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
<a href="#" class="btn btn-primary">Track Order</a>
<a href="shop.html" class="btn btn-outline">Continue Shopping</a>
</div>
</div></div></div>
<section style="padding:4rem 0;background:var(--secondary)"><div class="container"><h2 style="text-align:center;margin-bottom:2rem">What's Next?</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem">
<div style="text-align:center;padding:2rem"><div style="width:64px;height:64px;margin:0 auto 1rem;background:var(--accent-light);border-radius:50%%;display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:1.5rem">1</div><h3>Order Confirmation</h3><p>We'll send you a confirmation email shortly</p></div>
<div style="text-align:center;padding:2rem"><div style="width:64px;height:64px;margin:0 auto 1rem;background:var(--accent-light);border-radius:50%%;display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:1.5rem">2</div><h3>Processing & Shipping</h3><p>Your order will be packed and shipped within 1-2 days</p></div>
<div style="text-align:center;padding:2rem"><div style="width:64px;height:64px;margin:0 auto 1rem;background:var(--accent-light);border-radius:50%%;display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:1.5rem">3</div><h3>Delivery</h3><p>Receive your order within 2-5 business days</p></div>
</div></div></section>
</main>
<script>document.addEventListener('DOMContentLoaded',function(){{const p=new URLSearchParams(window.location.search);const id=p.get('id')||'ORD-'+Date.now();document.getElementById('order-id').textContent=id;document.getElementById('order-date').textContent=new Date().toLocaleDateString('id-ID',{{day:'numeric',month:'long',year:'numeric'}})}})</script>
{FOOTER_FULL}''')

# 3. login.html
write_file("login.html", f'''{HEAD("Login - Toline", "Sign in to your account")}
{HEADER_SIMPLE}
<main>
<div class="auth-layout">
<div class="auth-hero"><h1>Welcome Back!</h1><p>Sign in to access your orders, wishlist, and personalized recommendations.</p></div>
<div class="auth-form-wrapper"><div class="auth-form">
<h2>Sign In</h2><p>Enter your credentials to access your account</p>
<form>
<div class="form-row single"><div class="form-group"><label>Email Address</label><input type="email" required placeholder="john@example.com"></div></div>
<div class="form-row single"><div class="form-group"><label>Password</label><input type="password" required placeholder="••••••••"></div></div>
<div class="auth-form-footer"><label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem"><input type="checkbox"> Remember me</label><a href="#">Forgot password?</a></div>
<button type="submit" class="btn btn-primary btn-lg" style="width:100%">Sign In</button>
</form>
<div class="auth-divider">or continue with</div>
<div class="social-auth"><button class="social-auth-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Google</button><button class="social-auth-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Facebook</button></div>
<p style="text-align:center;margin-top:2rem;font-size:0.9375rem">Don't have an account? <a href="register.html" style="color:var(--accent);font-weight:500">Sign Up</a></p>
</div></div></div>
</main>
{FOOTER_SIMPLE}''')

# 4. register.html  
write_file("register.html", f'''{HEAD("Register - Toline", "Create your account")}
{HEADER_SIMPLE}
<main>
<div class="auth-layout">
<div class="auth-hero"><h1>Join Toline Today!</h1><p>Create an account to enjoy exclusive benefits and personalized shopping experience.</p></div>
<div class="auth-form-wrapper"><div class="auth-form">
<h2>Create Account</h2><p>Fill in your details to get started</p>
<form>
<div class="form-row single"><div class="form-group"><label>Full Name</label><input type="text" required placeholder="John Doe"></div></div>
<div class="form-row"><div class="form-group"><label>Email</label><input type="email" required placeholder="john@example.com"></div><div class="form-group"><label>Phone</label><input type="tel" placeholder="+62 812-xxxx-xxxx"></div></div>
<div class="form-row"><div class="form-group"><label>Password</label><input type="password" required minlength="8" placeholder="Min. 8 characters"></div><div class="form-group"><label>Confirm Password</label><input type="password" required placeholder="••••••••"></div></div>
<div style="margin:1rem 0"><label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.875rem"><input type="checkbox" required>I agree to the <a href="#" style="color:var(--accent)">Terms & Conditions</a> and <a href="#" style="color:var(--accent)">Privacy Policy</a></label></div>
<button type="submit" class="btn btn-primary btn-lg" style="width:100%">Create Account</button>
</form>
<div class="auth-divider">or sign up with</div>
<div class="social-auth"><button class="social-auth-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Google</button></div>
<p style="text-align:center;margin-top:2rem;font-size:0.9375rem">Already have an account? <a href="login.html" style="color:var(--accent);font-weight:500">Sign In</a></p>
</div></div></div>
</main>
{FOOTER_SIMPLE}''')

# 5. dashboard.html
write_file("dashboard.html", f'''{HEAD("Dashboard - Toline", "Manage your account")}
{HEADER_FULL}
<main>
{BREADCRUMB([("Home", "index.html"), ("Dashboard", "")])}
<div class="container"><div class="dashboard-layout">
<aside class="dashboard-sidebar">
<div class="dashboard-user"><div class="dashboard-user-avatar"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><h3>John Doe</h3><span>john@example.com</span></div>
<nav class="dashboard-nav"><a href="#" class="active"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Dashboard</a><a href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Orders</a><a href="wishlist.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Wishlist</a><a href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Settings</a><a href="index.html" style="color:var(--danger)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Logout</a></nav>
</aside>
<div class="dashboard-content">
<div class="dashboard-header"><h2>Welcome Back, John! 👋</h2></div>
<div class="dashboard-stats"><div class="dashboard-stat"><h4>Total Orders</h4><h3>12</h3></div><div class="dashboard-stat"><h4>Wishlist</h4><h3>8</h3></div><div class="dashboard-stat"><h4>Total Spent</h4><h3>Rp 5.2M</h3></div><div class="dashboard-stat"><h4>Reward Points</h4><h3>520</h3></div></div>
<h3 style="margin:2rem 0 1rem">Recent Orders</h3>
<table class="orders-table"><thead><tr><th>Order ID</th><th>Date</th><th>Status</th><th>Total</th><th>Action</th></tr></thead><tbody>
<tr><td>#ORD-12345</td><td>Apr 5, 2024</td><td><span class="order-status processing">Processing</span></td><td>Rp 899.000</td><td><a href="#" class="btn btn-sm btn-ghost">View</a></td></tr>
<tr><td>#ORD-12340</td><td>Apr 1, 2024</td><td><span class="order-status shipped">Shipped</span></td><td>Rp 1.250.000</td><td><a href="#" class="btn btn-sm btn-ghost">Track</a></td></tr>
<tr><td>#ORD-12335</td><td>Mar 28, 2024</td><td><span class="order-status delivered">Delivered</span></td><td>Rp 459.000</td><td><a href="#" class="btn btn-sm btn-ghost">Review</a></td></tr>
</tbody></table>
</div></div></div>
</main>
{FOOTER_FULL}''')

# 6. wishlist.html
write_file("wishlist.html", f'''{HEAD("Wishlist - Toline", "Your saved products")}
{HEADER_FULL}
<main>
{BREADCRUMB([("Home", "index.html"), ("Wishlist", "")])}
{PAGE_HEADER("My Wishlist", "Products you've saved for later")}
<div class="container" style="padding:3rem 0">
<div class="wishlist-grid" id="wishlist-grid">
{"".join([PRODUCT_CARD(i) for i in range(1,5)])}
</div>
<div class="cart-empty" style="display:none"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><h3>Your wishlist is empty</h3><p>Start adding products you love!</p><a href="shop.html" class="btn btn-primary">Start Shopping</a></div>
</div>
</main>
{FOOTER_FULL}''')

# 7. blog.html
write_file("blog.html", f'''{HEAD("Blog - Toline", "Read our latest articles and guides")}
{HEADER_FULL}
<main>
{BREADCRUMB([("Home", "index.html"), ("Blog", "")])}
{PAGE_HEADER("Blog & Articles", "Tips, guides, and updates from our team")}
<div class="container"><div class="blog-layout">
<div class="blog-posts">
<article class="blog-post-card"><div class="blog-post-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23e2e8f0' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='20'%3EBlog Post 1%3C/text%3E%3C/svg%3E" alt="Blog"></div><div class="blog-post-content"><div class="blog-post-meta"><span>Apr 5, 2024</span><span>•</span><span>Fashion</span></div><h3><a href="article.html">How to Style Your Summer Outfit</a></h3><p>Discover the latest trends and learn how to create the perfect summer wardrobe that suits your personality and lifestyle.</p><a href="article.html" class="blog-read-more">Read More →</a></div></article>
<article class="blog-post-card"><div class="blog-post-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23cbd5e1' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='20'%3EBlog Post 2%3C/text%3E%3C/svg%3E" alt="Blog"></div><div class="blog-post-content"><div class="blog-post-meta"><span>Apr 1, 2024</span><span>•</span><span>Trends</span></div><h3><a href="article.html">Top 10 Fashion Trends 2024</a></h3><p>Stay ahead of the curve with our comprehensive guide to this year's must-have styles and accessories.</p><a href="article.html" class="blog-read-more">Read More →</a></div></article>
<article class="blog-post-card"><div class="blog-post-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%2394a3b8' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='20'%3EBlog Post 3%3C/text%3E%3C/svg%3E" alt="Blog"></div><div class="blog-post-content"><div class="blog-post-meta"><span>Mar 28, 2024</span><span>•</span><span>Guide</span></div><h3><a href="article.html">Complete Guide to Minimalist Wardrobe</a></h3><p>Build a versatile, timeless wardrobe with fewer pieces that mix and match effortlessly.</p><a href="article.html" class="blog-read-more">Read More →</a></div></article>
</div>
<aside class="blog-sidebar">
<div class="blog-widget"><h4>Search</h4><div class="form-group"><input type="text" placeholder="Search articles..." style="padding:0.75rem;border:1px solid var(--border);border-radius:var(--radius-md)"></div></div>
<div class="blog-widget"><h4>Categories</h4><div class="blog-categories"><a href="#">Fashion <span>(12)</span></a><a href="#">Electronics <span>(8)</span></a><a href="#">Lifestyle <span>(15)</span></a><a href="#">Guides <span>(6)</span></a></div></div>
<div class="blog-widget"><h4>Recent Posts</h4><div style="display:flex;flex-direction:column;gap:1rem"><a href="article.html" style="display:flex;gap:1rem"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect fill='%23e2e8f0' width='60' height='60'/%3E%3C/svg%3E" style="width:60px;height:60px;border-radius:var(--radius-md);object-fit:cover"><div><h5 style="font-size:0.875rem;margin-bottom:0.25rem">Summer Styling Tips</h5><span style="font-size:0.75rem;color:var(--text-lighter)">Apr 5, 2024</span></div></a></div></div>
<div class="blog-widget" style="background:var(--accent-light);border-color:var(--accent-light)"><h4 style="color:var(--accent)">Newsletter</h4><p style="font-size:0.875rem;margin-bottom:1rem">Get the latest articles delivered to your inbox.</p><div class="form-group"><input type="email" placeholder="Your email" style="padding:0.75rem;border:1px solid var(--border);border-radius:var(--radius-md);margin-bottom:0.5rem;width:100%%"><button class="btn btn-primary btn-sm" style="width:100%%">Subscribe</button></div></div>
</aside></div></div>
</main>
{FOOTER_FULL}''')

# 8. article.html
write_file("article.html", f'''{HEAD("Article - Toline", "Read article")}
{HEADER_FULL}
<main>
{BREADCRUMB([("Home", "index.html"), ("Blog", "blog.html"), ("Article", "")])}
<article class="article-layout">
<header class="article-header"><div class="article-meta"><span>Apr 5, 2024</span><span>•</span><span>By Jane Doe</span><span>•</span><span>5 min read</span></div><h1>How to Style Your Summer Outfit</h1></header>
<div class="article-featured-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect fill='%23e2e8f0' width='1200' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='24'%3EFeatured Image%3C/text%3E%3C/svg%3E" alt="Featured"></div>
<div class="article-content">
<p>Summer is the perfect time to refresh your wardrobe and experiment with new styles. Whether you're heading to the beach, attending a summer wedding, or simply enjoying a casual day out, having the right outfit can make all the difference.</p>
<h2>1. Choose Light and Breathable Fabrics</h2>
<p>When temperatures rise, opt for natural fabrics like cotton, linen, and bamboo that allow your skin to breathe. These materials are not only comfortable but also help keep you cool throughout the day.</p>
<h2>2. Embrace Bright Colors and Patterns</h2>
<p>Summer is the season to have fun with your clothing. Don't be afraid to experiment with:</p>
<ul><li>Bold floral prints</li><li>Bright yellows and oranges</li><li>Pastel shades</li><li>Tropical patterns</li></ul>
<blockquote>The best fashion trend for summer 2024 is comfort combined with sustainability. Choose pieces that look good and feel good.</blockquote>
<h2>3. Accessorize Wisely</h2>
<p>The right accessories can transform a simple outfit into something special. Consider adding a stylish sun hat, minimalist jewelry, or a classic pair of sunglasses.</p>
<h3>Key Accessories for Summer:</h3>
<ol><li>Wide-brim hat for sun protection</li><li>Lightweight scarf for evening breezes</li><li>Classic sunglasses</li><li>Minimal jewelry pieces</li></ol>
<h2>Conclusion</h2>
<p>Summer styling is all about balancing comfort with creativity. Choose pieces that make you feel confident and don't forget to have fun with your wardrobe choices!</p>
</div>
<div style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border)"><h3>Share this article</h3><div style="display:flex;gap:1rem;margin-top:1rem"><a href="#" class="btn btn-ghost btn-sm">Facebook</a><a href="#" class="btn btn-ghost btn-sm">Twitter</a><a href="#" class="btn btn-ghost btn-sm">WhatsApp</a></div></div>
<section style="margin-top:4rem"><h2 style="margin-bottom:2rem">Related Articles</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem">
<a href="article.html" style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect fill='%23e2e8f0' width='400' height='250'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='16'%3ERelated 1%3C/text%3E%3C/svg%3E" style="width:100%%;aspect-ratio:16/10;object-fit:cover"><div style="padding:1rem"><h4 style="font-size:0.9375rem">Top 10 Fashion Trends 2024</h4></div></a>
<a href="article.html" style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect fill='%23cbd5e1' width='400' height='250'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='16'%3ERelated 2%3C/text%3E%3C/svg%3E" style="width:100%%;aspect-ratio:16/10;object-fit:cover"><div style="padding:1rem"><h4 style="font-size:0.9375rem">Minimalist Wardrobe Guide</h4></div></a>
<a href="article.html" style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect fill='%2394a3b8' width='400' height='250'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='16'%3ERelated 3%3C/text%3E%3C/svg%3E" style="width:100%%;aspect-ratio:16/10;object-fit:cover"><div style="padding:1rem"><h4 style="font-size:0.9375rem">Sustainable Fashion Tips</h4></div></a>
</div></section>
</article>
</main>
{FOOTER_FULL}''')

# 9. about.html
write_file("about.html", f'''{HEAD("About Us - Toline", "Learn more about Toline E-Commerce")}
{HEADER_FULL}
<main>
<section class="about-hero"><div class="container"><h1>About Toline</h1><p style="max-width:700px;margin:0 auto">We're on a mission to provide premium quality products with exceptional customer service. Founded in 2020, Toline has grown to become a trusted destination for discerning shoppers.</p></div></section>
<section class="about-content"><div class="container">
<div class="about-grid">
<div class="about-card"><div class="about-card-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><h3>Quality First</h3><p>Every product is carefully curated to meet our high standards of quality and craftsmanship.</p></div>
<div class="about-card"><div class="about-card-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div><h3>Fast Shipping</h3><p>We partner with reliable couriers to ensure your orders arrive quickly and safely.</p></div>
<div class="about-card"><div class="about-card-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><h3>Customer Support</h3><p>Our dedicated team is always here to help you with any questions or concerns.</p></div>
</div>
<div class="about-team" style="margin-top:6rem"><h2>Meet Our Team</h2>
<div class="team-grid">
<div class="team-card"><div class="team-card-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect fill='%23e2e8f0' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='16'%3ETeam 1%3C/text%3E%3C/svg%3E" alt="Team"></div><h4>John Smith</h4><span>CEO & Founder</span></div>
<div class="team-card"><div class="team-card-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect fill='%23cbd5e1' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='16'%3ETeam 2%3C/text%3E%3C/svg%3E" alt="Team"></div><h4>Sarah Lee</h4><span>Creative Director</span></div>
<div class="team-card"><div class="team-card-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect fill='%2394a3b8' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='16'%3ETeam 3%3C/text%3E%3C/svg%3E" alt="Team"></div><h4>Mike Chen</h4><span>Head of Operations</span></div>
<div class="team-card"><div class="team-card-image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect fill='%2364748b' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='16'%3ETeam 4%3C/text%3E%3C/svg%3E" alt="Team"></div><h4>Emily Davis</h4><span>Customer Relations</span></div>
</div></div></div></section>
</main>
{FOOTER_FULL}''')

# 10. contact.html
write_file("contact.html", f'''{HEAD("Contact Us - Toline", "Get in touch with us")}
{HEADER_FULL}
<main>
{BREADCRUMB([("Home", "index.html"), ("Contact", "")])}
{PAGE_HEADER("Contact Us", "We'd love to hear from you")}
<div class="container"><div class="contact-layout">
<div class="contact-info">
<div class="contact-item"><div class="contact-item-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><h4>Our Location</h4><p>Jl. Sudirman No. 123<br>Jakarta Pusat, 10220<br>Indonesia</p></div></div>
<div class="contact-item"><div class="contact-item-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div><h4>Phone</h4><p>+62 812-3456-7890<br>Mon-Sat, 9AM-6PM WIB</p></div></div>
<div class="contact-item"><div class="contact-item-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><h4>Email</h4><p>support@toline.com<br>business@toline.com</p></div></div>
</div>
<div class="contact-form">
<h3 style="margin-bottom:1.5rem">Send us a message</h3>
<form onsubmit="event.preventDefault();showToast('Message Sent!','We will get back to you soon.','success');this.reset()">
<div class="form-row"><div class="form-group"><label>Name</label><input type="text" required placeholder="Your name"></div><div class="form-group"><label>Email</label><input type="email" required placeholder="your@email.com"></div></div>
<div class="form-row single"><div class="form-group"><label>Subject</label><input type="text" required placeholder="What is this about?"></div></div>
<div class="form-row single"><div class="form-group"><label>Message</label><textarea required placeholder="Tell us more..." rows="5"></textarea></div></div>
<button type="submit" class="btn btn-primary btn-lg">Send Message</button>
</form></div></div></div>
</main>
{FOOTER_FULL}''')

# 11. faq.html
write_file("faq.html", f'''{HEAD("FAQ - Toline", "Frequently Asked Questions")}
{HEADER_FULL}
<main>
{BREADCRUMB([("Home", "index.html"), ("FAQ", "")])}
{PAGE_HEADER("Frequently Asked Questions", "Find answers to common questions")}
<div class="container"><div class="faq-layout">
<div class="faq-list">
<div class="faq-item active"><div class="faq-question"><span>How long does shipping take?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>Standard shipping takes 2-5 business days within Java and 5-10 business days for outer islands. Express shipping is available for faster delivery (1-2 days within Java).</p></div></div>
<div class="faq-item"><div class="faq-question"><span>What is your return policy?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>We offer a 30-day return policy. Items must be in original condition with tags attached. Simply contact our support team to initiate a return.</p></div></div>
<div class="faq-item"><div class="faq-question"><span>What payment methods do you accept?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>We accept bank transfers (BCA, Mandiri, BNI, BRI), e-wallets (GoPay, OVO, Dana, ShopeePay), and Cash on Delivery (COD) for selected areas.</p></div></div>
<div class="faq-item"><div class="faq-question"><span>How can I track my order?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in your Dashboard > Orders section.</p></div></div>
<div class="faq-item"><div class="faq-question"><span>Do you offer free shipping?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>Yes! We offer free shipping for all orders above Rp 500.000 within Indonesia. For orders below that, a flat shipping rate of Rp 15.000 applies.</p></div></div>
<div class="faq-item"><div class="faq-question"><span>How do I know what size to order?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>Each product page includes a detailed size guide. If you're between sizes, we recommend sizing up for a more comfortable fit. You can also chat with our support team for personalized advice.</p></div></div>
<div class="faq-item"><div class="faq-question"><span>Can I cancel my order?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>Orders can be cancelled within 1 hour of placement if they haven't been shipped yet. Contact our support team immediately to request a cancellation.</p></div></div>
<div class="faq-item"><div class="faq-question"><span>Are your products authentic?</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div><div class="faq-answer"><p>Absolutely! We guarantee 100% authenticity for all products. We work directly with brands and authorized distributors to ensure quality and authenticity.</p></div></div>
</div>
<div style="text-align:center;margin-top:4rem;padding:3rem;background:var(--secondary);border-radius:var(--radius-xl)"><h3>Still have questions?</h3><p style="margin-bottom:2rem">Our team is here to help you</p><div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap"><a href="contact.html" class="btn btn-primary">Contact Us</a><button class="btn btn-outline" onclick="document.querySelector('.chat-widget').classList.add('active')">Live Chat</button></div></div>
</div></div>
</main>
<script>document.querySelectorAll('.faq-question').forEach(q=>q.addEventListener('click',function(){{const item=this.parentElement;const isActive=item.classList.contains('active');document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));if(!isActive)item.classList.add('active')}}))</script>
{FOOTER_FULL}''')

print("\n✅ All pages generated successfully!")
print(f"📁 Files created in: {BASE_DIR}")
