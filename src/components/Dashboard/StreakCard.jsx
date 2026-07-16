import { useEffect, useState, useRef } from 'react'
import {
  getCurrentUser,
  getWorkoutDates,
} from '../../api'
import '../../styles/dashboard/StreakCard.css'

function calculateStreak(dates) {
  if (!dates.length) return { current: 0, best: 0 }

  const unique = [...new Set(dates.map(d =>
    new Date(d).toISOString().split('T')[0]
  ))].sort((a, b) => new Date(b) - new Date(a))

  let current = 0
  let best = 0
  let temp = 1

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  if (unique[0] === today || unique[0] === yesterday) {
    current = 1
    for (let i = 1; i < unique.length; i++) {
      const diff = (new Date(unique[i - 1]) - new Date(unique[i])) / 86400000
      if (diff === 1) current++
      else break
    }
  }

  temp = 1
  for (let i = 1; i < unique.length; i++) {
    const diff = (new Date(unique[i - 1]) - new Date(unique[i])) / 86400000
    if (diff === 1) { temp++; best = Math.max(best, temp) }
    else temp = 1
  }
  best = Math.max(best, current)

  return { current, best }
}

export default function StreakCard() {
  const [streak, setStreak] = useState({ current: 0, best: 0 })
  const [displayNum, setDisplayNum] = useState(0)
  const animRef = useRef(null)

  useEffect(() => {
    async function fetchStreak() {
      const user = await getCurrentUser()
      if (!user) return

      const dates = await getWorkoutDates(user.id)
      setStreak(calculateStreak(dates))
    }
    fetchStreak()
  }, [])

  useEffect(() => {
    if (!streak.current) { setDisplayNum(0); return }
    const target = streak.current
    let start = null

    function animate(ts) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / 800, 1)
      setDisplayNum(Math.floor(progress * target))
      if (progress < 1) animRef.current = requestAnimationFrame(animate)
      else setDisplayNum(target)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [streak.current])

  return (
    <div className="streak-card">
      <div className="streak-card__header">
        <div className="streak-card__icon">🔥</div>
        <span className="streak-card__label">Streak</span>
      </div>
      <div className="streak-card__number">
        {displayNum}
        <span className="streak-card__sub">days</span>
      </div>
      <div className="streak-card__footer">
        <span className="streak-card__footer-icon">⚡</span>
        Best: {streak.best} days
      </div>
    </div>
  )
}