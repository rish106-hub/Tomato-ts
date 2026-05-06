import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import couponModel from "../models/couponModel.js";
import crypto from "crypto";

const deliveryCharge = 50;
const frontend_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const EASEBUZZ_KEY = process.env.EASEBUZZ_KEY;
const EASEBUZZ_SALT = process.env.EASEBUZZ_SALT;
const EASEBUZZ_BASE_URL = process.env.EASEBUZZ_BASE_URL || 'https://testpay.easebuzz.in';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5002';

const generateHash = ({ key, txnid, amount, productinfo, firstname, email, salt }) => {
    const str = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}||||||||||${salt}`;
    return crypto.createHash('sha512').update(str).digest('hex');
};

const verifyResponseHash = ({ salt, status, email, firstname, productinfo, amount, txnid, key }) => {
    const str = `${salt}|${status}|||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    return crypto.createHash('sha512').update(str).digest('hex');
};

// Validate and apply coupon — returns discount amount
const applyCoupon = async (code, orderAmount) => {
    if (!code) return { discount: 0, coupon: null };
    const coupon = await couponModel.findOne({
        code: code.toUpperCase(),
        isActive: true,
        expiresAt: { $gt: new Date() },
        $or: [{ usageLimit: 0 }, { $expr: { $lt: ["$usedCount", "$usageLimit"] } }]
    });
    if (!coupon) return { discount: 0, coupon: null, error: "Invalid or expired promo code" };
    if (orderAmount < coupon.minOrderAmount) {
        return { discount: 0, coupon: null, error: `Minimum order ₹${coupon.minOrderAmount} required for this code` };
    }

    let discount = coupon.discountType === "percent"
        ? (orderAmount * coupon.discountValue) / 100
        : coupon.discountValue;

    if (coupon.maxDiscount > 0) discount = Math.min(discount, coupon.maxDiscount);
    discount = Math.floor(discount);
    return { discount, coupon };
};

const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, promoCode } = req.body;

        const { discount, coupon, error } = await applyCoupon(promoCode, amount);
        if (error) return res.json({ success: false, message: error });

        const finalAmount = Math.max(0, amount - discount) + deliveryCharge;

        const newOrder = new orderModel({
            userId: req.body.userId,
            items,
            amount: finalAmount,
            address,
            paymentMethod: "easebuzz",
            promoCode: coupon?.code || "",
            discount,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        if (coupon) await couponModel.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });

        const txnid = newOrder._id.toString();
        const amountStr = parseFloat(finalAmount).toFixed(2);
        const productinfo = "Food Order";
        const firstname = address.firstName;
        const email = address.email;
        const phone = address.phone;

        const hash = generateHash({ key: EASEBUZZ_KEY, txnid, amount: amountStr, productinfo, firstname, email, salt: EASEBUZZ_SALT });

        res.json({
            success: true,
            payment_data: {
                key: EASEBUZZ_KEY, txnid, amount: amountStr, productinfo,
                firstname, email, phone, hash,
                surl: `${BACKEND_URL}/api/order/easebuzz-callback`,
                furl: `${BACKEND_URL}/api/order/easebuzz-callback`,
            },
            payment_url: `${EASEBUZZ_BASE_URL}/pay/v2/request`,
        });
    } catch (error) {
        console.error("placeOrder:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

const easebuzzCallback = async (req, res) => {
    try {
        const { status, txnid, amount, productinfo, firstname, email, hash } = req.body;

        const computedHash = verifyResponseHash({
            salt: EASEBUZZ_SALT, status, email, firstname,
            productinfo, amount, txnid, key: EASEBUZZ_KEY,
        });

        if (computedHash === hash && status === 'success') {
            await orderModel.findByIdAndUpdate(txnid, { payment: true, paymentId: txnid });
            return res.redirect(`${frontend_URL}/verify?success=true&orderId=${txnid}`);
        }

        await orderModel.findByIdAndDelete(txnid);
        res.redirect(`${frontend_URL}/verify?success=false&orderId=${txnid}`);
    } catch (error) {
        console.error("easebuzzCallback:", error);
        res.redirect(`${frontend_URL}/verify?success=false&orderId=unknown`);
    }
};

const placeOrderCod = async (req, res) => {
    try {
        const { items, amount, address, promoCode } = req.body;

        const { discount, coupon, error } = await applyCoupon(promoCode, amount);
        if (error) return res.json({ success: false, message: error });

        const finalAmount = Math.max(0, amount - discount) + deliveryCharge;

        const newOrder = new orderModel({
            userId: req.body.userId,
            items,
            amount: finalAmount,
            address,
            payment: true,
            paymentMethod: "cod",
            promoCode: coupon?.code || "",
            discount,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        if (coupon) await couponModel.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.error("placeOrderCod:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ createdAt: -1 }).lean();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("listOrders:", error);
        res.json({ success: false, message: "Error" });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }).sort({ createdAt: -1 }).lean();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("userOrders:", error);
        res.json({ success: false, message: "Error" });
    }
};

const updateStatus = async (req, res) => {
    try {
        const update = { status: req.body.status };
        if (req.body.status === 'Delivered') update.deliveredAt = new Date();
        if (req.body.status === 'Cancelled') {
            update.cancelledAt = new Date();
            update.cancelReason = req.body.cancelReason || '';
        }
        await orderModel.findByIdAndUpdate(req.body.orderId, update);
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("updateStatus:", error);
        res.json({ success: false, message: "Error" });
    }
};

// Validate coupon without placing order (for cart page)
const validateCoupon = async (req, res) => {
    try {
        const { code, amount } = req.body;
        const { discount, error } = await applyCoupon(code, amount);
        if (error) return res.json({ success: false, message: error });
        res.json({ success: true, discount });
    } catch (error) {
        res.json({ success: false, message: "Error validating coupon" });
    }
};

export { placeOrder, easebuzzCallback, listOrders, userOrders, updateStatus, placeOrderCod, validateCoupon };
