import {
  GET_FACTIONS,
  GET_FACTIONS_ERROR,
  GET_FACTIONS_SUCCESS,
} from './constants'

export const getFactions = () => ({
  type: GET_FACTIONS,
  payload: {},
})

export const getFactionsSuccess = (factions) => ({
  type: GET_FACTIONS_SUCCESS,
  payload: {
    factions,
  },
})

export const getFactionsError = (error) => ({
  type: GET_FACTIONS_ERROR,
  payload: {
    error,
  },
})
