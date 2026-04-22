# TOLINE E-COMMERCE - Modern Minimalist Luxury Theme

> **Copyright © 2024 PT Sundcode Nusantara**  
> **Licensed under MIT License**  
> **100% Free & Open Source - No Copyright Restrictions**

Premium frontend website template for e-commerce businesses. Built with HTML, CSS, and JavaScript - no heavy frameworks, no external dependencies.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**You are free to:**
- ✅ Use for personal projects
- ✅ Use for commercial projects  
- ✅ Modify the code
- ✅ Distribute the template
- ✅ Sell products built with this template

**No attribution required** (but appreciated!)

## 🚫 Zero External Dependencies

This template is **100% self-contained**:

| Resource | Status |
|----------|--------|
| Fonts | ✅ System fonts only (no Google Fonts) |
| Images | ✅ CSS gradient placeholders (no external images) |
| Icons | ✅ Inline SVGs (no icon libraries) |
| CSS | ✅ Pure CSS (no frameworks) |
| JavaScript | ✅ Vanilla JS (no libraries) |

## 📁 Project Structure

```
toline (ecommerce)/
├── index.html                 # Homepage
├── shop.html                  # Product catalog with filters
├── product.html               # Product detail page
├── cart.html                  # Shopping cart
├── checkout.html              # Checkout process
├── order-success.html         # Order confirmation
├── login.html                 # Login page
├── register.html              # Registration page
├── dashboard.html             # User dashboard
├── wishlist.html              # Wishlist page
├── blog.html                  # Blog listing
├── article.html               # Single article
├── about.html                 # About us page
├── contact.html               # Contact page
├── faq.html                   # FAQ page
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   ├── animation.css      # Animations
│   │   └── responsive.css     # Mobile responsive
│   │
│   ├── js/
│   │   ├── main.js            # Core functionality
│   │   ├── cart.js            # Shopping cart system
│   │   ├── product.js         # Product features
│   │   ├── checkout.js        # Checkout validation
│   │   ├── search.js          # Search functionality
│   │   └── chat.js            # Chat widget
│   │
│   ├── img/                   # Images folder
│   └── icons/                 # Icons folder
│
├── generate.js                # Page generation script
└── ressume.txt                # Project requirements
```

## ✨ Features

### Pages (15 Total)
✅ **Home** - Hero section, featured categories, products, promo banner, testimonials, newsletter  
✅ **Shop** - Product catalog with filter sidebar, sorting, pagination  
✅ **Product Detail** - Image gallery, variants, tabs (description, reviews, specs), related products  
✅ **Cart** - Item management, quantity controls, order summary, coupon input  
✅ **Checkout** - Multi-step form, address, payment methods (Bank, E-Wallet, COD)  
✅ **Order Success** - Confirmation with order details and next steps  
✅ **Login/Register** - Authentication with social auth options  
✅ **Dashboard** - User stats, order history, account management  
✅ **Wishlist** - Saved products grid  
✅ **Blog/Article** - Content marketing pages  
✅ **About/Contact/FAQ** - Company info and support  

### UI/UX Features
🎨 Modern Minimalist Luxury Design
🎨 Color Palette: Primary #0F172A, Accent #6366F1, Secondary #F8FAFC
🎨 Premium typography (Inter + Poppins)
🎨 Smooth animations & micro-interactions
🎨 Hover effects on products and buttons
🎨 Sticky header with blur backdrop
🎨 Mega menu for categories
🎨 Mobile-responsive navigation
🎨 Search overlay with live suggestions
🎨 Floating chat widget
🎨 Toast notifications

### Functionality
🛒 LocalStorage-based cart system
❤️ Wishlist management
🔍 Live search with recent searches
💬 Chat widget with auto-responses
📱 Fully responsive (mobile, tablet, desktop)
♿ Accessibility features (focus states, ARIA labels)
🎭 Scroll-triggered animations
📊 Form validation
💳 Payment method selection UI
📦 Order tracking ready

### Performance
⚡ No heavy frameworks
⚡ SVG placeholder images
⚡ Lazy loading ready
⚡ Optimized CSS animations
⚡ Reduced motion support
⚡ Minification ready structure

## 🎨 Design System

### Colors
```css
Primary:    #0F172A (Dark navy)
Accent:     #6366F1 (Indigo)
Secondary:  #F8FAFC (Light gray)
Text:       #111827 (Near black)
Success:    #10B981
Warning:    #F59E0B
Danger:     #EF4444
```

### Typography
- **Headings**: Poppins (500, 600, 700)
- **Body**: Inter (400, 500, 600)

### Spacing Scale
- XS: 0.25rem
- SM: 0.5rem
- MD: 1rem
- LG: 1.5rem
- XL: 2rem
- 2XL: 3rem
- 3XL: 4rem
- 4XL: 6rem

## 🚀 Getting Started

### Option 1: Direct Open
Simply open `index.html` in your browser. No build process required!

```bash
# Windows
start index.html

# Or just double-click the file
```

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 639px
- **Tablet Portrait**: 640px - 767px
- **Tablet Landscape**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px - 1439px
- **XL Desktop**: 1440px+

## 🔧 Customization

### Change Colors
Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --primary: #0F172A;
  --accent: #6366F1;
  --secondary: #F8FAFC;
  /* ... more variables */
}
```

### Change Fonts
Update Google Fonts link in HTML files and modify CSS variables:

```css
--font-primary: 'Inter', sans-serif;
--font-heading: 'Poppins', sans-serif;
```

### Add Products
Products are controlled via data attributes:

```html
<button data-add-to-cart="1" 
        data-product-name="Product Name" 
        data-product-price="899000">
  Add to Cart
</button>
```

### Integrate Backend
The frontend is ready for backend integration:
- Cart data stored in LocalStorage (see `cart.js`)
- Forms ready for API endpoints
- Order system uses LocalStorage (see `checkout.js`)

## 📊 SEO Optimization

✅ Semantic HTML5 structure  
✅ Proper heading hierarchy (h1 → h2 → h3)  
✅ Meta descriptions on all pages  
✅ Open Graph tags  
✅ Alt text on images  
✅ Clean URL structure  
✅ Mobile-friendly  

## 🎯 Next Steps for Production

1. **Replace placeholder images** with real product photos
2. **Integrate backend API** for dynamic product loading
3. **Connect payment gateway** (Midtrans, Xendit, etc.)
4. **Add authentication system** (Firebase, custom backend)
5. **Setup database** for products, orders, users
6. **Add analytics** (Google Analytics, Facebook Pixel)
7. **Optimize images** (WebP format, compression)
8. **Minify CSS/JS** for production
9. **Add SSL certificate** for HTTPS
10. **Setup hosting** (Netlify, Vercel, custom server)

## 💡 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 License

This template is ready to use for personal or commercial projects.

## 🤝 Support

For questions or issues:
- Check `faq.html` for common questions
- Use the chat widget for help
- Review code comments in JavaScript files

## 🎉 Credits

Built following premium e-commerce standards inspired by:
- Shopify
- Apple Store
- Stripe UI

---

**Happy Selling! 🛍️**
