import { useEffect, useMemo } from 'react'
import './OrderSplash.css'

const FOODS = ['🍛', '🍕', '🥘', '🌮', '🍜', '🧆', '🥙', '🎉', '✨', '🥳', '🫕', '🍱']
const COLORS = ['#FF5500', '#E63946', '#FFD147', '#FF9F1C', '#FF4D6D', '#00C896']

const rand = (min, max) => min + Math.random() * (max - min)

const OrderSplash = ({ onDone }) => {
  const particles = useMemo(() => (
    Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48) * Math.PI * 2 + rand(-0.2, 0.2)
      const dist  = rand(110, 260)
      return {
        id: i,
        emoji: FOODS[i % FOODS.length],
        color: COLORS[i % COLORS.length],
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        size: rand(18, 34),
        delay: rand(0, 350),
        rot: rand(-360, 360),
        duration: rand(1600, 2400),
      }
    })
  ), [])

  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="order-splash" onClick={onDone}>
      <div className="splash-scene">
        {particles.map(p => (
          <span
            key={p.id}
            className="splash-particle"
            style={{
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              '--rot': `${p.rot}deg`,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}ms`,
              animationDuration: `${p.duration}ms`,
            }}
          >
            {p.emoji}
          </span>
        ))}

        <div className="splash-rings">
          <div className="splash-ring splash-ring--1" />
          <div className="splash-ring splash-ring--2" />
          <div className="splash-ring splash-ring--3" />
        </div>

        <div className="splash-msg">
          <div className="splash-icon">🎉</div>
          <h2>Order Place Ho Gaya!</h2>
          <p>Teri bhook ka khayal rakhenge bhai</p>
          <span>Tracking karle → My Orders</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSplash
