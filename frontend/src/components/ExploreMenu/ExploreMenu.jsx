import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({ category, setCategory }) => {

  const { menu_list } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='explore-menu-header'>
        <h2 className='explore-menu-title'>What are you craving?</h2>
      </div>
      <div className="explore-menu-list" role="list">
        <button
          role="listitem"
          onClick={() => setCategory("All")}
          className={`explore-menu-chip ${category === "All" ? "active" : ""}`}
        >
          All
        </button>
        {menu_list.map((item, index) => (
          <button
            role="listitem"
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className={`explore-menu-chip ${category === item.menu_name ? "active" : ""}`}
          >
            {item.menu_name}
          </button>
        ))}
      </div>
      <div className='explore-menu-divider' aria-hidden="true"></div>
    </div>
  )
}

export default ExploreMenu
