import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const run = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  const imagePath = path.resolve(__dirname, "../../frontend/src/assets/Chicken roll.jpeg");
  const imageBuffer = await fs.readFile(imagePath);
  const imageBase64 = imageBuffer.toString("base64");
  const imageDataUri = `data:image/jpeg;base64,${imageBase64}`;

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME || "tomato",
  });

  const result = await foodModel.updateMany(
    { name: { $regex: "^Chicken Roll(s)?$", $options: "i" } },
    { $set: { image: imageDataUri } }
  );

  console.log(`Matched ${result.matchedCount}, updated ${result.modifiedCount} Chicken Roll item(s).`);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("Failed to sync Chicken Roll image:", error);
  await mongoose.disconnect();
  process.exit(1);
});
