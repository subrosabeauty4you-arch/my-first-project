/*
  GSAP-driven motion: hero entrance, scroll reveals, hero parallax,
  and a 3D tilt effect on product/service cards.

  Progressive enhancement: every element animated here is already
  visible via plain CSS, so if this script fails to load the page
  still reads fine — it just won't animate.
*/
(function () {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // ---------- hero entrance ----------
  gsap.set(["#hero-eyebrow", "#hero-headline", "#hero-tagline", ".hero__actions", "#hero-scene"], {
    opacity: 0,
    y: 24,
  });

  gsap
    .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
    .to("#hero-scene", { opacity: 1, y: 0, duration: 1.1 }, 0.1)
    .to("#hero-eyebrow", { opacity: 1, y: 0 }, 0.35)
    .to("#hero-headline", { opacity: 1, y: 0 }, 0.5)
    .to("#hero-tagline", { opacity: 1, y: 0 }, 0.65)
    .to(".hero__actions", { opacity: 1, y: 0 }, 0.8);

  // ---------- hero parallax on scroll ----------
  gsap.to("#hero-scene", {
    y: 90,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to("#hero-copy", {
    y: 50,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  // ---------- generic scroll reveals (batched so grids stagger together) ----------
  const revealEls = gsap.utils.toArray(".reveal");
  gsap.set(revealEls, { opacity: 0, y: 28 });

  ScrollTrigger.batch(revealEls, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }),
  });

  // ---------- 3D tilt on product / service cards ----------
  document.querySelectorAll(".product-card, .service-card").forEach((card) => {
    const strength = card.classList.contains("product-card") ? 10 : 6;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateX: -y * strength,
        rotateY: x * strength,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    });
  });

  // ---------- refresh ScrollTrigger once late-loading fonts/images settle ----------
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
