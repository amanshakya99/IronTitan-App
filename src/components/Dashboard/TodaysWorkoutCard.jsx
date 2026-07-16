import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getTodaysRoutine,
  getCurrentUser,
} from '../../api'

import '../../styles/dashboard/TodayWorkoutCard.css'

export default function TodayWorkoutCard() {
  const [workout, setWorkout] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTodayWorkout() {
      const user = await getCurrentUser()
      if (!user) return
      const data = await getTodaysRoutine(user.id)
      setWorkout(data)
    }
    fetchTodayWorkout()
  }, [])

  if (!workout) return null

  return (
    <div className="today-card">
      <div className="today-card__header">
        <div className="today-card__icon">💪</div>
        <span className="today-card__title">Today's Workout</span>
      </div>

      <div className="today-card__name">{workout.name}</div>

      <div className="today-card__meta">
        <span className="today-card__meta-item">
          🏋️ {workout.exercises.length} exercises
        </span>
        <span className="today-card__meta-divider">·</span>
        <span className="today-card__meta-item">
          ⏱ {workout.estimatedTime} min
        </span>
      </div>

      <button
        className="today-card__btn"
        onClick={() => navigate('/workout', { state: { workout } })}
      >
        Start Workout
      </button>
    </div>
  )
}