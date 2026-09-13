/* ============================================================
   SUBROSA BEAUTY — homepage interactions
   Self-contained, no dependencies. Bespoke SVG gloss renderings
   stand in for photography — swap in real imagery when ready.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Product / shade data ---------- */
  // hue = gloss liquid; label = cap band accent
  var PRODUCTS = [
    { name: "Café Confessions", shade: "Warm Mocha Nude",  price: "€28", hue: "#8d5c46", cap: "#a2854e",
      desc: "A whispered brown nude with the warmth of an afternoon in a Left Bank café. Cushiony, glass-like shine that flatters every tone." },
    { name: "Rose Whisper",     shade: "Soft Petal Rose",  price: "€28", hue: "#c98a86", cap: "#a2854e",
      desc: "The quietest rose — a barely-there flush of colour and light. Your lips, gently perfected." },
    { name: "Cerise Éclat",     shade: "Radiant Cherry",   price: "€30", hue: "#a83b52", cap: "#a2854e",
      desc: "A confident cherry rose with luminous depth. A single stroke, and the room understands." },
    { name: "Pure Secret",      shade: "Clear Champagne",  price: "€26", hue: "#ecd8cc", cap: "#a2854e",
      desc: "A veil of pure, shimmering shine over your natural shade. The secret that needs no telling." },
    { name: "Jardin Secret",    shade: "Berry Mauve",      price: "€30", hue: "#8f556c", cap: "#a2854e",
      desc: "A romantic berry mauve, like a walled garden in bloom at dusk. Softly dramatic, endlessly wearable." }
  ];

  /* ---------- Bespoke gloss SVG ---------- */
  function glossSVG(hue, cap) {
    var uid = "g" + Math.random().toString(36).slice(2, 8);
    return (
      '<svg viewBox="0 0 120 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="body' + uid + '" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0" stop-color="#f6efe4"/>' +
            '<stop offset="0.42" stop-color="#fffdf9"/>' +
            '<stop offset="1" stop-color="#e6dccb"/>' +
          '</linearGradient>' +
          '<linearGradient id="cap' + uid + '" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0" stop-color="' + shade(cap, -22) + '"/>' +
            '<stop offset="0.5" stop-color="' + shade(cap, 26) + '"/>' +
            '<stop offset="1" stop-color="' + shade(cap, -14) + '"/>' +
          '</linearGradient>' +
          '<linearGradient id="liq' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="' + shade(hue, 24) + '"/>' +
            '<stop offset="1" stop-color="' + shade(hue, -18) + '"/>' +
          '</linearGradient>' +
        '</defs>' +
        /* liquid inside the lower glass */
        '<rect x="34" y="150" width="52" height="120" rx="20" fill="url(#liq' + uid + ')"/>' +
        /* glass body */
        '<rect x="30" y="120" width="60" height="150" rx="22" fill="url(#body' + uid + ')" opacity="0.5"/>' +
        '<rect x="30" y="120" width="60" height="150" rx="22" fill="none" stroke="' + shade(cap, 6) + '" stroke-width="1" opacity="0.5"/>' +
        /* neck */
        '<rect x="46" y="96" width="28" height="30" fill="#efe6d6"/>' +
        '<rect x="46" y="96" width="28" height="30" fill="none" stroke="' + shade(cap, 6) + '" stroke-width="0.8" opacity="0.4"/>' +
        /* cap */
        '<rect x="42" y="26" width="36" height="74" rx="6" fill="url(#cap' + uid + ')"/>' +
        '<rect x="42" y="40" width="36" height="3" fill="' + shade(cap, -30) + '" opacity="0.5"/>' +
        /* monogram on cap */
        '<text x="60" y="74" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="20" fill="#fff" opacity="0.92">S</text>' +
        /* highlight */
        '<rect x="37" y="150" width="7" height="108" rx="3.5" fill="#ffffff" opacity="0.28"/>' +
      '</svg>'
    );
  }

  /* lighten (+) / darken (-) a hex color by pct */
  function shade(hex, pct) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var r = parseInt(h.slice(0, 2), 16),
        g = parseInt(h.slice(2, 4), 16),
        b = parseInt(h.slice(4, 6), 16);
    var f = pct / 100;
    function adj(v) { return Math.max(0, Math.min(255, Math.round(v + (f > 0 ? (255 - v) : v) * f))); }
    return "#" + [adj(r), adj(g), adj(b)].map(function (v) { return ("0" + v.toString(16)).slice(-2); }).join("");
  }

  var $ = function (s, c) { return (c || document).querySelector(s); };

  /* ---------- Render products ---------- */
  var grid = $("#productGrid");
  if (grid) {
    grid.innerHTML = PRODUCTS.map(function (p, i) {
      return (
        '<article class="product-card reveal" style="--i:' + i + '">' +
          '<div class="product-media">' +
            glossSVG(p.hue, p.cap) +
            '<div class="product-actions">' +
              '<button class="act-bag" data-add="' + i + '">Add to Bag</button>' +
              '<button class="act-quick" data-quick="' + i + '">Quick View</button>' +
            '</div>' +
          '</div>' +
          '<div class="product-info">' +
            '<h3 class="product-name">' + p.name + '</h3>' +
            '<p class="product-shade">' + p.shade + '</p>' +
            '<p class="product-price">' + p.price + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  /* ---------- Render signature shades ---------- */
  var shadeRow = $("#shadeRow");
  if (shadeRow) {
    shadeRow.innerHTML = PRODUCTS.map(function (p, i) {
      return (
        '<div class="shade reveal" style="--i:' + i + '">' +
          '<div class="shade-tube">' + glossSVG(p.hue, p.cap) + '</div>' +
          '<p class="shade-name">' + p.name + '</p>' +
          '<p class="shade-tone">' + p.shade + '</p>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------- Instagram grid (abstract editorial tiles) ---------- */
  var socialGrid = $("#socialGrid");
  if (socialGrid) {
    var tones = [
      ["#efe6d7", "#d9c3b6"], ["#ecd8d0", "#cf9f92"], ["#eae1d2", "#c9b48a"],
      ["#f2e7de", "#e0c9c0"], ["#e8d3ca", "#b98b7e"], ["#efe9df", "#d4c6ae"],
      ["#e6dccb", "#c3a76d"], ["#f1e7dc", "#d7bfa6"], ["#ecdfd2", "#caa987"],
      ["#f2e9df", "#ddc7b9"], ["#e9d6cc", "#c69185"], ["#efe4d3", "#c9b58c"]
    ];
    socialGrid.innerHTML = tones.map(function (t) {
      return '<a href="https://instagram.com" target="_blank" rel="noopener" class="social-tile" ' +
        'style="background:linear-gradient(145deg,' + t[0] + ',' + t[1] + ')" aria-label="Subrosa on Instagram"></a>';
    }).join("");
  }

  /* ---------- Bag ---------- */
  var bagCount = $("#bagCount");
  var count = 0;
  function addToBag(name) {
    count += 1;
    bagCount.textContent = count;
    bagCount.classList.remove("bump");
    void bagCount.offsetWidth;
    bagCount.classList.add("bump");
    toast(name + " added to your bag");
  }

  /* ---------- Toast ---------- */
  var toastEl = $("#toast");
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
      setTimeout(function () { toastEl.hidden = true; }, 400);
    }, 2400);
  }

  /* ---------- Quick view modal ---------- */
  var overlay = $("#modalOverlay");
  var qvBody = $("#quickviewBody");
  function openQuick(i) {
    var p = PRODUCTS[i];
    qvBody.innerHTML =
      '<div class="qv-media">' + glossSVG(p.hue, p.cap) + '</div>' +
      '<div class="qv-info">' +
        '<p class="eyebrow">The Signature Gloss</p>' +
        '<h3>' + p.name + '</h3>' +
        '<p class="qv-shade">' + p.shade + '</p>' +
        '<p class="qv-desc">' + p.desc + '</p>' +
        '<p class="qv-price">' + p.price + '</p>' +
        '<button class="btn btn-solid" data-add="' + i + '">Add to Bag</button>' +
      '</div>';
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeQuick() {
    overlay.hidden = true;
    overlay.style.animation = "none";
    void overlay.offsetWidth;
    overlay.style.animation = "";
    document.body.style.overflow = "";
  }
  $("#modalClose").addEventListener("click", closeQuick);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeQuick(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) closeQuick(); });

  /* ---------- Delegated clicks (add / quick) ---------- */
  document.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (add) { addToBag(PRODUCTS[+add.dataset.add].name); return; }
    var quick = e.target.closest("[data-quick]");
    if (quick) { openQuick(+quick.dataset.quick); }
  });

  $("#bagBtn").addEventListener("click", function () {
    toast(count ? "You have " + count + " item" + (count > 1 ? "s" : "") + " in your bag" : "Your bag is empty");
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = $("#navToggle");
  var mobileNav = $("#mobileNav");
  navToggle.addEventListener("click", function () {
    var open = mobileNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      mobileNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });

  /* ---------- Header scroll state ---------- */
  var header = $("#siteHeader");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 30); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Newsletter ---------- */
  var form = $("#newsletterForm");
  var note = $("#newsletterNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = $("#newsletterEmail").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      return;
    }
    note.textContent = "Merci — welcome to the Subrosa world.";
    form.reset();
  });

  /* ---------- Reveal on scroll ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
