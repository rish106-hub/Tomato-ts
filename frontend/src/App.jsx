import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import Verify from './pages/Verify/Verify'
import About from './pages/About/About'
import Delivery from './pages/Delivery/Delivery'
import Privacy from './pages/Privacy/Privacy'
import Restaurants from './pages/Restaurants/Restaurants'
import RestaurantDetail from './pages/RestaurantDetail/RestaurantDetail'
import AdminApp from './pages/Admin/AdminApp'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import LoginPopup from './components/LoginPopup/LoginPopup'
import FoodCursor from './components/FoodCursor/FoodCursor'
import FloatingFoods from './components/FloatingFoods/FloatingFoods'
import { StoreContext } from './Context/StoreContext'

// Only renders children if token exists, else shows login popup
const ProtectedRoute = ({ element, setShowLogin }) => {
  const { token } = useContext(StoreContext)
  if (token) return element
  setShowLogin(true)
  return <Navigate to="/" replace />
}

const CustomerApp = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <FoodCursor />
      <FloatingFoods />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/'                  element={<Home />} />
          <Route path='/menu'              element={<Home />} />
          <Route path='/about'             element={<About />} />
          <Route path='/delivery'          element={<Delivery />} />
          <Route path='/privacy'           element={<Privacy />} />
          <Route path='/restaurants'       element={<Restaurants />} />
          <Route path='/restaurants/:slug' element={<RestaurantDetail />} />
          <Route path='/verify'            element={<Verify />} />
          <Route path='/cart'     element={<ProtectedRoute element={<Cart />}     setShowLogin={setShowLogin} />} />
          <Route path='/order'    element={<ProtectedRoute element={<PlaceOrder />} setShowLogin={setShowLogin} />} />
          <Route path='/myorders' element={<ProtectedRoute element={<MyOrders />} setShowLogin={setShowLogin} />} />
          <Route path='*'                  element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

const App = () => (
  <>
    <ToastContainer />
    <Routes>
      <Route path='/admin/*' element={<AdminApp />} />
      <Route path='/*'       element={<CustomerApp />} />
    </Routes>
  </>
)

export default App
