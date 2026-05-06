import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

  const {food_list, filteredFoodList, searchQuery} = useContext(StoreContext);

  // Use filtered list if there's a search query, otherwise use original list
  const displayList = searchQuery.trim() ? filteredFoodList : food_list;
  const visibleItems = displayList.filter((item) => category === "All" || category === item.category);

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-header'>
        <p className="food-display-kicker">{category === "All" ? "Tonight's strongest sellers" : `${category} that converts fast`}</p>
        <h2 className="food-display-title">
          {category === "All" ? "High-hunger dishes with Indian flavour cues front and center." : `${category} worth ordering before you overthink it.`}
        </h2>
      </div>
      <div className='food-display-list'>
        {visibleItems.length > 0 ? (
          visibleItems.map((item)=>(
            <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} category={item.category}/>
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
