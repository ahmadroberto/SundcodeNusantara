// Navbar scroll effect
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const themeToggles = document.querySelectorAll('.theme-toggle');

// Theme Toggle Functionality
function getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

const currentTheme = getPreferredTheme();
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggles.length > 0) {
    themeToggles.forEach(themeToggle => {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add transition class for smooth theme switch
            document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add click animation
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        });
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
});

// Add scrolled class on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        let overlay = document.querySelector('.overlay');
        if (navMenu.classList.contains('active')) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'overlay active';
                document.body.appendChild(overlay);
            }
        } else if (overlay) {
            overlay.remove();
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const overlay = document.querySelector('.overlay');
            if (overlay) overlay.remove();
        });
    });
    
    document.addEventListener('click', (e) => {
        const overlay = document.querySelector('.overlay');
        if (e.target === overlay) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            overlay.remove();
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Fade in animation on scroll
const fadeElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .float-card');

fadeElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// Button ripple effect
document.querySelectorAll('.btn-gradient').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero elements
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Generate stars dynamically
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    let starsHTML = '';
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.2;
        const delay = Math.random() * 4;
        
        starsHTML += `
            <div style="
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                opacity: ${opacity};
                animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${delay}s;
            "></div>
        `;
    }
    
    starsContainer.innerHTML = starsHTML;
}

createStars();

// Mouse parallax for floating cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.float-card');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 5;
        const currentTransform = window.getComputedStyle(card).transform;
        
        if (window.innerWidth > 1024) {
            card.style.transform = `
                ${card.classList.contains('card-left') ? 'perspective(800px) rotateY(5deg) rotateX(-2deg)' : ''}
                ${card.classList.contains('card-center') ? 'translateX(-50%)' : ''}
                ${card.classList.contains('card-right') ? 'perspective(800px) rotateY(-5deg) rotateX(-2deg)' : ''}
                translate(${x * speed}px, ${y * speed}px)
            `;
        }
    });
});
