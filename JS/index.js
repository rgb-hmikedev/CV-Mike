(function() {
  // ========== PUNTERO ==========
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('cursorDot');
  
  if (cursor && dot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    window.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
      dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    window.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  // ========== EFECTO MAGNÉTICO ==========
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

  // ========== PARTÍCULAS EN CANVAS ==========
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
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

    function animateParticles() {
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
    }
    animateParticles();
  }

  // ========== SCROLLREVEAL ==========
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 900,
      delay: 150,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      reset: false,
      viewFactor: 0.15
    });

    sr.reveal('.hero-text-block', { origin: 'left', distance: '80px' });
    sr.reveal('.hero-visual-block', { origin: 'right', distance: '80px', delay: 200 });
    sr.reveal('.reveal-row', { origin: 'left', distance: '40px', interval: 100 });
    sr.reveal('.reveal-process', { origin: 'bottom', distance: '50px', interval: 150, scale: 0.95 });
    sr.reveal('.reveal-portfolio', { origin: 'bottom', distance: '40px', interval: 120, scale: 0.96 });
    sr.reveal('.section-header', { origin: 'top', distance: '30px' });
  }

  // ========== NAV ACTIVE ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  });

  console.log('🚀 DevStudio Premium - Inspirado en los mejores');
})();