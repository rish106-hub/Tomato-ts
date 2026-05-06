import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import orderModel from '../models/orderModel.js';
import foodModel from '../models/foodModel.js';
import userModel from '../models/userModel.js';
import couponModel from '../models/couponModel.js';

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tomato.com';
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
    const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD;

    if (email !== ADMIN_EMAIL) {
        return res.json({ success: false, message: 'Invalid credentials' });
    }

    let passwordValid = false;

    // Use bcrypt hash if set, fallback to plaintext env var for initial setup
    if (ADMIN_PASSWORD_HASH) {
        passwordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    } else if (ADMIN_PASSWORD_PLAIN) {
        passwordValid = password === ADMIN_PASSWORD_PLAIN;
    } else {
        return res.status(500).json({ success: false, message: 'Admin credentials not configured' });
    }

    if (!passwordValid) {
        return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ role: 'admin', email: ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ success: true, token });
};

const adminStats = async (req, res) => {
    try {
        const [orders, menuItems, totalUsers, activeCoupons] = await Promise.all([
            orderModel.find({}).lean(),
            foodModel.countDocuments({ isAvailable: true }),
            userModel.countDocuments({ isActive: true }),
            couponModel.countDocuments({ isActive: true, expiresAt: { $gt: new Date() } }),
        ]);

        const paidOrders = orders.filter(o => o.payment);
        const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
        const avgOrderValue = paidOrders.length ? totalRevenue / paidOrders.length : 0;

        // Revenue last 7 days
        const now = new Date();
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        const recentRevenue = paidOrders
            .filter(o => new Date(o.createdAt) > weekAgo)
            .reduce((sum, o) => sum + o.amount, 0);

        res.json({
            success: true,
            data: {
                totalOrders: orders.length,
                paidOrders: paidOrders.length,
                totalRevenue,
                avgOrderValue: Math.round(avgOrderValue),
                recentRevenue,
                pendingOrders: orders.filter(o => o.status === 'Food Processing').length,
                outForDelivery: orders.filter(o => o.status === 'Out for delivery').length,
                delivered: orders.filter(o => o.status === 'Delivered').length,
                cancelled: orders.filter(o => o.status === 'Cancelled').length,
                menuItems,
                totalUsers,
                activeCoupons,
            }
        });
    } catch (error) {
        console.error('adminStats:', error);
        res.json({ success: false, message: 'Error fetching stats' });
    }
};

const listUsers = async (req, res) => {
    try {
        const [users, orders] = await Promise.all([
            userModel.find({}).select('-password -cartData').lean(),
            orderModel.find({}).lean()
        ]);

        const ordersByUser = orders.reduce((acc, o) => {
            const key = o.userId.toString();
            if (!acc[key]) acc[key] = { count: 0, spent: 0 };
            acc[key].count += 1;
            if (o.payment) acc[key].spent += o.amount;
            return acc;
        }, {});

        const enriched = users.map(u => ({
            _id: u._id,
            name: u.name,
            email: u.email,
            phone: u.phone || '',
            role: u.role,
            isActive: u.isActive,
            createdAt: u.createdAt,
            lastLogin: u.lastLogin,
            orderCount: ordersByUser[u._id.toString()]?.count || 0,
            totalSpent: ordersByUser[u._id.toString()]?.spent || 0
        }));

        res.json({ success: true, data: enriched });
    } catch (error) {
        console.error('listUsers:', error);
        res.json({ success: false, message: 'Error fetching users' });
    }
};

const toggleUserStatus = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) return res.json({ success: false, message: 'User not found' });
        user.isActive = !user.isActive;
        await user.save();
        res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'suspended'}` });
    } catch (error) {
        console.error('toggleUserStatus:', error);
        res.json({ success: false, message: 'Error updating user' });
    }
};

// Coupon management
const listCoupons = async (req, res) => {
    try {
        const coupons = await couponModel.find({}).sort({ createdAt: -1 }).lean();
        res.json({ success: true, data: coupons });
    } catch (error) {
        res.json({ success: false, message: 'Error fetching coupons' });
    }
};

const addCoupon = async (req, res) => {
    try {
        const { code, discountType, discountValue, minOrderAmount, maxDiscount, usageLimit, expiresAt, description } = req.body;
        if (!code || !discountValue || !expiresAt) {
            return res.json({ success: false, message: 'code, discountValue and expiresAt are required' });
        }
        const coupon = new couponModel({ code, discountType, discountValue, minOrderAmount, maxDiscount, usageLimit, expiresAt, description });
        await coupon.save();
        res.json({ success: true, message: 'Coupon created', data: coupon });
    } catch (error) {
        if (error.code === 11000) return res.json({ success: false, message: 'Coupon code already exists' });
        res.json({ success: false, message: 'Error creating coupon' });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        await couponModel.findByIdAndDelete(req.body.couponId);
        res.json({ success: true, message: 'Coupon deleted' });
    } catch (error) {
        res.json({ success: false, message: 'Error deleting coupon' });
    }
};

export { adminLogin, adminStats, listUsers, toggleUserStatus, listCoupons, addCoupon, deleteCoupon };
