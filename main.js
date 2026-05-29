/* PhyMap Trading — Shared JS */

// ─── Nav scroll effect ────────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Active nav link ──────────────────────────────────────
const currentPage = window.location.pathname.replace(/\/$/, '') || '/index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || currentPage.includes(href.replace('.html',''))) {
    a.classList.add('active');
  }
});

// ─── Mobile menu toggle ───────────────────────────────────
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    })
  );
}

// ─── Scroll reveal ────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// ─── FAQ accordion ────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  if (btn) btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── Fluid dynamics animation behind logo ────────────────
const fluidCanvas = document.getElementById('fluid-canvas');
if (fluidCanvas) {
  const fc = fluidCanvas.getContext('2d');
  let fw, fh, ftime = 0;

  function fluidResize() {
    fw = fluidCanvas.width  = fluidCanvas.offsetWidth;
    fh = fluidCanvas.height = fluidCanvas.offsetHeight;
  }

  // Streamlines — lines that follow a vortex velocity field
  const STREAMS = 28;
  const STEPS   = 60;
  const streams = [];

  function initStreams() {
    streams.length = 0;
    for (let i = 0; i < STREAMS; i++) {
      const angle = (i / STREAMS) * Math.PI * 2;
      const r = 20 + Math.random() * 80;
      streams.push({
        x: fw/2 + Math.cos(angle) * r,
        y: fh/2 + Math.sin(angle) * r,
        age: Math.random() * 200,
        speed: 0.4 + Math.random() * 0.4,
      });
    }
  }

  // Velocity field: superposition of a central vortex + slight outward drift
  function velocity(x, y, t) {
    const cx = fw / 2, cy = fh / 2;
    const dx = x - cx, dy = y - cy;
    const r2 = dx*dx + dy*dy + 1;
    const r  = Math.sqrt(r2);
    const vortex  = 38 / r2;          // vortex strength
    const drift   = 0.018;            // slow outward push
    const wave    = Math.sin(t * 0.012 + r * 0.04) * 0.3;
    return {
      vx: -dy * vortex + dx * (drift + wave),
      vy:  dx * vortex + dy * (drift + wave),
    };
  }

  function drawFluid() {
    fc.clearRect(0, 0, fw, fh);
    ftime++;

    for (const s of streams) {
      s.age++;
      // reset when too far from center or very old
      const cx = fw/2, cy = fh/2;
      const dist = Math.hypot(s.x - cx, s.y - cy);
      if (dist > fw * 0.52 || s.age > 320) {
        const angle = Math.random() * Math.PI * 2;
        const r = 12 + Math.random() * 55;
        s.x = cx + Math.cos(angle) * r;
        s.y = cy + Math.sin(angle) * r;
        s.age = 0;
      }

      // Draw trail
      fc.beginPath();
      let tx = s.x, ty = s.y;
      fc.moveTo(tx, ty);
      for (let k = 0; k < STEPS; k++) {
        const { vx, vy } = velocity(tx, ty, ftime);
        tx += vx * s.speed;
        ty += vy * s.speed;
        fc.lineTo(tx, ty);
      }
      const alpha = Math.max(0, 0.18 - dist / (fw * 3));
      fc.strokeStyle = `rgba(78,155,184,${alpha})`;
      fc.lineWidth   = 0.7;
      fc.stroke();

      // Advance particle
      const { vx, vy } = velocity(s.x, s.y, ftime);
      s.x += vx * s.speed;
      s.y += vy * s.speed;
    }

    // Glowing rings
    for (let ring = 1; ring <= 3; ring++) {
      const phase  = ftime * 0.008 + ring * 1.2;
      const radius = 40 + ring * 36 + Math.sin(phase) * 10;
      const alpha  = 0.07 + Math.sin(phase) * 0.03;
      fc.beginPath();
      fc.arc(fw/2, fh/2, radius, 0, Math.PI * 2);
      fc.strokeStyle = `rgba(78,155,184,${alpha})`;
      fc.lineWidth   = 1;
      fc.stroke();
    }

    requestAnimationFrame(drawFluid);
  }

  window.addEventListener('resize', () => { fluidResize(); initStreams(); });
  fluidResize();
  initStreams();
  drawFluid();
}

const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const N = 60;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle() {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.18 + Math.random() * 0.28;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 0.8 + Math.random() * 1.6,
      alpha: 0.1 + Math.random() * 0.35,
      life: Math.random() * 200
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: N }, makeParticle);
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 140) {
          const alpha = (1 - dist/140) * 0.12;
          ctx.strokeStyle = `rgba(78,155,184,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(78,155,184,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      if (p.x < -20 || p.x > W+20 || p.y < -20 || p.y > H+20) {
        Object.assign(p, makeParticle(), { x: Math.random() * W, y: Math.random() * H });
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
}
