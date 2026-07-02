import {
  MOCK_USER,
  MOCK_USER_STATS,
  MOCK_USER_WORKOUT_DATE,
  MOCK_MONTHLY_WORKOUT_COUNT,
  MOCK_TOTAL_WORKOUT_COUNT,
  MOCK_ROUTINES,
  MOCK_LAST_COMPLETED_ROUTINE_ID
} from './mockDataApi'

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms))

//-User ------------------------

export async function getCurrentUser() {
  await delay()
  return MOCK_USER
}

//-Stats ------------------------

export async function getUserStats() {
  await delay()
  return MOCK_USER_STATS
}

//-Workout ------------------------

export async function getUserWorkoutDate() {
  await delay()
  return MOCK_USER_WORKOUT_DATE
}

//-Monthly Workout Count ------------------------
export async function getMonthlyWorkoutCount() {
  await delay()
  return MOCK_MONTHLY_WORKOUT_COUNT
}

//-Total Workout Count ------------------------
export async function getTotalWorkoutCount() {
  await delay()
  return MOCK_TOTAL_WORKOUT_COUNT
}

//Todays training routine
export async function getTodaysRoutine() {
  await delay()
  const lastCompletedIndex = MOCK_ROUTINES.findIndex(routine => routine.id === MOCK_LAST_COMPLETED_ROUTINE_ID)
  const nextIndex = (lastCompletedIndex + 1) % MOCK_ROUTINES.length
  return MOCK_ROUTINES[nextIndex]
}