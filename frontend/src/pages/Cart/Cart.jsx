import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import getImageUrl from '../../utils/imageUrl'
import formatPrice from '../../utils/formatPrice'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, currency, deliveryCharge } = useContext(StoreContext)
  const navigate = useNavigate()

  const cartEntries = food_list.filter(item => (cartItems[item._id] || 0) > 0)
  const subtotal = getTotalCartAmount()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p><p>Title</p><p>Price</p><p>Quantity</p><p>Total</p><p>Remove</p>
        </div>
        <br /><hr />
        {cartEntries.length === 0 ? (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
          </div>
        ) : cartEntries.map((item) => (
          <div key={item._id}>
            <div className="cart-items-title cart-items-item">
              <img src={getImageUrl(url, item.image)} alt={item.name} />
              <p>{item.name}</p>
              <p>{formatPrice(item.price, currency)}</p>
              <div>{cartItems[item._id]}</div>
              <p>{formatPrice(item.price * cartItems[item._id], currency)}</p>
              <button className='cart-items-remove-icon' onClick={() => removeFromCart(item._id)} aria-label={`Remove ${item.name}`}>×</button>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{formatPrice(subtotal, currency)}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{formatPrice(subtotal === 0 ? 0 : deliveryCharge, currency)}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{formatPrice(subtotal === 0 ? 0 : subtotal + deliveryCharge, currency)}</b></div>
          </div>
          <button onClick={() => navigate('/order')} disabled={subtotal === 0}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Have a promo code?</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Enter promo code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
