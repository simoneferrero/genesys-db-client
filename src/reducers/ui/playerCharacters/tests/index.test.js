import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getPlayerCharacters,
  getPlayerCharactersError,
  getPlayerCharactersSuccess,
} from 'actions/playerCharacters'

import { playerCharacters } from 'mocks/playerCharacters'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('playerCharacters ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getPlayerCharacters', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getPlayerCharacters())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayerCharactersSuccess', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        getPlayerCharactersSuccess(playerCharacters),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayerCharactersError', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        getPlayerCharactersError(genericError),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
