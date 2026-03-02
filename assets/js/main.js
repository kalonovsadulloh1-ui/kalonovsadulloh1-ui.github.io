// =========================
// Cyberpunk Portfolio JS
// Particles + reveal + nav active + skills animate
// =========================

/* Mobile menu */
const menuBtn = document.querySelector('[data-menu]');
const mobileNav = document.querySelector('[data-mobile]');
if (menuBtn && mobileNav){
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.getAttribute('data-open') === '1';
    mobileNav.setAttribute('data-open', open ? '0' : '1');
    mobileNav.style.display = open ? 'none' : 'block';
    menuBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
  // default closed on load
  mobileNav.style.display = 'none';
  mobileNav.setAttribute('data-open','0');
}

/* Active nav link */
(() => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[data-nav]').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();

/* Reveal */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Skills animate on view */
const skillsIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.bar > span').forEach(span => {
      const w = span.getAttribute('data-w') || '70';
      span.style.width = `${w}%`;
    });
  });
}, { threshold: 0.20 });

document.querySelectorAll('[data-skills]').forEach(el => skillsIO.observe(el));

/* Particles background */
(function particles(){
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha:true });
  let w, h, dpr;

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  const N = Math.floor(Math.min(110, Math.max(60, (w*h)/20000)));
  const pts = Array.from({length:N}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    vx: (Math.random()-.5)*0.35,
    vy: (Math.random()-.5)*0.35,
    r: Math.random()*1.6 + 0.6,
    t: Math.random()
  }));

  function line(a,b){
    const dx=a.x-b.x, dy=a.y-b.y;
    const dist = Math.sqrt(dx*dx+dy*dy);
    if (dist > 140) return;
    const alpha = (1 - dist/140) * 0.35;
    ctx.globalAlpha = alpha;
    // gradient-ish using two passes
    ctx.strokeStyle = 'rgba(124,58,237,1)';
    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    ctx.globalAlpha = alpha*0.7;
    ctx.strokeStyle = 'rgba(34,211,238,1)';
    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function tick(){
    ctx.clearRect(0,0,w,h);

    // dots
    for (const p of pts){
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w+20;
      if (p.x > w+20) p.x = -20;
      if (p.y < -20) p.y = h+20;
      if (p.y > h+20) p.y = -20;

      const pulse = 0.4 + 0.6*Math.sin((p.t+=0.02));
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = 'rgba(233,233,255,1)';
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*pulse,0,Math.PI*2);
      ctx.fill();
    }

    // lines
    ctx.lineWidth = 1;
    for (let i=0;i<pts.length;i++){
      for (let j=i+1;j<pts.length;j++){
        line(pts[i], pts[j]);
      }
    }

    requestAnimationFrame(tick);
  }
  tick();
})();
