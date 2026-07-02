export const MOCK_USER = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john.doe@example.com'
}

export const MOCK_USER_STATS = {
    user_id: 'user-123',
    currentXp: 2500,
    xpToNextLevel: 1000,
    total_xp:3000,
}


//Mock streak
function daysAgo(n){
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString();
}
export const MOCK_TOTAL_WORKOUT_COUNT = {count: 42}

export const MOCK_MONTHLY_WORKOUT_COUNT = {count: 10}

export const MOCK_USER_WORKOUT_DATE = [
   {completed_at: daysAgo(0)},
   {completed_at: daysAgo(1)},
   {completed_at: daysAgo(2)},
   {completed_at: daysAgo(3)},
   {completed_at: daysAgo(4)},
   {completed_at: daysAgo(5)},
   {completed_at: daysAgo(6)}
]


//mock routines

export const MOCK_ROUTINES = [
    {
        id: 'routine-1',
        name: 'Full Body Workout',
        exercises: [
            { id: 'exercise-1', name: 'Push-ups', sets: 3, reps: 12 },
            { id: 'exercise-2', name: 'Squats', sets: 3, reps: 15 },],
        estimatedTime: 45,
    },

    {
        id: 'routine-2',
        name: 'Full Body Workout_2',
        exercises: [
            { id: 'exercise-1', name: 'Push-ups', sets: 3, reps: 12 },
            { id: 'exercise-2', name: 'Squats', sets: 3, reps: 15 },],
        estimatedTime: 50,
    },
    {
        id: 'routine-3',
        name: 'Full Body Workout_3',
        exercises: [
            { id: 'exercise-1', name: 'Push-ups', sets: 3, reps: 12 },
            { id: 'exercise-2', name: 'Squats', sets: 3, reps: 15 },],
        estimatedTime: 55,
    },
    ]
//if no more routines left, shows "No more routines available"
    export const MOCK_LAST_COMPLETED_ROUTINE_ID = 'routine-1'