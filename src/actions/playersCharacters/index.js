import {
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_ERROR,
  GET_PLAYERS_CHARACTERS_SUCCESS,
} from './constants'

export const getPlayersCharacters = () => ({
  type: GET_PLAYERS_CHARACTERS,
  payload: {},
})

export const getPlayersCharactersSuccess = (playersCharacters) => ({
  type: GET_PLAYERS_CHARACTERS_SUCCESS,
  payload: {
    playersCharacters,
  },
})

export const getPlayersCharactersError = (error) => ({
  type: GET_PLAYERS_CHARACTERS_ERROR,
  payload: {
    error,
  },
})
