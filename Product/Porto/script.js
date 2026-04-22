// ========================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// ARMcreative v1.0
// ========================================

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const particlesCanvas = document.getElementById('particles-canvas');
    const typedText = document.getElementById('typed-text');
    const contactForm = document.getElementById('contact-form');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sliderContainer = document.getElementById('slider-container');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const sliderDots = document.getElementById('slider-dots');
    const copyButtons = document.querySelectorAll('.copy-btn');
    const currentYear = document.getElementById('current-year');
    const pageLoader = document.getElementById('page-loader');
    const mouseGradient = document.getElementById('mouse-gradient');

    // ========================================
    // PAGE LOADER
    // ========================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (pageLoader) {
                pageLoader.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }, 1500);
    });

    // Prevent scroll during loading
    if (pageLoader) {
        document.body.style.overflow = 'hidden';
    }

    // ========================================
    // CUSTOM CURSOR
    // ========================================
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category, .stack-icon, .filter-btn, .experience-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }

    // ========================================
    // MOUSE TRACKING GRADIENT
    // ========================================
    if (mouseGradient && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseGradient.style.left = e.clientX + 'px';
            mouseGradient.style.top = e.clientY + 'px';
            mouseGradient.classList.add('visible');
        });

        document.addEventListener('mouseleave', () => {
            mouseGradient.classList.remove('visible');
        });
    }

    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollTop;
    }

    // ========================================
    // ACTIVE NAVIGATION LINK
    // ========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL NAVIGATION (Lenis-like)
    // ========================================
    class SmoothScroll {
        constructor() {
            this.currentY = window.pageYOffset;
            this.targetY = window.pageYOffset;
            this.ease = 0.075;
            this.isScrolling = true;
            this.rafId = null;
            
            this.init();
        }
        
        init() {
            document.documentElement.classList.add('lenis-smooth');
            
            window.addEventListener('scroll', (e) => {
                if (!e.target.closest('[data-lenis-prevent]')) {
                    this.targetY = window.pageYOffset;
                }
            }, { passive: true });
            
            this.animate();
        }
        
        animate() {
            this.currentY += (this.targetY - this.currentY) * this.ease;
            
            if (Math.abs(this.targetY - this.currentY) < 0.5) {
                this.currentY = this.targetY;
            }
            
            this.rafId = requestAnimationFrame(() => this.animate());
        }
        
        scrollTo(target, options = {}) {
            const { offset = 0, duration = 1000, easing = 'easeInOut' } = options;
            
            let targetY;
            
            if (typeof target === 'string') {
                const element = document.querySelector(target);
                if (!element) return;
                targetY = element.offsetTop + offset;
            } else {
                targetY = target + offset;
            }
            
            const startY = this.currentY;
            const distance = targetY - startY;
            let startTime = null;
            
            const easeFunctions = {
                easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
                easeOut: t => 1 - Math.pow(1 - t, 3),
                linear: t => t
            };
            
            const ease = easeFunctions[easing] || easeFunctions.easeInOut;
            
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easedProgress = ease(progress);
                
                this.targetY = startY + distance * easedProgress;
                window.scrollTo(0, this.targetY);
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            
            requestAnimationFrame(step);
        }
        
        destroy() {
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
            }
            document.documentElement.classList.remove('lenis-smooth');
        }
    }
    
    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll();
    
    // Apply smooth scroll to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (target && target !== '#') {
                smoothScroll.scrollTo(target, {
                    offset: -100,
                    duration: 1200,
                    easing: 'easeInOut'
                });
            }
        });
    });

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    function handleBackToTop() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            smoothScroll.scrollTo(0, {
                offset: 0,
                duration: 1500,
                easing: 'easeInOut'
            });
        });
    }

    // ========================================
    // SCROLL REVEAL ANIMATION (Enhanced)
    // ========================================
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal-up, .scale-reveal, .slide-in-left, .slide-in-right, .stagger-children');
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    // ========================================
    // SKILL PROGRESS BAR ANIMATION
    // ========================================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            
            if (rect.top < window.innerHeight - 100 && !bar.classList.contains('animated')) {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
                bar.classList.add('animated');
            }
        });
    }

    // ========================================
    // COUNTER ANIMATION (GSAP-like easing)
    // ========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            
            if (rect.top < window.innerHeight - 100 && !counter.classList.contains('animated')) {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                // Easing function (easeOutExpo)
                const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutExpo(progress);
                    
                    counter.textContent = Math.floor(easedProgress * target);
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                requestAnimationFrame(updateCounter);
                counter.classList.add('animated');
            }
        });
    }

    // ========================================
    // TYPING EFFECT
    // ========================================
    const typingTexts = ['Developer', 'Designer', 'Freelancer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    if (typedText) {
        setTimeout(typeText, 1000);
    }

    // ========================================
    // PORTFOLIO FILTER
    // ========================================
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ========================================
    // TESTIMONIALS SLIDER
    // ========================================
    let currentSlide = 0;
    let totalSlides = 0;
    let autoSlideInterval;

    if (sliderContainer) {
        const testimonials = sliderContainer.querySelectorAll('.testimonial-card');
        totalSlides = testimonials.length;

        if (sliderDots) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                sliderDots.appendChild(dot);
            }
        }

        function updateSlider() {
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            const dots = sliderDots.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
            resetAutoSlide();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        if (sliderNext) {
            sliderNext.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        if (sliderPrev) {
            sliderPrev.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();

        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                nextSlide();
                resetAutoSlide();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                prevSlide();
                resetAutoSlide();
            }
        }

        let isDragging = false;
        let dragStartX = 0;
        let dragEndX = 0;

        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            sliderContainer.style.cursor = 'grabbing';
        });

        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                dragEndX = e.clientX;
                handleDrag();
                isDragging = false;
                sliderContainer.style.cursor = 'grab';
            }
        });

        function handleDrag() {
            const dragThreshold = 50;
            
            if (dragStartX - dragEndX > dragThreshold) {
                nextSlide();
                resetAutoSlide();
            } else if (dragEndX - dragStartX > dragThreshold) {
                prevSlide();
                resetAutoSlide();
            }
        }
    }

    // ========================================
    // COPY EMAIL BUTTON
    // ========================================
    if (copyButtons.length > 0) {
        copyButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const email = btn.getAttribute('data-copy');
                
                try {
                    await navigator.clipboard.writeText(email);
                    btn.classList.add('copied');
                    
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
                    
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = originalHTML;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span> ✓';
                submitBtn.style.background = 'var(--highlight)';
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ========================================
    // MAGNETIC BUTTON EFFECT
    // ========================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    if (magneticBtns.length > 0 && window.innerWidth > 768) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ========================================
    // PARALLAX EFFECT ON MOUSE MOVE
    // ========================================
    if (window.innerWidth > 768) {
        const floatingShapes = document.querySelectorAll('.floating-shape');
        const gradientOrbs = document.querySelectorAll('.hero-gradient-orb');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            floatingShapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            gradientOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 10;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ========================================
    // 3D TILT EFFECT ON CARDS
    // ========================================
    const tiltCards = document.querySelectorAll('.project-card, .experience-card');
    
    if (tiltCards.length > 0 && window.innerWidth > 768) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                card.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    // ========================================
    // PARTICLE BACKGROUND ANIMATION
    // ========================================
    if (particlesCanvas) {
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        let animationId;
        
        function resizeCanvas() {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            constructor() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > particlesCanvas.width) this.x = 0;
                if (this.x < 0) this.x = particlesCanvas.width;
                if (this.y > particlesCanvas.height) this.y = 0;
                if (this.y < 0) this.y = particlesCanvas.height;
            }
            
            draw() {
                ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            const particleCount = Math.min(100, Math.floor((particlesCanvas.width * particlesCanvas.height) / 15000));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function connectParticles() {
            const maxDistance = 150;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.2;
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connectParticles();
            animationId = requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
        
        let particleMouse = { x: null, y: null };
        
        particlesCanvas.addEventListener('mousemove', (e) => {
            const rect = particlesCanvas.getBoundingClientRect();
            particleMouse.x = e.clientX - rect.left;
            particleMouse.y = e.clientY - rect.top;
            
            particles.forEach(particle => {
                const dx = particle.x - particleMouse.x;
                const dy = particle.y - particleMouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.x += dx * force * 0.02;
                    particle.y += dy * force * 0.02;
                }
            });
        });
        
        particlesCanvas.addEventListener('mouseleave', () => {
            particleMouse.x = null;
            particleMouse.y = null;
        });
    }

    // ========================================
    // UPDATE CURRENT YEAR
    // ========================================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ========================================
    // SCROLL EVENT HANDLER (Optimized)
    // ========================================
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                handleNavbarScroll();
                updateActiveNavLink();
                handleBackToTop();
                revealOnScroll();
                animateSkillBars();
                animateCounters();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ========================================
    // INITIALIZE ON PAGE LOAD
    // ========================================
    window.addEventListener('load', () => {
        revealOnScroll();
        animateSkillBars();
        animateCounters();
    });

    // ========================================
    // PERFORMANCE: REDUCE MOTION
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        if (typedText) {
            typedText.textContent = 'Developer';
        }
        
        document.querySelectorAll('.reveal-up, .scale-reveal, .slide-in-left, .slide-in-right').forEach(el => {
            el.classList.add('visible');
        });
    }

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Lazy load background images
        const lazyBackgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bg = entry.target;
                    if (bg.dataset.bg) {
                        bg.style.backgroundImage = `url(${bg.dataset.bg})`;
                        lazyBackgroundObserver.unobserve(bg);
                    }
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('[data-bg]').forEach(bg => {
            lazyBackgroundObserver.observe(bg);
        });
    }

    // ========================================
    // PERFORMANCE: Code Splitting Simulation
    // ========================================
    // Defer non-critical operations
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Analytics initialization
            // Third-party script loading
            console.log('%c⚡ Performance optimized with requestIdleCallback', 'color: #22c55e;');
        }, { timeout: 2000 });
    }

    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    console.log(
        '%c👋 Hey there, fellow developer!',
        'font-size: 20px; font-weight: bold; color: #6366f1;'
    );
    console.log(
        '%cInterested in how this was built? Check out the source code!',
        'font-size: 14px; color: #94a3b8;'
    );
    console.log(
        '%cBuilt with ❤️ using vanilla HTML, CSS & JavaScript',
        'font-size: 12px; color: #22c55e;'
    );

})();
