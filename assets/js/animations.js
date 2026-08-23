/*
  GSAP-driven motion shared by all pages: hero entrance (Our Story only),
  scroll reveals, hero parallax, and a 3D tilt effect on card grids.

  Progressive enhancement: every element animated here is already
  visible via plain CSS, so if this script fails to load the page
  still reads fine — it just won't animate. Guards check for each
  page's elements since not every page has a hero.
*/
(function () {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // ---------- hero entrance (Our Story page only) ----------
  const heroScene = document.getElementById("hero-scene");
  if (heroScene) {
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
  }

  // ---------- generic scroll reveals (batched so grids stagger together) ----------
  const revealEls = gsap.utils.toArray(".reveal");
  gsap.set(revealEls, { opacity: 0, y: 28 });

  ScrollTrigger.batch(revealEls, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }),
  });

  // ---------- 3D tilt on card grids ----------
  document.querySelectorAll(".product-card, .value-card, .ingredient-card").forEach((card) => {
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
