/*
  ============================================================
  SUBROSA BEAUTY — SITE CONTENT
  ============================================================
  Edit anything in this file to update the website. No coding
  knowledge needed beyond changing the text between quotes.

  To swap in your real logo or product photos later, drop the
  image files into /assets/img/ using the file names referenced
  below (logo.png, shade images, etc). See README.md for details.

  NOTE: Subrosa Beauty currently has one product — the Vegan
  Gloss — sold in a few shades. The "Featured Products" section
  below is built from the `shades` array so it can showcase that
  one formula elegantly. If you launch new products later, just
  add more entries.
  ============================================================
*/

const SUBROSA_CONFIG = {

  // ---- Brand ----
  brandName: "Subrosa Beauty",
  logoText: "SUBROSA",          // shown if assets/img/logo.png is not found
  logoImage: "assets/img/logo.png",

  // ---- Colors (luxury beige / gold / cream palette) ----
  colors: {
    cream: "#FAF5EC",
    beige: "#EFE3D0",
    beigeDark: "#E2D2B4",
    gold: "#B4863F",
    goldLight: "#D9B87C",
    ink: "#3A2C22",
    inkMuted: "#8A7864",
  },

  // ---- Navigation ----
  nav: [
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  navCta: "Shop the Gloss",
  navCtaLink: "#products",

  // ---- Hero ----
  hero: {
    eyebrow: "Vegan. Cruelty-Free. Under the Rose.",
    headline: "Subrosa Beauty",
    tagline: "The Vegan Gloss — weightless shine, zero compromises.",
    ctaPrimary: "Shop the Gloss",
    ctaPrimaryLink: "#products",
    ctaSecondary: "Our Story",
    ctaSecondaryLink: "#about",
  },

  // ---- Featured Products (shades of the Vegan Gloss) ----
  productsIntro: {
    eyebrow: "Featured",
    heading: "The Vegan Gloss",
    sub: "One clean formula, three ways to wear it. Non-sticky, high-shine, 100% vegan.",
  },
  shades: [
    {
      name: "Rosewood Veil",
      swatch: "#B5716B",
      description: "A sheer, rosy nude for everyday wear.",
      price: "$24.00",
    },
    {
      name: "Champagne Hush",
      swatch: "#D9B87C",
      description: "Warm golden shimmer over bare lips.",
      price: "$24.00",
    },
    {
      name: "Honey Undertone",
      swatch: "#A9744B",
      description: "Rich caramel gloss with a soft glow.",
      price: "$24.00",
    },
  ],

  // ---- Product detail (shared formula info) ----
  product: {
    name: "Subrosa Vegan Gloss",
    tagline: "High-shine, weightless, 100% vegan formula",
    price: "$24.00",
    labelLine1: "SUBROSA",
    labelLine2: "VEGAN GLOSS",
    // Optional: set to an image path (e.g. "assets/img/product-label.png")
    // to use a real photo/label instead of the generated text label on
    // the 3D bottle. Leave as null to keep the generated label.
    labelImage: null,

    description:
      "A weightless, high-shine gloss built entirely on vegan, cruelty-free ingredients. " +
      "Subrosa Vegan Gloss glides on smooth, feels like nothing, and leaves lips looking " +
      "glassy without the stick. Made in small batches, made to be seen.",

    features: [
      "100% vegan & cruelty-free formula",
      "Non-sticky, high-shine finish",
      "Hydrates with shea butter & vitamin E",
      "No parabens, no sulfates, no animal-derived ingredients",
      "Available in three flattering shades",
    ],

    ingredients:
      "Vegan Shea Butter, Vitamin E, Jojoba Oil, Candelilla Wax, Mica, Natural Rose Flavor.",
  },

  // ---- About ----
  about: {
    eyebrow: "Our Story",
    heading: "Beauty, kept quiet.",
    body:
      "Subrosa Beauty was founded on a simple idea: luxury shouldn't cost anything living. " +
      "\"Subrosa\" — under the rose — is an old term for something held in confidence. We " +
      "borrowed it because that's how we make things: quietly, carefully, in small batches, " +
      "without cutting corners on what goes into the formula or what's left out of it. " +
      "Every Subrosa product is 100% vegan and cruelty-free, made to feel indulgent without " +
      "asking you to compromise.",
    stats: [
      { value: "100%", label: "Vegan formulas" },
      { value: "0", label: "Animal-derived ingredients" },
      { value: "Small", label: "Batch made" },
    ],
  },

  // ---- Services ("the Subrosa experience") ----
  servicesIntro: {
    eyebrow: "Services",
    heading: "The Subrosa Experience",
    sub: "A few ways we take care of the details, so you don't have to.",
  },
  services: [
    {
      title: "Shade Matching Concierge",
      description: "Not sure which shade suits you? Message us a photo and we'll help you pick.",
    },
    {
      title: "Complimentary Gift Wrapping",
      description: "Every order can be wrapped and note-carded at no extra cost — just ask.",
    },
    {
      title: "Wholesale & Private Events",
      description: "Boutiques, salons, and private events can inquire about bulk and custom orders.",
    },
    {
      title: "Express Shipping",
      description: "Orders placed before 2pm ship the same day, arriving in 2–3 business days.",
    },
  ],

  // ---- Contact / Booking ----
  contact: {
    eyebrow: "Contact",
    heading: "Get in touch",
    sub: "Questions, wholesale inquiries, or private event bookings — we read everything ourselves.",
    email: "hello@subrosabeauty.com",
    formNote:
      "This form opens your email client with your message pre-filled — replace this later " +
      "with a form service (like Formspree) if you'd rather receive submissions directly.",
    submitLabel: "Send Message",
  },

  // ---- Footer ----
  footerNote: "Subrosa Beauty — crafted vegan, worn boldly.",
  socialLinks: [
    // Add your real links here, e.g. { label: "Instagram", url: "https://instagram.com/subrosabeauty" }
  ],
};
