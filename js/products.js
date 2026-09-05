/**
 * Product catalog data.
 * Emojis stand in for product photography so the demo needs no external assets.
 * `oldPrice` is optional and renders a strikethrough "sale" price when present.
 */
const PRODUCTS = [
  { id: "p01", name: "Merino Wool Sweater", category: "Apparel", price: 89, oldPrice: 120, rating: 4.8, reviews: 214, emoji: "🧥", tag: "Sale",
    description: "Ultra-soft merino wool crewneck. Temperature-regulating, breathable, and machine washable. A wardrobe staple for cooler days." },
  { id: "p02", name: "Organic Cotton Tee", category: "Apparel", price: 28, rating: 4.6, reviews: 512, emoji: "👕", tag: "Best seller",
    description: "Heavyweight 100% organic cotton tee with a relaxed fit. Pre-shrunk and built to survive years of wash cycles." },
  { id: "p03", name: "Everyday Canvas Tote", category: "Accessories", price: 34, rating: 4.7, reviews: 189, emoji: "👜",
    description: "Sturdy 16oz canvas tote with reinforced handles and an interior pocket. Carries groceries, laptops, or a weekend's worth of everything." },
  { id: "p04", name: "Minimalist Watch", category: "Accessories", price: 149, oldPrice: 189, rating: 4.9, reviews: 96, emoji: "⌚", tag: "Sale",
    description: "Swiss quartz movement, sapphire crystal, and a genuine leather strap. Water resistant to 50m with a clean, legible dial." },
  { id: "p05", name: "Ceramic Pour-Over Set", category: "Home", price: 46, rating: 4.5, reviews: 143, emoji: "☕",
    description: "Hand-glazed ceramic dripper and matching carafe. Brews a clean, bright cup — no paper aftertaste, no electricity required." },
  { id: "p06", name: "Linen Throw Blanket", category: "Home", price: 72, rating: 4.7, reviews: 78, emoji: "🛋️",
    description: "Stonewashed French linen throw that gets softer with every wash. Breathable in summer, cozy in winter." },
  { id: "p07", name: "Wireless Earbuds", category: "Tech", price: 119, oldPrice: 149, rating: 4.4, reviews: 631, emoji: "🎧", tag: "Sale",
    description: "Active noise cancellation, 30-hour total battery, and a snug all-day fit. Sweat and splash resistant for workouts." },
  { id: "p08", name: "Fast-Charge Power Bank", category: "Tech", price: 39, rating: 4.6, reviews: 402, emoji: "🔋",
    description: "10,000mAh USB-C power bank that charges a phone twice over. Slim aluminum body slips into any pocket." },
  { id: "p09", name: "Stainless Water Bottle", category: "Accessories", price: 32, rating: 4.8, reviews: 356, emoji: "🍶", tag: "Best seller",
    description: "Double-walled insulation keeps drinks cold 24 hours or hot for 12. Leakproof lid and a wide mouth for ice." },
  { id: "p10", name: "Scented Soy Candle", category: "Home", price: 24, rating: 4.5, reviews: 221, emoji: "🕯️",
    description: "Hand-poured soy wax candle with notes of cedar and bergamot. 50-hour clean burn in a reusable glass vessel." },
  { id: "p11", name: "Leather Card Wallet", category: "Accessories", price: 45, rating: 4.7, reviews: 167, emoji: "💳",
    description: "Full-grain vegetable-tanned leather that patinas beautifully. Holds six cards plus folded bills in a slim profile." },
  { id: "p12", name: "Mechanical Keyboard", category: "Tech", price: 129, rating: 4.8, reviews: 288, emoji: "⌨️", tag: "New",
    description: "Hot-swappable tactile switches, aluminum frame, and per-key backlighting. Types like a dream, sounds even better." },
  { id: "p13", name: "Cozy Knit Beanie", category: "Apparel", price: 22, rating: 4.6, reviews: 134, emoji: "🧢",
    description: "Chunky ribbed knit beanie in a soft acrylic-wool blend. Warm without the itch, one size fits most." },
  { id: "p14", name: "Bamboo Cutting Board", category: "Home", price: 38, rating: 4.7, reviews: 92, emoji: "🔪",
    description: "Sustainably harvested bamboo board with a juice groove and built-in handles. Knife-friendly and naturally antimicrobial." },
  { id: "p15", name: "Running Sneakers", category: "Apparel", price: 98, oldPrice: 130, rating: 4.5, reviews: 447, emoji: "👟", tag: "Sale",
    description: "Responsive foam midsole with a breathable knit upper. Lightweight cushioning for daily miles or all-day wear." },
  { id: "p16", name: "Desk Plant Trio", category: "Home", price: 42, rating: 4.9, reviews: 63, emoji: "🪴", tag: "New",
    description: "Three low-maintenance succulents in matte concrete pots. Bring a little calm to any desk with near-zero effort." },
];
