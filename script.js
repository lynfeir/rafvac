// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Advanced cursor tracking (desktop only)
if (window.innerWidth > 1024) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

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
}

// Scroll progress bar
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
}

// Header scroll effects
function updateHeader() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Generate floating particles (reduced for mobile performance)
function createParticles() {
    const container = document.querySelector('.hero-bg-effects');
    const particleCount = window.innerWidth > 768 ? 20 : 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const isFlame = Math.random() > 0.5;
        
        particle.className = isFlame ? 'flame-particle' : 'ice-particle';
        const size = window.innerWidth > 768 ? Math.random() * 60 + 20 : Math.random() * 40 + 15;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--delay', Math.random() * 10 + 's');
        
        container.appendChild(particle);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission with advanced validation
document.getElementById('quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form processing
    const submitButton = this.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = '🔄 Processing...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = '✅ Request Sent!';
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.reset();
            alert('Thank you! We\'ll contact you within 2 hours with your free quote.');
        }, 2000);
    }, 1500);
});

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    createParticles();
    
    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add scroll listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateHeader();
    });
    
    // Add hover effects to interactive elements (desktop only)
    if (window.innerWidth > 1024) {
        const cursor = document.querySelector('.cursor');
        document.querySelectorAll('.service-card, .contact-method, .highlight-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.backgroundColor = 'var(--flame-primary)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--flame-gradient)';
            });
        });
    }
    
    // Temperature display animation
    const tempDisplay = document.querySelector('.temp-value');
    let currentTemp = 72;
    let targetTemp = 72;
    
    setInterval(() => {
        targetTemp = Math.floor(Math.random() * 6) + 70; // 70-75°F
        
        const interval = setInterval(() => {
            if (currentTemp < targetTemp) {
                currentTemp++;
            } else if (currentTemp > targetTemp) {
                currentTemp--;
            } else {
                clearInterval(interval);
                return;
            }
            tempDisplay.textContent = currentTemp + '°';
        }, 100);
    }, 5000);
});

// Add some dynamic visual effects (reduced for mobile)
if (window.innerWidth > 768) {
    setInterval(() => {
        const flames = document.querySelectorAll('.flame-icon, .flame-particle');
        const ice = document.querySelectorAll('.ice-icon, .ice-particle');
        
        flames.forEach(el => {
            el.style.filter = `brightness(${0.8 + Math.random() * 0.6}) hue-rotate(${Math.random() * 20 - 10}deg)`;
        });
        
        ice.forEach(el => {
            el.style.filter = `brightness(${0.8 + Math.random() * 0.6}) hue-rotate(${Math.random() * 20 - 10}deg)`;
        });
    }, 1000);
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Recreate particles if screen size changes significantly
    const currentWidth = window.innerWidth;
    const container = document.querySelector('.hero-bg-effects');
    
    // Clear existing particles and recreate for new screen size
    if (container && Math.abs(currentWidth - container.dataset.lastWidth || 0) > 200) {
        container.innerHTML = '';
        createParticles();
        container.dataset.lastWidth = currentWidth;
    }
});

// Performance optimization for mobile devices
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--shadow-glow-flame', '0 10px 30px rgba(255, 69, 0, 0.2)');
    document.documentElement.style.setProperty('--shadow-glow-ice', '0 10px 30px rgba(0, 196, 255, 0.2)');
    
    // Disable some intensive animations on older mobile devices
    if (navigator.userAgent.includes('Android') && navigator.userAgent.includes('Chrome/') && 
        parseInt(navigator.userAgent.match(/Chrome\/(\d+)/)[1]) < 80) {
        document.querySelectorAll('.flame-particle, .ice-particle').forEach(el => {
            el.style.animation = 'none';
        });
    }
}
// Project Carousel Class - Add this to your existing script.js file

class ProjectCarousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelector('.carousel-slides');
        this.slideElements = container.querySelectorAll('.carousel-slide');
        this.indicators = container.querySelectorAll('.carousel-indicator');
        this.prevBtn = container.querySelector('.carousel-nav.prev');
        this.nextBtn = container.querySelector('.carousel-nav.next');
        
        this.currentSlide = 0;
        this.slideCount = this.slideElements.length;
        this.autoPlayInterval = null;
        this.isPlaying = true;
        this.autoPlayDelay = 5000; // 5 seconds
        
        // Touch/swipe support
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.minSwipeDistance = 50;
        
        this.init();
    }
    
    init() {
        if (this.slideCount <= 1) return; // Don't initialize if only one slide
        
        this.updateSlides();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }
        
        // Indicator dots
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
            });
        });
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
        
        // Pause/resume on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Pause/resume on focus (accessibility)
        this.container.addEventListener('focusin', () => this.pauseAutoPlay());
        this.container.addEventListener('focusout', () => this.startAutoPlay());
        
        // Touch events for mobile swiping
        this.slides.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.slides.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        this.slides.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Mouse events for desktop dragging (optional)
        this.slides.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.slides.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.slides.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.slides.addEventListener('mouseleave', (e) => this.handleMouseUp(e));
        
        // Prevent image drag
        this.slideElements.forEach(slide => {
            slide.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }
    
    updateSlides() {
        // Update slide position
        this.slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        });
        
        // Update navigation button states
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-label', 'Previous image');
        }
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-label', 'Next image');
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateSlides();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateSlides();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.slideCount) {
            this.currentSlide = index;
            this.updateSlides();
            this.resetAutoPlay();
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval || this.slideCount <= 1) return;
        
        // Check if user prefers reduced motion
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
    
    // Touch event handlers
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.pauseAutoPlay();
    }
    
    handleTouchMove(e) {
        if (!this.startX || !this.startY) return;
        
        this.endX = e.touches[0].clientX;
        this.endY = e.touches[0].clientY;
    }
    
    handleTouchEnd(e) {
        if (!this.startX || !this.startY) return;
        
        const deltaX = this.endX - this.startX;
        const deltaY = this.endY - this.startY;
        
        // Check if it's a horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }
        
        // Reset values
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        
        this.startAutoPlay();
    }
    
    // Mouse event handlers for desktop dragging
    handleMouseDown(e) {
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.isDragging = false;
        this.pauseAutoPlay();
    }
    
    handleMouseMove(e) {
        if (!this.startX || !this.startY) return;
        
        this.endX = e.clientX;
        this.endY = e.clientY;
        this.isDragging = true;
    }
    
    handleMouseUp(e) {
        if (!this.startX || !this.startY || !this.isDragging) {
            this.startX = 0;
            this.startY = 0;
            this.isDragging = false;
            this.startAutoPlay();
            return;
        }
        
        const deltaX = this.endX - this.startX;
        const deltaY = this.endY - this.startY;
        
        // Check if it's a horizontal drag
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }
        
        // Reset values
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.isDragging = false;
        
        this.startAutoPlay();
    }
    
    // Public methods for external control
    pause() {
        this.pauseAutoPlay();
    }
    
    play() {
        this.startAutoPlay();
    }
    
    destroy() {
        this.pauseAutoPlay();
        // Remove event listeners would go here if needed
    }
}

// Initialize all project carousels when DOM is loaded
function initProjectCarousels() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    const carousels = [];
    
    carouselContainers.forEach(container => {
        const carousel = new ProjectCarousel(container);
        carousels.push(carousel);
    });
    
    return carousels;
}

// Add to your existing DOMContentLoaded event listener
// Or create a new one if you don't have one already

// Example of how to integrate with existing code:
/*
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    createParticles();
    
    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize carousels
    initProjectCarousels();
    
    // Rest of your existing code...
});
*/