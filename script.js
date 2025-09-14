// Professional RAFVAC Solutions JavaScript
// Clean, minimal functionality focused on user experience

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu && navLinks) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbar);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Contact Form Enhancement (if forms are added later)
function enhanceContactForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add form validation and enhancement logic here
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
        });
    });
}

// Click-to-Call Analytics (non-intrusive tracking)
function trackPhoneCalls() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Simple analytics - could integrate with Google Analytics
            console.log('Phone call initiated:', link.href);
        });
    });
}

// Email Link Enhancement
function enhanceEmailLinks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Email initiated:', link.href);
        });
    });
}

// Service Card Hover Analytics
function trackServiceInterest() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        let hoverTimer;
        
        card.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                const serviceName = card.querySelector('h3')?.textContent || `Service ${index + 1}`;
                console.log('Service interest:', serviceName);
            }, 2000); // Track if user hovers for 2+ seconds
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
        });
    });
}

// CTA Button Click Tracking
function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.cta-button, .action-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            console.log('CTA clicked:', buttonText);
        });
    });
}

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add keyboard navigation for mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                mobileMenu.click();
            }
        });
        
        // Make mobile menu focusable
        mobileMenu.setAttribute('tabindex', '0');
        mobileMenu.setAttribute('role', 'button');
        mobileMenu.setAttribute('aria-label', 'Toggle navigation menu');
    }
    
    // Enhanced focus indicators for CTA buttons
    const buttons = document.querySelectorAll('.cta-button, .action-btn');
    buttons.forEach(button => {
        button.addEventListener('focus', () => {
            button.style.outline = '2px solid #ff6b35';
            button.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', () => {
            button.style.outline = '';
            button.style.outlineOffset = '';
        });
    });
}

// Performance Optimization - Lazy Loading for Future Images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error Handling for Links
function setupErrorHandling() {
    // Handle broken internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) {
                console.warn('Internal link target not found:', link.getAttribute('href'));
                e.preventDefault();
            }
        });
    });
}

// Scroll Progress Indicator (minimal)
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #ff6b35, #00bfff);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    enhanceAccessibility();
    setupErrorHandling();
    
    // Analytics and tracking (privacy-friendly)
    trackPhoneCalls();
    enhanceEmailLinks();
    trackServiceInterest();
    trackCTAClicks();
    
    // Performance enhancements
    setupLazyLoading();
    
    // Optional: Create scroll progress indicator
    createScrollProgress();
    
    // Log successful initialization
    console.log('%c🏠 RAFVAC Solutions Website Loaded', 
        'background: linear-gradient(90deg, #1e3a5f, #00bfff); color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold;');
    console.log('%c❄️ Professional HVAC Services for Central PA 🔥', 
        'color: #1e3a5f; font-weight: bold;');
});

// Handle resize events efficiently
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            if (mobileMenu && navLinks) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    }, 250);
});

// Clean up event listeners when page unloads (good practice)
window.addEventListener('beforeunload', () => {
    // Remove any active timers or observers if needed
    revealElements.forEach(element => {
        revealObserver.unobserve(element);
    });
});
