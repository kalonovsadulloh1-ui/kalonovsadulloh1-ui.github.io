const burger = document.getElementById('burger');
const mobile = document.getElementById('mobile');
const year = document.getElementById('year');
const copyBtn = document.getElementById('copyBtn');

year.textContent = new Date().getFullYear();

burger?.addEventListener('click', () => {
  const open = mobile.style.display === 'block';
  mobile.style.display = open ? 'none' : 'block';
});

mobile?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => (mobile.style.display = 'none'));
});

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const animateCounters = () => {
  counters.forEach(el => {
    const target = Number(el.getAttribute('data-count') || 0);
    let cur = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) {
        el.textContent = String(target);
        clearInterval(timer);
      } else {
        el.textContent = String(cur);
      }
    }, 30);
  });
};

let counted = false;
const onScroll = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  if (!counted && rect.top < window.innerHeight * 0.7) {
    counted = true;
    animateCounters();
    window.removeEventListener('scroll', onScroll);
  }
};
window.addEventListener('scroll', onScroll);
onScroll();

// Email copy
copyBtn?.addEventListener('click', async () => {
  const email = 'kalonovsadulloh1@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = 'Nusxalandi ✅';
    setTimeout(() => (copyBtn.textContent = 'Emailni nusxalash'), 1200);
  } catch {
    alert('Clipboard ruxsat bermadi 😅 Email: ' + email);
  }
});
