import express from 'express';
import authMiddleware from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import { listOrders, placeOrder, easebuzzCallback, updateStatus, userOrders, placeOrderCod, validateCoupon } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/placecod", authMiddleware, placeOrderCod);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/easebuzz-callback", easebuzzCallback);
orderRouter.post("/validate-coupon", authMiddleware, validateCoupon);

export default orderRouter;
