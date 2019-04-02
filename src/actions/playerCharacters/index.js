import {
  GET_PLAYER_CHARACTERS,
  GET_PLAYER_CHARACTERS_ERROR,
  GET_PLAYER_CHARACTERS_SUCCESS,
} from './constants'

export const getPlayerCharacters = () => ({
  type: GET_PLAYER_CHARACTERS,
  payload: {},
})

export const getPlayerCharactersSuccess = (playerCharacters) => ({
  type: GET_PLAYER_CHARACTERS_SUCCESS,
  payload: {
    playerCharacters,
  },
})

export const getPlayerCharactersError = (error) => ({
  type: GET_PLAYER_CHARACTERS_ERROR,
  payload: {
    error,
  },
})
