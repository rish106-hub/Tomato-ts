import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, logout: ctxLogout, searchQuery, setSearchQuery } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    ctxLogout();
    navigate('/');
  };

  return (
    <nav className='navbar' aria-label="Main navigation">
      <Link to='/' className='navbar-logo' aria-label="Crave home">
        <span className='logo-wordmark'>crave</span>
      </Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <Link to='/menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
        <Link to='/restaurants' onClick={() => setMenu("restaurants")} className={menu === "restaurants" ? "active" : ""}>restaurants</Link>
        <Link to='/about' onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>about</Link>
        <Link to='/delivery' onClick={() => setMenu("delivery")} className={menu === "delivery" ? "active" : ""}>delivery</Link>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <img src={assets.search_icon} alt="" aria-hidden="true" className="search-icon" />
          <input
            type="text"
            placeholder="Search restaurants, biryani, momos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search food"
          />
        </div>

        <Link to='/cart' className='navbar-cart' aria-label="Cart">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "cart-dot" : ""}></div>
        </Link>

        {!token
          ? <button type="button" onClick={() => setShowLogin(true)} aria-haspopup="dialog">Sign in / Sign up</button>
          : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="Profile" />
              <ul className='navbar-profile-dropdown' role="menu">
                <li role="menuitem" tabIndex={0} onClick={() => navigate('/myorders')} onKeyDown={e => e.key === 'Enter' && navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                </li>
                <hr />
                <li role="menuitem" tabIndex={0} onClick={logout} onKeyDown={e => e.key === 'Enter' && logout()}>
                  <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                </li>
              </ul>
            </div>
        }
      </div>
    </nav>
  )
}

export default Navbar
