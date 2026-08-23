/*
  Shared across all pages: theme colors, logo, nav (with active-page
  highlighting), mobile menu, and footer. Relies on a `SUBROSA_BASE`
  global (set inline in each page's <head>) to build correct relative
  links regardless of how deep the page is ("./" at the root,
  "../" one level down).
*/
(function () {
  const cfg = SUBROSA_CONFIG;
  const base = typeof SUBROSA_BASE !== "undefined" ? SUBROSA_BASE : "./";
  const currentPage = typeof SUBROSA_PAGE !== "undefined" ? SUBROSA_PAGE : "story";

  // ---- CSS variables from config colors ----
  const root = document.documentElement.style;
  root.setProperty("--cream", cfg.colors.cream);
  root.setProperty("--beige", cfg.colors.beige);
  root.setProperty("--beige-dark", cfg.colors.beigeDark);
  root.setProperty("--gold", cfg.colors.gold);
  root.setProperty("--gold-light", cfg.colors.goldLight);
  root.setProperty("--ink", cfg.colors.ink);
  root.setProperty("--ink-muted", cfg.colors.inkMuted);

  // ---- Logo ----
  const logoImg = document.getElementById("logo-img");
  const logoText = document.getElementById("logo-text");
  if (logoImg && logoText) {
    logoImg.src = base + cfg.logoImage;
    logoText.textContent = cfg.logoText;
    logoImg.addEventListener("load", () => {
      logoImg.style.display = "block";
      logoText.style.display = "none";
    });
    logoImg.addEventListener("error", () => {
      logoImg.style.display = "none";
    });
  }
  const logoLink = document.getElementById("logo-link");
  if (logoLink) logoLink.href = base;

  // ---- Nav ----
  const navLinks = document.getElementById("nav-links");
  const navMobile = document.getElementById("nav-mobile");
  if (navLinks && navMobile) {
    cfg.nav.forEach((item) => {
      const a = document.createElement("a");
      a.href = base + item.path;
      a.textContent = item.label;
      if (item.pageId === currentPage) a.classList.add("is-active");
      navLinks.appendChild(a);
      navMobile.appendChild(a.cloneNode(true));
    });
  }

  const navCta = document.getElementById("nav-cta");
  if (navCta) {
    navCta.textContent = cfg.navCta;
    navCta.href = base + cfg.navCtaPath;
  }

  const navEl = document.getElementById("nav");
  const burger = document.getElementById("nav-burger");
  if (navEl && burger) {
    burger.addEventListener("click", () => navEl.classList.toggle("is-open"));
    navMobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navEl.classList.remove("is-open"))
    );
    window.addEventListener("scroll", () => {
      navEl.classList.toggle("is-scrolled", window.scrollY > 20);
    });
  }

  // ---- Footer ----
  const footerNote = document.getElementById("footer-note");
  if (footerNote) footerNote.textContent = cfg.footerNote;
  const footerEmail = document.getElementById("footer-email");
  if (footerEmail) {
    footerEmail.textContent = cfg.footerEmail;
    footerEmail.href = "mailto:" + cfg.footerEmail;
  }
  const socialWrap = document.getElementById("footer-social");
  if (socialWrap) {
    cfg.socialLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.label;
      a.target = "_blank";
      a.rel = "noopener";
      socialWrap.appendChild(a);
    });
  }
  document.querySelectorAll("[data-footer-link]").forEach((a) => {
    a.href = base + a.getAttribute("data-footer-link");
  });
})();
