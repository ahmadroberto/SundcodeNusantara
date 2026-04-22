# LUXURA - Premium Fashion Brand Website

A modern, elegant, and high-performance company profile website for a fashion brand specializing in clothing, shoes, and accessories.

## 🎨 Features

### Design
- **Modern & Elegant**: Clean, minimalist design inspired by premium fashion brands like Nike, Zara, and Off-White
- **Futuristic UI**: Glassmorphism effects, smooth animations, and micro-interactions
- **Fully Responsive**: Optimized for desktop, laptop, tablet, and mobile devices
- **Premium Typography**: Local fonts (Poppins for headings, Inter for body text)
- **Color Palette**: 
  - Primary: `#111111`
  - Secondary: `#ffffff`
  - Accent: `#c9a96e`
  - Background: `#f7f7f7`

### Performance
- ⚡ **No CDN Dependencies**: All assets are local (fonts, icons, libraries)
- 🖼️ **Lazy Loading**: Images load only when needed
- 📦 **Deferred JavaScript**: Scripts load after page content
- 🎨 **Modular CSS**: Separated into logical files for better maintainability
- 📝 **Semantic HTML**: Proper structure for better SEO

### SEO Optimization
- ✅ Complete meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Schema.org structured data
- ✅ Semantic HTML5 elements
- ✅ Proper heading hierarchy
- ✅ Alt text for all images
- ✅ Canonical URLs
- ✅ Breadcrumbs navigation

### Accessibility
- ♿ ARIA labels and roles
- ♿ Keyboard navigation support
- ♿ Focus visible styles
- ♿ Screen reader only text
- ♿ Proper contrast ratios

## 📁 Project Structure

```
fashion-company-profile/
│
├── index.html                  # Home page
├── about.html                  # About page
├── products.html               # Products catalog
├── product-detail.html         # Product detail page
├── gallery.html                # Fashion gallery
├── blog.html                   # Blog listing
├── contact.html                # Contact page
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Base styles, variables, reset
│   │   ├── layout.css         # Layout structures (navbar, sections, grids)
│   │   ├── components.css     # Reusable components (cards, buttons, badges)
│   │   ├── animations.css     # All animations and transitions
│   │   └── responsive.css     # Media queries and responsive breakpoints
│   │
│   ├── js/
│   │   ├── main.js            # Core functionality (loading, scroll, forms)
│   │   ├── navigation.js      # Navbar and mobile menu
│   │   ├── slider.js          # Testimonial & product sliders
│   │   └── animations.js      # Scroll reveal & parallax effects
│   │
│   ├── fonts/                  # Local font files
│   │
│   ├── icons/                  # SVG icons
│   │   ├── menu.svg
│   │   ├── close.svg
│   │   ├── search.svg
│   │   ├── cart.svg
│   │   ├── user.svg
│   │   ├── heart.svg
│   │   ├── instagram.svg
│   │   ├── facebook.svg
│   │   ├── twitter.svg
│   │   └── ... (more icons)
│   │
│   └── images/                 # Image placeholders
│       ├── hero/
│       ├── products/
│       ├── team/
│       └── gallery/
│
└── README.md                   # This file
```

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser. No build process required!

```
fashion-company-profile/index.html
```

### Option 2: Run Local Server
For best experience, run a local server:

