import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import RestaurantShowcase from '../../components/RestaurantShowcase/RestaurantShowcase'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { sectionRoutes } from '../../utils/sectionRoutes'

const Home = () => {

  const [category,setCategory] = useState("All")
  const location = useLocation()

  useEffect(() => {
    const sectionId = location.hash.slice(1) || sectionRoutes[location.pathname]
    if (!sectionId) return

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash])

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
    </>
  )
}

export default Home
