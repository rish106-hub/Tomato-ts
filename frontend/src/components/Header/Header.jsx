import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <section className='header' aria-label="Hero">
      <div className='header-bg' aria-hidden="true">
        <div className='header-bg-overlay'></div>
        <div className='header-bg-grain'></div>
      </div>

      <div className='header-contents'>
        <p className='header-eyebrow'>Freshly cooked Indian comfort for Delhi NCR</p>
        <h1 className='header-headline'>
          When the craving hits,<br />
          <em>send for something worth smelling.</em>
        </h1>
        <p className='header-subtext'>
          Dum biryani, butter-loaded rolls, podi idlis, fiery momos and chaat that actually feels like evening in India.
          Hot, bold, familiar and built for people who know exactly what they want to eat.
        </p>
        <div className='header-stats'>
          <div className='stat'>
            <span className='stat-number'>Hot</span>
            <span className='stat-label'>served for fast cravings</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>8</span>
            <span className='stat-label'>high-craving Indian menus</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>INR</span>
            <span className='stat-label'>pricing built for India</span>
          </div>
        </div>
        <div className='header-actions'>
          <a href='#food-display' className='header-btn-primary'>Start Ordering</a>
          <a href='#explore-menu' className='header-btn-secondary'>Pick Your Mood</a>
        </div>
      </div>

      <div className='header-scroll-hint' aria-hidden="true">
        <span></span>
      </div>
    </section>
  )
}

export default Header
