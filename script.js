/* ==========================================================================
   RAFVAC Solutions — "Forge & Flow" Interactions
   Scroll progress, parallax hero, reveal animations, 3D card tilt,
   mobile menu, smooth scroll, navbar state.
   ========================================================================== */
;(function(){
  'use strict';

  /* ---------- MOBILE MENU ---------- */
  const menu = document.getElementById('mobileMenu');
  const links = document.getElementById('navLinks');
  if(menu && links){
    menu.addEventListener('click',()=>{
      menu.classList.toggle('active');
      links.classList.toggle('active');
    });
    menu.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();menu.click()}
    });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(!t) return;
      e.preventDefault();
      window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'});
      if(menu&&links){menu.classList.remove('active');links.classList.remove('active')}
    });
  });

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const nav=document.getElementById('navbar');
  let lastY=0;
  function onScroll(){
    const y=window.scrollY;
    if(nav){nav.classList.toggle('scrolled',y>60)}

    /* Scroll progress */
    const prog=document.getElementById('scrollProgress');
    if(prog){
      const max=document.documentElement.scrollHeight-window.innerHeight;
      prog.style.width=Math.min((y/max)*100,100)+'%';
    }

    lastY=y;
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  /* ---------- INTERSECTION OBSERVER — Reveal ---------- */
  const reveals=document.querySelectorAll('.reveal-up');
  if(reveals.length){
    const obs=new IntersectionObserver((entries,o)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('active');
          o.unobserve(e.target);
        }
      });
    },{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(el=>obs.observe(el));
  }

  /* ---------- HERO PARALLAX ---------- */
  const heroImg=document.querySelector('.hero-image');
  if(heroImg){
    let ticking=false;
    window.addEventListener('scroll',()=>{
      if(!ticking){
        requestAnimationFrame(()=>{
          const y=window.scrollY;
          if(y<window.innerHeight*1.2){
            heroImg.style.transform='translate3d(0,'+y*.35+'px,0) scale(1.05)';
          }
          ticking=false;
        });
        ticking=true;
      }
    },{passive:true});
  }

  /* ---------- 3D CARD TILT (pointer devices only) ---------- */
  if(window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.service-card').forEach(card=>{
      card.addEventListener('mousemove',e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        card.style.transform='perspective(800px) rotateY('+x*6+'deg) rotateX('+ -y*6+'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave',()=>{
        card.style.transform='';
      });
    });
  }

  /* ---------- RESIZE HANDLER ---------- */
  let rT;
  window.addEventListener('resize',()=>{
    clearTimeout(rT);
    rT=setTimeout(()=>{
      if(window.innerWidth>768&&menu&&links){
        menu.classList.remove('active');
        links.classList.remove('active');
      }
    },200);
  });

  /* ---------- CONSOLE ---------- */
  console.log('%cRAFVAC Solutions','background:linear-gradient(135deg,#ff3b30,#c0281f);color:#fff;padding:6px 14px;border-radius:4px;font-weight:900;font-size:13px');
  console.log('%c🔥 Forge & Flow — Industrial HVAC Design System','color:#6e7d91;font-size:11px');
})();
