import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import FoodItemModal from '../FoodItemModal/FoodItemModal';
import getImageUrl from '../../utils/imageUrl';
import formatPrice from '../../utils/formatPrice';

const FoodItem = ({ image, name, price, desc , id, category, restaurantName, restaurantRating, restaurantArea, popularityTag, feedback }) => {

    const [itemCount, setItemCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const context = useContext(StoreContext);
    const cartItems = context?.cartItems || {};
    const addToCart = context?.addToCart || (() => {});
    const removeFromCart = context?.removeFromCart || (() => {});
    const url = context?.url || "";
    const currency = context?.currency || "₹";

    const handleItemClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const foodItemData = {
        _id: id,
        name: name,
        price: price,
        description: desc,
        image: image,
        category: category || 'Food',
        restaurantName,
        restaurantRating,
        restaurantArea,
        popularityTag,
        feedback
    };

    return (
        <>
            <div className='food-item' onClick={handleItemClick} role="article" aria-label={`View ${name} details`}>
                <div className='food-item-img-container'>
                    <img className='food-item-image' src={getImageUrl(url, image)} alt="" />
                    {!cartItems[id] || cartItems[id] === 0
                    ?<img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="Add to cart" role="button" tabIndex={0} />
                    :<div className="food-item-counter">
                            <img src={assets.remove_icon_red} onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} alt="" />
                            <p>{cartItems[id] || 0}</p>
                            <img src={assets.add_icon_green} onClick={(e) => { e.stopPropagation(); addToCart(id); }} alt="" />
                        </div>
                    }
                </div>
                <div className="food-item-info">
                    <p className="food-item-category">{category}</p>
                    <div className="food-item-restaurant">
                        <span>{restaurantName}</span>
                        {restaurantRating ? <span>{restaurantRating} rating</span> : null}
                    </div>
                    <div className="food-item-name-rating">
                        <p>{name}</p> <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="food-item-desc">{desc}</p>
                    <p className="food-item-meta">{restaurantArea} • {popularityTag}</p>
                    <p className="food-item-price">{formatPrice(price, currency)}</p>
                </div>
            </div>
            {showModal && (
                <FoodItemModal 
                    item={foodItemData} 
                    onClose={closeModal} 
                />
            )}
        </>
    )
}

export default FoodItem
