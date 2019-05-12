import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getCriticalInjuries,
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
  addPlayerCharacterCriticalInjury,
  addPlayerCharacterCriticalInjuryError,
  addPlayerCharacterCriticalInjurySuccess,
} from 'actions/criticalInjuries'

import { formikActions } from 'mocks'
import {
  criticalInjuries,
  criticalInjury3,
  newPlayerCharacterCriticalInjuryResponse,
} from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('criticalInjuries ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getCriticalInjuries', () => {
    describe('getCriticalInjuries', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getCriticalInjuries())
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getCriticalInjuriesSuccess', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          getCriticalInjuriesSuccess(criticalInjuries),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getCriticalInjuriesError', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          getCriticalInjuriesError(genericError),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addPlayerCharacterCriticalInjury', () => {
    describe('addPlayerCharacterCriticalInjury', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterCriticalInjury(
            playerCharacter1Id,
            criticalInjury3.id,
            formikActions,
          ),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterCriticalInjurySuccess', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterCriticalInjurySuccess(
            playerCharacter1Id,
            newPlayerCharacterCriticalInjuryResponse,
          ),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterCriticalInjuryError', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterCriticalInjuryError(
            playerCharacter1Id,
            genericError,
          ),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
