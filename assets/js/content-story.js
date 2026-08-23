/* Our Story page (/) — hero, narrative, founder, values. */
(function () {
  const cfg = SUBROSA_CONFIG;
  document.title = `${cfg.brandName} — Our Story`;

  document.getElementById("hero-eyebrow").textContent = cfg.hero.eyebrow;
  document.getElementById("hero-headline").textContent = cfg.hero.headline;
  document.getElementById("hero-tagline").textContent = cfg.hero.tagline;

  const ctaPrimary = document.getElementById("hero-cta-primary");
  ctaPrimary.textContent = cfg.hero.ctaPrimary;
  ctaPrimary.href = SUBROSA_BASE + cfg.hero.ctaPrimaryPath;

  const ctaSecondary = document.getElementById("hero-cta-secondary");
  ctaSecondary.textContent = cfg.hero.ctaSecondary;
  ctaSecondary.href = cfg.hero.ctaSecondaryHash;

  document.getElementById("narrative-eyebrow").textContent = cfg.narrative.eyebrow;
  document.getElementById("narrative-heading").textContent = cfg.narrative.heading;
  const narrativeBody = document.getElementById("narrative-body");
  cfg.narrative.body.split("\n\n").forEach((para) => {
    const p = document.createElement("p");
    p.textContent = para;
    narrativeBody.appendChild(p);
  });

  document.getElementById("founder-eyebrow").textContent = cfg.founder.eyebrow;
  document.getElementById("founder-name").textContent = cfg.founder.name;
  document.getElementById("founder-title").textContent = cfg.founder.title;
  document.getElementById("founder-quote").textContent = `“${cfg.founder.quote}”`;
  document.getElementById("founder-bio").textContent = cfg.founder.bio;

  const founderPhoto = document.getElementById("founder-photo");
  founderPhoto.src = SUBROSA_BASE + cfg.founder.photo;
  founderPhoto.addEventListener("error", () => {
    founderPhoto.closest(".founder__photo-wrap").classList.add("is-placeholder");
  });

  document.getElementById("values-eyebrow").textContent = cfg.values.eyebrow;
  document.getElementById("values-heading").textContent = cfg.values.heading;
  const valuesGrid = document.getElementById("values-grid");
  cfg.values.items.forEach((v) => {
    const card = document.createElement("div");
    card.className = "value-card reveal";
    card.innerHTML = `<h3>${v.title}</h3><p>${v.description}</p>`;
    valuesGrid.appendChild(card);
  });
})();
