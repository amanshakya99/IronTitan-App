export const MOCK_USER = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john.doe@example.com'
}

export const MOCK_USER_STATS = {
    user_id: 'user-123',
    total_xp:3450,
}


export const MOCK_USER_WORKOUT_DATE = [
    new Date(Date.now() -0 * 24 * 60 * 60 * 1000), // today
    new Date(Date.now() -1 * 24 * 60 * 60 * 1000), // yesterday
    new Date(Date.now() -2 * 24 * 60 * 60 * 1000), // two days ago
    new Date(Date.now() -3 * 24 * 60 * 60 * 1000), // three days ago
    new Date(Date.now() -4 * 24 * 60 * 60 * 1000), // four days ago
    new Date(Date.now() -7 * 24 * 60 * 60 * 1000), // seven days ago
    new Date(Date.now() -8 * 24 * 60 * 60 * 1000), // ten days ago
]

export const MOCK_MONTHLY_WORKOUT_COUNT = 11