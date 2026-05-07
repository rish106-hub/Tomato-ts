import { useMemo } from 'react'
import './FloatingFoods.css'

const EMOJIS = ['🍛', '🍕', '🥘', '🌮', '🍜', '🧆', '🥙', '🫕', '🍱', '🥞', '🍗', '🧇', '🌯', '🥗']

const FloatingFoods = () => {
  const items = useMemo(() => (
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: `${5 + (i * 7.1) % 88}%`,
      bottom: `${(i * 13.7) % 60}%`,
      size: 18 + (i * 5) % 22,
      duration: 6 + (i * 1.3) % 8,
      delay: -(i * 1.1),
    }))
  ), [])

  return (
    <div className="floating-foods" aria-hidden="true">
      {items.map(item => (
        <span
          key={item.id}
          className="floating-food-item"
          style={{
            left: item.left,
            bottom: item.bottom,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  )
}

export default FloatingFoods
