import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

  const {food_list, filteredFoodList, searchQuery} = useContext(StoreContext);

  // Use filtered list if there's a search query, otherwise use original list
  const displayList = searchQuery.trim() ? filteredFoodList : food_list;

  return (
    <div className='food-display' id='food-display'>
      <h2 className="food-display-title">Top picks for you</h2>
      <div className='food-display-list'>
        {displayList.length > 0 ? (
          displayList.map((item)=>{
            if (category==="All" || category===item.category) {
              return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} category={item.category}/>
            }
            return null;
          })
        ) : (
          <div className="no-results">
            <p>No items found matching your search.</p>
            <p>Try searching for different keywords or browse all items.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
