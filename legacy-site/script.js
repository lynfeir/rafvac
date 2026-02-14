// RAFVAC Solutions — "Forge & Flow" Interactive Layer
// Industrial precision: smooth scroll, parallax, tilt, welding-glow hover
(function () {
    'use strict';

    // ── Mobile menu ──
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks   = document.getElementById('navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mobileMenu.click(); }
        });
    }

    // ── Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
            if (mobileMenu && navLinks) { mobileMenu.classList.remove('active'); navLinks.classList.remove('active'); }
        });
    });

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    let navTick = false;
    function updateNav() { navbar.classList.toggle('scrolled', window.scrollY > 50); navTick = false; }
    window.addEventListener('scroll', () => { if (!navTick) { requestAnimationFrame(updateNav); navTick = true; } });

    // ── Scroll progress bar ──
    const bar = document.getElementById('scrollProgress');
    function updateBar() {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (h > 0) bar.style.width = Math.min(window.scrollY / h * 100, 100) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });

    // ── Scroll reveal ──
    const reveals = document.querySelectorAll('.reveal-up');
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('active'); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => revealObs.observe(el));

    // ── Hero parallax (desktop) ──
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.matchMedia('(min-width:768px)').matches) {
        let pTick = false;
        window.addEventListener('scroll', () => {
            if (!pTick) {
                requestAnimationFrame(() => {
                    if (window.scrollY < window.innerHeight) {
                        heroBg.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px)';
                    }
                    pTick = false;
                });
                pTick = true;
            }
        }, { passive: true });
    }

    // ── Service card tilt (pointer devices) ──
    if (window.matchMedia('(min-width:768px) and (pointer:fine)').matches) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -2.5;
                const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 2.5;
                card.style.transform = 'translateY(-6px) perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    // ── Resize: close mobile menu ──
    let rTimer;
    window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(() => {
            if (window.innerWidth > 768 && mobileMenu && navLinks) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }, 250);
    });

    // ── Analytics (console) ──
    document.querySelectorAll('a[href^="tel:"]').forEach(l => l.addEventListener('click', () => console.log('[RAFVAC] Call:', l.href)));
    document.querySelectorAll('a[href^="mailto:"]').forEach(l => l.addEventListener('click', () => console.log('[RAFVAC] Email:', l.href)));
    document.querySelectorAll('.btn').forEach(b => b.addEventListener('click', () => console.log('[RAFVAC] CTA:', b.textContent.trim())));

    // ── Init ──
    console.log('%cRAFVAC Solutions', 'background:linear-gradient(135deg,#ff3b30,#c0281f);color:#fff;padding:6px 14px;border-radius:4px;font-weight:900;font-size:13px');
})();
