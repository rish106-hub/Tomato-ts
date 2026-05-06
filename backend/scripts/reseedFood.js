/**
 * reseedFood.js — wipes food collection and inserts canonical 16-item menu.
 * Run once against production DB:
 *   node backend/scripts/reseedFood.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import { sampleFoodItems } from "./initDatabase.js";

dotenv.config();

const run = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME || "tomato",
  });
  console.log("Connected");

  const deleted = await foodModel.deleteMany({});
  console.log(`Deleted ${deleted.deletedCount} existing food items`);

  const inserted = await foodModel.insertMany(sampleFoodItems);
  console.log(`Inserted ${inserted.length} food items:`);
  inserted.forEach(f => console.log(`  [${f.category}] ${f.name} — ₹${f.price} (${f.restaurantName})`));

  await mongoose.disconnect();
  console.log("Done");
};

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
