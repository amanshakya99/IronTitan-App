import {
    MOCK_USER,
    MOCK_USER_STATS,
    MOCK_USER_WORKOUT_DATE,
    MOCK_MONTHLY_WORKOUT_COUNT,
} from './mockDataApi'

const delay = (ms = 300) => new Promise (res => setTimeout(res, ms))

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
