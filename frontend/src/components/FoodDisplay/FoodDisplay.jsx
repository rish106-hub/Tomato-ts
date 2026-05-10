import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const CATEGORY_COPY = {
  All: {
    kicker: "🍽️ Jhatpat Order Kar",
    title: "Jo Delhi order karti hai — sab yahan. Teri bhook ka jawab.",
  },
  Salad: {
    kicker: "🥗 Fresh Kata, Feast Jaisa",
    title: "Crisp, fresh, loaded — healthy ka excuse nahi, yeh toh feast hai.",
  },
  Rolls: {
    kicker: "🌯 Roll Pe Roll!",
    title: "Egg roll, paneer roll, chicken roll — haath mein lo, muh mein daalo. Aur kya chahiye bhai?",
  },
  Deserts: {
    kicker: "🍮 Meetha Khao, Khush Raho",
    title: "Khana kha liya? Reward toh banta hai. Ek meetha aur le lo.",
  },
  Sandwich: {
    kicker: "🥪 Grilled. Loaded. Garam.",
    title: "Tawa grilled, loaded, garam — canteen wali nahi hai yeh bhai. Next level stuff.",
  },
  Cake: {
    kicker: "🎂 Cake Toh Banta Hai",
    title: "Birthday ho ya bas craving — slice ka time aa gaya hai.",
  },
  "Pure Veg": {
    kicker: "🌿 100% Shakahari, 100% Fire",
    title: "Veg hone ka matlab boring nahi hota. Ye dishes prove karti hain.",
  },
  Pasta: {
    kicker: "🍝 Pasta Bhai Pasta",
    title: "Italian vibes, desi stomach. Creamy, cheesy, loaded — bilkul tere liye bana hai.",
  },
  Noodles: {
    kicker: "🍜 Noodle Life Choose Kiya",
    title: "Hakka, chowmein, schezwan — har mood ke liye ek noodle. Utha fork, shuru ho jaa.",
  },
}

const FoodDisplay = ({category}) => {

  const {food_list, filteredFoodList, searchQuery} = useContext(StoreContext);

  const displayList = searchQuery.trim() ? filteredFoodList : food_list;
  const visibleItems = displayList.filter((item) => category === "All" || category === item.category);
  const copy = CATEGORY_COPY[category] || {
    kicker: `🔥 ${category} — Bilkul Sahi Choice`,
    title: `${category} jo ghar pe bana nahi sakta — isliye hum hain. Garam garam order kar.`,
  }

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-header'>
        <p className="food-display-kicker">{copy.kicker}</p>
        <h2 className="food-display-title">{copy.title}</h2>
      </div>
      <div className='food-display-list'>
        {visibleItems.length > 0 ? (
          visibleItems.map((item)=>(
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
          ))
        ) : (
          <div className="no-results">
            <p>No dishes found for this craving.</p>
            <p>Try searching for biryani, momos, rolls, chaat or switch back to all items.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
