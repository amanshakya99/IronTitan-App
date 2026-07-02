import { apiRequest } from './apiClient'

export async function getWorkoutDates(userId) {
  const workouts = await apiRequest(`/users/${userId}/workouts?fields=completed_at`)
  return workouts.map(w => w.completed_at) // fixed typo: was w.complete_at
}

export async function getMonthlyWorkoutCount(userId) {
  const start = new Date()
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const res = await apiRequest(
    `/users/${userId}/workouts/count?from=${start.toISOString()}`
  )
  return res.count
}

export async function getTotalWorkoutCount(userId) {
  const res = await apiRequest(`/users/${userId}/workouts/count`)
  return res.count
}

export async function getTodaysRoutine(userId) {
  const res = await apiRequest(`/users/${userId}/today-routine`)
  return res
}

