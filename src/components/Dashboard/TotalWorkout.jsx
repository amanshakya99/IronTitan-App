import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { getMonthlyWorkoutCount, getTotalWorkoutCount } from '../../api/workoutApi'
import '../../styles/dashboard/StreakCard.css'

export default function TotalWorkoutsCard() {
  const [stats, setStats] = useState({ total: 0, thisMonth: 0 })
  const [displayNum, setDisplayNum] = useState(0)
  const animeRef = useRef(null)

  useEffect(() => {
    async function fetchStats() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [total, thisMonth] = await Promise.all([
        getTotalWorkoutCount(user.id),
        getMonthlyWorkoutCount(user.id)
      ])

      setStats({ total, thisMonth })
    }

    fetchStats()
  }, [])

  useEffect(() => {
    if (!stats.total) { setDisplayNum (0) ; return }
    const target = stats.total
    let start = null

    function animate(ts) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / 800, 1)
      setDisplayNum(Math.floor(progress * target))
      if (progress < 1) animeRef.current = requestAnimationFrame(animate)
      else setDisplayNum(target)
    }

    animeRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animeRef.current)
  }, [stats.total])

  return (
    <div className="streak-card">
      <div className="streak-card__header">
        <div className="streak-card__icon">🏋️</div>
        <span className="streak-card__label">Total Workouts</span>
      </div>

      <div className="streak-card__number">
        {displayNum}
      </div>

      <div className="streak-card__footer">
        <span className="streak-card__footer-icon">🏃</span>
        {stats.thisMonth} this month
      </div>
    </div>
  )
}