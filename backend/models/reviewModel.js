import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  targetType: {
    type: String,
    enum: ['food', 'restaurant'],
    required: true,
    index: true
  },
  targetId: {
    type: String,  // food._id or restaurant ID
    required: true,
    index: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

// Compound index for querying reviews by target
reviewSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });
// Index for user reviews
reviewSchema.index({ userId: 1, createdAt: -1 });

const reviewModel = mongoose.model('Review', reviewSchema);

export default reviewModel;
