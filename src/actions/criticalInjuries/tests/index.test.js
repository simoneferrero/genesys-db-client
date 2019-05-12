import {
  GET_CRITICAL_INJURIES,
  GET_CRITICAL_INJURIES_ERROR,
  GET_CRITICAL_INJURIES_SUCCESS,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY_ERROR,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY_SUCCESS,
} from '../constants'
import {
  getCriticalInjuries,
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
  addPlayerCharacterCriticalInjury,
  addPlayerCharacterCriticalInjuryError,
  addPlayerCharacterCriticalInjurySuccess,
} from '../index'

import { formikActions } from 'mocks'
import {
  criticalInjuries,
  criticalInjury1,
  newPlayerCharacterCriticalInjuryResponse,
} from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'

describe('criticalInjuries actions', () => {
  describe('getCriticalInjuries actions', () => {
    describe('getCriticalInjuries', () => {
      it('should dispatch the correct action', () => {
        const result = getCriticalInjuries()
        const expectedResult = {
          type: GET_CRITICAL_INJURIES,
          payload: {},
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getCriticalInjuriesSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = getCriticalInjuriesSuccess(criticalInjuries)
        const expectedResult = {
          type: GET_CRITICAL_INJURIES_SUCCESS,
          payload: {
            criticalInjuries,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getCriticalInjuriesError', () => {
      it('should dispatch the correct action', () => {
        const result = getCriticalInjuriesError(genericError)
        const expectedResult = {
          type: GET_CRITICAL_INJURIES_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addPlayerCharacterCriticalInjury', () => {
    describe('addPlayerCharacterCriticalInjury', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterCriticalInjury(
          playerCharacter1Id,
          criticalInjury1.id,
          formikActions,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
          payload: {
            actions: formikActions,
            playerCharacterId: playerCharacter1Id,
            criticalInjuryId: criticalInjury1.id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterCriticalInjurySuccess', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterCriticalInjurySuccess(
          playerCharacter1Id,
          newPlayerCharacterCriticalInjuryResponse,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_CRITICAL_INJURY_SUCCESS,
          payload: {
            criticalInjury: newPlayerCharacterCriticalInjuryResponse,
            playerCharacterId: playerCharacter1Id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterCriticalInjuryError', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterCriticalInjuryError(
          playerCharacter1Id,
          genericError,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_CRITICAL_INJURY_ERROR,
          payload: {
            error: genericError,
            playerCharacterId: playerCharacter1Id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
