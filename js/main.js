(() => {
  "use strict";

  const container = document.getElementById("scroll-container");
  const pages = Array.from(document.querySelectorAll(".page"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const counterCurrent = document.getElementById("counter-current");
  const total = pages.length;
  let activeIndex = 0;
  let isProgrammaticScroll = false;

  counterCurrent.textContent = String(1).padStart(2, "0");
  document.getElementById("counter-total").textContent = String(total).padStart(2, "0");

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loader").classList.add("is-hidden");
      pages[0].classList.add("is-active");
    }, 500);
  });
  // Fallback in case load event already fired
  if (document.readyState === "complete") {
    setTimeout(() => {
      document.getElementById("loader").classList.add("is-hidden");
      pages[0].classList.add("is-active");
    }, 500);
  }

  /* ---------- Active page tracking ---------- */
  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    pages.forEach((p, i) => p.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    counterCurrent.textContent = String(index + 1).padStart(2, "0");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          const idx = Number(entry.target.dataset.index);
          setActive(idx);
        }
      });
    },
    { root: container, threshold: [0.55] }
  );
  pages.forEach((p) => observer.observe(p));

  /* ---------- Dot navigation ---------- */
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = Number(dot.dataset.target);
      pages[target].scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Scroll cue ---------- */
  const scrollCue = document.getElementById("scroll-cue");
  if (scrollCue) {
    scrollCue.addEventListener("click", () => {
      const next = Math.min(activeIndex + 1, total - 1);
      pages[next].scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- Keyboard navigation ---------- */
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      const next = Math.min(activeIndex + 1, total - 1);
      pages[next].scrollIntoView({ behavior: "smooth" });
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      const prev = Math.max(activeIndex - 1, 0);
      pages[prev].scrollIntoView({ behavior: "smooth" });
    }
  });

  /* ---------- Particle field (Page 1) ---------- */
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = null;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    }

    function makeParticles() {
      const area = (canvas.width * canvas.height) / (dpr * dpr);
      const count = Math.min(90, Math.max(35, Math.floor(area / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.6 + 0.4) * dpr,
        vy: (Math.random() * 0.18 + 0.05) * dpr,
        vx: (Math.random() - 0.5) * 0.06 * dpr,
        alpha: Math.random() * 0.5 + 0.15,
        flicker: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gold = [212, 175, 138];
      particles.forEach((p) => {
        p.flicker += 0.015;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.flicker));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${gold[0]},${gold[1]},${gold[2]},${a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      makeParticles();
      if (!raf) draw();
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        resize();
        makeParticles();
      }, 200);
    });

    // Pause animation when page 1 isn't visible to save resources
    const pageOne = document.getElementById("page-0");
    const visObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!raf) draw();
          } else if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        });
      },
      { root: container, threshold: 0.05 }
    );
    visObserver.observe(pageOne);

    start();
  }
})();
