/*
  ============================================================
  SUBROSA BEAUTY — SITE CONTENT
  ============================================================
  Edit anything in this file to update the website across all
  three pages (Our Story, Speciality, Shades). No coding
  knowledge needed beyond changing the text between quotes.

  To swap in your real logo, founder photo, or product label
  later, drop the image files into /assets/img/ using the file
  names referenced below. See README.md for details.

  NOTE: Subrosa Beauty currently has one product — the Vegan
  Gloss — sold in several shades. The Shades page and the
  "Featured" grid are both generated from the `shades` array.
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

  // ---- Navigation (path is relative to the site root; nav.js prefixes it
  //      with "./" or "../" depending on how deep the current page is) ----
  nav: [
    { label: "Our Story", path: "", pageId: "story" },
    { label: "Speciality", path: "speciality/", pageId: "speciality" },
    { label: "Shades", path: "shades/", pageId: "shades" },
  ],
  navCta: "Shop the Gloss",
  navCtaPath: "shades/",

  // ================= OUR STORY (/) =================
  hero: {
    eyebrow: "Vegan. Cruelty-Free. Under the Rose.",
    headline: "Subrosa Beauty",
    tagline: "The Vegan Gloss — weightless shine, zero compromises.",
    ctaPrimary: "Explore Shades",
    ctaPrimaryPath: "shades/",
    ctaSecondary: "Read Our Story",
    ctaSecondaryHash: "#narrative",
  },

  narrative: {
    eyebrow: "Our Story",
    heading: "Sub Rosa",
    body:
      "\"Sub rosa\" — under the rose — is an old term for something held in confidence. " +
      "Rooms marked with a rose overhead meant: what's said here stays here. We borrowed " +
      "the phrase because that's how we make things — quietly, carefully, without cutting " +
      "corners on what goes into the formula or what's left out of it.\n\n" +
      "Subrosa Beauty started with one product, made one way: a vegan, cruelty-free gloss " +
      "that feels as good as it looks. No animal-derived ingredients, no compromises on " +
      "shine, no rushing the batch. Everything else is still just the one gloss — worn " +
      "boldly, made quietly.",
  },

  founder: {
    eyebrow: "The Founder",
    name: "Founder Name",       // TODO: replace with your name
    title: "Founder & Formulator",
    photo: "assets/img/founder.jpg",
    quote: "I wanted a gloss I didn't have to explain — no animal ingredients, no compromise on shine.",
    bio:
      "Subrosa Beauty is a solo, small-batch label. Every shade is mixed, tested, and " +
      "bottled by hand before it ships — which is also why the line stays deliberately " +
      "small: one formula, done properly, before anything else gets added.",
  },

  values: {
    eyebrow: "What We Stand For",
    heading: "Our Values",
    items: [
      { title: "Vegan, No Exceptions", description: "Every ingredient is plant- or mineral-derived. Nothing animal, ever." },
      { title: "Cruelty-Free", description: "Never tested on animals, at any stage, by us or anyone we work with." },
      { title: "Small Batch", description: "Mixed and bottled in small runs so quality never gets diluted for scale." },
      { title: "Quiet Luxury", description: "Understated packaging, honest ingredient lists, no overclaiming." },
    ],
  },

  // ================= SPECIALITY (/speciality/) =================
  speciality: {
    eyebrow: "Speciality",
    heading: "The Vegan Formula",
    intro:
      "One gloss, formulated without a single animal-derived ingredient. Here's exactly " +
      "what's in it, what isn't, and how to wear it.",
  },

  ingredients: [
    { name: "Vegan Shea Butter", description: "Deeply conditions and softens lips without any beeswax." },
    { name: "Vitamin E", description: "An antioxidant that helps protect lips from everyday dryness." },
    { name: "Jojoba Oil", description: "A lightweight plant oil that mimics skin's natural lipids for a non-greasy feel." },
    { name: "Candelilla Wax", description: "A plant-based wax (used instead of beeswax) that gives the gloss its glide." },
    { name: "Mica", description: "Adds soft, reflective shimmer for that glassy finish." },
    { name: "Natural Rose Flavor", description: "A subtle, clean rose note — no artificial fragrance." },
  ],

  freeFrom: [
    "Beeswax or any animal-derived ingredient",
    "Parabens",
    "Sulfates",
    "Phthalates",
    "Gelatin or carmine",
    "Animal testing, at any stage",
  ],

  ritual: [
    { step: "01", title: "Prep", description: "Start on bare or lipstick-layered lips for the cleanest finish." },
    { step: "02", title: "Apply", description: "Glide the wand from center to corners — one coat is buildable, sheer to bold." },
    { step: "03", title: "Press", description: "Press lips together lightly to even out the shine, no sticky drag." },
    { step: "04", title: "Reapply", description: "Touch up any time — the formula layers cleanly without pilling." },
  ],

  // ================= SHADES (/shades/) =================
  shadesIntro: {
    eyebrow: "Featured",
    heading: "The Vegan Gloss",
    sub: "One clean formula, six ways to wear it. Non-sticky, high-shine, 100% vegan.",
  },
  shadesPageIntro: {
    eyebrow: "Shades",
    heading: "Pick Your Shade",
    sub: "Tap a swatch to see it on the bottle. Every shade is the same vegan formula.",
  },
  shades: [
    { name: "Rosewood Veil", swatch: "#B5716B", description: "A sheer, rosy nude for everyday wear.", price: "$24.00" },
    { name: "Champagne Hush", swatch: "#D9B87C", description: "Warm golden shimmer over bare lips.", price: "$24.00" },
    { name: "Honey Undertone", swatch: "#A9744B", description: "Rich caramel gloss with a soft glow.", price: "$24.00" },
    { name: "Bare Confession", swatch: "#C99A8E", description: "The barely-there nude, just glass.", price: "$24.00" },
    { name: "Midnight Rosé", swatch: "#7A4552", description: "A deeper wine-rose for evening wear.", price: "$24.00" },
    { name: "Sheer Petal", swatch: "#E3B7B0", description: "A soft, cool-pink wash of color.", price: "$24.00" },
  ],

  // ---- Product label (drawn onto the 3D bottle) ----
  product: {
    name: "Subrosa Vegan Gloss",
    labelLine1: "SUBROSA",
    labelLine2: "VEGAN GLOSS",
    // Optional: set to an image path (e.g. "assets/img/product-label.png")
    // to use a real photo/label instead of the generated text label on
    // the 3D bottle. Leave as null to keep the generated label.
    labelImage: null,
  },

  // ---- Footer ----
  footerNote: "Subrosa Beauty — crafted vegan, worn boldly.",
  footerEmail: "hello@subrosabeauty.com",
  socialLinks: [
    // Add your real links here, e.g. { label: "Instagram", url: "https://instagram.com/subrosabeauty" }
  ],
};
