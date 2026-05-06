import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    _id:          { type: String, required: true },
    name:         { type: String, required: true },
    price:        { type: Number, required: true },
    quantity:     { type: Number, required: true },
    image:        { type: String },
    category:     { type: String },
    restaurantName: { type: String },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId:        { type: String, required: true, index: true },
    items:         { type: [orderItemSchema], required: true },
    amount:        { type: Number, required: true, min: 0 },
    address:       { type: Object, required: true },

    // Status
    status:        {
        type: String,
        enum: ["Pending", "Food Processing", "Out for delivery", "Delivered", "Cancelled"],
        default: "Food Processing"
    },
    cancelReason:  { type: String, default: "" },
    cancelledAt:   { type: Date },
    deliveredAt:   { type: Date },
    estimatedDeliveryAt: { type: Date },

    // Payment
    payment:       { type: Boolean, default: false },
    paymentMethod: { type: String, enum: ["easebuzz", "cod", "upi", "card"], default: "cod" },
    paymentId:     { type: String, default: "" },
    refundStatus:  { type: String, enum: ["none", "requested", "processing", "processed"], default: "none" },

    // Discounts
    promoCode:     { type: String, default: "" },
    discount:      { type: Number, default: 0 },

    date:          { type: Date, default: Date.now },
}, { timestamps: true });

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1, payment: 1 });
orderSchema.index({ paymentId: 1 });

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
