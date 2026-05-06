import dotenv from "dotenv";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

dotenv.config();

const dbName = process.env.MONGODB_DB_NAME || "tomato";

const sampleFoodItems = [
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing",
    price: 100,
    category: "Salad",
    image: "caesar_salad.jpg",
  },
  {
    name: "Greek Salad",
    description: "Mediterranean salad with feta cheese, olives, tomatoes, and cucumbers",
    price: 200,
    category: "Salad",
    image: "greek_salad.jpg",
  },
  {
    name: "Chicken Roll",
    description: "Grilled chicken with lettuce and tomato in a soft tortilla wrap",
    price: 600,
    category: "Rolls",
    image: "chicken_roll.jpg",
  },
  {
    name: "Veggie Roll",
    description: "Fresh vegetables with hummus in a whole wheat wrap",
    price: 300,
    category: "Rolls",
    image: "veggie_roll.jpg",
  },
  {
    name: "Chocolate Cake",
    description: "Decadent chocolate cake with rich frosting",
    price: 400,
    category: "Cake",
    image: "chocolate_cake.jpg",
  },
  {
    name: "Cheesecake",
    description: "New York style cheesecake with berry topping",
    price: 500,
    category: "Cake",
    image: "cheesecake.jpg",
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce, nuts, and cherry",
    price: 450,
    category: "Deserts",
    image: "ice_cream_sundae.jpg",
  },
  {
    name: "Brownie",
    description: "Warm chocolate brownie with vanilla ice cream",
    price: 120,
    category: "Deserts",
    image: "brownie.jpg",
  },
  {
    name: "Club Sandwich",
    description: "Triple-decker sandwich with turkey, bacon, lettuce, and tomato",
    price: 800,
    category: "Sandwich",
    image: "club_sandwich.jpg",
  },
  {
    name: "Grilled Cheese",
    description: "Classic grilled cheese sandwich with tomato soup",
    price: 600,
    category: "Sandwich",
    image: "grilled_cheese.jpg",
  },
  {
    name: "Spaghetti Carbonara",
    description: "Italian pasta with bacon, eggs, and parmesan cheese",
    price: 1200,
    category: "Pasta",
    image: "spaghetti_carbonara.jpg",
  },
  {
    name: "Penne Arrabiata",
    description: "Spicy penne pasta with garlic, tomatoes, and chili peppers",
    price: 1100,
    category: "Pasta",
    image: "penne_arrabiata.jpg",
  },
  {
    name: "Vegetable Noodles",
    description: "Stir-fried noodles with mixed vegetables and soy sauce",
    price: 900,
    category: "Noodles",
    image: "vegetable_noodles.jpg",
  },
  {
    name: "Chicken Noodles",
    description: "Stir-fried noodles with chicken and vegetables",
    price: 1000,
    category: "Noodles",
    image: "chicken_noodles.jpg",
  },
  {
    name: "Mixed Veg Platter",
    description: "Assorted fresh vegetables with dip",
    price: 700,
    category: "Pure Veg",
    image: "mixed_veg_platter.jpg",
  },
  {
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices and herbs",
    price: 900,
    category: "Pure Veg",
    image: "paneer_tikka.jpg",
  },
];

const initDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(process.env.MONGODB_URI, { dbName });
  console.log(`Connected to MongoDB database: ${dbName}`);

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
    console.log(`Food collection already has ${foodCount} items; skipping seed`);
  }

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("Collections:", collections.map((collection) => collection.name).sort().join(", "));

  await mongoose.disconnect();
  console.log("Database initialization complete");
};

initDatabase().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
