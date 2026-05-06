import express from 'express';
import { adminLogin, adminStats, listUsers, toggleUserStatus, listCoupons, addCoupon, deleteCoupon } from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/stats', adminAuth, adminStats);
adminRouter.get('/users', adminAuth, listUsers);
adminRouter.post('/users/toggle', adminAuth, toggleUserStatus);
adminRouter.get('/coupons', adminAuth, listCoupons);
adminRouter.post('/coupons/add', adminAuth, addCoupon);
adminRouter.post('/coupons/delete', adminAuth, deleteCoupon);

export default adminRouter;
