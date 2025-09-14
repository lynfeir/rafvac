// Particle System
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 - distance / 100})`;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mobile Menu
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Dynamic navbar background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 22, 40, 0.95)';
        nav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
    } else {
        nav.style.background = 'rgba(10, 22, 40, 0.85)';
        nav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
    }
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-3d-container');
    const techGrid = document.querySelector('.tech-grid');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px) rotateY(${scrolled * 0.01}deg)`;
    }
    if (techGrid) {
        techGrid.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Interactive Service Cards
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Dynamic Temperature Counter
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = '$' + end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = '$' + Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Animate benefit amounts when in view
const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.animated) {
            entry.target.animated = true;
            const text = entry.target.textContent;
            const value = parseInt(text.replace(/\D/g, ''));
            if (value > 100) {
                animateValue(entry.target, 0, value, 2000);
            }
        }
    });
});

document.querySelectorAll('.benefit-amount').forEach(element => {
    benefitObserver.observe(element);
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Interactive mouse glow effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .tax-benefits, .cleaning-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 300;
        
        if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            card.style.boxShadow = `0 20px 60px rgba(0,212,255,${opacity * 0.5})`;
        }
    });
});

// Create floating HVAC icons
function createFloatingIcon() {
    const icons = ['❄️', '🔥', '💨', '🌡️', '⚡'];
    const icon = document.createElement('div');
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.position = 'fixed';
    icon.style.fontSize = '2rem';
    icon.style.opacity = '0.1';
    icon.style.pointerEvents = 'none';
    icon.style.left = Math.random() * window.innerWidth + 'px';
    icon.style.top = window.innerHeight + 'px';
    icon.style.zIndex = '2';
    document.body.appendChild(icon);
    
    const duration = Math.random() * 10000 + 10000;
    const animation = icon.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.1 },
        { transform: `translateY(-${window.innerHeight + 200}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    });
    
    animation.onfinish = () => icon.remove();
}

// Create floating icons periodically
setInterval(createFloatingIcon, 3000);

// Advanced scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(90deg, #ff6b35, #00d4ff)';
progressBar.style.zIndex = '10000';
progressBar.style.transition = 'width 0.1s';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add smooth transitions for all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
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
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    checkReveal();
    
    // Update navbar
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 22, 40, 0.95)';
        nav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
    } else {
        nav.style.background = 'rgba(10, 22, 40, 0.85)';
        nav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-3d-container');
    const techGrid = document.querySelector('.tech-grid');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px) rotateY(${scrolled * 0.01}deg)`;
    }
    if (techGrid) {
        techGrid.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
    
    // Progress bar
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolledPercentage + '%';
}, 16);

window.addEventListener('scroll', throttledScroll);

// Console message
console.log('%c🔥 RAFVAC Solutions 🔥', 'background: linear-gradient(90deg, #ff6b35, #00d4ff); color: white; font-size: 24px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c❄️ Premium HVAC Services for Central PA 🌡️', 'color: #00d4ff; font-size: 14px; font-weight: bold;');
