import {
  // getAdversaries
  GET_ADVERSARIES,
  GET_ADVERSARIES_ERROR,
  GET_ADVERSARIES_SUCCESS,
} from './constants'

// GET Adversaries
export const getAdversaries = () => ({
  type: GET_ADVERSARIES,
  payload: {},
})

export const getAdversariesSuccess = (adversaries) => ({
  type: GET_ADVERSARIES_SUCCESS,
  payload: {
    adversaries,
  },
})

export const getAdversariesError = (error) => ({
  type: GET_ADVERSARIES_ERROR,
  payload: {
    error,
  },
})
