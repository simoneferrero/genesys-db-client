import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import { addFavor, addFavorError, addFavorSuccess } from 'actions/favors'

import { formikActions } from 'mocks'
import { genericError } from 'mocks/errors'
import { newFavor, newFavorResponse } from 'mocks/favors'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('favors ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('addFavor', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        addFavor(playerCharacter1Id, newFavor, formikActions),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('addFavorSuccess', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        addFavorSuccess(playerCharacter1Id, newFavorResponse),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('addFavorError', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        addFavorError(playerCharacter1Id, genericError),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
