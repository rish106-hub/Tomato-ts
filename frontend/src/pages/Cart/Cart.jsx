import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import getImageUrl from '../../utils/imageUrl';
import formatPrice from '../../utils/formatPrice';

const Cart = () => {

  const context = useContext(StoreContext);
  const navigate = useNavigate();

  // Read cart directly from localStorage for immediate sync
  const getCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return {};
    }
  };

  const cartItems = context?.cartItems || getCartFromLocalStorage();
  const food_list = context?.food_list || [];
  const removeFromCart = context?.removeFromCart || (() => {});
  const getTotalCartAmount = context?.getTotalCartAmount || (() => 0);
  const url = context?.url || "";
  const currency = context?.currency || "₹";
  const deliveryCharge = context?.deliveryCharge || 50;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.length > 0 ? (
          food_list.map((item, index) => {
            const itemQuantity = parseInt(cartItems[item._id]) || 0;
            if (itemQuantity > 0) {
              return (<div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={getImageUrl(url, item.image)} alt="" />
                  <p>{item.name}</p>
                  <p>{formatPrice(item.price, currency)}</p>
                  <div>{itemQuantity}</div>
                  <p>{formatPrice(item.price * itemQuantity, currency)}</p>
                  <button className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)} aria-label={`Remove ${item.name}`}>×</button>
                </div>
                <hr />
              </div>)
            }
            return null;
          })
        ) : (
          <div className="cart-empty">
            <p>Loading items...</p>
          </div>
        )}
        
        {food_list.length > 0 && Object.keys(cartItems).filter(key => parseInt(cartItems[key]) > 0).length === 0 && (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
          </div>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{formatPrice(getTotalCartAmount(), currency)}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{formatPrice(getTotalCartAmount()===0?0:deliveryCharge, currency)}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{formatPrice(getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge, currency)}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
