import './Header.css'

const Header = () => {
  return (
    <section className='header' aria-label="Hero">
      <div className='header-bg' aria-hidden="true">
        <div className='header-bg-overlay'></div>
        <div className='header-bg-grain'></div>
      </div>

      <div className='header-contents'>
        <p className='header-eyebrow'>2 lakh+ Delhiites order with us every week</p>
        <h1 className='header-headline'>
          Delhi&apos;s hunger,<br />
          <em>answered in 30.</em>
        </h1>
        <p className='header-subtext'>
          Dal Makhani from CP. Momos from Lajpat Nagar. Biryani
          from Chandni Chowk — still garam, straight to your door.
        </p>
        <div className='header-stats'>
          <div className='stat'>
            <span className='stat-number'>30</span>
            <span className='stat-label'>min avg delivery</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>500+</span>
            <span className='stat-label'>restaurants in NCR</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>₹0</span>
            <span className='stat-label'>delivery above ₹499</span>
          </div>
        </div>
        <div className='header-actions'>
          <a href='#explore-menu' className='header-btn-primary'>Order Now</a>
          <a href='#food-display' className='header-btn-secondary'>Browse Menu</a>
        </div>
      </div>

      <div className='header-scroll-hint' aria-hidden="true">
        <span></span>
      </div>
    </section>
  )
}

export default Header
