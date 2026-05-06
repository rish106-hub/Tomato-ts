import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code:           { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType:   { type: String, enum: ["percent", "flat"], default: "percent" },
    discountValue:  { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscount:    { type: Number, default: 0 },  // cap for percent type; 0 = no cap
    usageLimit:     { type: Number, default: 0 },   // 0 = unlimited
    usedCount:      { type: Number, default: 0 },
    isActive:       { type: Boolean, default: true },
    expiresAt:      { type: Date, required: true },
    description:    { type: String, default: "" },
}, { timestamps: true });

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, expiresAt: 1 });

const couponModel = mongoose.models.coupon || mongoose.model("coupon", couponSchema);
export default couponModel;
