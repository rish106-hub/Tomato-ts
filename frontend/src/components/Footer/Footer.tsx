import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleSocialLink = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: 'https://www.facebook.com',
      twitter: 'https://www.twitter.com',
      linkedin: 'https://www.linkedin.com'
    };
    window.open(urls[platform], '_blank');
  };

  const handleContact = () => {
    window.location.href = 'mailto:rishavdewan10@gmail.com';
  };

  const handlePhone = () => {
    window.location.href = 'tel:+91-98765-43210';
  };

  return (
    <footer className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <span className="footer-brand-wordmark">crave</span>
          <p>Garma garam butter chicken, crispy momos, smoking hot biryani — 30 min mein ghar tak. Feed your craving.</p>
          <div className="footer-social-icons">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              onClick={() => handleSocialLink('facebook')}
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              onClick={() => handleSocialLink('twitter')}
            />
            <img
              src={assets.linkedin_icon}
              alt="LinkedIn"
              onClick={() => handleSocialLink('linkedin')}
            />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li onClick={() => handleNavigation('/')}>Home</li>
            <li onClick={() => handleNavigation('/about')}>About us</li>
            <li onClick={() => handleNavigation('/delivery')}>Delivery</li>
            <li onClick={() => handleNavigation('/privacy')}>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li onClick={handlePhone}>+91 98765 43210</li>
            <li onClick={handleContact}>rishavdewan10@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © Crave — All rights reserved.</p>
    </footer>
  );
};

export default Footer;
