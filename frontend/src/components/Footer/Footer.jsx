import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Footer = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <span className="footer-brand-wordmark">crave</span>
            <p>Indian comfort food for real city cravings, from biryani dinners to late-night momos and proper chaat fixes.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Explore</h2>
            <ul>
                <li onClick={() => handleNavigation('/')}>Home</li>
                <li onClick={() => handleNavigation('/about')}>About us</li>
                <li onClick={() => handleNavigation('/delivery')}>Delivery</li>
                <li onClick={() => handleNavigation('/privacy')}>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Support</h2>
            <ul>
                <li>+91 98765 43210</li>
                <li>hello@cravefood.in</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © Crave Food Delivery India. All rights reserved.</p>
    </div>
  )
}

export default Footer
