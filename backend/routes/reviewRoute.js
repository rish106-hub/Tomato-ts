import express from 'express';
import { getReviews, addReview, getRestaurantsByFood, getAverageRating } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.get('/get', getReviews);
reviewRouter.post('/add', authMiddleware, addReview);
reviewRouter.get('/restaurants-by-food/:foodId', getRestaurantsByFood);
reviewRouter.get('/average-rating', getAverageRating);

export default reviewRouter;