**Using Python:**
```bash
cd fashion-company-profile
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Using Node.js:**
```bash
npx serve fashion-company-profile
```

**Using PHP:**
```bash
cd fashion-company-profile
php -S localhost:8000
```

## 📄 Pages Overview

### 1. Home (`index.html`)
- Full-screen hero section with CTA
- Featured collection grid
- Brand story section
- Product categories highlights
- Why choose us section
- Fashion gallery preview
- Customer testimonials slider
- Latest blog posts preview
- Newsletter subscription form

### 2. About (`about.html`)
- Company journey and story
- Vision and mission
- Team members grid
- Production process steps
- Studio/workshop photos

### 3. Products (`products.html`)
- Category filter (All, Clothing, Shoes, Accessories)
- Product grid with hover effects
- Quick view buttons
- Product badges (New, Sale, Best Seller)
- Pagination

### 4. Product Detail (`product-detail.html`)
- Image gallery with thumbnails
- Product information and pricing
- Size selection
- Materials and features list
- Add to cart & wishlist
- WhatsApp order button
- Related products

### 5. Gallery (`gallery.html`)
- Masonry grid layout
- Lightbox popup on click
- Keyboard navigation (arrow keys, ESC)
- Touch swipe support

### 6. Blog (`blog.html`)
- Search box
- Blog card grid
- Categories and dates
- Pagination

### 7. Contact (`contact.html`)
- Contact form with validation
- Contact information (address, phone, email)
- WhatsApp direct chat button
- Business hours
- Social media links
- Map placeholder

## 🎨 Customization

### Change Colors
Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --primary: #111111;
  --secondary: #ffffff;
  --accent: #c9a96e;
  --background: #f7f7f7;
}
```

### Change Brand Name
Search and replace "LUXURA" across all HTML files with your brand name.

### Add Real Images
Replace SVG placeholders in `assets/images/` with actual product photos.

### Update Contact Info
Edit contact details in `contact.html` and footer sections.

### Modify Products
Update product information in `products.html` and `product-detail.html`.

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables, flexbox, grid
- **Vanilla JavaScript ES6+** - No frameworks, pure JavaScript
- **Intersection Observer API** - Scroll animations
- **CSS Keyframes** - Smooth animations
- **SVG** - Scalable icons

## 📱 Responsive Breakpoints

- Desktop: 1400px and above
- Laptop: 1200px - 1400px
- Tablet Landscape: 992px - 1200px
- Tablet Portrait: 768px - 992px
- Mobile: 576px - 768px
- Small Mobile: Below 576px

## ✨ Key Features

### Animations
- Scroll reveal effects
- Fade up/down/left/right
- Hover zoom on images
- Smooth page transitions
- Loading screen
- Testimonial auto-slider

### Interactive Elements
- Mobile hamburger menu
- Product category filter
- Image lightbox with keyboard support
- Scroll to top button
- Form validations
- Size selector buttons

### JavaScript Functionality
- Navbar scroll effect (transparent to solid)
- Mobile menu toggle
- Smooth scrolling
- Lazy loading images
- Testimonial slider
- Gallery lightbox
- Product filtering
- Form validation

## 🎯 SEO Checklist

- [x] Unique page titles for each page
- [x] Meta descriptions
- [x] Proper heading hierarchy (H1, H2, H3)
- [x] Alt text for images
- [x] Semantic HTML elements
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Schema.org markup
- [x] Canonical URLs
- [x] Mobile responsive
- [x] Fast loading (no CDN)

## 🔧 Future Enhancements

- [ ] Add real product images
- [ ] Integrate with backend/CMS
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Product search functionality
- [ ] Wishlist feature
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced analytics integration

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify for your needs.

## 👨‍💻 Developer Notes

### Code Quality
- Clean, well-indented code
- Comprehensive comments
- Modular structure
- Reusable components
- Consistent naming conventions

### Performance Tips
1. Replace placeholder SVGs with optimized WebP images
2. Minify CSS and JS files for production
3. Enable gzip compression on server
4. Use browser caching
5. Implement lazy loading for videos

### File Size
- Total HTML files: ~250KB
- Total CSS files: ~45KB
- Total JS files: ~25KB
- Total SVG assets: ~30KB
- **Grand Total: ~350KB** (extremely lightweight!)

## 📞 Support

For questions or issues, please check the code comments. All functions are well-documented with JSDoc-style comments.

---

**Built with ❤️ for fashion brands**

*Last Updated: April 2026*
