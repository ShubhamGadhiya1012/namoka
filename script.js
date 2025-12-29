// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth scroll and active link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== HERO SLIDER =====
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle wrap around
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    function goToSlide(n) {
        currentSlide = n;
        showSlide(currentSlide);
        resetSlideInterval();
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners for slider
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
    
    // Auto slide
    slideInterval = setInterval(nextSlide, 5000);
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .room-card, .testimonial-card, .about-image, .about-text');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Show success message
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
    
    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.padding = '20px 30px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        notification.style.zIndex = '10000';
        notification.style.fontWeight = '500';
        notification.style.animation = 'slideIn 0.3s ease';
        notification.style.maxWidth = '400px';
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';
            notification.style.color = '#FFF';
        } else {
            notification.style.background = 'linear-gradient(135deg, #E74C3C, #C0392B)';
            notification.style.color = '#FFF';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // ===== SMOOTH SCROLL FOR ALL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // ===== CURSOR ANIMATION (Desktop only) =====
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.border = '2px solid var(--primary-gold)';
        cursor.style.borderRadius = '50%';
        cursor.style.position = 'fixed';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transition = 'transform 0.2s ease';
        cursor.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Scale cursor on hover over clickable elements
        const clickableElements = document.querySelectorAll('a, button, .service-card, .room-card');
        
        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'rgba(212, 175, 55, 0.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '30px';
    scrollTopBtn.style.right = '30px';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--dark-gold))';
    scrollTopBtn.style.color = 'var(--deep-navy)';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.fontSize = '1.5rem';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.zIndex = '1000';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    scrollTopBtn.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(212, 175, 55, 0.6)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
    });
    
    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===== NUMBER COUNTER ANIMATION =====
    const badgeNumber = document.querySelector('.badge-number');
    
    if (badgeNumber) {
        const observerBadge = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(badgeNumber, 0, 25, 2000);
                    observerBadge.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observerBadge.observe(badgeNumber);
    }
    
    function animateNumber(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            
            if (progress < 1) {
                const current = Math.floor(start + (end - start) * progress);
                element.textContent = current + '+';
                requestAnimationFrame(animation);
            } else {
                element.textContent = end + '+';
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // ===== CSS ANIMATIONS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Namoka Resort Website - Fully Loaded and Ready! ✨');
});
