import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    label:    { type: String, default: "Home" },
    street:   { type: String },
    city:     { type: String },
    state:    { type: String },
    zip:      { type: String },
    country:  { type: String, default: "India" },
}, { _id: false });

const userSchema = new mongoose.Schema({
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:      { type: String, required: true },
    phone:         { type: String, default: "" },
    role:          { type: String, enum: ["customer", "admin"], default: "customer" },
    isActive:      { type: Boolean, default: true },
    isVerified:    { type: Boolean, default: false },
    cartData:      { type: Object, default: {} },
    addresses:     { type: [addressSchema], default: [] },
    profileImage:  { type: String, default: "" },
    lastLogin:     { type: Date },
    loginCount:    { type: Number, default: 0 },
}, { minimize: false, timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
