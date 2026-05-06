import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({ onLogout }) => {
    return (
        <div className='navbar'>
            <span className='admin-logo-wordmark'>crave</span>
            <div className='navbar-right'>
                <span className='navbar-admin-label'>Admin Panel</span>
                <button className='logout-btn' onClick={onLogout}>Logout</button>
                <img className='profile' src={assets.profile_image} alt="" />
            </div>
        </div>
    )
}

export default Navbar
