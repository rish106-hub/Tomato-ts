import dotenv from "dotenv";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

dotenv.config();

const dbName = process.env.MONGODB_DB_NAME || "tomato";

const img = (id) => `https://images.unsplash.com/photo-${id}?w=400&q=80`;

export const sampleFoodItems = [
  // ── SALAD — Dum Safar ──────────────────────────────────────────
  {
    name: "Greek Salad",
    description: "Crisp cucumber, cherry tomatoes, kalamata olives, red onion, and creamy feta tossed in a lemon-herb vinaigrette.",
    price: 220,
    category: "Salad",
    image: img("1547592180-85f173990554"),
    restaurantName: "Dum Safar",
    restaurantArea: "Connaught Place, Delhi",
    restaurantRating: 4.5,
    isVeg: true,
    tags: ["healthy", "mediterranean", "low-calorie"],
    popularityTag: "Bestseller",
    preparationTime: 10,
    isAvailable: true,
  },
  {
    name: "Veg Salad",
    description: "A vibrant bowl of seasonal vegetables — carrot, beet, sweet corn, cucumber, and lettuce — with a honey-mustard drizzle.",
    price: 180,
    category: "Salad",
    image: img("1546069901-ba9599a7e63c"),
    restaurantName: "Dum Safar",
    restaurantArea: "Connaught Place, Delhi",
    restaurantRating: 4.5,
    isVeg: true,
    tags: ["healthy", "light", "vegan"],
    popularityTag: "Must Try",
    preparationTime: 8,
    isAvailable: true,
  },
  {
    name: "Clover Salad",
    description: "Microgreens, fresh clover sprouts, roasted pumpkin seeds, avocado slices with a citrus-tahini dressing.",
    price: 240,
    category: "Salad",
    image: img("1490645935967-10de6ba17061"),
    restaurantName: "Dum Safar",
    restaurantArea: "Connaught Place, Delhi",
    restaurantRating: 4.5,
    isVeg: true,
    tags: ["superfood", "vegan", "gluten-free"],
    popularityTag: "New",
    preparationTime: 10,
    isAvailable: true,
  },
  {
    name: "Chicken Salad",
    description: "Grilled chicken strips over romaine, sweet corn, cherry tomatoes, and croutons, finished with a Caesar-lite dressing.",
    price: 299,
    category: "Salad",
    image: img("1512621776951-a57141f2eefd"),
    restaurantName: "Dum Safar",
    restaurantArea: "Connaught Place, Delhi",
    restaurantRating: 4.5,
    isVeg: false,
    tags: ["high-protein", "grilled"],
    popularityTag: "Bestseller",
    preparationTime: 15,
    isAvailable: true,
  },

  // ── ROLLS — Thali Ghar ─────────────────────────────────────────
  {
    name: "Lasagna Rolls",
    description: "Classic lasagna sheets rolled with ricotta, spinach, and marinara, baked golden with melted mozzarella on top.",
    price: 349,
    category: "Rolls",
    image: img("1574894709920-11b28e7367e3"),
    restaurantName: "Thali Ghar",
    restaurantArea: "Lajpat Nagar, Delhi",
    restaurantRating: 4.3,
    isVeg: true,
    tags: ["italian", "baked", "comfort-food"],
    popularityTag: "Bestseller",
    preparationTime: 20,
    isAvailable: true,
  },
  {
    name: "Peri Peri Rolls",
    description: "Flame-grilled veggies and paneer marinated in Nando's-style peri peri sauce, wrapped in a soft flour tortilla.",
    price: 279,
    category: "Rolls",
    image: img("1565299585323-38d6b0865b47"),
    restaurantName: "Thali Ghar",
    restaurantArea: "Lajpat Nagar, Delhi",
    restaurantRating: 4.3,
    isVeg: true,
    tags: ["spicy", "grilled"],
    popularityTag: "Must Try",
    preparationTime: 15,
    isAvailable: true,
  },
  {
    name: "Chicken Rolls",
    description: "Tandoori chicken tikka, caramelised onions, mint chutney, and julienned capsicum rolled in a rumali-style wrap.",
    price: 319,
    category: "Rolls",
    image: img("1617196034183-421b4040ed20"),
    restaurantName: "Thali Ghar",
    restaurantArea: "Lajpat Nagar, Delhi",
    restaurantRating: 4.3,
    isVeg: false,
    tags: ["tandoor", "spicy", "high-protein"],
    popularityTag: "Bestseller",
    preparationTime: 18,
    isAvailable: true,
  },
  {
    name: "Veg Rolls",
    description: "Sautéed bell peppers, mushrooms, corn, and cottage cheese tossed in herb sauce, wrapped in a whole-wheat tortilla.",
    price: 249,
    category: "Rolls",
    image: img("1626700051175-6818013e1d4f"),
    restaurantName: "Thali Ghar",
    restaurantArea: "Lajpat Nagar, Delhi",
    restaurantRating: 4.3,
    isVeg: true,
    tags: ["healthy", "light"],
    popularityTag: "",
    preparationTime: 12,
    isAvailable: true,
  },

  // ── DESERTS — Kathi Theory ─────────────────────────────────────
  {
    name: "Ripple Ice Cream",
    description: "Signature swirl of vanilla and strawberry soft-serve, drizzled with warm chocolate fudge and crushed wafer bits.",
    price: 149,
    category: "Deserts",
    image: img("1497034825429-c343d7c6a68f"),
    restaurantName: "Kathi Theory",
    restaurantArea: "Hauz Khas Village, Delhi",
    restaurantRating: 4.7,
    isVeg: true,
    tags: ["ice-cream", "sweet", "cold"],
    popularityTag: "Bestseller",
    preparationTime: 5,
    isAvailable: true,
  },
  {
    name: "Fruit Ice Cream",
    description: "Two scoops of seasonal fruit sorbet topped with fresh mango, kiwi, and pomegranate — guilt-free and refreshing.",
    price: 179,
    category: "Deserts",
    image: img("1501443762994-82bd5dace89a"),
    restaurantName: "Kathi Theory",
    restaurantArea: "Hauz Khas Village, Delhi",
    restaurantRating: 4.7,
    isVeg: true,
    tags: ["fruit", "sorbet", "vegan"],
    popularityTag: "Must Try",
    preparationTime: 5,
    isAvailable: true,
  },
  {
    name: "Jar Ice Cream",
    description: "Mason jar loaded with brownie crumble, vanilla ice cream, salted caramel sauce, and a dark chocolate drizzle.",
    price: 199,
    category: "Deserts",
    image: img("1488900128323-21503983a07e"),
    restaurantName: "Kathi Theory",
    restaurantArea: "Hauz Khas Village, Delhi",
    restaurantRating: 4.7,
    isVeg: true,
    tags: ["indulgent", "jar", "trending"],
    popularityTag: "Trending",
    preparationTime: 8,
    isAvailable: true,
  },
  {
    name: "Vanilla Ice Cream",
    description: "Classic two-scoop Madagascar vanilla, served in a waffle cone with a light dusting of sea salt and caramel.",
    price: 119,
    category: "Deserts",
    image: img("1559703248-dcaaec9fab78"),
    restaurantName: "Kathi Theory",
    restaurantArea: "Hauz Khas Village, Delhi",
    restaurantRating: 4.7,
    isVeg: true,
    tags: ["classic", "simple"],
    popularityTag: "",
    preparationTime: 3,
    isAvailable: true,
  },

  // ── SANDWICH — Steam Room ──────────────────────────────────────
  {
    name: "Chicken Sandwich",
    description: "Juicy grilled chicken breast, lettuce, smoked cheddar, sundried tomatoes, and garlic aioli on a brioche bun.",
    price: 299,
    category: "Sandwich",
    image: img("1606755962773-d324e0a13086"),
    restaurantName: "Steam Room",
    restaurantArea: "Sector 18, Noida",
    restaurantRating: 4.4,
    isVeg: false,
    tags: ["grilled", "high-protein", "brioche"],
    popularityTag: "Bestseller",
    preparationTime: 15,
    isAvailable: true,
  },
  {
    name: "Vegan Sandwich",
    description: "Roasted portobello, avocado spread, arugula, pickled cucumber, and roasted red pepper on multigrain sourdough.",
    price: 269,
    category: "Sandwich",
    image: img("1550317138-10000687a72b"),
    restaurantName: "Steam Room",
    restaurantArea: "Sector 18, Noida",
    restaurantRating: 4.4,
    isVeg: true,
    tags: ["vegan", "plant-based", "sourdough"],
    popularityTag: "Must Try",
    preparationTime: 12,
    isAvailable: true,
  },
  {
    name: "Grilled Sandwich",
    description: "Double-stacked with mozzarella, cheddar, jalapeños, and caramelised onions on thick-cut sourdough, pressed golden.",
    price: 249,
    category: "Sandwich",
    image: img("1528736235302-52922df5c122"),
    restaurantName: "Steam Room",
    restaurantArea: "Sector 18, Noida",
    restaurantRating: 4.4,
    isVeg: true,
    tags: ["comfort-food", "grilled", "cheesy"],
    popularityTag: "Bestseller",
    preparationTime: 12,
    isAvailable: true,
  },
  {
    name: "Bread Sandwich",
    description: "Mumbai-style double-decker with potato bhaji, cheese slice, raw onion, and green chutney between soft white bread.",
    price: 179,
    category: "Sandwich",
    image: img("1539252554453-80ab65ce3586"),
    restaurantName: "Steam Room",
    restaurantArea: "Sector 18, Noida",
    restaurantRating: 4.4,
    isVeg: true,
    tags: ["street-food", "mumbai-style"],
    popularityTag: "",
    preparationTime: 8,
    isAvailable: true,
  },
];

const initDatabase = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");

  await mongoose.connect(process.env.MONGODB_URI, { dbName });
  console.log(`Connected: ${dbName}`);

  await Promise.all([
    foodModel.createCollection(),
    userModel.createCollection(),
    orderModel.createCollection(),
  ]);

  await Promise.all([
    foodModel.syncIndexes(),
    userModel.syncIndexes(),
    orderModel.syncIndexes(),
  ]);

  const foodCount = await foodModel.countDocuments();
  if (foodCount === 0) {
    await foodModel.insertMany(sampleFoodItems);
    console.log(`Seeded ${sampleFoodItems.length} food items`);
  } else {
    console.log(`Food collection already has ${foodCount} items — skipping seed (run reseedFood.js to force)`);
  }

  const cols = await mongoose.connection.db.listCollections().toArray();
  console.log("Collections:", cols.map(c => c.name).sort().join(", "));

  await mongoose.disconnect();
  console.log("Done");
};

initDatabase().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
