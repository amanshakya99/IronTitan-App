import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { getWeeklyBreakdown, getTotalWorkoutCount } from '../../api/workOutApi'
import '../../styles/dashboard/WeeklyProgress.css'

export default function WeeklyProgress(){
    const [total, setTotal] = useState(0)
    const [goal] = useState(20)
    const [ breakdown, setBreakdown] = useState([])

    useEffect(() => {
        async function fetchWorkouts(){
            const {data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const [ count , weekly ] = await Promise.all([
                getTotalWorkoutCount(user.id),
                getWeeklyBreakdown(user.id)
            ])

            setTotal(count || 0)
            setBreakdown(weekly || [])
        }
        fetchWorkouts()
    }, [])

    const max = Math.max(...breakdown.map(day => day.count), 1) // Ensure max is at least 1 to avoid division by zero
    const percentage = Math.min((total / goal) * 100, 100)

  return (
    <div className="weekly-card">
      <div className="weekly-card__header">
        <span className="weekly-card__label">Weekly Progress</span>
        <span className="weekly-card__goal">{total} / {goal} this month</span>
      </div>

      <div className="weekly-card__bar-chart">
        {breakdown.map(({ day, count }) => (
          <div key={day} className="weekly-card__bar-col">
            <span className="weekly-card__bar-count">{count > 0 ? count : ''}</span>
            <div className="weekly-card__bar-track">
              <div
                className={`weekly-card__bar-fill ${count === 0 ? 'weekly-card__bar-fill--empty' : ''}`}
                style={{ height: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="weekly-card__bar-label">{day}</span>
          </div>
        ))}
      </div>

      <div className="weekly-card__footer">
        <div className="weekly-card__progress-track">
          <div
            className="weekly-card__progress-fill"
            style={{ width: `${percentage}%`, transition: 'width 1s ease' }}
          />
        </div>
        <div className="weekly-card__footer-row">
          <span className="weekly-card__status">
            {percentage >= 100 ? 'Goal reached! 🎉' : 'On track'}
          </span>
          <span className="weekly-card__goal-label">Goal: {goal}/mo</span>
        </div>
      </div>
    </div>
  )
}