import React, { useContext, useState, useEffect } from 'react'
import './FoodItemModal.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import getImageUrl from '../../utils/imageUrl'
import formatPrice from '../../utils/formatPrice'
import RestaurantSidebar from '../RestaurantSidebar/RestaurantSidebar'

const FoodItemModal = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  const context = useContext(StoreContext)
  const navigate = useNavigate()

  if (!context) {
    throw new Error('StoreContext must be used within StoreContextProvider')
  }

  const { addToCart, cartItems, url, currency, token } = context

  useEffect(() => {
    fetchRestaurants()
  }, [item._id])

  const fetchRestaurants = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${url}/api/review/restaurants-by-food/${item._id}`)
      if (response.data.success) {
        const restaurants = response.data.restaurants || response.data.data || []
        setRestaurants(restaurants)
      }
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
      setRestaurants([])
    } finally {
      setLoading(false)
    }
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  const handleAddToCart = async () => {
    await addToCart(item._id, quantity)
    onClose()
  }

  const handleOrderNow = async () => {
    await addToCart(item._id, quantity)
    onClose()
    navigate('/cart')
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
          targetType: 'food',
          targetId: item._id,
          rating: reviewRating,
          comment: reviewComment
        },
        { headers: { token } }
      )

      if (response.data.success) {
        setReviewComment('')
        setReviewRating(5)
        setShowReviewForm(false)
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
    <>
      <div className="food-item-modal-overlay" onClick={onClose}>
        <div className="food-item-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="modal-content">
            <div className="modal-image">
              <img src={getImageUrl(url, item.image)} alt={item.name} />
            </div>

            <div className="modal-details">
              <div className="modal-title">
                <h2>{item.name}</h2>
                <div className="modal-rating">
                  <img src={assets.rating_starts} alt="Rating" />
                </div>
              </div>

              <p className="modal-description">{item.description}</p>
              <p className="modal-category">Category: {item.category}</p>

              {item.restaurantName && (
                <div className="modal-restaurant-strip">
                  <span>{item.restaurantName}</span>
                  {item.restaurantRating ? <span>{item.restaurantRating} rating</span> : null}
                  {item.restaurantArea ? <span>{item.restaurantArea}</span> : null}
                </div>
              )}

              {item.popularityTag ? <p className="modal-popularity">{item.popularityTag}</p> : null}

              <div className="modal-price">
                <span className="price-label">Price:</span>
                <span className="price-value">{formatPrice(item.price, currency)}</span>
              </div>

              <div className="modal-quantity">
                <span className="quantity-label">Quantity:</span>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn decrease"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="quantity-btn increase" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
              </div>

              <div className="modal-total">
                <span className="total-label">Total:</span>
                <span className="total-value">{formatPrice(item.price * quantity, currency)}</span>
              </div>

              <div className="modal-actions">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="order-now-btn" onClick={handleOrderNow}>
                  Order Now
                </button>
              </div>

              {!showReviewForm && (
                <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
                  Write a Review
                </button>
              )}

              {showReviewForm && (
                <div className="review-form">
                  <h3>Share Your Feedback</h3>
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
                      placeholder="Share your experience with this dish..."
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
            </div>

            {restaurants.length > 0 && (
              <div className="modal-restaurants">
                <h3>Available at Restaurants</h3>
                <div className="restaurants-list">
                  {restaurants.map((restaurant) => (
                    <div
                      key={restaurant._id}
                      className="restaurant-card"
                      onClick={() => setSelectedRestaurant(restaurant)}
                    >
                      <div className="restaurant-card-header">
                        <h4>{restaurant.restaurantName}</h4>
                        <span className="rating">{restaurant.avgRating?.toFixed(1) || 'N/A'} ⭐</span>
                      </div>
                      <p className="area">{restaurant.area}</p>
                      <p className="price">Avg price: {formatPrice(restaurant.avgPrice, currency)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && <p className="loading-text">Loading restaurants...</p>}
          </div>
        </div>
      </div>

      {selectedRestaurant && (
        <RestaurantSidebar
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </>
  )
}

export default FoodItemModal
