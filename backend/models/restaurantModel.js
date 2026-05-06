import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name:          { type: String, required: true, trim: true },
    slug:          { type: String, required: true, unique: true },
    area:          { type: String, required: true },
    city:          { type: String, default: "Delhi" },
    cuisines:      { type: [String], default: [] },
    coverImage:    { type: String, default: "" },
    rating:        { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount:  { type: Number, default: 0 },
    priceForTwo:   { type: Number, default: 400 },
    eta:           { type: String, default: "30-40 min" },
    badge:         { type: String, default: "" },
    menuHighlights:{ type: [String], default: [] },
    isActive:      { type: Boolean, default: true },
    openingTime:   { type: String, default: "10:00" },
    closingTime:   { type: String, default: "23:00" },
    phone:         { type: String, default: "" },
    address:       { type: String, default: "" },
}, { timestamps: true });

restaurantSchema.index({ slug: 1 });
restaurantSchema.index({ area: 1, isActive: 1 });
restaurantSchema.index({ name: "text", area: "text" });

const restaurantModel = mongoose.models.restaurant || mongoose.model("restaurant", restaurantSchema);
export default restaurantModel;
