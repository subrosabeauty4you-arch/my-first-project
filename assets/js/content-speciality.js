/* Speciality page (/speciality/) — formula, ingredients, free-from, ritual. */
(function () {
  const cfg = SUBROSA_CONFIG;
  document.title = `${cfg.brandName} — Speciality`;

  document.getElementById("speciality-eyebrow").textContent = cfg.speciality.eyebrow;
  document.getElementById("speciality-heading").textContent = cfg.speciality.heading;
  document.getElementById("speciality-intro").textContent = cfg.speciality.intro;

  const ingredientsGrid = document.getElementById("ingredients-grid");
  cfg.ingredients.forEach((ing) => {
    const card = document.createElement("div");
    card.className = "ingredient-card reveal";
    card.innerHTML = `<h3>${ing.name}</h3><p>${ing.description}</p>`;
    ingredientsGrid.appendChild(card);
  });

  const freeFromList = document.getElementById("free-from-list");
  cfg.freeFrom.forEach((item) => {
    const li = document.createElement("li");
    li.className = "reveal";
    li.textContent = item;
    freeFromList.appendChild(li);
  });

  const ritualList = document.getElementById("ritual-list");
  cfg.ritual.forEach((r) => {
    const li = document.createElement("li");
    li.className = "ritual-step reveal";
    li.innerHTML = `<span class="ritual-step__num">${r.step}</span><div><h3>${r.title}</h3><p>${r.description}</p></div>`;
    ritualList.appendChild(li);
  });
})();
