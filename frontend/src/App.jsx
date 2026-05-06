import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify/Verify'
import About from './pages/About/About'
import Delivery from './pages/Delivery/Delivery'
import Privacy from './pages/Privacy/Privacy'
import AdminApp from './pages/Admin/AdminApp'
import Restaurants from './pages/Restaurants/Restaurants'
import RestaurantDetail from './pages/RestaurantDetail/RestaurantDetail'

const CustomerApp = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/'         element={<Home />} />
          <Route path='/cart'     element={<Cart />} />
          <Route path='/order'    element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/verify'   element={<Verify />} />
          <Route path='/menu'     element={<Home />} />
          <Route path='/about'    element={<About />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/privacy'         element={<Privacy />} />
          <Route path='/restaurants'     element={<Restaurants />} />
          <Route path='/restaurants/:slug' element={<RestaurantDetail />} />
          <Route path='*'                element={<Home />} />
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
