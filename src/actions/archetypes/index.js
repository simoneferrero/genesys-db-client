import {
  GET_ARCHETYPES,
  GET_ARCHETYPES_ERROR,
  GET_ARCHETYPES_SUCCESS,
} from './constants'

export const getArchetypes = () => ({
  type: GET_ARCHETYPES,
  payload: {},
})

export const getArchetypesSuccess = (archetypes) => ({
  type: GET_ARCHETYPES_SUCCESS,
  payload: {
    archetypes,
  },
})

export const getArchetypesError = (error) => ({
  type: GET_ARCHETYPES_ERROR,
  payload: {
    error,
  },
})
