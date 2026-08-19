/*
  Pulls everything from SUBROSA_CONFIG (assets/js/config.js) into the page.
  You should not need to edit this file — edit config.js instead.
*/
(function () {
  const cfg = SUBROSA_CONFIG;

  // ---- CSS variables from config colors ----
  const root = document.documentElement.style;
  root.setProperty("--cream", cfg.colors.cream);
  root.setProperty("--beige", cfg.colors.beige);
  root.setProperty("--beige-dark", cfg.colors.beigeDark);
  root.setProperty("--gold", cfg.colors.gold);
  root.setProperty("--gold-light", cfg.colors.goldLight);
  root.setProperty("--ink", cfg.colors.ink);
  root.setProperty("--ink-muted", cfg.colors.inkMuted);

  document.title = `${cfg.brandName} — ${cfg.product.name}`;

  // ---- Logo (falls back to text if logo.png isn't provided) ----
  const logoImg = document.getElementById("logo-img");
  const logoText = document.getElementById("logo-text");
  logoText.textContent = cfg.logoText;
  logoImg.addEventListener("load", () => {
    logoImg.style.display = "block";
    logoText.style.display = "none";
  });
  logoImg.addEventListener("error", () => {
    logoImg.style.display = "none";
  });

  // ---- Nav ----
  const navLinks = document.getElementById("nav-links");
  const navMobile = document.getElementById("nav-mobile");
  cfg.nav.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    navLinks.appendChild(a);

    const aMobile = a.cloneNode(true);
    navMobile.appendChild(aMobile);
  });

  const navCta = document.getElementById("nav-cta");
  navCta.textContent = cfg.navCta;
  navCta.href = cfg.navCtaLink;

  const navEl = document.getElementById("nav");
  const burger = document.getElementById("nav-burger");
  burger.addEventListener("click", () => navEl.classList.toggle("is-open"));
  navMobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navEl.classList.remove("is-open"))
  );

  window.addEventListener("scroll", () => {
    navEl.classList.toggle("is-scrolled", window.scrollY > 20);
  });

  // ---- Hero ----
  document.getElementById("hero-eyebrow").textContent = cfg.hero.eyebrow;
  document.getElementById("hero-headline").textContent = cfg.hero.headline;
  document.getElementById("hero-tagline").textContent = cfg.hero.tagline;

  const ctaPrimary = document.getElementById("hero-cta-primary");
  ctaPrimary.textContent = cfg.hero.ctaPrimary;
  ctaPrimary.href = cfg.hero.ctaPrimaryLink;

  const ctaSecondary = document.getElementById("hero-cta-secondary");
  ctaSecondary.textContent = cfg.hero.ctaSecondary;
  ctaSecondary.href = cfg.hero.ctaSecondaryLink;

  // ---- Featured products (shades) ----
  document.getElementById("products-eyebrow").textContent = cfg.productsIntro.eyebrow;
  document.getElementById("products-heading").textContent = cfg.productsIntro.heading;
  document.getElementById("products-sub").textContent = cfg.productsIntro.sub;

  const grid = document.getElementById("product-grid");
  cfg.shades.forEach((shade) => {
    const card = document.createElement("div");
    card.className = "product-card reveal";
    card.innerHTML = `
      <div class="product-card__swatch" style="background:${shade.swatch}"></div>
      <h3>${shade.name}</h3>
      <p>${shade.description}</p>
      <div class="product-card__price">${shade.price}</div>
      <a class="product-card__btn" href="#contact">Shop This Shade</a>
    `;
    grid.appendChild(card);
  });

  // ---- Product detail ----
  document.getElementById("product-name").textContent = cfg.product.name;
  document.getElementById("product-tagline").textContent = cfg.product.tagline;
  document.getElementById("product-price").textContent = cfg.product.price;
  document.getElementById("product-description").textContent = cfg.product.description;

  const featureList = document.getElementById("feature-list");
  cfg.product.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featureList.appendChild(li);
  });

  document.getElementById("ingredients-text").textContent = cfg.product.ingredients;

  // ---- About ----
  document.getElementById("about-eyebrow").textContent = cfg.about.eyebrow;
  document.getElementById("about-heading").textContent = cfg.about.heading;
  document.getElementById("about-body").textContent = cfg.about.body;

  const statsWrap = document.getElementById("about-stats");
  cfg.about.stats.forEach((stat) => {
    const div = document.createElement("div");
    div.className = "stat-item";
    div.innerHTML = `<span class="stat-item__value">${stat.value}</span><span class="stat-item__label">${stat.label}</span>`;
    statsWrap.appendChild(div);
  });

  // ---- Services ----
  document.getElementById("services-eyebrow").textContent = cfg.servicesIntro.eyebrow;
  document.getElementById("services-heading").textContent = cfg.servicesIntro.heading;
  document.getElementById("services-sub").textContent = cfg.servicesIntro.sub;

  const serviceGrid = document.getElementById("service-grid");
  cfg.services.forEach((service, i) => {
    const card = document.createElement("div");
    card.className = "service-card reveal";
    card.innerHTML = `
      <div class="service-card__icon">${String(i + 1).padStart(2, "0")}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    serviceGrid.appendChild(card);
  });

  // ---- Contact ----
  document.getElementById("contact-eyebrow").textContent = cfg.contact.eyebrow;
  document.getElementById("contact-heading").textContent = cfg.contact.heading;
  document.getElementById("contact-sub").textContent = cfg.contact.sub;
  document.getElementById("contact-email").textContent = cfg.contact.email;
  document.getElementById("contact-note").textContent = cfg.contact.formNote;
  document.getElementById("contact-submit").textContent = cfg.contact.submitLabel;

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Subrosa Beauty inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${cfg.contact.email}?subject=${subject}&body=${body}`;
  });

  // ---- Footer ----
  document.getElementById("footer-note").textContent = cfg.footerNote;
  const socialWrap = document.getElementById("footer-social");
  cfg.socialLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    a.target = "_blank";
    a.rel = "noopener";
    socialWrap.appendChild(a);
  });
})();
