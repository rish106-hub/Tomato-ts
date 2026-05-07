import reviewModel from '../models/reviewModel.js';
import foodModel from '../models/foodModel.js';

// Get reviews for a specific food or restaurant
const getReviews = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;
    
    if (!targetType || !targetId) {
      return res.json({ success: false, message: "targetType and targetId required" });
    }
    
    if (!['food', 'restaurant'].includes(targetType)) {
      return res.json({ success: false, message: "Invalid targetType" });
    }
    
    const reviews = await reviewModel
      .find({ targetType, targetId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching reviews" });
  }
};

// Add or update a review
const addReview = async (req, res) => {
  try {
    const { targetType, targetId, rating, comment } = req.body;
    const userId = req.body.userId || req.headers.token;
    
    if (!userId || !targetType || !targetId || !rating) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    
    if (![1, 2, 3, 4, 5].includes(Number(rating))) {
      return res.json({ success: false, message: "Rating must be 1-5" });
    }
    
    // Check if user already reviewed this
    const existing = await reviewModel.findOne({
      userId,
      targetType,
      targetId
    });
    
    if (existing) {
      // Update existing review
      existing.rating = rating;
      existing.comment = comment || '';
      existing.updatedAt = Date.now();
      await existing.save();
      return res.json({ success: true, message: "Review updated", data: existing });
    }
    
    // Create new review
    const review = new reviewModel({
      userId,
      targetType,
      targetId,
      rating,
      comment: comment || ''
    });
    
    await review.save();
    res.json({ success: true, message: "Review added", data: review });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding review" });
  }
};

// Get restaurants selling a specific food
const getRestaurantsByFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    
    // Find the food item
    const food = await foodModel.findById(foodId).lean();
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }
    
    // Find all restaurants that sell this food (by restaurantName)
    const foods = await foodModel
      .find({ name: food.name })
      .lean();
    
    // Get unique restaurants
    const restaurantsMap = new Map();
    foods.forEach(f => {
      if (!restaurantsMap.has(f.restaurantName)) {
        restaurantsMap.set(f.restaurantName, {
          restaurantName: f.restaurantName,
          restaurantArea: f.restaurantArea,
          restaurantRating: f.restaurantRating,
          restaurantSlug: f.slug || f.restaurantName.toLowerCase().replace(/\s+/g, '-'),
          foodsCount: 0,
          avgPrice: 0
        });
      }
      const rest = restaurantsMap.get(f.restaurantName);
      rest.foodsCount++;
      rest.avgPrice += f.price;
    });
    
    // Calculate average prices
    restaurantsMap.forEach(rest => {
      rest.avgPrice = Math.round(rest.avgPrice / rest.foodsCount);
    });
    
    // Sort by rating descending
    const restaurants = Array.from(restaurantsMap.values())
      .sort((a, b) => b.restaurantRating - a.restaurantRating);
    
    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching restaurants" });
  }
};

// Get average rating for food or restaurant
const getAverageRating = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;
    
    if (!targetType || !targetId) {
      return res.json({ success: false, message: "targetType and targetId required" });
    }
    
    const reviews = await reviewModel.find({ targetType, targetId });
    
    if (reviews.length === 0) {
      return res.json({ success: true, data: { averageRating: 0, totalReviews: 0 } });
    }
    
    const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    
    res.json({ success: true, data: { averageRating: parseFloat(avgRating), totalReviews: reviews.length } });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error calculating rating" });
  }
};

export { getReviews, addReview, getRestaurantsByFood, getAverageRating };
