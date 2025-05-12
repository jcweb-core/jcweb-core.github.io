// Main JavaScript for Joseph Coles Portfolio Website

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const preloaderProgress = document.querySelector('.preloader-progress');
    const preloaderCount = document.querySelector('.preloader-count');
    
    let count = 0;
    const interval = setInterval(() => {
        count++;
        preloaderProgress.style.width = count + '%';
        preloaderCount.textContent = count + '%';
        
        if (count >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    onComplete: () => {
                        preloader.style.display = 'none';
                        
                        // Start page animations after preloader is gone
                        initAnimations();
                    }
                });
            }, 500);
        }
    }, 20);
});

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorOutline, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    const cursorTargets = document.querySelectorAll('a, button, .tab-btn, .filter-btn, .social-icon, .nav-toggle, .services-images, .portfolio-item-inner');
    
    cursorTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.classList.add('hidden');
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.classList.remove('hidden');
    });
}

// Navigation Toggle
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const fullscreenNav = document.querySelector('.fullscreen-nav');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        fullscreenNav.classList.toggle('active');
        
        if (fullscreenNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close navigation when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            fullscreenNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Typewriter Effect
function initTypewriter() {
    const typedTextElement = document.querySelector('.typed-text');
    const phrases = ['VisionHeartz Clothing Founder.', 'Professional Photographer.', 'Expert Barber.', 'Business Administration Student.'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100;
        }
        
        // If completed typing phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeDelay = 1500; // Pause at end of phrase
        } 
        // If completed deleting phrase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeDelay = 500; // Pause before typing new phrase
        }
        
        setTimeout(typeWriter, typeDelay);
    }
    
    setTimeout(typeWriter, 1000);
}

// Service Tabs
function initServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceDetails = document.querySelectorAll('.service-detail');
    const serviceImages = document.querySelectorAll('.service-image');
    
    tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            const service = tab.getAttribute('data-service');
            
            // Update active tab
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active service detail
            serviceDetails.forEach(detail => {
                detail.classList.remove('active');
                if (detail.getAttribute('data-service') === service) {
                    detail.classList.add('active');
                }
            });
            
            // Update active service image
            serviceImages.forEach(image => {
                image.classList.remove('active');
                if (image.getAttribute('data-service') === service) {
                    image.classList.add('active');
                }
            });
        });
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                        onStart: function() {
                            item.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.4,
                        ease: 'power2.out',
                        onComplete: function() {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Parallax Effect for About Images
function initParallax() {
    const aboutImages = document.querySelectorAll('.about-image');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        aboutImages.forEach(image => {
            const speed = image.getAttribute('data-speed') || 1;
            const xOffset = (x - 0.5) * 30 * speed;
            const yOffset = (y - 0.5) * 30 * speed;
            
            gsap.to(image, {
                x: xOffset,
                y: yOffset,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Scroll Animation with GSAP
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section elements
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2
    });
    
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4
    });
    
    gsap.from('.hero-expertise', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6
    });
    
    gsap.from('.hero-desc', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        delay: 0.6
    });
    
    gsap.from('.hero-experience', {
        opacity: 0,
        scale: 0,
        rotation: -90,
        duration: 0.8,
        delay: 1.2
    });
    
    // Section headers
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Skip hero section
        if (!section.classList.contains('hero')) {
            const heading = section.querySelector('.section-header');
            
            if (heading) {
                gsap.from(heading, {
                    scrollTrigger: {
                        trigger: heading,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8
                });
            }
            
            // Add the animated class to reveal text elements
            const revealElements = section.querySelectorAll('.reveal-text');
            
            revealElements.forEach((el, index) => {
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 80%',
                    onEnter: () => {
                        el.classList.add('animated');
                    }
                });
            });
        }
    });
    
    // About section
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.8
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                let count = 0;
                const interval = setInterval(() => {
                    count = Math.ceil(count + target/20);
                    if (count >= target) {
                        count = target;
                        clearInterval(interval);
                    }
                    stat.textContent = count;
                }, 30);
            }
        });
    });
    
    // Services section
    gsap.from('.tab-btn', {
        scrollTrigger: {
            trigger: '.services-tabs',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8
    });
    
    gsap.from('.services-images', {
        scrollTrigger: {
            trigger: '.services-images',
            start: 'top 80%'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8
    });
    
    // Portfolio section
    gsap.from('.filter-btn', {
        scrollTrigger: {
            trigger: '.portfolio-filter',
            start: 'top 80%'
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6
    });
    
    gsap.from('.portfolio-item', {
        scrollTrigger: {
            trigger: '.portfolio-gallery',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8
    });
    
    // Achievements section
    gsap.from('.achievement-item', {
        scrollTrigger: {
            trigger: '.achievements-timeline',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        stagger: 0.3,
        duration: 0.8
    });
    
    // Contact section
    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8
    });
    
    gsap.from('.contact-form-container', {
        scrollTrigger: {
            trigger: '.contact-form-container',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 0.8
    });
}

// Form Floating Labels
function initFormLabels() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Check if input has a value on load
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('active');
        }
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('active');
            }
        });
    });
}

// Form Submission
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully!');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            
            // Skip if link is just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navToggle = document.querySelector('.nav-toggle');
                const fullscreenNav = document.querySelector('.fullscreen-nav');
                
                // Close navigation if open
                if (fullscreenNav && fullscreenNav.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    fullscreenNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Calculate offset based on header height
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all animations after preloader
function initAnimations() {
    initCursor();
    initNavigation();
    initHeaderScroll();
    initTypewriter();
    initServiceTabs();
    initPortfolioFilter();
    initParallax();
    initScrollAnimations();
    initFormLabels();
    initFormSubmission();
    initSmoothScrolling();
}

// Initialize base functions even before preloader completion
initNavigation();
initHeaderScroll();