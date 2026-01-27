(function () {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // reveal on scroll
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, {threshold: 0.12});
  els.forEach(el => io.observe(el));

  // counters
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = Number(el.getAttribute("data-count") || "0");
    let cur = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const t = setInterval(() => {
      cur += step;
      if(cur >= target){ cur = target; clearInterval(t); }
      el.textContent = cur;
    }, 25);
  });

  // copy buttons
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = "Copied ✅";
        setTimeout(()=> btn.textContent = old, 1100);
      } catch {
        alert("Copy ishlamadi 😅 Qo'lda nusxa oling.");
      }
    });
  });
})();
