// Import product images for Vercel compatibility
import p1 from '../assets/images/products/p-1.jpeg';
import p2 from '../assets/images/products/p-2.jpeg';
import p3 from '../assets/images/products/p-3.jpeg';
import p4 from '../assets/images/products/p-4.jpeg';
import p5 from '../assets/images/products/p-5.jpeg';
import p6 from '../assets/images/products/p-6.jpeg';
import p7 from '../assets/images/products/p-7.jpeg';
import p8 from '../assets/images/products/p-8.jpeg';
import p9 from '../assets/images/products/p-9.jpeg';
import p10 from '../assets/images/products/p-10.jpeg';
import p11 from '../assets/images/products/p-11.jpeg';
import p12 from '../assets/images/products/p-12.jpeg';

export const products = [
  {
    id: 1,
    name: "EVARIS SKIN LIGHTENING CREAM",
    category: "skincare",
    price: 2999,
    originalPrice: 3999,
    image: p1,
    description: "For All Skin Types",
    ingredients: "Glutathione, Niacinamide, Collagen, Squalane, Ceramides, Vitamin-C & Hyaluronic Acid",
    volume: "50g / 1.76 fl.oz",
    keyIngredients: [
      { name: "Glutathione", benefit: "Brightening Support" },
      { name: "Niacinamide", benefit: "Improves Skin Texture" },
      { name: "Vitamin C", benefit: "Glow Boost" },
      { name: "Ceramide", benefit: "Strengthens Skin Barrier" }
    ],
    badge: "Best Seller",
    color: "yellow"
  },
  {
    id: 2,
    name: "EVARIS BARRIER REPAIR MOISTURIZER",
    category: "skincare",
    price: 2499,
    originalPrice: 3299,
    image: p2,
    description: "Enriched with Dermawhite & Vitamin C",
    ingredients: "Dermawhite, Vitamin C, Hyaluronic Acid",
    volume: "100 ml",
    keyIngredients: [
      { name: "Dermawhite", benefit: "Visibly Brighter Skin" },
      { name: "Vitamin C", benefit: "Targets Dark Spots" }
    ],
    benefits: ["Brightening & Radiance", "For All Skin Types"],
    badge: "New Arrival",
    color: "purple"
  },
  {
    id: 3,
    name: "EVARIS KLASHH FACEWASH",
    category: "skincare",
    price: 1899,
    originalPrice: 2499,
    image: p3,
    description: "Detoxifying Pores, Non-Drying, pH Balanced",
    ingredients: "Salicylic Acid (2%), Tea Tree, Cica, Vitamin C Extract",
    volume: "150 ml",
    keyIngredients: [
      { name: "Salicylic Acid (2%)", benefit: "Deep Pore Cleansing, Removes Dirt & Oil, Fights Acne & Blackheads" },
      { name: "Tea Tree & Cica", benefit: "Soothes & Controls Oil, Reduces Inflammation, Calms Sensitive Skin" },
      { name: "Vitamin C Extract", benefit: "Brightens & Refreshes Skin, Fades Dark Spots, Boosts Glow" }
    ],
    badge: "Popular",
    color: "green"
  },
  {
    id: 4,
    name: "EVARIS NIGHT CREAM",
    category: "skincare",
    price: 2799,
    originalPrice: 3599,
    image: p4,
    description: "Overnight Repair & Hydration",
    ingredients: "Retinol, Peptides, Hyaluronic Acid, Vitamin E",
    volume: "50g",
    keyIngredients: [
      { name: "Retinol", benefit: "Anti-aging, Cell Renewal" },
      { name: "Peptides", benefit: "Firming & Elasticity" },
      { name: "Hyaluronic Acid", benefit: "Deep Hydration" }
    ],
    badge: "New",
    color: "blue"
  },
  {
    id: 5,
    name: "EVARIS VITAMIN C SERUM",
    category: "skincare",
    price: 3299,
    originalPrice: 4299,
    image: p5,
    description: "Advanced Brightening Formula",
    ingredients: "Vitamin C, Hyaluronic Acid, Ferulic Acid",
    volume: "30 ml",
    keyIngredients: [
      { name: "Vitamin C", benefit: "Brightening & Anti-aging" },
      { name: "Hyaluronic Acid", benefit: "Deep Hydration" },
      { name: "Ferulic Acid", benefit: "Antioxidant Protection" }
    ],
    badge: "Premium",
    color: "yellow"
  },
  {
    id: 6,
    name: "EVARIS RETINOL CREAM",
    category: "skincare",
    price: 3499,
    originalPrice: 4499,
    image: p6,
    description: "Anti-aging Night Treatment",
    ingredients: "Retinol, Peptides, Ceramides",
    volume: "50g",
    keyIngredients: [
      { name: "Retinol", benefit: "Reduces Wrinkles" },
      { name: "Peptides", benefit: "Firming Effect" },
      { name: "Ceramides", benefit: "Skin Barrier Support" }
    ],
    badge: "Best Seller",
    color: "purple"
  }
];

export const categories = [
  { id: "all", name: "All Products", color: "gray" },
  { id: "skincare", name: "Skincare", color: "purple" },
  { id: "makeup", name: "Makeup", color: "pink" },
  { id: "body", name: "Body Care", color: "green" }
];
