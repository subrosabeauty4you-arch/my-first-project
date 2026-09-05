/**
 * Checkout page: renders the live order summary, validates the form,
 * and simulates order placement (no backend — cart is cleared and a
 * confirmation screen is shown).
 */
(function () {
  const FREE_SHIPPING_THRESHOLD = 75;
  const SHIPPING_FLAT = 6.95;
  const TAX_RATE = 0.08;

  const summaryItems = document.getElementById("summary-items");
  const main = document.getElementById("checkout-main");

  function totals() {
    const subtotal = Cart.subtotal();
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const tax = subtotal * TAX_RATE;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  }

  function renderSummary() {
    const items = Cart.items();

    if (items.length === 0) {
      main.innerHTML = `
        <div class="checkout-success">
          <div class="check">🛒</div>
          <h1>Your cart is empty</h1>
          <p>Add a few things before checking out.</p>
          <a href="index.html" class="btn btn-primary btn-lg" style="margin-top:16px;">Browse products</a>
        </div>`;
      return false;
    }

    summaryItems.innerHTML = items
      .map(
        (l) => `
      <div class="summary-item">
        <span>${l.emoji} ${l.name} × ${l.qty}</span>
        <span>${formatPrice(l.lineTotal)}</span>
      </div>`
      )
      .join("");

    const t = totals();
    document.getElementById("sum-subtotal").textContent = formatPrice(t.subtotal);
    document.getElementById("sum-shipping").textContent =
      t.shipping === 0 ? "FREE" : formatPrice(t.shipping);
    document.getElementById("sum-tax").textContent = formatPrice(t.tax);
    document.getElementById("sum-total").textContent = formatPrice(t.total);
    return true;
  }

  if (!renderSummary()) return;

  /* ---------- Light input formatting ---------- */
  const cardInput = document.getElementById("card");
  cardInput.addEventListener("input", () => {
    let v = cardInput.value.replace(/\D/g, "").slice(0, 16);
    cardInput.value = v.replace(/(.{4})/g, "$1 ").trim();
  });

  const expiryInput = document.getElementById("expiry");
  expiryInput.addEventListener("input", () => {
    let v = expiryInput.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    expiryInput.value = v;
  });

  /* ---------- Submit ---------- */
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const email = document.getElementById("email").value;
    const t = totals();
    const orderId = "NB-" + Date.now().toString(36).toUpperCase().slice(-8);

    Cart.clear();

    main.innerHTML = `
      <div class="checkout-success">
        <div class="check">✓</div>
        <h1>Order confirmed!</h1>
        <p>Thank you for your purchase. A confirmation has been sent to
           <strong>${email}</strong>.</p>
        <p>Order number: <span class="order-id">${orderId}</span></p>
        <p>Total charged: <span class="order-id">${formatPrice(t.total)}</span></p>
        <a href="index.html" class="btn btn-primary btn-lg" style="margin-top:24px;">Continue shopping</a>
      </div>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
