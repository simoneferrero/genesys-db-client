import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getPlayersCharacters,
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
} from 'actions/playersCharacters'

import { playersCharacters } from 'mocks/playersCharacters'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('playersCharacters ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getPlayersCharacters', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getPlayersCharacters())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayersCharactersSuccess', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        getPlayersCharactersSuccess(playersCharacters),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayersCharactersError', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        getPlayersCharactersError(genericError),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
