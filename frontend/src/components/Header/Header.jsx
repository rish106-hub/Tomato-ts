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
        <h1 className='header-headline'>Delhi NCR Eats Hard.</h1>
        <p className='header-subtext'>Hot cravings solved across NCR tonight.</p>
        <div className='header-stats'>
          <div className='stat'>
            <span className='stat-number'>Hot</span>
            <span className='stat-label'>packed for Delhi NCR runs</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>8</span>
            <span className='stat-label'>NCR-first comfort menus</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>NCR</span>
            <span className='stat-label'>copy tuned to local cravings</span>
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
