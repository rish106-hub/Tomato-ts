import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './RestaurantShowcase.css'
import { StoreContext } from '../../Context/StoreContext'
import getImageUrl from '../../utils/imageUrl'
import formatPrice from '../../utils/formatPrice'

const RestaurantShowcase = ({ limit, showHeader = true }) => {
  const context = useContext(StoreContext)
  const restaurants = context?.restaurants || []
  const currency = context?.currency || 'INR'
  const url = context?.url || ''
  const visibleRestaurants = limit ? restaurants.slice(0, limit) : restaurants

  return (
    <section className='restaurant-showcase' id='restaurant-showcase'>
      {showHeader && (
        <div className='restaurant-showcase-header'>
          <p className='restaurant-showcase-kicker'>🔥 Hot Spots Near You</p>
          <h2 className='restaurant-showcase-title'>Delhi ke sabse fire restaurants — ek hi jagah.</h2>
          <p className='restaurant-showcase-copy'>
            Chandni Chowk ke paranthe se leke Lajpat ke momos tak — sab yahan hain.
            Ratings real hain, delivery garam hai. Tu bas order kar.
          </p>
        </div>
      )}

      <div className='restaurant-showcase-list'>
        {visibleRestaurants.map((restaurant) => (
          <Link key={restaurant.id} to={`/restaurants/${restaurant.slug}`} className='restaurant-card'>
            <div className='restaurant-card-image'>
              <img src={getImageUrl(url, restaurant.coverImage)} alt={restaurant.name} />
              <span className='restaurant-card-badge'>{restaurant.badge}</span>
            </div>
            <div className='restaurant-card-body'>
              <div className='restaurant-card-topline'>
                <div>
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.area}</p>
                </div>
                <span className='restaurant-card-rating'>{restaurant.rating}</span>
              </div>
              <p className='restaurant-card-cuisines'>{restaurant.cuisines.join(' • ')}</p>
              <div className='restaurant-card-metrics'>
                <span>{restaurant.eta}</span>
                <span>{formatPrice(restaurant.priceForTwo, currency)} for two</span>
                <span>{restaurant.reviewsCount} reviews</span>
              </div>
              <p className='restaurant-card-highlights'>{restaurant.menuHighlights.join(' • ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RestaurantShowcase
