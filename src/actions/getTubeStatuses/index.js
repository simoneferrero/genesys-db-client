import {
  GET_TUBE_STATUSES,
  GET_TUBE_STATUSES_ERROR,
  GET_TUBE_STATUSES_SUCCESS,
} from './constants'

export const getTubeStatuses = () => ({
  type: GET_TUBE_STATUSES,
  payload: {},
})

export const getTubeStatusesSuccess = (statuses) => ({
  type: GET_TUBE_STATUSES_SUCCESS,
  payload: {
    statuses,
  },
})

export const getTubeStatusesError = (error) => ({
  type: GET_TUBE_STATUSES_ERROR,
  payload: {
    error,
  },
})
