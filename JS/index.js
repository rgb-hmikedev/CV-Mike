// ========== DEVSTUDIO - MAIN.JS ==========
// Todo el JavaScript del portafolio en un solo archivo
// ECMAScript 2024+ (ES Modules)

(function() {
  'use strict';

  // ========== INICIALIZACIÓN ==========
  const initApp = () => {
    console.log('🚀 DevStudio - Iniciando...');
    
    initCursor();
    initParticles();
    initMagneticButtons();
    initNavigation();
    initActiveLink();
    initAnimations();
    initParallax();
    initSmoothScroll();
    
    console.log('✅ DevStudio - Listo');
  };

  // ========== PUNTERO PERSONALIZADO ==========
  const initCursor = () => {
    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('cursorDot');
    
    if (!cursor || !dot) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    window.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
      dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    
    window.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  };

  // ========== PARTÍCULAS EN CANVAS ==========
  const initParticles = () => {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Líneas entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  };

  // ========== EFECTO MAGNÉTICO EN BOTONES ==========
  const initMagneticButtons = () => {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  };

  // ========== NAVEGACIÓN ==========
  const initNavigation = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 29, 50, 0.95)';
      } else {
        nav.style.background = 'rgba(15, 29, 50, 0.7)';
      }
    }, { passive: true });
  };

  // ========== LINK ACTIVO EN NAV ==========
  const initActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    if (!sections.length || !links.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    
    sections.forEach(section => observer.observe(section));
  };

  // ========== ANIMACIONES SCROLL REVEAL ==========
  const initAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const animatableElements = document.querySelectorAll(
      '.reveal-row, .reveal-process, .reveal-portfolio, .section-header'
    );
    
    animatableElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  };

  // ========== PARALLAX EN HERO ==========
  const initParallax = () => {
    const hero = document.querySelector('.hero-editorial img');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    }, { passive: true });
  };

  // ========== SMOOTH SCROLL ==========
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ========== HOVER 3D EN TARJETAS ==========
  const initCardHover = () => {
    document.querySelectorAll('.process-card, .card-hover').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.transform = `translateY(-10px) rotateX(${(y - 0.5) * 4}deg) rotateY(${(x - 0.5) * -4}deg)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      });
    });
  };

  // ========== DEBOUNCE UTILIDAD ==========
  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // ========== ARRANCAR APLICACIÓN ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // Exponer utilidades globalmente si es necesario
  window.DevStudio = {
    debounce,
    initCardHover
  };

})();