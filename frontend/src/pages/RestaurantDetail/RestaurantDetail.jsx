import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem'
import getImageUrl from '../../utils/imageUrl'
import formatPrice from '../../utils/formatPrice'
import './RestaurantDetail.css'

const RestaurantDetail = () => {
  const { slug } = useParams()
  const context = useContext(StoreContext)
  const restaurants = context?.restaurants || []
  const url = context?.url || ''
  const currency = context?.currency || 'INR'
  const restaurant = restaurants.find((entry) => entry.slug === slug)

  if (!restaurant) {
    return (
      <div className='restaurant-detail restaurant-detail-empty'>
        <h1>Restaurant not found.</h1>
        <Link to='/restaurants'>Back to restaurants</Link>
      </div>
    )
  }

  return (
    <div className='restaurant-detail'>
      <section className='restaurant-detail-hero'>
        <div className='restaurant-detail-image'>
          <img src={getImageUrl(url, restaurant.coverImage)} alt={restaurant.name} />
        </div>
        <div className='restaurant-detail-copy'>
          <p className='restaurant-detail-kicker'>{restaurant.area}</p>
          <h1>{restaurant.name}</h1>
          <p className='restaurant-detail-description'>{restaurant.description}</p>
          <div className='restaurant-detail-meta'>
            <span>{restaurant.rating} rating</span>
            <span>{restaurant.reviewsCount} reviews</span>
            <span>{restaurant.eta}</span>
            <span>{formatPrice(restaurant.priceForTwo, currency)} for two</span>
          </div>
          <div className='restaurant-detail-tags'>
            {restaurant.cuisines.map((cuisine) => <span key={cuisine}>{cuisine}</span>)}
          </div>
          <p className='restaurant-detail-note'>{restaurant.deliveryFee} • {restaurant.openUntil}</p>
        </div>
      </section>

      <section className='restaurant-detail-feedback'>
        <div className='restaurant-detail-feedback-copy'>
          <p className='restaurant-detail-kicker'>Feedback</p>
          <h2>What diners keep repeating.</h2>
        </div>
        <div className='restaurant-feedback-list'>
          {restaurant.feedback.map((entry) => (
            <article key={entry.name} className='restaurant-feedback-card'>
              <p>{entry.text}</p>
              <span>{entry.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section className='restaurant-detail-menu'>
        <div className='restaurant-detail-feedback-copy'>
          <p className='restaurant-detail-kicker'>Menu</p>
          <h2>{restaurant.name} is currently serving these dishes.</h2>
        </div>
        <div className='restaurant-detail-menu-grid'>
          {restaurant.items.map((item) => (
            <FoodItem
              key={item._id}
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
              category={item.category}
              restaurantName={item.restaurantName}
              restaurantRating={item.restaurantRating}
              restaurantArea={item.restaurantArea}
              popularityTag={item.popularityTag}
              feedback={item.feedback}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default RestaurantDetail
