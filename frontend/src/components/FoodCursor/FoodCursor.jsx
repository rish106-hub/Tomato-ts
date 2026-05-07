import { useEffect, useRef, useState } from 'react'
import './FoodCursor.css'

const FoodCursor = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [trail, setTrail] = useState([])
  const trailRef = useRef([])
  const frameRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      setPos({ x, y })
      setVisible(true)

      trailRef.current = [
        { x, y, id: Date.now() + Math.random() },
        ...trailRef.current.slice(0, 5),
      ]
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          setTrail([...trailRef.current])
          frameRef.current = null
        })
      }
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="cursor-trail"
          style={{
            left: t.x,
            top: t.y,
            opacity: (1 - i / trail.length) * 0.25,
            transform: `translate(-50%, -50%) scale(${1 - i * 0.12})`,
          }}
        />
      ))}
      <div
        className={`food-cursor ${clicking ? 'food-cursor--click' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      >
        🍴
      </div>
    </>
  )
}

export default FoodCursor
