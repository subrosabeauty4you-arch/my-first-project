/**
 * Cart module — persists to localStorage and exposes a small API plus a
 * change-notification system so any page (storefront or checkout) can react.
 */
const Cart = (() => {
  const KEY = "nimbus_cart_v1";
  const listeners = [];

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function write(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      /* storage may be unavailable (private mode); cart stays in-memory */
    }
    listeners.forEach((fn) => fn(items));
  }

  function findProduct(id) {
    return (typeof PRODUCTS !== "undefined") && PRODUCTS.find((p) => p.id === id);
  }

  return {
    /** Register a callback fired whenever the cart changes. */
    onChange(fn) {
      listeners.push(fn);
      return fn;
    },

    /** Return cart lines enriched with product details. */
    items() {
      return read()
        .map((line) => {
          const product = findProduct(line.id);
          if (!product) return null;
          return { ...product, qty: line.qty, lineTotal: product.price * line.qty };
        })
        .filter(Boolean);
    },

    add(id, qty = 1) {
      const items = read();
      const existing = items.find((l) => l.id === id);
      if (existing) {
        existing.qty += qty;
      } else {
        items.push({ id, qty });
      }
      write(items);
    },

    setQty(id, qty) {
      let items = read();
      if (qty <= 0) {
        items = items.filter((l) => l.id !== id);
      } else {
        const line = items.find((l) => l.id === id);
        if (line) line.qty = qty;
      }
      write(items);
    },

    remove(id) {
      write(read().filter((l) => l.id !== id));
    },

    clear() {
      write([]);
    },

    count() {
      return read().reduce((sum, l) => sum + l.qty, 0);
    },

    subtotal() {
      return this.items().reduce((sum, l) => sum + l.lineTotal, 0);
    },
  };
})();

/** Shared currency formatter. */
function formatPrice(n) {
  return "$" + n.toFixed(2);
}
