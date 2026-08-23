/*
  Shades page (/shades/) — interactive shade picker (click a swatch, the
  3D bottle's liquid recolors via a "subrosa:selectShade" event that
  scene-shades.js listens for) plus the full shade grid below.
*/
(function () {
  const cfg = SUBROSA_CONFIG;
  document.title = `${cfg.brandName} — Shades`;

  document.getElementById("shades-page-eyebrow").textContent = cfg.shadesPageIntro.eyebrow;
  document.getElementById("shades-page-heading").textContent = cfg.shadesPageIntro.heading;
  document.getElementById("shades-page-sub").textContent = cfg.shadesPageIntro.sub;

  const picker = document.getElementById("shade-picker");
  const selectedName = document.getElementById("selected-shade-name");
  const selectedDesc = document.getElementById("selected-shade-description");
  const selectedPrice = document.getElementById("selected-shade-price");

  function selectShade(shade, swatchEl) {
    selectedName.textContent = shade.name;
    selectedDesc.textContent = shade.description;
    selectedPrice.textContent = shade.price;
    picker.querySelectorAll(".swatch").forEach((el) => el.classList.remove("is-selected"));
    if (swatchEl) swatchEl.classList.add("is-selected");
    document.dispatchEvent(new CustomEvent("subrosa:selectShade", { detail: { color: shade.swatch } }));
  }

  cfg.shades.forEach((shade, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "swatch";
    btn.style.background = shade.swatch;
    btn.setAttribute("aria-label", shade.name);
    btn.addEventListener("click", () => selectShade(shade, btn));
    picker.appendChild(btn);
    if (i === 0) selectShade(shade, btn);
  });

  document.getElementById("products-eyebrow").textContent = cfg.shadesIntro.eyebrow;
  document.getElementById("products-heading").textContent = cfg.shadesIntro.heading;
  document.getElementById("products-sub").textContent = cfg.shadesIntro.sub;

  const grid = document.getElementById("product-grid");
  cfg.shades.forEach((shade) => {
    const card = document.createElement("div");
    card.className = "product-card reveal";
    card.innerHTML = `
      <div class="product-card__swatch" style="background:${shade.swatch}"></div>
      <h3>${shade.name}</h3>
      <p>${shade.description}</p>
      <div class="product-card__price">${shade.price}</div>
      <a class="product-card__btn" href="${SUBROSA_BASE}#shade-picker-section">Try This Shade</a>
    `;
    card.querySelector(".product-card__btn").addEventListener("click", (e) => {
      e.preventDefault();
      const targetBtn = [...picker.children][cfg.shades.indexOf(shade)];
      selectShade(shade, targetBtn);
      document.getElementById("shade-picker-section").scrollIntoView({ behavior: "smooth" });
    });
    grid.appendChild(card);
  });
})();
