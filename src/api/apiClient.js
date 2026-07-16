import {
  getWorkoutDates,
  getMonthlyWorkoutCount,
  getTotalWorkoutCount,
  getTodaysRoutine,
  getWeeklyBreakdown,
} from '../mocks/mockHandler' // adjust path to match your actual structure

export const USE_MOCK = true;
export const BASE_URL = 'https://api.example.com';

export async function apiRequest(endpoint, options = {}) {
  if (USE_MOCK) {
    return mockRoute(endpoint)
  }

  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

function mockRoute(endpoint) {
  if (endpoint.includes('/workouts?fields=completed_at')) {
    return getWorkoutDates()
  }
  if (endpoint.includes('/workouts/count?from=')) {
    return getMonthlyWorkoutCount()
  }
  if (endpoint.includes('/workouts/count')) {
    return getTotalWorkoutCount()
  }
  if (endpoint.includes('/today-routine')) {
    return getTodaysRoutine()
  }
  if (endpoint.includes('/weekly-breakdown')){
    return getWeeklyBreakdown()
  }

  throw new Error(`No mock route matched for endpoint: ${endpoint}`)
}