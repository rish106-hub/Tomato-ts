import React, { useState, useContext, useEffect } from 'react'
import './RestaurantSidebar.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import formatPrice from '../../utils/formatPrice'

const RestaurantSidebar = ({ restaurant, onClose }) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(false)

  const { url, token, currency } = useContext(StoreContext)

  useEffect(() => {
    fetchRestaurantReviews()
  }, [restaurant._id])

  const fetchRestaurantReviews = async () => {
    setLoadingReviews(true)
    try {
      const response = await axios.get(
        `${url}/api/review/get?targetType=restaurant&targetId=${restaurant._id}`
      )
      if (response.data.success) {
        const reviews = response.data.reviews || response.data.data || []
        setReviews(reviews)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleSubmitReview = async () => {
    if (!token) {
      alert('Please login to submit a review')
      return
    }

    if (!reviewComment.trim()) {
      alert('Please write a comment')
      return
    }

    setSubmittingReview(true)
    try {
      const response = await axios.post(
        `${url}/api/review/add`,
        {
          targetType: 'restaurant',
          targetId: restaurant._id,
          rating: reviewRating,
          comment: reviewComment
        },
        { headers: { token } }
      )

      if (response.data.success) {
        setReviewComment('')
        setReviewRating(5)
        setShowReviewForm(false)
        await fetchRestaurantReviews()
        alert('Review submitted successfully!')
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
      alert('Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }

  return (
    <div className="restaurant-sidebar-overlay" onClick={onClose}>
      <div className="restaurant-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>{restaurant.restaurantName}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="sidebar-content">
          <div className="restaurant-info">
            <div className="info-row">
              <span className="label">Area:</span>
              <span className="value">{restaurant.area}</span>
            </div>
            <div className="info-row">
              <span className="label">Cuisines:</span>
              <span className="value">
                {restaurant.cuisines?.join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Rating:</span>
              <span className="value rating">{restaurant.avgRating?.toFixed(1) || 'N/A'} ⭐</span>
            </div>
            <div className="info-row">
              <span className="label">Avg Price:</span>
              <span className="value">{formatPrice(restaurant.avgPrice, currency)}</span>
            </div>
            {restaurant.deliveryTime && (
              <div className="info-row">
                <span className="label">Delivery Time:</span>
                <span className="value">{restaurant.deliveryTime} mins</span>
              </div>
            )}
          </div>

          {restaurant.description && (
            <div className="restaurant-description">
              <h3>About</h3>
              <p>{restaurant.description}</p>
            </div>
          )}

          {!showReviewForm && (
            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
              Write a Review
            </button>
          )}

          {showReviewForm && (
            <div className="review-form">
              <h3>Share Your Experience</h3>
              <div className="review-rating">
                <label>Rating:</label>
                <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>
              <div className="review-comment">
                <label>Comment:</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell others about your experience..."
                  maxLength={500}
                />
                <small>{reviewComment.length}/500</small>
              </div>
              <div className="review-actions">
                <button
                  className="submit-review-btn"
                  onClick={handleSubmitReview}
                  disabled={submittingReview}
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  className="cancel-review-btn"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {loadingReviews && <p className="loading-text">Loading reviews...</p>}

          {reviews.length > 0 && (
            <div className="reviews-section">
              <h3>Reviews ({reviews.length})</h3>
              <div className="reviews-list">
                {reviews.slice(0, 5).map((review, idx) => (
                  <div key={idx} className="review-card">
                    <div className="review-header">
                      <span className="rating">{review.rating} ⭐</span>
                      <span className="date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RestaurantSidebar
