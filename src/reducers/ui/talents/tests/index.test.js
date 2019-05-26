import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getTalents,
  getTalentsError,
  getTalentsSuccess,
  addTalent,
  addTalentError,
  addTalentSuccess,
  addPlayerCharacterTalent,
  addPlayerCharacterTalentError,
  addPlayerCharacterTalentSuccess,
} from 'actions/talents'

import { formikActions } from 'mocks'
import {
  talents,
  talent3,
  newPlayerCharacterTalentResponse,
} from 'mocks/talents'
import { genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('talents ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getTalents', () => {
    describe('getTalents', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getTalents())
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getTalentsSuccess', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getTalentsSuccess(talents))
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getTalentsError', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getTalentsError(genericError))
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addTalent', () => {
    describe('addTalent', () => {
      it('should handle action', () => {
        const result = reducer(initialState, addTalent(talent3, formikActions))
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addTalentSuccess', () => {
      it('should handle action', () => {
        const result = reducer(initialState, addTalentSuccess(talent3))
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addTalentError', () => {
      it('should handle action', () => {
        const result = reducer(initialState, addTalentError(genericError))
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addPlayerCharacterTalent', () => {
    describe('addPlayerCharacterTalent', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterTalent(
            playerCharacter1Id,
            talent3.id,
            formikActions,
          ),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterTalentSuccess', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterTalentSuccess(
            playerCharacter1Id,
            newPlayerCharacterTalentResponse,
          ),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterTalentError', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterTalentError(playerCharacter1Id, genericError),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
