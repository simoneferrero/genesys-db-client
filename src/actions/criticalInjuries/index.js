import {
  GET_CRITICAL_INJURIES,
  GET_CRITICAL_INJURIES_ERROR,
  GET_CRITICAL_INJURIES_SUCCESS,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY_ERROR,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY_SUCCESS,
} from './constants'

export const getCriticalInjuries = () => ({
  type: GET_CRITICAL_INJURIES,
  payload: {},
})

export const getCriticalInjuriesSuccess = (criticalInjuries) => ({
  type: GET_CRITICAL_INJURIES_SUCCESS,
  payload: {
    criticalInjuries,
  },
})

export const getCriticalInjuriesError = (error) => ({
  type: GET_CRITICAL_INJURIES_ERROR,
  payload: {
    error,
  },
})

export const addPlayerCharacterCriticalInjury = (
  playerCharacterId,
  criticalInjuryId,
  actions,
) => ({
  type: ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
  payload: {
    actions,
    criticalInjuryId,
    playerCharacterId,
  },
})

export const addPlayerCharacterCriticalInjurySuccess = (
  playerCharacterId,
  criticalInjury,
) => ({
  type: ADD_PLAYER_CHARACTER_CRITICAL_INJURY_SUCCESS,
  payload: {
    criticalInjury,
    playerCharacterId,
  },
})

export const addPlayerCharacterCriticalInjuryError = (
  playerCharacterId,
  error,
) => ({
  type: ADD_PLAYER_CHARACTER_CRITICAL_INJURY_ERROR,
  payload: {
    error,
    playerCharacterId,
  },
})
