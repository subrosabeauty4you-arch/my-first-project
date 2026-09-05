/**
 * Storefront logic: rendering the grid, filtering/sorting/search,
 * the cart drawer, the product modal, and small UI niceties.
 */
(function () {
  const grid = document.getElementById("product-grid");
  const filtersEl = document.getElementById("category-filters");
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("search-input");
  const resultsInfo = document.getElementById("results-info");
  const emptyState = document.getElementById("empty-state");

  let activeCategory = "all";
  let searchTerm = "";

  const categories = ["all", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  /* ---------- Filters ---------- */
  function renderFilters() {
    filtersEl.innerHTML = categories
      .map(
        (cat) =>
          `<button class="filter-chip ${cat === activeCategory ? "active" : ""}" data-cat="${cat}">
             ${cat === "all" ? "All" : cat}
           </button>`
      )
      .join("");
  }

  filtersEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    activeCategory = chip.dataset.cat;
    renderFilters();
    renderGrid();
  });

  /* Nav links that jump to the shop and set a category filter */
  document.querySelectorAll("[data-filter-link]").forEach((link) => {
    link.addEventListener("click", () => {
      activeCategory = link.dataset.filterLink;
      renderFilters();
      renderGrid();
    });
  });

  /* ---------- Stars helper ---------- */
  function stars(rating) {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  /* ---------- Grid ---------- */
  function getVisibleProducts() {
    let list = PRODUCTS.slice();

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortSelect.value) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name-asc": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "rating-desc": list.sort((a, b) => b.rating - a.rating); break;
      default: break; /* featured = original order */
    }
    return list;
  }

  function productCard(p) {
    const sale = p.oldPrice
      ? `<small>${formatPrice(p.oldPrice)}</small>`
      : "";
    const tag = p.tag ? `<span class="product-tag">${p.tag}</span>` : "";
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-thumb" data-open="${p.id}">
          ${tag}
          <span>${p.emoji}</span>
        </div>
        <div class="product-body">
          <span class="product-cat">${p.category}</span>
          <span class="product-name" data-open="${p.id}">${p.name}</span>
          <span class="product-rating">
            <span class="stars">${stars(p.rating)}</span> ${p.rating.toFixed(1)} (${p.reviews})
          </span>
          <div class="product-foot">
            <span class="product-price">${formatPrice(p.price)}${sale}</span>
            <button class="btn btn-primary add-btn" data-add="${p.id}">Add</button>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = getVisibleProducts();
    grid.innerHTML = list.map(productCard).join("");
    emptyState.hidden = list.length !== 0;
    const total = PRODUCTS.length;
    resultsInfo.textContent = list.length === total
      ? `Showing all ${total} products`
      : `Showing ${list.length} of ${total} products`;
  }

  grid.addEventListener("click", (e) => {
    const addId = e.target.dataset.add;
    const openId = e.target.dataset.open;
    if (addId) {
      Cart.add(addId);
      const p = PRODUCTS.find((x) => x.id === addId);
      showToast(`${p.name} added to cart`);
      openCart();
    } else if (openId) {
      openModal(openId);
    }
  });

  sortSelect.addEventListener("change", renderGrid);

  let searchTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchTerm = e.target.value.trim();
      renderGrid();
    }, 180);
  });

  /* ---------- Product modal ---------- */
  const modalOverlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");

  function openModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const sale = p.oldPrice ? `<small>${formatPrice(p.oldPrice)}</small>` : "";
    modalContent.innerHTML = `
      <div class="modal-thumb">${p.emoji}</div>
      <div class="modal-info">
        <span class="product-cat">${p.category}</span>
        <h2 id="modal-title">${p.name}</h2>
        <span class="product-rating">
          <span class="stars">${stars(p.rating)}</span> ${p.rating.toFixed(1)} · ${p.reviews} reviews
        </span>
        <p class="modal-desc">${p.description}</p>
        <div class="modal-price">${formatPrice(p.price)}${sale}</div>
        <button class="btn btn-primary btn-lg" data-add-modal="${p.id}">Add to cart</button>
      </div>`;
    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  modalContent.addEventListener("click", (e) => {
    const id = e.target.dataset.addModal;
    if (id) {
      Cart.add(id);
      const p = PRODUCTS.find((x) => x.id === id);
      showToast(`${p.name} added to cart`);
      closeModal();
      openCart();
    }
  });

  document.getElementById("modal-close").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  /* ---------- Cart drawer ---------- */
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const checkoutBtn = document.getElementById("checkout-btn");

  function openCart() {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartOverlay.hidden = false;
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartOverlay.hidden = true;
  }

  document.getElementById("cart-toggle").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  function renderCart() {
    const items = Cart.items();
    cartCountEl.textContent = Cart.count();

    if (items.length === 0) {
      cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty.<br />Add something you love. 🛍️</p>`;
      checkoutBtn.setAttribute("disabled", "true");
      checkoutBtn.style.pointerEvents = "none";
      checkoutBtn.style.opacity = "0.5";
    } else {
      cartItemsEl.innerHTML = items
        .map(
          (l) => `
        <div class="cart-line">
          <div class="cart-line-thumb">${l.emoji}</div>
          <div>
            <div class="cart-line-name">${l.name}</div>
            <div class="cart-line-price">${formatPrice(l.price)}</div>
            <div class="qty-control">
              <button data-dec="${l.id}" aria-label="Decrease quantity">−</button>
              <span>${l.qty}</span>
              <button data-inc="${l.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-line-right">
            <span class="cart-line-total">${formatPrice(l.lineTotal)}</span>
            <button class="remove-link" data-remove="${l.id}">Remove</button>
          </div>
        </div>`
        )
        .join("");
      checkoutBtn.removeAttribute("disabled");
      checkoutBtn.style.pointerEvents = "";
      checkoutBtn.style.opacity = "";
    }
    cartSubtotalEl.textContent = formatPrice(Cart.subtotal());
  }

  cartItemsEl.addEventListener("click", (e) => {
    const { inc, dec, remove } = e.target.dataset;
    if (inc) {
      const line = Cart.items().find((l) => l.id === inc);
      Cart.setQty(inc, line.qty + 1);
    } else if (dec) {
      const line = Cart.items().find((l) => l.id === dec);
      Cart.setQty(dec, line.qty - 1);
    } else if (remove) {
      Cart.remove(remove);
    }
  });

  Cart.onChange(renderCart);

  /* ---------- Toast ---------- */
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => (toastEl.hidden = true), 250);
    }, 2200);
  }

  /* ---------- Misc ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeCart();
    }
  });

  document.getElementById("newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast("Thanks for subscribing! Check your inbox. 🎉");
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  renderFilters();
  renderGrid();
  renderCart();
})();
