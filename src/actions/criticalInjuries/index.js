import {
  GET_CRITICAL_INJURIES,
  GET_CRITICAL_INJURIES_ERROR,
  GET_CRITICAL_INJURIES_SUCCESS,
} from './constants'

export const getCriticalInjuries = () => ({
  type: GET_CRITICAL_INJURIES,
  payload: {},
})

export const getCriticalInjuriesSuccess = (criticalInjuries) => ({
  type: GET_CRITICAL_INJURIES_SUCCESS,
  payload: {
    criticalInjuries,
  },
})

export const getCriticalInjuriesError = (error) => ({
  type: GET_CRITICAL_INJURIES_ERROR,
  payload: {
    error,
  },
})
