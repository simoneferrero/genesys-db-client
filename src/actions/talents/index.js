import {
  GET_TALENTS,
  GET_TALENTS_ERROR,
  GET_TALENTS_SUCCESS,
  ADD_TALENT,
  ADD_TALENT_ERROR,
  ADD_TALENT_SUCCESS,
  ADD_PLAYER_CHARACTER_TALENT,
  ADD_PLAYER_CHARACTER_TALENT_ERROR,
  ADD_PLAYER_CHARACTER_TALENT_SUCCESS,
} from './constants'

// Get talents
export const getTalents = () => ({
  type: GET_TALENTS,
  payload: {},
})

export const getTalentsSuccess = (talents) => ({
  type: GET_TALENTS_SUCCESS,
  payload: {
    talents,
  },
})

export const getTalentsError = (error) => ({
  type: GET_TALENTS_ERROR,
  payload: {
    error,
  },
})

// Add talent
export const addTalent = (talent, actions) => ({
  type: ADD_TALENT,
  payload: {
    actions,
    talent,
  },
})

export const addTalentSuccess = (talent) => ({
  type: ADD_TALENT_SUCCESS,
  payload: {
    talent,
  },
})

export const addTalentError = (error) => ({
  type: ADD_TALENT_ERROR,
  payload: {
    error,
  },
})

// Add player character talent
export const addPlayerCharacterTalent = (
  playerCharacterId,
  talentId,
  actions,
) => ({
  type: ADD_PLAYER_CHARACTER_TALENT,
  payload: {
    actions,
    playerCharacterId,
    talentId,
  },
})

export const addPlayerCharacterTalentSuccess = (playerCharacterId, talent) => ({
  type: ADD_PLAYER_CHARACTER_TALENT_SUCCESS,
  payload: {
    playerCharacterId,
    talent,
  },
})

export const addPlayerCharacterTalentError = (playerCharacterId, error) => ({
  type: ADD_PLAYER_CHARACTER_TALENT_ERROR,
  payload: {
    error,
    playerCharacterId,
  },
})
