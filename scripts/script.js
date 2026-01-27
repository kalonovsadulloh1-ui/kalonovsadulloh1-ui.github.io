// scripts/script.js — minimal interactivity: nav toggle, profile switch, lazy-load, copy email
document.documentElement.style.scrollBehavior = 'smooth';

(function(){
  // Nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Profile image switcher: two uploaded images
  window.useProfileImage = function(n){
    const img = document.getElementById('profile-photo');
    if(!img) return;
    if(n === 1) img.src = 'assets/photo_2026-01-27_12-36-58.jpg';
    if(n === 2) img.src = 'assets/photo_2026-01-27_12-36-55.jpg';
  };

  // Lazy-load data-src images
  const lazy = document.querySelectorAll('img[data-src]');
  if('IntersectionObserver' in window && lazy.length){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const img = e.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, {rootMargin: '200px'});
    lazy.forEach(i => io.observe(i));
  } else {
    // Fallback: load immediately
    lazy.forEach(img => img.src = img.dataset.src);
  }

  // Copy email button
  const copyBtn = document.getElementById('copy-email');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText('kalonovsadulloh1@gmail.com');
        copyBtn.textContent = 'Email nusxalandi';
        setTimeout(()=> copyBtn.textContent = 'Emailni nusxalash', 1800);
      }catch(e){
        console.error(e);
      }
    });
  }

  // Simple contact form validation user-friendly
  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const msg = form.querySelector('textarea[name="message"]').value.trim();
      if(!name || !email || !msg){
        e.preventDefault();
        alert('Iltimos, barcha maydonlarni to‘ldiring.');
      }
    });
  }
})();
