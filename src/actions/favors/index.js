import { ADD_FAVOR, ADD_FAVOR_ERROR, ADD_FAVOR_SUCCESS } from './constants'

export const addFavor = (playerCharacterId, favor, actions) => ({
  type: ADD_FAVOR,
  payload: { actions, favor, playerCharacterId },
})

export const addFavorSuccess = (playerCharacterId, favor) => ({
  type: ADD_FAVOR_SUCCESS,
  payload: {
    favor,
    playerCharacterId,
  },
})

export const addFavorError = (playerCharacterId, error) => ({
  type: ADD_FAVOR_ERROR,
  payload: {
    error,
    playerCharacterId,
  },
})
