import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_ERROR,
  GET_PLAYERS_CHARACTERS_SUCCESS,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_ERROR,
  GET_PLAYER_CHARACTER_SUCCESS,
  // editPlayerCharacter
  EDIT_PLAYER_CHARACTER,
  EDIT_PLAYER_CHARACTER_ERROR,
  EDIT_PLAYER_CHARACTER_SUCCESS,
} from './constants'

// GET Players' Characters
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

// GET Player Character
export const getPlayerCharacter = (id) => ({
  type: GET_PLAYER_CHARACTER,
  payload: {
    id,
  },
})

export const getPlayerCharacterSuccess = (id, playerCharacter) => ({
  type: GET_PLAYER_CHARACTER_SUCCESS,
  payload: {
    id,
    playerCharacter,
  },
})

export const getPlayerCharacterError = (id, error) => ({
  type: GET_PLAYER_CHARACTER_ERROR,
  payload: {
    error,
    id,
  },
})

// PUT Player Character
export const editPlayerCharacter = (id, values, actions) => ({
  type: EDIT_PLAYER_CHARACTER,
  payload: {
    actions,
    id,
    values,
  },
})

export const editPlayerCharacterSuccess = (id, playerCharacter) => ({
  type: EDIT_PLAYER_CHARACTER_SUCCESS,
  payload: {
    id,
    playerCharacter,
  },
})

export const editPlayerCharacterError = (id, error) => ({
  type: EDIT_PLAYER_CHARACTER_ERROR,
  payload: {
    error,
    id,
  },
})
