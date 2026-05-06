import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:             { type: String, required: true, trim: true },
    description:      { type: String, required: true },
    price:            { type: Number, required: true, min: 0 },
    image:            { type: String, required: true },
    category:         { type: String, required: true },

    // Restaurant metadata
    restaurantName:   { type: String, default: "" },
    restaurantArea:   { type: String, default: "" },
    restaurantRating: { type: Number, default: 0, min: 0, max: 5 },

    // Item metadata
    isAvailable:      { type: Boolean, default: true },
    isVeg:            { type: Boolean, default: false },
    tags:             { type: [String], default: [] },
    popularityTag:    { type: String, default: "" },  // "Bestseller", "Must Try", "New"
    preparationTime:  { type: Number, default: 20 },  // minutes
    rating:           { type: Number, default: 0, min: 0, max: 5 },
    reviewCount:      { type: Number, default: 0 },
    discount:         { type: Number, default: 0, min: 0, max: 100 }, // percent
    sortOrder:        { type: Number, default: 0 },
}, { timestamps: true });

foodSchema.index({ category: 1, isAvailable: 1 });
foodSchema.index({ name: "text", description: "text", tags: "text" });
foodSchema.index({ restaurantName: 1 });
foodSchema.index({ popularityTag: 1 });

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
