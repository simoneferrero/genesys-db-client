import {
  GET_CAREERS,
  GET_CAREERS_ERROR,
  GET_CAREERS_SUCCESS,
} from './constants'

export const getCareers = () => ({
  type: GET_CAREERS,
  payload: {},
})

export const getCareersSuccess = (careers) => ({
  type: GET_CAREERS_SUCCESS,
  payload: {
    careers,
  },
})

export const getCareersError = (error) => ({
  type: GET_CAREERS_ERROR,
  payload: {
    error,
  },
})
