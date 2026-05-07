import './Header.css'

const HERO_FLOATS = ['🍛', '🌮', '🍕', '🥘', '🍜', '🥙', '🧆', '🫕']

const Header = () => {
  return (
    <section className='header' aria-label="Hero">
      <div className='header-bg' aria-hidden="true">
        <div className='header-bg-overlay'></div>
        <div className='header-bg-grain'></div>
      </div>

      <div className="header-food-floats" aria-hidden="true">
        {HERO_FLOATS.map((e, i) => (
          <span
            key={i}
            className="hero-float-item"
            style={{
              left: `${55 + (i * 6.2) % 40}%`,
              top: `${8 + (i * 11.3) % 80}%`,
              fontSize: `${24 + (i * 7) % 28}px`,
              animationDelay: `${-i * 1.2}s`,
              animationDuration: `${5 + (i * 0.9) % 5}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className='header-contents'>
        <p className='header-eyebrow'>
          <span className="eyebrow-dot" />
          Delhi ka No.1 Hunger Fix
        </p>
        <h1 className='header-headline'>
          Bhook lagi?
          <em>Karo Order.</em>
        </h1>
        <p className='header-subtext'>
          Butter chicken, momos, biryani — jo bhi mann kare,
          tere darwaze tak garam garam. No jaddo, no drama. Bas feast.
        </p>
        <div className='header-stats'>
          <div className='stat'>
            <span className='stat-number'>30</span>
            <span className='stat-label'>min avg delivery</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>500+</span>
            <span className='stat-label'>killer restaurants</span>
          </div>
          <div className='stat-divider'></div>
          <div className='stat'>
            <span className='stat-number'>₹0</span>
            <span className='stat-label'>delivery above ₹499</span>
          </div>
        </div>
        <div className='header-actions'>
          <a href='#explore-menu' className='header-btn-primary'>
            Haan Yaar, Order Karo 🔥
          </a>
          <a href='#food-display' className='header-btn-secondary'>Menu Dekho</a>
        </div>
      </div>

      <div className='header-scroll-hint' aria-hidden="true">
        <span></span>
      </div>
    </section>
  )
}

export default Header
