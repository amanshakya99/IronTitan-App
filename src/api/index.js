import { USE_MOCK } from './apiClient'

import * as realUser from './userApi'
import * as realStats from './statsApi'
import * as realWorkOut from './workoutApi'

import * as mock from '../mocks/mockHandler'

const api = USE_MOCK
    ? mock
    :{
        ...realUser,...realStats,...realWorkOut }


    export const {
        getCurrentUser,
        getUserStats,
        getUserWorkoutDate,
        getMonthlyWorkoutCount,
    } = api